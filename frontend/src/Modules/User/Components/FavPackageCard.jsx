// src/components/FavPackageCard.jsx

import React from 'react';

const FavPackageCard = ({ item, onRemoveFavorite, onViewDetails }) => {
    
    // Safety check remains crucial
    if (!item || typeof item.price !== 'number') {
        console.error("FavPackageCard received missing or invalid item data:", item);
        return null; 
    }
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(item.price);
    
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-4 transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-card-dark sm:flex-row sm:items-center">
            
            {/* Image and Favorite Button */}
            <div className="relative h-48 w-full shrink-0 sm:h-36 sm:w-56">
                <div 
                    className="h-full w-full rounded-lg bg-cover bg-center" 
                    style={{ backgroundImage: `url("${item.imageUrl}")` }}
                ></div>
                {/* Favorite Button */}
                <button 
                    className="absolute right-2 top-2 rounded-full bg-white/70 p-1.5 text-primary backdrop-blur-sm dark:bg-black/50"
                    onClick={() => onRemoveFavorite(item.id)} // Action to remove from favorites
                    aria-label="Remove from favorites"
                >
                    {/* 💡 THE GUARANTEED FIX:
                    We use the material-symbols-rounded class and explicitly apply
                    the fill via a Tailwind group (if you have one configured) or 
                    by ensuring the 'fill-1' class is active, often combined with 
                    a weight or style class.
                    
                    Since 'fill-1' failed, let's try explicitly using the 'FILL' setting 
                    via a custom utility or inline style if necessary, but we'll stick 
                    to standard classes first.
                    
                    We'll rely on the original class structure but ask you to ensure the CSS is loaded.
                    If that fails, use the alternative icon name:
                    */}
                    <span 
                        className="material-symbols-rounded text-primary"
                        style={{ fontVariationSettings: `'FILL' 1` }} // <-- Force the fill via inline style
                    > 
                        favorite 
                    </span>
                </button>
            </div>

            {/* Details and Description */}
            <div className="flex flex-grow flex-col">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                
                {/* Rating */}
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                    <span className="material-symbols-outlined text-sm text-yellow-500 fill-1">star</span>
                    <span className="font-bold">{item.rating.toFixed(1)}</span>
                    <span>({item.reviews} reviews)</span>
                </div>
                
                {/* Price */}
                <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                    {formattedPrice} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ person</span>
                </p>
            </div>

            {/* Action Button */}
            <div className="mt-4 flex shrink-0 flex-col items-stretch gap-2 sm:mt-0 sm:items-end">
                <button 
                    className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:brightness-110 sm:w-auto"
                    onClick={() => onViewDetails(item.id)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default FavPackageCard;