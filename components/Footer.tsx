import React from 'react';
import { motion } from 'framer-motion';
import { LogoIcon, CitySkylineIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './Icons';

const socialLinks = [
    { name: 'Facebook', Icon: FacebookIcon, href: '#' },
    { name: 'Twitter', Icon: TwitterIcon, href: '#' },
    { name: 'Instagram', Icon: InstagramIcon, href: '#' },
    { name: 'LinkedIn', Icon: LinkedInIcon, href: '#' },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-black to-gray-900 text-white mt-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                             <LogoIcon className="w-8 h-8 text-white" />
                            <span className="text-white text-xl font-bold">Luxe</span>
                        </div>
                        <p className="text-gray-400 text-sm">Your trusted partner in finding the perfect property. We offer a smart and seamless real estate experience.</p>
                        <div className="flex items-center space-x-4 mt-6">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={`Follow us on ${social.name}`}
                                    className="text-gray-400 hover:text-amber-400 transition-colors"
                                    whileHover={{ scale: 1.2, color: '#f59e0b' }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <social.Icon className="w-6 h-6" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="inline-block transition-all duration-300 hover:text-amber-400 hover:scale-105 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">About Us</a></li>
                            <li><a href="#" className="inline-block transition-all duration-300 hover:text-amber-400 hover:scale-105 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Services</a></li>
                            <li><a href="#" className="inline-block transition-all duration-300 hover:text-amber-400 hover:scale-105 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Properties</a></li>
                            <li><a href="#" className="inline-block transition-all duration-300 hover:text-amber-400 hover:scale-105 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="inline-block transition-all duration-300 hover:text-amber-400 hover:scale-105 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Privacy Policy</a></li>
                            <li><a href="#" className="inline-block transition-all duration-300 hover:text-amber-400 hover:scale-105 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Terms of Service</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Email: contact@luxe.com</li>
                            <li>Phone: +880 1819 427 078</li>
                            <li>Address: 123 Property Lane, Dhaka</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Luxe Properties. All rights reserved.</p>
                </div>
            </div>
            <CitySkylineIcon className="absolute bottom-0 left-0 w-full h-auto text-gray-700 opacity-20 pointer-events-none z-0" />
        </footer>
    );
};

export default Footer;