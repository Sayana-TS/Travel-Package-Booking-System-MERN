import React from 'react';
import { Link } from 'react-router-dom';

// Helper function to determine badge style based on status text
const getStatusBadgeClasses = (status) => {
    switch (status) {
        case 'Confirmed':
            return 'bg-primary/20 text-primary dark:bg-primary/30';
        case 'Pending':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'; 
        case 'Completed':
            return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const BookingCard = ({ booking, isUpcoming }) => {
    
    // Logic for Row Click: Generates URL for the generic package product page
    const getPackageDetailUrl = (packageName) => {
        const slug = packageName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
        return `/packageDetail`;
    };

    const handleRowClick = () => {
        // CARD CLICK: ALWAYS GOES TO GENERIC PACKAGE PRODUCT PAGE
        const url = getPackageDetailUrl(booking.package);
        
        console.log(`Card Click: Navigating to Package Detail: ${url}`);
        // In a real app, use React Router's navigate function here.
        window.location.href = url;
    };

    // Handler to stop the card click event when clicking any action link
    const handleActionClick = (e) => {
        e.stopPropagation();
        console.log("Action Link Clicked. Card navigation prevented.");
    };

    // Check status for conditional rendering
    const isConfirmed = booking.status === 'Confirmed'; 

    return (
        <div 
            key={`mobile-${booking.id}`} 
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-sm sm:hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={handleRowClick}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{booking.package}</h3>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClasses(booking.status)}`}>
                    {booking.status}
                </span>
            </div>
            
            <dl className="text-sm divide-y divide-gray-200 dark:divide-gray-800">
                <div className="flex justify-between py-2">
                    <dt className="font-medium text-gray-500 dark:text-gray-400">ID / Price</dt>
                    <dd className="text-gray-800 dark:text-gray-200">{booking.id} / {booking.price}</dd>
                </div>
                <div className="flex justify-between py-2">
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Dates</dt>
                    <dd className="text-gray-800 dark:text-gray-200">{booking.dates}</dd>
                </div>
                <div className="flex justify-between py-2">
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Hotel</dt>
                    <dd className="text-right max-w-[60%] text-gray-800 dark:text-gray-200">{booking.hotel}</dd>
                </div>
            </dl>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3 text-sm font-medium">
                {isUpcoming ? (
                    <>
                        {/* Action for PENDING bookings */}
                        {!isConfirmed && (
                            <>
                                <Link className="text-primary hover:text-primary/80" to='/bookingDetail' onClick={handleActionClick}>Modify</Link>
                                <span className="text-gray-400 dark:text-gray-600">|</span>
                            </>
                        )}

                        {/* Action for CONFIRMED bookings */}
                        {isConfirmed && (
                            <>
                                <Link className="text-primary hover:text-primary/80" to='/bookingDetail' onClick={handleActionClick}>View/Manage</Link>
                                <span className="text-gray-400 dark:text-gray-600">|</span>
                            </>
                        )}

                        {/* ALWAYS SHOW CANCEL */}
                        <button className="text-red-500 hover:text-red-600" href={`/cancel-booking/${booking.id}`} onClick={handleActionClick}>Cancel</button>
                    </>
                ) : (
                    // Action for PAST bookings
                    <Link className="text-primary hover:text-primary/80" to='/bookingDetail' onClick={handleActionClick}>View Details</Link>
                )}
            </div>
        </div>
    );
};

export default BookingCard;