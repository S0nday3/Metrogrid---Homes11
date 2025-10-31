
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationPinIcon, BedIcon, BathIcon, AreaIcon, SpinnerIcon, PlusIcon, CheckIcon, ChevronDownIcon, MapIcon, ListIcon, FilterClearIcon, CloseIcon } from './Icons';
import Modal from './Modal';
import AgentProfile from './AgentProfile';
import ComparisonBar from './ComparisonBar';
import ComparisonModal from './ComparisonModal';
import ImageCarousel from './ImageCarousel';
import PriceRangeSlider from './PriceRangeSlider';
import MapView from './MapView';
import PropertyCardImageCarousel from './PropertyCardImageCarousel';

interface Agent {
    name: string;
    img: string;
    phone: string;
}

export interface Property {
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
    type: 'Apartment' | 'Villa' | 'Residence';
    lat: number;
    lng: number;
}

export const propertiesData: Property[] = [
    { name: 'Skyper Pool Apartment', location: 'Road 12, Dhanmondi, Dhaka', price: '150000000', beds: 4, baths: 4, area: '230 ft²', images: ['https://picsum.photos/seed/property1/800/600', 'https://picsum.photos/seed/property1a/800/600', 'https://picsum.photos/seed/property1b/800/600'], description: 'A luxurious apartment with a stunning city view and a private sky pool. This modern residence offers spacious living areas, state-of-the-art facilities, and premium finishes. Perfect for families seeking comfort and elegance.', amenities: ['Private Pool', 'Gymnasium', '24/7 Security', 'Parking Space', 'Rooftop Garden'], agent: { name: 'Jasmine Kaur', img: 'https://picsum.photos/seed/agent1/100/100', phone: '+880 1819 427 078' }, status: 'For Sale', type: 'Apartment', lat: 23.7461, lng: 90.3742 },
    { name: 'Cedar Residence', location: 'Road 12, Uttara, Dhaka', price: '120000000', beds: 2, baths: 2, area: '180 ft²', images: ['https://picsum.photos/seed/property2/800/600', 'https://picsum.photos/seed/property2a/800/600', 'https://picsum.photos/seed/property2b/800/600'], description: 'Cozy and modern, Cedar Residence is located in a prime residential area. It features an open-plan living space, a balcony with a garden view, and access to community facilities. Ideal for small families or professionals.', amenities: ['Community Hall', 'Playground', 'Intercom', 'Lift Access', 'Gymnasium'], agent: { name: 'Rahim Ahmed', img: 'https://picsum.photos/seed/agent2/100/100', phone: '+880 1819 427 079' }, status: 'Sold', type: 'Residence', lat: 23.8759, lng: 90.3795 },
    { name: 'Lakeside Apartment', location: 'Road 12, Dhanmondi, Dhaka', price: '180000000', beds: 3, baths: 3, area: '360 ft²', images: ['https://picsum.photos/seed/property3/800/600', 'https://picsum.photos/seed/property3a/800/600', 'https://picsum.photos/seed/property3b/800/600'], description: 'Enjoy serene lake views from this beautiful apartment. It offers a blend of comfort and style with spacious rooms, modern kitchen, and large windows that allow for plenty of natural light. A perfect retreat from the bustling city.', amenities: ['Lake View', 'Modern Kitchen', 'Balcony', 'Reserved Parking', '24/7 Security'], agent: { name: 'Anika Chowdhury', img: 'https://picsum.photos/seed/agent3/100/100', phone: '+880 1819 427 080' }, status: 'For Sale', type: 'Apartment', lat: 23.7522, lng: 90.3750 },
    { name: 'Modern Villa', location: 'Road 1, Gulshan, Dhaka', price: '250000000', beds: 5, baths: 5, area: '500 ft²', images: ['https://picsum.photos/seed/property4/800/600', 'https://picsum.photos/seed/property4a/800/600', 'https://picsum.photos/seed/property4b/800/600'], description: 'An architectural masterpiece, this modern villa in Gulshan boasts expansive living spaces, a private lawn, and top-of-the-line fixtures. Experience unparalleled luxury and privacy in one of Dhaka’s most prestigious neighborhoods.', amenities: ['Private Garden', 'Swimming Pool', 'Home Theater', 'Servant Quarters', 'Private Pool', 'Parking Space'], agent: { name: 'David Lee', img: 'https://picsum.photos/seed/agent4/100/100', phone: '+880 1819 427 081' }, status: 'Off Market', type: 'Villa', lat: 23.7925, lng: 90.4078 }
];

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const MAX_COMPARE = 3;

