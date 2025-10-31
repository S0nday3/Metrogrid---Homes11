
import { useState, useEffect, useRef } from 'react';
import { propertiesData, Property } from './Properties';

/**
 * @file useSearch.ts
 * @description Custom hook to manage the state and logic for the hero section's search bar
 * with typeahead suggestions.
 */

const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Property[]>([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSuggestions([]);
            setIsSuggestionsVisible(false);
            return;
        }

        const filtered = propertiesData.filter(property =>
            property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);

        setSuggestions(filtered);
        setIsSuggestionsVisible(filtered.length > 0);

    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSuggestionsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSuggestionClick = (property: Property) => {
        setSearchTerm(property.name);
        setIsSuggestionsVisible(false);
    };

    return {
        searchTerm,
        setSearchTerm,
        suggestions,
        isSuggestionsVisible,
        setIsSuggestionsVisible,
        searchRef,
        handleSuggestionClick,
    };
};

export default useSearch;
