import React, { useState, useEffect } from 'react';
import TravelerFormCard from './TravelerFormCard'; // Adjust path if necessary
import SpecialRequests from './SpecialRequests'; // Adjust path if necessary

// Component to handle all left-side forms
const BookingDetailsForm = ({ data }) => {
    const { initialDates, numTravelers, setNumTravelers } = data;

    // State for local form fields (dates)
    const [travelDates, setTravelDates] = useState(initialDates);

    // State for generating traveler cards (controlled by parent state/prop)
    const travelerForms = Array.from({ length: numTravelers }, (_, index) => (
        <TravelerFormCard 
            key={index} // Key is essential for dynamic lists
            index={index + 1} 
            namePlaceholder={index === 0 ? "John Doe" : `Traveler ${index + 1} Full Name`}
            agePlaceholder={index === 0 ? "e.g. 35" : `e.g. 30`}
            // In a real app, you would pass a specific traveler object here
        />
    ));

    const handleTravelerChange = (e) => {
        const newCount = parseInt(e.target.value, 10);
        if (newCount > 0) {
            setNumTravelers(newCount); // Updates state in the parent (BookingPage)
        }
    };
    
    // In a real app, we would add logic here to check if the new number 
    // of travelers exceeds the maximum allowed by the package.

    return (
        <div className="space-y-6">
            
            {/* Booking Details (Now Editable Inputs) */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Booking Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="travel-dates">Travel Dates</label>
                        <input 
                            className="form-input w-full rounded-lg bg-white/5 dark:bg-white/5 p-3 text-sm text-white/80" 
                            id="travel-dates" 
                            type="text" 
                            value={travelDates}
                            onChange={(e) => setTravelDates(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="travelers">Number of Travelers</label>
                        <input 
                            className="form-input w-full rounded-lg bg-white/5 dark:bg-white/5 p-3 text-sm text-white/80" 
                            id="travelers" 
                            type="number" 
                            value={numTravelers}
                            onChange={handleTravelerChange} // New dynamic handler
                            min="1" // Ensure at least one traveler
                        />
                    </div>
                </div>
            </section>
            
            {/* Traveler Details Form (Dynamically Rendered) */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Traveler Details</h2>
                
                {/* Dynamic Traveler Cards */}
                {travelerForms}

                {/* Save Details Checkbox */}
                <div className="mt-4 flex items-center gap-3">
                    <input 
                        className="form-checkbox h-5 w-5 rounded bg-white/10 text-primary border-white/20 checked:bg-primary" 
                        id="save-details" 
                        type="checkbox" 
                    />
                    <label className="text-sm text-white/80" htmlFor="save-details">Save traveler details for future bookings</label>
                </div>
            </section>
            
            {/* Special Requests */}
            <SpecialRequests />
            
        </div>
    );
};

export default BookingDetailsForm;