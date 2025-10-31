import React, { useState, useEffect } from 'react';
// FIX: Explicitly type `spring` with the `Transition` type from Framer Motion.
// This resolves the TypeScript error by ensuring the `type` property is correctly inferred as "spring" instead of a generic string.
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { CloseIcon, BedIcon, BathIcon, AreaIcon, LocationPinIcon, PhoneIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from './Icons';

/**
 * @file PendulumCarousel.tsx
 * @description A responsive, interactive property carousel.
 * Cards slide horizontally with a continuous pendulum motion and expand into a full-screen detailed view when clicked.
 * Uses Framer Motion's layoutId for a seamless animated transition.
 */

// --- Component & Type Definitions ---

interface PropertyCardData {
    id: string;
    image: string;
    title: string;
    location: string;
    price: string;
    description: string;
    beds: number;
    baths: number;
    area: string;
}

const properties: PropertyCardData[] = [
    { id: '1', image: 'https://picsum.photos/seed/prop1/800/600', title: 'Modern Duplex', location: 'Gulshan, Dhaka', price: '₦350,000,000', beds: 4, baths: 4, area: '450 sqm', description: 'A stunning modern duplex with spacious interiors, high-end finishes, and a private rooftop terrace. Perfect for contemporary urban living.' },
    { id: '2', image: 'https://picsum.photos/seed/prop2/800/600', title: 'Art Deco Villa', location: 'Banani, Dhaka', price: '₦680,000,000', beds: 5, baths: 6, area: '700 sqm', description: 'Experience timeless elegance in this beautifully restored Art Deco villa. Features a grand staircase, landscaped gardens, and a swimming pool.' },
    { id: '3', image: 'https://picsum.photos/seed/prop3/800/600', title: 'Lush Paradise Home', location: 'Baridhara, Dhaka', price: '₦820,000,000', beds: 6, baths: 6, area: '850 sqm', description: 'An exquisite family home surrounded by lush greenery. Offers unparalleled privacy, a home theater, and state-of-the-art security.' },
    { id: '4', image: 'https://picsum.photos/seed/prop4/800/600', title: 'Urban Block 06', location: 'Dhanmondi, Dhaka', price: '₦320,000,000', beds: 4, baths: 5, area: '400 sqm', description: 'Chic and stylish apartment in the heart of the city. Features an open-plan living area, floor-to-ceiling windows, and access to a residents-only gym.' },
    { id: '5', image: 'https://picsum.photos/seed/prop5/800/600', title: 'The Green Terraces', location: 'Uttara, Dhaka', price: '₦550,000,000', beds: 5, baths: 5, area: '600 sqm', description: 'A unique residence with multiple green terraces and vertical gardens. Eco-friendly design with luxurious amenities for a sustainable lifestyle.' },
    { id: '6', image: 'https://picsum.photos/seed/prop6/800/600', title: 'Sleek Urban Loft', location: 'Mohakhali, Dhaka', price: '₦250,000,000', beds: 2, baths: 2, area: '200 sqm', description: 'A minimalist loft perfect for professionals. Boasts industrial-chic design, smart home features, and stunning city views.' },
    { id: '7', image: 'https://picsum.photos/seed/prop7/800/600', title: 'Tropical Retreat', location: 'Bashundhara R/A, Dhaka', price: '₦480,000,000', beds: 4, baths: 5, area: '650 sqm', description: 'Escape to your own tropical paradise. This villa features a lagoon-style pool, a Balinese-inspired garden, and open-air living spaces.' },
    { id: '8', image: 'https://picsum.photos/seed/prop8/800/600', title: 'The Onyx Residence', location: 'Gulshan, Dhaka', price: '₦950,000,000', beds: 6, baths: 7, area: '900 sqm', description: 'The pinnacle of luxury living. The Onyx Residence offers bespoke interiors, a private elevator, and panoramic views of the city skyline.' },
];

const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const PendulumCarousel: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // New state for auto-play and hover interaction
    const [isHovered, setIsHovered] = useState(false);
    const [pendulumDirection, setPendulumDirection] = useState(1);

    const VISIBLE_CARDS_DESKTOP = 5;
    const VISIBLE_CARDS_MOBILE = 1.25;

    const [visibleCards, setVisibleCards] = useState(VISIBLE_CARDS_DESKTOP);

    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth < 768) {
                setVisibleCards(VISIBLE_CARDS_MOBILE);
            } else {
                setVisibleCards(VISIBLE_CARDS_DESKTOP);
            }
        };
        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    // Effect for continuous pendulum auto-scrolling
    useEffect(() => {
        // Pause animation if user is hovering or has expanded a card
        if (isHovered || selectedId) return;

        const intervalId = setInterval(() => {
            const maxIndex = properties.length - Math.floor(visibleCards);

            setCurrentIndex(prevIndex => {
                // Reverse direction at carousel ends
                if (prevIndex >= maxIndex && pendulumDirection === 1) {
                    setPendulumDirection(-1);
                    return prevIndex - 1;
                }
                if (prevIndex <= 0 && pendulumDirection === -1) {
                    setPendulumDirection(1);
                    return prevIndex + 1;
                }
                
                // Continue in the current direction
                const nextIndex = prevIndex + pendulumDirection;
                // Safeguard to stay within bounds
                return Math.max(0, Math.min(nextIndex, maxIndex));
            });
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(intervalId);
    }, [isHovered, selectedId, visibleCards, pendulumDirection, properties.length]);

    const handleNext = () => {
        setPendulumDirection(1); // Set direction when manually navigating
        setCurrentIndex(prev => Math.min(prev + 1, properties.length - Math.floor(visibleCards)));
    };

    const handlePrev = () => {
        setPendulumDirection(-1); // Set direction when manually navigating
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };
    
    // Function to navigate to a specific slide, used by the indicators
    const goToSlide = (slideIndex: number) => {
        const centerOffset = Math.floor(visibleCards / 2);
        const newIndex = Math.max(0, Math.min(slideIndex - centerOffset, properties.length - Math.floor(visibleCards)));
        setCurrentIndex(newIndex);
    };

    const selectedProperty = properties.find(p => p.id === selectedId);
    
    // Calculate the index of the slide that is visually in the center
    const centeredSlideIndex = currentIndex + Math.floor(visibleCards / 2);

    return (
        <div className="relative py-8">
            <div 
                className="w-full max-w-7xl mx-auto relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Container with fade-out effect on the sides */}
                <div className="overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]">
                    <motion.div
                        className="flex"
                        animate={{ x: `-${currentIndex * (100 / visibleCards)}%` }}
                        transition={spring}
                    >
                        {properties.map((item) => (
                            <div 
                                key={item.id} 
                                className="flex-shrink-0"
                                style={{ width: `${100 / visibleCards}%`, padding: '0 8px' }}
                            >
                                {/* The card in the carousel. `layoutId` is the key to the animation. */}
                                <motion.div
                                    layoutId={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className="bg-white rounded-xl shadow-md overflow-hidden h-72 cursor-pointer group"
                                >
                                    <div className="h-2/3 w-full relative overflow-hidden">
                                        <motion.img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                                            <PlusIcon className="w-8 h-8 mb-2" />
                                            <span className="font-semibold">Click for more info</span>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold text-sm truncate text-gray-800">{item.title}</h3>
                                        <p className="font-bold text-black text-sm mt-1">{item.price}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>
                </div>
                
                {/* Navigation Buttons for the carousel. Elevated with z-20 to be above the gradient mask. */}
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="absolute top-1/2 -translate-y-1/2 -left-4 z-20 bg-white/80 p-2 rounded-full shadow-md transition-opacity duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous property"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex >= properties.length - Math.floor(visibleCards)}
                    className="absolute top-1/2 -translate-y-1/2 -right-4 z-20 bg-white/80 p-2 rounded-full shadow-md transition-opacity duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next property"
                >
                    <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                </button>
            </div>
            
             {/* Dotted Navigation Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
                {properties.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                            i === centeredSlideIndex
                                ? 'bg-black w-6'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* This component handles the animation of the expanded card when it appears and disappears. */}
            <AnimatePresence>
                {selectedProperty && (
                    <motion.div
                        // The overlay with a dark, blurred background.
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)} // Close by clicking the background
                    >
                        {/* The expanded card. Its `layoutId` matches the carousel card's `layoutId`. */}
                        <motion.div
                            layoutId={selectedProperty.id}
                            className="w-full h-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the card itself
                        >
                            {/* Left Side: Image */}
                            <div className="w-full md:w-3/5 h-1/3 md:h-full flex-shrink-0 bg-gray-200">
                                <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col overflow-y-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedProperty.title}</h2>
                                
                                <div className="flex items-center text-gray-500 mt-2">
                                    <LocationPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                    <p className="text-sm">{selectedProperty.location}</p>
                                </div>
                                
                                <p className="text-3xl font-bold text-amber-600 my-4">{selectedProperty.price}</p>
                                
                                <div className="flex items-center text-gray-600 space-x-6 border-t border-b py-4">
                                    <div className="text-center"><BedIcon className="w-6 h-6 mx-auto mb-1 text-gray-500" /> <span className="text-sm font-medium">{selectedProperty.beds} Beds</span></div>
                                    <div className="text-center"><BathIcon className="w-6 h-6 mx-auto mb-1 text-gray-500" /> <span className="text-sm font-medium">{selectedProperty.baths} Baths</span></div>
                                    <div className="text-center"><AreaIcon className="w-6 h-6 mx-auto mb-1 text-gray-500" /> <span className="text-sm font-medium">{selectedProperty.area}</span></div>
                                </div>

                                <div className="mt-6 flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{selectedProperty.description}</p>
                                </div>
                                
                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <button className="flex-1 bg-black text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500">
                                        <PhoneIcon className="w-4 h-4 mr-2" />
                                        Contact Agent
                                    </button>
                                    <button 
                                        onClick={() => setSelectedId(null)}
                                        className="flex-1 bg-gray-200 text-gray-800 px-5 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                            
                            {/* Absolute Close Button on the corner */}
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-3 right-3 text-white md:text-gray-500 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 md:bg-gray-100/80 md:hover:bg-gray-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
                                aria-label="Close property details"
                            >
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PendulumCarousel;