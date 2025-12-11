import React from 'react';
import BookingRow from './BookingRow';
import BookingCard from './BookingCard'; 
// Assuming BookingRow and BookingCard are imported from their respective files

const BookingTable = ({ bookings, isUpcoming }) => {
    if (bookings.length === 0) {
        return (
            <div className="mt-8 p-6 text-center bg-background-light dark:bg-gray-900/50 rounded-lg shadow-sm text-gray-500 dark:text-gray-400">
                No {isUpcoming ? 'upcoming' : 'past'} bookings found.
            </div>
        );
    }

    return (
        <div className="mt-8 flow-root">
            {/* FIX: Removed complex negative margins and padding wrappers.
              We use the standard layout padding from the main page (mx-auto max-w-7xl px-4)
              and ensure the table itself handles overflow.
            */}
            
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden sm:block">
                <div className="rounded-lg shadow-sm ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10">
                    {/* The horizontal scroll is applied directly to the container holding the table */}
                    <div className="overflow-x-auto"> 
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Booking ID</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Package</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Hotel</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Dates</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Guests</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Price</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-background-light dark:divide-gray-800 dark:bg-background-dark">
                                {bookings.map((booking) => (
                                    <BookingRow key={booking.id} booking={booking} isUpcoming={isUpcoming} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Mobile Card List View (Visible on mobile) */}
            <div className="sm:hidden space-y-4">
                {bookings.map((booking) => (
                     <BookingCard key={booking.id} booking={booking} isUpcoming={isUpcoming} />
                ))}
            </div>

        </div>
    );
};

export default BookingTable;