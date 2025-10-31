import React from 'react';
// FIX: Import `Variants` to explicitly type animation variants.
import { motion, Variants } from 'framer-motion';
import { AffordablePropertyTaxesIcon, GuaranteedQualityHomesIcon, FastAndEasyProcessIcon, PropertyInsuranceIcon } from './Icons';

const servicesData = [
    { title: 'Affordable Property Taxes', description: 'We help you find a new home by offering a smart real estate experience.', Icon: AffordablePropertyTaxesIcon, highlighted: true },
    { title: 'Guaranteed Quality Homes', description: 'We help you find a new home by offering a smart real estate experience.', Icon: GuaranteedQualityHomesIcon, highlighted: false },
    { title: 'Fast and Easy Process', description: 'We help you find a new home by offering a smart real estate experience.', Icon: FastAndEasyProcessIcon, highlighted: false },
    { title: 'Property Insurance', description: 'We help you find a new home by offering a smart real estate experience.', Icon: PropertyInsuranceIcon, highlighted: false },
];

// FIX: Explicitly type `listVariants` with `Variants` to ensure type safety.
const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
// FIX: Explicitly type `itemVariants` with `Variants`. This allows TypeScript to correctly infer the type of the `ease` property in the transition object, resolving the type error.
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Services: React.FC = () => {
    return (
        <section className="px-6 sm:px-8 lg:px-12 py-16 sm:py-24 text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Services</h2>
                <p className="text-gray-300 mt-2 mb-12 max-w-xl mx-auto">Enhance your property listings and videos with accurate and engaging subtitles.</p>
            </motion.div>
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {servicesData.map((service, index) => (
                    <motion.div 
                        key={index} 
                        className={`p-8 rounded-xl text-left flex items-start space-x-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                            service.highlighted
                                ? 'bg-black text-white border border-amber-500 hover:shadow-amber-500/40'
                                : 'bg-white text-gray-800 shadow-md hover:border hover:border-amber-400 hover:shadow-amber-400/20'
                        }`}
                        variants={itemVariants}
                    >
                        <div className={`p-3 rounded-lg ${service.highlighted ? 'bg-white/20' : 'bg-white'}`}>
                            <service.Icon className={`w-8 h-8 ${service.highlighted ? 'text-white' : 'text-black'}`} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{service.title}</h3>
                            <p className={`mt-1 text-sm ${service.highlighted ? 'text-gray-200' : 'text-gray-500'}`}>{service.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
             <motion.button 
                className="mt-12 bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition flex items-center mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-amber-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.5 }}
             >
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </motion.button>
        </section>
    );
};

export default Services;