const statusStyles = {
    'For Sale': 'bg-green-500 text-white',
    'Sold': 'bg-red-500 text-white',
    'Off Market': 'bg-yellow-500 text-gray-800',
};

const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/,/g, ''), 10);
const formatPrice = (price: number) => `BDT ${price.toLocaleString()}`;

const bedOptions = ['any', '2', '3', '4', '5+'];
const bathOptions = ['any', '2', '3', '4', '5+'];

interface ActiveFilterPill {
    id: string;
    label: string;
    onRemove: () => void;
}

const Properties: React.FC = () => {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const { MIN_PRICE, MAX_PRICE, allAmenities, allTypes } = useMemo(() => {
        const prices = propertiesData.map(p => parsePrice(p.price));
        const amenities = new Set<string>();
        const types = new Set<Property['type']>();
        propertiesData.forEach(p => {
            p.amenities.forEach(a => amenities.add(a));
            types.add(p.type);
        });
        return { 
            MIN_PRICE: Math.min(...prices), 
            MAX_PRICE: Math.max(...prices),
            allAmenities: Array.from(amenities).sort(),
            allTypes: ['any', ...Array.from(types).sort()]
        };
    }, []);
    
    const initialFilters = useMemo(() => ({
        priceRange: [MIN_PRICE, MAX_PRICE] as [number, number],
        beds: 'any',
        baths: 'any',
        type: 'any',
        amenities: [] as string[],
    }), [MIN_PRICE, MAX_PRICE]);

    const [filters, setFilters] = useState(initialFilters);
    const [tempFilters, setTempFilters] = useState({ priceRange: filters.priceRange, amenities: filters.amenities });
    
    const [view, setView] = useState<'list' | 'map'>('list');
    const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isMobileFilterModalOpen, setIsMobileFilterModalOpen] = useState(false);
    
    const filterButtonRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const [displayedProperties, setDisplayedProperties] = useState<Property[]>(propertiesData);
    const [isLoading, setIsLoading] = useState(false);
    const [comparisonList, setComparisonList] = useState<Property[]>([]);
    const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const handleFilterChange = (name: string, value: string | string[] | [number, number]) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };
    
    const handleClearFilters = () => {
        setFilters(initialFilters);
        setTempFilters({ priceRange: initialFilters.priceRange, amenities: initialFilters.amenities });
        if (isFilterPopoverOpen) setIsFilterPopoverOpen(false);
        if (isMobileFilterModalOpen) setIsMobileFilterModalOpen(false);
    };

    const handleApplyAdvancedFilters = () => {
        setFilters(prev => ({ ...prev, ...tempFilters }));
        setIsFilterPopoverOpen(false);
        setIsMobileFilterModalOpen(false);
    };

    // Close popover on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
                filterButtonRef.current && !filterButtonRef.current.contains(event.target as Node)
            ) {
                setIsFilterPopoverOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const newFilteredProperties = propertiesData.filter(property => {
                const price = parsePrice(property.price);
                if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
                if (filters.type !== 'any' && property.type !== filters.type) return false;
                if (filters.beds !== 'any') {
                    if (filters.beds.includes('+')) {
                        if (property.beds < parseInt(filters.beds, 10)) return false;
                    } else {
                        if (property.beds !== parseInt(filters.beds, 10)) return false;
                    }
                }
                if (filters.baths !== 'any') {
                     if (filters.baths.includes('+')) {
                        if (property.baths < parseInt(filters.baths, 10)) return false;
                    } else {
                        if (property.baths !== parseInt(filters.baths, 10)) return false;
                    }
                }
                if (filters.amenities.length > 0) {
                    if (!filters.amenities.every(amenity => property.amenities.includes(amenity))) {
                        return false;
                    }
                }
                return true;
            });

            setDisplayedProperties(newFilteredProperties);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [filters]);

    const activeFilters: ActiveFilterPill[] = useMemo(() => {
        const pills: ActiveFilterPill[] = [];

        if (filters.type !== 'any') {
            pills.push({ id: 'type', label: `Type: ${filters.type}`, onRemove: () => handleFilterChange('type', 'any') });
        }
        if (filters.beds !== 'any') {
            pills.push({ id: 'beds', label: `Beds: ${filters.beds}`, onRemove: () => handleFilterChange('beds', 'any') });
        }
        if (filters.baths !== 'any') {
            pills.push({ id: 'baths', label: `Baths: ${filters.baths}`, onRemove: () => handleFilterChange('baths', 'any') });
        }
        if (filters.priceRange[0] !== MIN_PRICE || filters.priceRange[1] !== MAX_PRICE) {
            pills.push({ id: 'price', label: `Price: ${formatPrice(filters.priceRange[0])} - ${formatPrice(filters.priceRange[1])}`, onRemove: () => handleFilterChange('priceRange', [MIN_PRICE, MAX_PRICE]) });
        }
        filters.amenities.forEach(amenity => {
            pills.push({ id: `amenity-${amenity}`, label: amenity, onRemove: () => handleFilterChange('amenities', filters.amenities.filter(a => a !== amenity)) });
        });

        return pills;
    }, [filters, MIN_PRICE, MAX_PRICE]);

    const advancedFilterCount = useMemo(() => {
        let count = 0;
        if (filters.priceRange[0] !== MIN_PRICE || filters.priceRange[1] !== MAX_PRICE) count++;
        count += filters.amenities.length;
        return count;
    }, [filters, MIN_PRICE, MAX_PRICE]);


    const handleToggleCompare = (property: Property, e: React.MouseEvent) => {
        e.stopPropagation();
        setComparisonList(prev => {
            const isInList = prev.some(p => p.name === property.name);
            if (isInList) {
                return prev.filter(p => p.name !== property.name);
            }
            if (prev.length < MAX_COMPARE) {
                return [...prev, property];
            }
            alert(`You can only compare up to ${MAX_COMPARE} properties.`);
            return prev;
        });
    };

    const handleClearCompare = () => setComparisonList([]);
    const handleOpenCompareModal = () => {
        if (comparisonList.length > 1) {
            setIsComparisonModalOpen(true);
        }
    };
    const handleRemoveFromCompare = (property: Property) => {
        setComparisonList(prev => prev.filter(p => p.name !== property.name));
    };

    return (
        <section className="bg-white rounded-2xl shadow-sm px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
            <motion.div 
                className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Discover Your Perfect Property Match</h2>
                </div>
                <div className="p-1 bg-gray-200 rounded-lg flex items-center self-start md:self-auto">
                     <button onClick={() => setView('list')} className={`px-3 py-1.5 text-sm font-semibold rounded-md flex items-center gap-2 transition-colors ${view === 'list' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-black'}`} aria-pressed={view === 'list'}>
                        <ListIcon className="w-5 h-5"/>
                        List
                    </button>
                    <button onClick={() => setView('map')} className={`px-3 py-1.5 text-sm font-semibold rounded-md flex items-center gap-2 transition-colors ${view === 'map' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-black'}`} aria-pressed={view === 'map'}>
                        <MapIcon className="w-5 h-5"/>
                        Map
                    </button>
                </div>
            </motion.div>

            {/* New Filter System */}
            <motion.div
                className="mb-6 space-y-4"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
                {/* Main Filters */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <div className="flex items-center border border-gray-300 rounded-lg p-1 space-x-1">
                        {allTypes.map(type => (
                            <button key={type} onClick={() => handleFilterChange('type', type)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors capitalize ${filters.type === type ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                     <div className="flex items-center border border-gray-300 rounded-lg p-1 space-x-1">
                        <span className="text-sm font-semibold text-gray-700 pl-2">Beds:</span>
                        {bedOptions.map(opt => (
                            <button key={`bed-${opt}`} onClick={() => handleFilterChange('beds', opt)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors capitalize ${filters.beds === opt ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-1 space-x-1">
                         <span className="text-sm font-semibold text-gray-700 pl-2">Baths:</span>
                         {bathOptions.map(opt => (
                            <button key={`bath-${opt}`} onClick={() => handleFilterChange('baths', opt)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors capitalize ${filters.baths === opt ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <button
                            ref={filterButtonRef}
                            onClick={() => {
                                if (isMobileView) {
                                    setTempFilters({ priceRange: filters.priceRange, amenities: filters.amenities });
                                    setIsMobileFilterModalOpen(true);
                                } else {
                                    setIsFilterPopoverOpen(prev => !prev);
                                }
                            }}
                            className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                        >
                            All Filters 
                            {advancedFilterCount > 0 && <span className="bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{advancedFilterCount}</span>}
                            <ChevronDownIcon className="w-4 h-4" />
                        </button>
                        <AnimatePresence>
                        {!isMobileView && isFilterPopoverOpen && (
                            <motion.div
                                ref={popoverRef}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border z-20 p-4"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                        <PriceRangeSlider min={MIN_PRICE} max={MAX_PRICE} values={tempFilters.priceRange} onChange={(newVal) => setTempFilters(p => ({ ...p, priceRange: newVal }))} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">Amenities</h4>
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                            {allAmenities.map(amenity => (
                                                <label key={amenity} className="flex items-center space-x-3 cursor-pointer group">
                                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex-shrink-0 flex items-center justify-center transition-colors group-hover:border-black">
                                                         <AnimatePresence>
                                                            {tempFilters.amenities.includes(amenity) && (
                                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                                    <CheckIcon className="w-3.5 h-3.5 text-black" />
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                    <input type="checkbox" className="sr-only" checked={tempFilters.amenities.includes(amenity)} onChange={() => setTempFilters(p => ({ ...p, amenities: p.amenities.includes(amenity) ? p.amenities.filter(a => a !== amenity) : [...p.amenities, amenity]}))} />
                                                    <span className="text-sm text-gray-700 select-none">{amenity}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                                    <button onClick={() => setTempFilters({ priceRange: initialFilters.priceRange, amenities: initialFilters.amenities })} className="text-sm font-semibold text-gray-600 hover:text-black">Clear</button>
                                    <button onClick={handleApplyAdvancedFilters} className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">Apply</button>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Active Filter Pills */}
                {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t">
                    <AnimatePresence>
                        {activeFilters.map(pill => (
                            <motion.div key={pill.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
                                <div className="flex items-center gap-1 bg-gray-100 text-gray-700 rounded-full pl-4 pr-2 py-1.5 text-base sm:pl-3 sm:pr-1 sm:py-1 sm:text-sm font-medium">
                                    <span>{pill.label}</span>
                                    <button onClick={pill.onRemove} className="p-1.5 sm:p-1 rounded-full hover:bg-gray-300 transition">
                                        <CloseIcon className="w-4 h-4 sm:w-3 sm:h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <button onClick={handleClearFilters} className="flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 ml-2">
                        <FilterClearIcon className="w-4 h-4 mr-1" /> Clear All
                    </button>
                </div>
                )}
            </motion.div>


            <div id="property-list-container" className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    {view === 'list' ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isLoading && (
                                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                                    <SpinnerIcon className="w-8 h-8 text-black" />
                                </div>
                            )}
                            <AnimatePresence>
                                {displayedProperties.length > 0 ? (
                                    <motion.div
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {displayedProperties.map((property) => (
                                            <motion.div
                                                key={property.name}
                                                className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer group"
                                                onClick={() => setSelectedProperty(property)}
                                                variants={itemVariants}
                                                layout
                                            >
                                                <div className="relative">
                                                    <PropertyCardImageCarousel images={property.images} alt={property.name} />
                                                    <div className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[property.status]}`}>
                                                        {property.status}
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <p className="font-bold text-amber-600">{formatPrice(parsePrice(property.price))}</p>
                                                    <h3 className="font-semibold text-lg truncate mt-1 text-gray-800 group-hover:text-black transition-colors">{property.name}</h3>
                                                    <div className="flex items-center text-gray-500 mt-1">
                                                        <LocationPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                                        <p className="text-sm truncate">{property.location}</p>
                                                    </div>
                                                    <div className="flex items-center text-gray-500 mt-4 space-x-4 border-t pt-4">
                                                        <div className="flex items-center"><BedIcon className="w-5 h-5 mr-1.5" />{property.beds}</div>
                                                        <div className="flex items-center"><BathIcon className="w-5 h-5 mr-1.5" />{property.baths}</div>
                                                        <div className="flex items-center"><AreaIcon className="w-5 h-5 mr-1.5" />{property.area}</div>
                                                    </div>
                                                    <button
                                                        onClick={(e) => handleToggleCompare(property, e)}
                                                        className={`mt-4 w-full p-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${comparisonList.some(p => p.name === property.name) ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                                    >
                                                        {comparisonList.some(p => p.name === property.name) ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                                                        {comparisonList.some(p => p.name === property.name) ? 'Added to Compare' : 'Add to Compare'}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-16"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-700">No Properties Found</h3>
                                        <p className="text-gray-500 mt-2">Try adjusting your filters to find your perfect match.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MapView properties={displayedProperties} onMarkerClick={setSelectedProperty} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Modal isOpen={!!selectedProperty} onClose={() => setSelectedProperty(null)}>
                {selectedProperty && (
                    <div>
                        <ImageCarousel images={selectedProperty.images} />
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">{selectedProperty.name}</h3>
                                    <div className="flex items-center text-gray-500 mt-1">
                                        <LocationPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                        <p className="text-sm">{selectedProperty.location}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[selectedProperty.status]}`}>
                                    {selectedProperty.status}
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-amber-600 mt-4">{formatPrice(parsePrice(selectedProperty.price))}</p>
                            <div className="flex items-center text-gray-600 mt-4 space-x-6 border-t border-b py-4">
                                <div className="text-center">
                                    <BedIcon className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                                    <span className="text-sm font-medium">{selectedProperty.beds} Beds</span>
                                </div>
                                <div className="text-center">
                                    <BathIcon className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                                    <span className="text-sm font-medium">{selectedProperty.baths} Baths</span>
                                </div>
                                <div className="text-center">
                                    <AreaIcon className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                                    <span className="text-sm font-medium">{selectedProperty.area}</span>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{selectedProperty.description}</p>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-800 mb-3">Amenities</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProperty.amenities.map(amenity => (
                                        <span key={amenity} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">{amenity}</span>
                                    ))}
                                </div>
                            </div>
                            <AgentProfile agent={selectedProperty.agent} />
                        </div>
                    </div>
                )}
            </Modal>
            
            {/* Mobile Filter Modal */}
            <AnimatePresence>
                {isMobileView && isMobileFilterModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-[60] flex flex-col justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileFilterModalOpen(false)}
                    >
                        <motion.div
                            className="bg-white rounded-t-2xl shadow-xl w-full max-h-[85vh] flex flex-col"
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "100%" }}
                            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b flex justify-between items-center flex-shrink-0 sticky top-0 bg-white z-10">
                                <h3 className="font-bold text-lg">All Filters</h3>
                                <button 
                                    onClick={() => setIsMobileFilterModalOpen(false)} 
                                    className="p-2 rounded-full hover:bg-gray-100 transition"
                                    aria-label="Close filters"
                                >
                                    <CloseIcon className="w-5 h-5"/>
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-8 overflow-y-auto flex-1">
                                <div>
                                    <label className="block text-base font-medium text-gray-700 mb-2">Price Range</label>
                                    <PriceRangeSlider min={MIN_PRICE} max={MAX_PRICE} values={tempFilters.priceRange} onChange={(newVal) => setTempFilters(p => ({ ...p, priceRange: newVal }))} />
                                </div>
                                <div>
                                    <h4 className="text-base font-medium text-gray-700 mb-3">Amenities</h4>
                                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                        {allAmenities.map(amenity => (
                                            <label key={amenity} className="flex items-center space-x-3 cursor-pointer group">
                                                <div className="w-6 h-6 border-2 border-gray-300 rounded-md flex-shrink-0 flex items-center justify-center transition-colors group-hover:border-black">
                                                     <AnimatePresence>
                                                        {tempFilters.amenities.includes(amenity) && (
                                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                                <CheckIcon className="w-4 h-4 text-black" />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                                <input type="checkbox" className="sr-only" checked={tempFilters.amenities.includes(amenity)} onChange={() => setTempFilters(p => ({ ...p, amenities: p.amenities.includes(amenity) ? p.amenities.filter(a => a !== amenity) : [...p.amenities, amenity]}))} />
                                                <span className="text-base text-gray-700 select-none">{amenity}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t flex justify-between items-center sticky bottom-0 bg-white z-10 flex-shrink-0">
                                 <button 
                                    onClick={() => setTempFilters({ priceRange: initialFilters.priceRange, amenities: initialFilters.amenities })} 
                                    className="text-base font-semibold text-gray-600 hover:text-black px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Clear
                                </button>
                                <button 
                                    onClick={handleApplyAdvancedFilters} 
                                    className="bg-black text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-gray-800 transition"
                                >
                                    Show Results
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ComparisonBar
                list={comparisonList}
                onClear={handleClearCompare}
                onCompare={handleOpenCompareModal}
                onRemove={handleRemoveFromCompare}
            />

            <ComparisonModal
                isOpen={isComparisonModalOpen}
                onClose={() => setIsComparisonModalOpen(false)}
                properties={comparisonList}
            />
        </section>
    );
};

export default Properties;
