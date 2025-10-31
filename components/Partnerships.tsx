import React from 'react';
import { motion } from 'framer-motion';
import { PartnerLogo1, PartnerLogo2, PartnerLogo3, PartnerLogo4, PartnerLogo5, PartnerLogo6 } from './Icons';

const partners = [
    { name: 'Innovate Inc.', Logo: PartnerLogo1 },
    { name: 'Quantum Solutions', Logo: PartnerLogo2 },
    { name: 'Apex Holdings', Logo: PartnerLogo3 },
    { name: 'Stellar Ventures', Logo: PartnerLogo4 },
    { name: 'Pioneer Group', Logo: PartnerLogo5 },
    { name: 'Nexus Capital', Logo: PartnerLogo6 },
];

// Duplicate partners to create a seamless loop
const extendedPartners = [...partners, ...partners];

const Partnerships: React.FC = () => {
    return (
        <section className="bg-white rounded-2xl shadow-sm py-16 sm:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Trusted Partnerships</h2>
                    <p className="text-gray-500 mt-2 max-w-xl mx-auto">We are proud to collaborate with leading companies and investors in the industry.</p>
                </motion.div>

                <div className="mt-12 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <motion.ul 
                        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
                        initial={{ x: 0 }}
                        animate={{ x: '-50%' }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {extendedPartners.map((partner, index) => (
                            <li key={index} className="flex-shrink-0 mx-8">
                                <partner.Logo className="h-12 w-auto text-gray-500 grayscale transition-all duration-300 hover:grayscale-0 hover:text-gray-800" />
                            </li>
                        ))}
                    </motion.ul>
                     <motion.ul 
                        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
                        initial={{ x: 0 }}
                        animate={{ x: '-50%' }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        aria-hidden="true" // Hide the duplicated list from screen readers
                    >
                        {extendedPartners.map((partner, index) => (
                            <li key={index} className="flex-shrink-0 mx-8">
                                <partner.Logo className="h-12 w-auto text-gray-500 grayscale transition-all duration-300 hover:grayscale-0 hover:text-gray-800" />
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

export default Partnerships;
