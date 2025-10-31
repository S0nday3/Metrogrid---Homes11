
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon } from './Icons';

interface Agent {
    name: string;
    img: string;
    phone: string;
}

interface AgentProfileProps {
    agent: Agent;
}

const AgentProfile: React.FC<AgentProfileProps> = ({ agent }) => {
    return (
        <motion.div 
            className="mt-8 p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center space-x-4">
                <img loading="lazy" src={agent.img} alt={agent.name} className="w-16 h-16 rounded-full object-cover shadow-sm bg-gray-200" />
                <div>
                    <p className="font-semibold text-gray-800">{agent.name}</p>
                    <p className="text-sm text-gray-500">Real Estate Agent</p>
                </div>
            </div>
            <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500">
                <PhoneIcon className="w-4 h-4 mr-2" />
                Contact Agent
            </a>
        </motion.div>
    );
};

export default AgentProfile;
