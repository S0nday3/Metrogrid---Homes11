
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ImageCarouselProps {
  images: string[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    // The state is a tuple: [page, direction]
    const [[page, direction], setPage] = useState([0, 0]);

    // This ensures the index always wraps around correctly, even for negative pages
    const imageIndex = ((page % images.length) + images.length) % images.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const goToSlide = (slideIndex: number) => {
        const newDirection = slideIndex > imageIndex ? 1 : -1;
        setPage([slideIndex, newDirection]);
    };


    return (
        <div className="relative w-full h-72 overflow-hidden bg-gray-200">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    loading="lazy"
                    key={page}
                    src={images[imageIndex]}
                    alt={`Property image ${imageIndex + 1}`}
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
                    className="absolute h-full w-full object-cover"
                />
            </AnimatePresence>
            <button
                className="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => paginate(-1)}
                aria-label="Previous image"
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
                className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => paginate(1)}
                aria-label="Next image"
            >
                <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`h-2 w-2 rounded-full transition-colors ${i === imageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;