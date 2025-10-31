import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoIcon, HamburgerIcon, CloseIcon } from './Icons';

const navLinks = ['Home', 'About', 'Service', 'Property', 'Contact'];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Effect to detect if the page has been scrolled
  useEffect(() => {
    const handleScroll = () => {
      // Set state to true if user has scrolled more than 10px
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // The header is sticky to the top. Its background color changes based on the isScrolled state.
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
      {/* Inner container for content alignment and height transition */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
        
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-3">
          <LogoIcon className="text-white w-8 h-8" />
          <span className="text-white font-bold text-xl">Metrogrid Homes</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-white hover:text-amber-400 transition-colors text-sm font-medium">
              {link}
            </a>
          ))}
        </nav>

        {/* Hamburger Menu Button for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <HamburgerIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-black/90'}`}
          >
            <nav className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-white hover:text-amber-400 transition-colors text-lg" onClick={() => setIsMenuOpen(false)}>
                  {link}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;