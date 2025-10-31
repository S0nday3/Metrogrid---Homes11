import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface PropertyCardImageCarouselProps {
  images: string[];
  alt: string;
}

const variants = {
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

const PropertyCardImageCarousel: React.FC<PropertyCardImageCarouselProps> = ({ images, alt }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // This ensures the index always wraps around correctly
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the parent card's onClick from firing
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full h-64 overflow-hidden bg-gray-200">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          alt={`${alt} image ${imageIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute h-full w-full object-cover"
        />
      </AnimatePresence>
      <button
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        onClick={(e) => paginate(-1, e)}
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <button
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        onClick={(e) => paginate(1, e)}
        aria-label="Next image"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 space-x-1.5 opacity-0 transition-opacity group-hover:opacity-100">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all ${i === imageIndex ? 'bg-white scale-125' : 'bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCardImageCarousel;
