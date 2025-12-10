import React from 'react';

const TravelerFormCard = ({ index, namePlaceholder, agePlaceholder }) => (
    <div className="p-4 rounded-lg bg-white/5 dark:bg-white/5 space-y-4">
        <h3 className="font-semibold">Traveler {index} {index === 1 ? '(Lead Traveler)' : ''}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-white/80 mb-2" htmlFor={`traveler${index}-name`}>Full Name</label>
                <input 
                    className="form-input w-full rounded-lg bg-white/10 dark:bg-white/10 p-3 text-sm text-white/80" 
                    id={`traveler${index}-name`} 
                    placeholder={namePlaceholder} 
                    type="text" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-white/80 mb-2" htmlFor={`traveler${index}-age`}>Age</label>
                <input 
                    className="form-input w-full rounded-lg bg-white/10 dark:bg-white/10 p-3 text-sm text-white/80" 
                    id={`traveler${index}-age`} 
                    placeholder={agePlaceholder} 
                    type="number" 
                />
            </div>
            <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2" htmlFor={`traveler${index}-contact`}>Contact Info</label>
                <input 
                    className="form-input w-full rounded-lg bg-white/10 dark:bg-white/10 p-3 text-sm text-white/80" 
                    id={`traveler${index}-contact`} 
                    placeholder="Email or Phone Number" 
                    type="text" 
                />
            </div>
        </div>
    </div>
);

export default TravelerFormCard;