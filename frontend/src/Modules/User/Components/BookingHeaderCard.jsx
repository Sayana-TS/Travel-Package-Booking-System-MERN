import React from 'react';

// Helper component for the Status Badge (Updated with new color theme)
const BookingStatusBadge = ({ status }) => {
    let classes = '';
    switch (status) {
        case 'Confirmed':
            // Using primary color for confirmed status
            classes = 'bg-primary/20 text-primary';
            break;
        case 'Pending':
            // Using a standard amber for pending
            classes = 'bg-amber-500/20 text-amber-500';
            break;
        case 'Completed':
            // Using a standard green for completed
            classes = 'bg-green-500/20 text-green-500';
            break;
        default:
            classes = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
    return (
        <div className={`rounded-full px-3 py-1 text-sm font-medium ${classes}`}>
            {status}
        </div>
    );
};

// Component to display the key facts (Hotel, Dates, Travelers)
const FactItem = ({ title, primaryText, secondaryText }) => (
    <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500 dark:text-subtext-dark">
            {title}
        </p>
        <p className="font-semibold text-gray-900 dark:text-gray-100">
            {primaryText}
        </p>
        {secondaryText && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {secondaryText}
            </p>
        )}
    </div>
);


const BookingHeaderCard = ({ booking }) => {
    return (
        <div className="mb-8 overflow-hidden rounded-xl border border-primary/30 bg-white dark:border-white/10 dark:bg-card-dark">
            {/* Header Section (Title & Status) */}
            <div className="p-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {booking.package}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-subtext-dark">
                            Booking ID: {booking.id}
                        </p>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                </div>
            </div>

            {/* Key Facts Grid */}
            <div className="grid gap-6 border-t border-gray-200/50 p-6 md:grid-cols-2 lg:grid-cols-3 dark:border-white/10">
                <FactItem
                    title="Hotel"
                    primaryText={booking.hotel.name}
                    secondaryText={booking.hotel.address}
                />
                <FactItem
                    title="Travel Dates"
                    primaryText={booking.dates}
                />
                <FactItem
                    title="Travelers"
                    primaryText={booking.guests}
                />
            </div>
        </div>
    );
};

export default BookingHeaderCard;