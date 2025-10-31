
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, TrashIcon } from './Icons';

// FIX: Define Agent and Property interfaces to be compatible with the types in Properties.tsx.
// This resolves prop type validation errors for `list` and `onRemove`.
interface Agent {
    name: string;
    img: string;
    phone: string;
}

interface Property {
    name: string;
    images: string[];
    location: string;
    price: string;
    beds: number;
    baths: number;
    area: string;
    description: string;
    amenities: string[];
    agent: Agent;
    status: 'For Sale' | 'Sold' | 'Off Market';
    lat: number;
    lng: number;
}

interface ComparisonBarProps {
    list: Property[];
    onCompare: () => void;
    onClear: () => void;
    onRemove: (property: Property) => void;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({ list, onCompare, onClear, onRemove }) => {
    return (
        <AnimatePresence>
            {list.length > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl bg-white rounded-xl shadow-2xl p-4 z-40 flex items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="font-semibold text-gray-700 hidden sm:inline flex-shrink-0">Comparing:</span>
                        <div className="flex items-center gap-3 overflow-x-auto">
                            {list.map(prop => (
                                <div key={prop.name} className="relative group flex-shrink-0">
                                    <img loading="lazy" src={prop.images[0]} alt={prop.name} className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                                    <button
                                        onClick={() => onRemove(prop)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                        aria-label={`Remove ${prop.name}`}
                                    >
                                        <CloseIcon className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                            onClick={onClear}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                            aria-label="Clear all"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onCompare}
                            disabled={list.length < 2}
                            className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
                        >
                            Compare ({list.length})
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ComparisonBar;