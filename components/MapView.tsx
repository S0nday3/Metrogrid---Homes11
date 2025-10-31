import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from './Properties';
import { MapPinIcon } from './Icons';

interface MapViewProps {
    properties: Property[];
    onMarkerClick: (property: Property) => void;
}

const MapView: React.FC<MapViewProps> = ({ properties, onMarkerClick }) => {
    const [activeProperty, setActiveProperty] = useState<Property | null>(null);

    const bounds = useMemo(() => {
        if (properties.length === 0) {
            // Default bounds for Dhaka area if no properties
            return { minLat: 23.70, maxLat: 23.90, minLng: 90.35, maxLng: 90.45 };
        }
        const lats = properties.map(p => p.lat);
        const lngs = properties.map(p => p.lng);
        const padding = 0.01;
        return {
            minLat: Math.min(...lats) - padding,
            maxLat: Math.max(...lats) + padding,
            minLng: Math.min(...lngs) - padding,
            maxLng: Math.max(...lngs) + padding,
        };
    }, [properties]);

    const getPosition = (lat: number, lng: number) => {
        const top = 100 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
        const left = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
        return { top: `${top}%`, left: `${left}%` };
    };

    return (
        <div 
            className="w-full h-[600px] bg-gray-200 rounded-xl relative overflow-hidden" 
            style={{
                backgroundImage: 'url(https://picsum.photos/seed/mapbg/1200/800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            onClick={() => setActiveProperty(null)}
        >
            <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm"></div>
            {properties.map(prop => (
                <div key={prop.name} className="absolute transform -translate-x-1/2 -translate-y-full" style={getPosition(prop.lat, prop.lng)}>
                     <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveProperty(prop);
                        }}
                        className="relative z-10 transition-transform hover:scale-110 focus:outline-none"
                        aria-label={`View property: ${prop.name}`}
                    >
                         <MapPinIcon className="w-8 h-10 text-black drop-shadow-lg" />
                    </button>
                </div>
            ))}

            <AnimatePresence>
                {activeProperty && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bg-white rounded-lg shadow-xl w-64 overflow-hidden z-20 transform -translate-x-1/2"
                        style={{ ...getPosition(activeProperty.lat, activeProperty.lng), top: `calc(${getPosition(activeProperty.lat, activeProperty.lng).top} - 50px)` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={activeProperty.images[0]} alt={activeProperty.name} className="w-full h-32 object-cover"/>
                        <div className="p-3">
                            <h4 className="font-semibold text-gray-800 text-sm truncate">{activeProperty.name}</h4>
                            <p className="text-amber-600 font-bold text-sm mt-1">BDT {activeProperty.price}</p>
                            <button 
                                onClick={() => onMarkerClick(activeProperty)}
                                className="mt-2 w-full bg-amber-500 text-black font-bold px-3 py-1.5 rounded-md text-xs hover:bg-amber-600 transition"
                            >
                                View Details
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MapView;