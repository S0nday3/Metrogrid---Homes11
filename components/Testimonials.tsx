import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { StarIcon, QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    quote: "Luxe Properties made our dream of owning a home a reality. Their professionalism and dedication are unmatched. The process was seamless from start to finish!",
    name: 'Amina & Rahman Khan',
    location: 'Homeowner in Gulshan',
    avatar: 'https://picsum.photos/seed/client1/100/100',
    rating: 5,
  },
  {
    quote: "The team was incredibly helpful, guiding us through every step. We found the perfect apartment for our family. Highly recommended for their excellent service.",
    name: 'David Chen',
    location: 'Investor',
    avatar: 'https://picsum.photos/seed/client2/100/100',
    rating: 5,
  },
  {
    quote: "Finding a property in Dhaka was daunting, but Luxe Properties simplified everything. Their listings are top-notch and their agents are true experts in the field.",
    name: 'Fatima Al-Jamil',
    location: 'Expat Resident',
    avatar: 'https://picsum.photos/seed/client3/100/100',
    rating: 5,
  },
  {
    quote: "As a first-time buyer, I was nervous, but their agent was patient and knowledgeable. They found me a place that I love and that was within my budget. A+ experience!",
    name: 'Samuel Rodriguez',
    location: 'First-time Buyer in Uttara',
    avatar: 'https://picsum.photos/seed/client4/100/100',
    rating: 5,
  },
    {
    quote: "We've worked with several real estate agencies, and Luxe Properties is by far the most efficient and trustworthy. Their market insight is invaluable for any investor.",
    name: 'Priya Sharma',
    location: 'Seasoned Investor',
    avatar: 'https://picsum.photos/seed/client5/100/100',
    rating: 5,
  },
  {
    quote: "Selling our home was an emotional process, but the team at Luxe handled it with such care and expertise. They secured a great price for us in record time. Thank you!",
    name: 'The Islam Family',
    location: 'Sold Property in Dhanmondi',
    avatar: 'https://picsum.photos/seed/client6/100/100',
    rating: 5,
  },
];

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};


const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-300' : 'text-white/30'}`} />
  ));
};

const Testimonials: React.FC = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isHovered, setIsHovered] = useState(false);
    const directionRef = useRef(1);

    const testimonialIndex = ((page % testimonialsData.length) + testimonialsData.length) % testimonialsData.length;

    const paginate = (newDirection: number) => {
        directionRef.current = newDirection;
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setPage(([currentPage, _]) => {
                const currentIndex = ((currentPage % testimonialsData.length) + testimonialsData.length) % testimonialsData.length;
                
                if (currentIndex >= testimonialsData.length - 1 && directionRef.current === 1) {
                    directionRef.current = -1;
                } else if (currentIndex <= 0 && directionRef.current === -1) {
                    directionRef.current = 1;
                }
                
                return [currentPage + directionRef.current, directionRef.current];
            });
        }, 4000);

        return () => clearInterval(timer);
    }, [isHovered]);

    const goToSlide = (slideIndex: number) => {
        const newDirection = slideIndex > testimonialIndex ? 1 : -1;
        setPage([slideIndex, newDirection]);
    };

    const testimonial = testimonialsData[testimonialIndex];

    return (
        <section className="bg-white rounded-2xl shadow-sm px-6 sm:px-8 lg:px-12 py-16 sm:py-24 overflow-hidden">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Clients Say</h2>
                <p className="text-gray-500 mt-2 mb-12 max-w-xl mx-auto">Hear from our satisfied customers who found their perfect homes with us.</p>
            </motion.div>

            <div 
                className="relative h-[26rem] md:h-80 max-w-2xl mx-auto"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full bg-gradient-to-t from-gray-900 to-black p-8 rounded-2xl shadow-lg text-white flex flex-col justify-between"
                    >
                        <div>
                            <QuoteIcon className="w-10 h-10 text-white/30 mb-4" />
                            <blockquote className="text-lg md:text-xl italic">
                              "{testimonial.quote}"
                            </blockquote>
                        </div>
                        <div className="flex items-center mt-6">
                            <img loading="lazy" src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white/50 bg-gray-200" />
                            <div>
                                <p className="font-bold text-lg text-amber-400">{testimonial.name}</p>
                                <p className="text-sm opacity-80">{testimonial.location}</p>
                            </div>
                            <div className="flex items-center ml-auto">
                                {renderStars(testimonial.rating)}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button
                    className="absolute top-1/2 -left-4 md:-left-16 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-700 transition hover:bg-white shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    onClick={() => paginate(-1)}
                    aria-label="Previous testimonial"
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                    className="absolute top-1/2 -right-4 md:-right-16 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-700 transition hover:bg-white shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    onClick={() => paginate(1)}
                    aria-label="Next testimonial"
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
            
            <div className="flex justify-center space-x-2 mt-8">
                {testimonialsData.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${i === testimonialIndex ? 'bg-black w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;