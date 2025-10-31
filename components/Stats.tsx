
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

const statsData = [
    { value: '30+', label: 'Satisfied Customer', highlighted: false },
    { value: '5k+', label: 'Award wining', highlighted: true },
    { value: '07+', label: 'Years of Experience', highlighted: false },
    { value: '33+', label: 'Projects Delivered', highlighted: false }
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Stats: React.FC = () => {
    // FIX: The parsing logic is updated to correctly handle suffixes like 'k' and '+'.
    // It now separates the numerical target for animation from the text suffix for display.
    const parseStatValue = (valueStr: string) => {
        const numberPart = parseFloat(valueStr);
        
        let targetNumber = numberPart;
        // If 'k' is present, multiply by 1000 for the animation target.
        if (valueStr.toLowerCase().includes('k')) {
            targetNumber *= 1000;
        }
        
        // The display suffix is what remains after removing digits, '.', and 'k'.
        // This ensures '5k+' correctly results in a '+' suffix.
        const displaySuffix = valueStr.replace(/[0-9.kK]/g, '');
        
        return { targetNumber, displaySuffix };
    };

    return (
        <section className="bg-white rounded-2xl shadow-sm px-6 sm:px-8 lg:px-12 py-16 sm:py-24 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.3, once: false }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Your Trusted Real Estate Advisors</h2>
                    <p className="text-gray-500 mb-8">
                        Find Your Property I've put together more than 50 examples of automated real estate text message scripts to use in your first text messaging campaign.
                    </p>
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3, once: false }}
                    >
                        {statsData.map((stat, index) => {
                             const { targetNumber, displaySuffix } = parseStatValue(stat.value);
                            return (
                                <motion.div
                                    key={index}
                                    className={`p-6 rounded-xl text-center cursor-pointer transition-colors duration-300 ${
                                        stat.highlighted
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 hover:bg-black hover:text-white'
                                    }`}
                                    variants={itemVariants}
                                    whileHover={stat.highlighted ? {
                                        y: -8,
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' // shadow-lg
                                    } : {}}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <p className="text-3xl font-bold">
                                        <AnimatedNumber to={targetNumber} />
                                        {displaySuffix}
                                    </p>
                                    <p className="text-sm mt-1">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
                <div className="relative h-96 mt-12 lg:mt-0">
                    <motion.div
                        className="absolute top-0 right-0 w-3/4 rounded-2xl shadow-xl overflow-hidden bg-gray-200 aspect-[3/2]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.2, once: false }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img 
                            loading="lazy"
                            src="https://picsum.photos/seed/family1/300/200" 
                            alt="Family moving" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div 
                        className="absolute bottom-0 left-0 w-1/2 rounded-2xl shadow-xl overflow-hidden bg-gray-200 aspect-[2/3]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.2, once: false }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <img 
                            loading="lazy"
                            src="https://picsum.photos/seed/family2/200/300" 
                            alt="Couple with keys" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div 
                        className="absolute bottom-1/4 left-1/3 bg-amber-500 text-black rounded-full w-24 h-24 flex items-center justify-center text-center text-xs font-bold transform rotate-[-15deg]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.2, once: false }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <span>Your Trust is Our Priority</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
