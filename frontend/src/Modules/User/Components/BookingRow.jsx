import React from 'react';
import {Link, useNavigate} from 'react-router-dom'

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

const BookingRow = ({ booking, isUpcoming }) => {
    
    // Logic for Row Click: Generates URL for the generic package product page
    const getPackageDetailUrl = (packageName) => {
        // Simple slugging for demonstration (e.g., "Luxury Cruise" -> "luxury-cruise")
        const slug = packageName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
        return `/packageDetail`;
    };

    const handleRowClick = () => {
        // ROW CLICK: ALWAYS GOES TO GENERIC PACKAGE PRODUCT PAGE
        const url = getPackageDetailUrl(booking.package);
        
        console.log(`Row Click: Navigating to Package Detail: ${url}`);
        // In a real app, use React Router's navigate function here.
        window.location.href = url;
    };

    const navigate = useNavigate()

    // Handler to stop the row click event when clicking any action link
    const handleActionClick = (e) => {
        e.stopPropagation();
        console.log("Action Link Clicked. Row navigation prevented.");
    };

    // Check status for conditional rendering
    const isConfirmed = booking.status === 'Confirmed'; 

    

    return (
        <tr 
            className="hidden sm:table-row cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
            onClick={handleRowClick}
            key={booking.id}
        >
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{booking.id}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 dark:text-gray-200">{booking.package}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{booking.hotel}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{booking.dates}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{booking.guests}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{booking.price}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClasses(booking.status)}`}>
                    {booking.status}
                </span>
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                {isUpcoming ? (
                    <div className="flex items-center justify-end gap-3">
                        
                        {/* Action for PENDING bookings */}
                        {!isConfirmed && (
                            <>
                                <Link 
                                    to='/bookingDetail'
                                    className="text-primary hover:text-primary/80"  
                                    onClick={handleActionClick} 
                                >
                                    Modify
                                </Link>
                                <span className="text-gray-400 dark:text-gray-600">|</span>
                            </>
                        )}

                        {/* Action for CONFIRMED bookings */}
                        {isConfirmed && (
                            <>
                                <Link 
                                    to='/bookingDetail'
                                    className="text-primary hover:text-primary/80"  
                                    onClick={handleActionClick} 
                                >
                                    View/Manage
                                </Link>
                                <span className="text-gray-400 dark:text-gray-600">|</span>
                            </>
                        )}
                        
                        {/* ALWAYS SHOW CANCEL */}
                        <button 
                            className="text-red-500 hover:text-red-600" 
                            onClick={handleActionClick} 
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    // Action for PAST bookings
                    <Link 
                        to='/bookingDetail'
                        className="text-primary hover:text-primary/80"  
                        onClick={handleActionClick} // ACTION LINK: Must stop propagation
                    >
                        View Details
                    </Link>
                )}
            </td>
        </tr>
    );
};

export default BookingRow;