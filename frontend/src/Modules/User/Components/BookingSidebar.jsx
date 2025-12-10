import React from 'react';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';

// Convert to a function component that can use hooks
const BookingSidebar = ({ price, rating, reviewCount}) => { 
    // Initialize the hook
    const navigate = useNavigate();

    // Define the handler function for the button click
    const handleBookNow = (e) => {
        // Prevent the default form submission (page reload)
        e.preventDefault(); 
        
        // --- Logic to get form values goes here ---
        // const numTravelers = document.getElementById('travelers').value;
        // const selectedDates = document.getElementById('dates').value;

        // Navigate to the full booking confirmation page (BookingPage)
        // You would typically pass the selected data as state or query params.
        navigate('/booking', {
            state: {
                // Example state data you might pass:
                // travelers: numTravelers, 
                // dates: selectedDates 
            }
        });
    };

    return (
        <div className="sticky top-8 bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg">
            <p className="text-3xl font-bold mb-1">
                ${price} <span className="text-base font-normal text-subtext-dark">/ person</span>
            </p>
            <StarRating rating={rating} reviewCount={reviewCount} />

            {/* Attach onSubmit to the form, or onClick to the button */}
            <form className="space-y-4 mt-4" onSubmit={handleBookNow}>
                <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="travelers">
                        Travelers
                    </label>
                    <select
                        className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2 focus:ring-primary focus:border-primary transition-colors"
                        id="travelers"
                        defaultValue="2 Travelers"
                    >
                        <option>2 Travelers</option>
                        <option>3 Travelers</option>
                        <option>4 Travelers</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1" htmlFor="dates">
                        Dates
                    </label>
                    <input
                        className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2 focus:ring-primary focus:border-primary transition-colors"
                        id="dates"
                        type="date"
                    />
                </div>
                
                {/* When the form submits, handleBookNow will be called */}
                <button
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                    type="submit"
                >
                    Book Now
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-primary">Cancellation & Refund Policy</p>
                <p className="text-xs text-subtext-dark mt-1">
                    Free cancellation up to 30 days before travel. 50% refund for cancellations within 15-30 days.
                </p>
            </div>
        </div>
    );
};

export default BookingSidebar;