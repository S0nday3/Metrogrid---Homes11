
import React from 'react';
import Modal from './Modal';
import { BedIcon, BathIcon, AreaIcon } from './Icons';

interface Agent {
    name: string;
    img: string;
    phone: string;
}
interface Property {
    name: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    area: string;
    images: string[];
    description: string;
    amenities: string[];
    agent: Agent;
    status: 'For Sale' | 'Sold' | 'Off Market';
    lat: number;
    lng: number;
}

interface ComparisonModalProps {
    isOpen: boolean;
    onClose: () => void;
    properties: Property[];
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, properties }) => {
    if (!properties || properties.length === 0) {
        return null;
    }
    
    const allAmenities = [...new Set(properties.flatMap(p => p.amenities))].sort();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Property Comparison</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse text-left">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="p-4 font-semibold text-gray-600 sticky left-0 bg-white">Feature</th>
                                {properties.map(prop => (
                                    <th key={prop.name} className="p-4 text-center">
                                        <img loading="lazy" src={prop.images[0]} alt={prop.name} className="w-32 h-20 object-cover rounded-lg mx-auto mb-2 bg-gray-200" />
                                        <span className="font-semibold text-gray-800">{prop.name}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="p-4 font-medium text-gray-500 sticky left-0 bg-white">Price</td>
                                {properties.map(prop => <td key={prop.name} className="p-4 text-center font-bold text-amber-600">BDT {prop.price}</td>)}
                            </tr>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <td className="p-4 font-medium text-gray-500 sticky left-0 bg-gray-50">Location</td>
                                {properties.map(prop => <td key={prop.name} className="p-4 text-center text-sm text-gray-600">{prop.location}</td>)}
                            </tr>
                             <tr className="border-b border-gray-100">
                                <td className="p-4 font-medium text-gray-500 sticky left-0 bg-white">Details</td>
                                {properties.map(prop => (
                                    <td key={prop.name} className="p-4 text-center">
                                        <div className="flex justify-center items-center gap-3 text-sm text-gray-600">
                                            <div className="flex items-center"><BedIcon className="w-4 h-4 mr-1"/>{prop.beds}</div>
                                            <div className="flex items-center"><BathIcon className="w-4 h-4 mr-1"/>{prop.baths}</div>
                                            <div className="flex items-center"><AreaIcon className="w-4 h-4 mr-1"/>{prop.area}</div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr className="bg-gray-50">
                                <td colSpan={properties.length + 1} className="p-4 font-semibold text-gray-600 sticky left-0 bg-gray-50">Amenities</td>
                            </tr>
                            {allAmenities.map((amenity, index) => (
                                <tr key={amenity} className={`border-b border-gray-100`}>
                                    <td className={`p-4 pl-8 text-sm text-gray-600 sticky left-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>{amenity}</td>
                                    {properties.map(prop => (
                                        <td key={prop.name} className={`p-4 text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            {prop.amenities.includes(amenity) ? (
                                                <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            ) : (
                                                <span className="text-gray-400 text-lg">&ndash;</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
};

export default ComparisonModal;