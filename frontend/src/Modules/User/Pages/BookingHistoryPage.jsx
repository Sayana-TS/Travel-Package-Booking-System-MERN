import React, { useState, useMemo } from 'react';
import Breadcrumb from '../Components/Breadcrumb'; // Assumed component
import BookingTable from '../Components/BookingTable'; // New component
import BookingTabs from '../Components/BookingTabs'; // New component
import UserLayout from '../Layouts/UserLayout';

// --- Dummy Data ---
const UPCOMING_BOOKINGS = [
    { id: '#12345', package: 'Mountain Hiking Expedition', hotel: 'The Summit Lodge, Mountain View', dates: 'Aug 15-20, 2024', guests: 2, price: '$1,500', status: 'Confirmed' },
    { id: '#67890', package: 'Coastal Kayaking Adventure', hotel: 'Oceanfront Resort, Coastal City', dates: 'Sep 05-10, 2024', guests: 4, price: '$2,200', status: 'Confirmed' },
    { id: '#11223', package: 'Forest Trekking Retreat', hotel: 'Whispering Pines Inn, Forestville', dates: 'Oct 01-05, 2024', guests: 3, price: '$1,800', status: 'Pending' },
];

const PAST_BOOKINGS = [
    { id: '#44556', package: 'Desert Safari Expedition', hotel: 'Oasis Camp, Sahara', dates: 'Mar 10-15, 2024', guests: 3, price: '$2,500', status: 'Completed' },
    { id: '#77889', package: 'Tropical Island Hopping', hotel: 'Beach Bungalow, Maui', dates: 'Jan 20-28, 2024', guests: 2, price: '$3,100', status: 'Completed' },
    { id: '#99001', package: 'City Cycling Tour', hotel: 'Downtown Hotel, NY', dates: 'Nov 05-07, 2023', guests: 1, price: '$550', status: 'Completed' },
];

const BREADCRUMB_PATH = [
    { label: 'Home', href: '#' },
    { label: 'Profile', href: '#' },
];

// ===================================================================
// Main Component: BookingHistoryPage
// ===================================================================
const BookingHistoryPage = () => {
    // State to manage the active tab (upcoming or past)
    const [activeTab, setActiveTab] = useState('upcoming');
    
    // State for the year filter (optional, but good practice)
    const [filterYear, setFilterYear] = useState('2024');

    // Dynamically select the data based on the active tab
    const filteredBookings = useMemo(() => {
        return activeTab === 'upcoming' ? UPCOMING_BOOKINGS : PAST_BOOKINGS;
    }, [activeTab]);

    return (
        // The main wrapper that sits inside your UserLayout
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">
            <UserLayout>
            <main className="flex-1">
                <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb Section */}
                    <div className="mb-6">
                         <Breadcrumb 
                            path={BREADCRUMB_PATH} 
                            currentPage="Booking History"
                        />
                    </div>

                    {/* Header and Filters */}
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Your Bookings</h1>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <select 
                                    className="w-full rounded-md border-gray-200 bg-background-light py-2 pl-3 pr-8 text-sm text-gray-500 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-gray-400"
                                    value={filterYear}
                                    onChange={(e) => setFilterYear(e.target.value)}
                                >
                                    <option>2024</option>
                                    <option>2023</option>
                                    <option>2022</option>
                                </select>
                            </div>
                            <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Tab Navigation (The Toggles) */}
                    <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    
                    {/* Booking History Table */}
                    <BookingTable 
                        bookings={filteredBookings} 
                        isUpcoming={activeTab === 'upcoming'} 
                    />

                </div>
            </main>
            </UserLayout>
        </div>
    );
};

export default BookingHistoryPage;