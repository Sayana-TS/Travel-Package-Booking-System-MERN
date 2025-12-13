import React, { useState, useRef, useEffect } from 'react';

const SORT_OPTIONS = [
    { label: 'Price (Low to High)', value: 'price_asc' },
    { label: 'Price (High to Low)', value: 'price_desc' },
    { label: 'Rating (Highest First)', value: 'rating_desc' },
];

const SortDropdown = ({ currentSort, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (value) => {
        onSortChange(value);
        setIsOpen(false);
    };

    // Find the currently selected label for display in the button
    const currentLabel = SORT_OPTIONS.find(option => option.value === currentSort)?.label || 'Price (Low to High)';

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button 
                className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-background-dark/50 dark:text-gray-300 dark:hover:bg-background-dark transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="material-symbols-outlined text-base"> sort </span>
                <span>Sort by: {currentLabel}</span>
                <span className={`material-symbols-outlined text-base transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}> 
                    expand_more 
                </span>
            </button>
            
            {/* Dropdown Menu */}
            {isOpen && (
                <div 
                    className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-card-dark dark:ring-white/10"
                    role="menu" 
                    aria-orientation="vertical" 
                >
                    <div className="py-1">
                        {SORT_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                                    currentSort === option.value
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light font-semibold'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-background-dark/80'
                                }`}
                                role="menuitem"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;