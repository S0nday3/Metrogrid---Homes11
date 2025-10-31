import React from 'react';
// FIX: Import `Variants` type from framer-motion to explicitly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CloseIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// FIX: Explicitly type `backdropVariants` with `Variants`. This allows TypeScript to correctly infer the type of the `ease` property in the transition object, resolving the type error.
const backdropVariants: Variants = {
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeInOut' } },
  hidden: { opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
};

// FIX: Explicitly type `modalVariants` with `Variants`. This allows TypeScript to correctly infer the type of the `ease` property in the transition object, resolving the type error.
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.1, // Start after backdrop
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 30,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 overflow-y-auto"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative my-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-10 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;