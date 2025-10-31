

import React, 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon } from './Icons';
import useSearch from './useSearch';
import PendulumCarousel from './PendulumCarousel';

const Hero: React.FC = () => {
    const {
        searchTerm,
        setSearchTerm,
        suggestions,
        isSuggestionsVisible,
        setIsSuggestionsVisible,
        searchRef,
        handleSuggestionClick,
    } = useSearch();

    return (
        <section>
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div 
                      className="relative bg-cover bg-center h-80 rounded-2xl flex items-center justify-center text-white" 
                      style={{backgroundImage: `url('https://picsum.photos/seed/hero-bg/1200/400')`}}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
                        <div className="relative z-10 text-center px-4">
                            <motion.h1 
                                className="text-4xl md:text-5xl font-bold mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Find Your Properties
                            </motion.h1>
                            <div className="relative max-w-xl mx-auto" ref={searchRef}>
                                <motion.div 
                                    className="mt-6 bg-white rounded-full p-2 flex items-center shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white focus-within:ring-amber-500"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <label htmlFor="hero-search" className="sr-only">Find Your Property</label>
                                    <input 
                                        id="hero-search"
                                        type="text" 
                                        placeholder="Find by property name or location..." 
                                        className="w-full text-gray-700 placeholder-gray-400 focus:outline-none pl-4 bg-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onFocus={() => { if(suggestions.length > 0) setIsSuggestionsVisible(true); }}
                                        autoComplete="off"
                                    />
                                    <button className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition focus:outline-none flex-shrink-0" aria-label="Search">
                                        <SearchIcon className="w-5 h-5" />
                                    </button>
                                </motion.div>
                                <AnimatePresence>
                                    {isSuggestionsVisible && suggestions.length > 0 && (
                                        <motion.ul
                                            className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden z-20"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {suggestions.map((property) => (
                                                <li 
                                                    key={property.name} 
                                                    className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors text-left"
                                                    onClick={() => handleSuggestionClick(property)}
                                                >
                                                    <p className="font-medium text-gray-800">{property.name}</p>
                                                    <p className="text-sm text-gray-500">{property.location}</p>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
             <div className="mt-8">
                <PendulumCarousel />
            </div>
        </section>
    );
};

export default Hero;
