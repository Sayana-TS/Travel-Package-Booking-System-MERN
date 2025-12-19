import React, { useState, useMemo } from 'react';
import Breadcrumb from '../Components/Breadcrumb'; // Assumed component
import BookingTable from '../Components/BookingTable'; // New component
import BookingTabs from '../Components/BookingTabs'; // New component
import UserLayout from '../Layouts/UserLayout';

// --- Consolidated Dummy Data with Year Attribute ---
// We need the year to make the filter work. Assuming current year is 2024 for data separation.
const ALL_BOOKINGS = [
    // Upcoming Bookings (2024)
    { id: '#12345', package: 'Mountain Hiking Expedition', hotel: 'The Summit Lodge, Mountain View', dates: 'Aug 15-20, 2024', guests: 2, price: '$1,500', status: 'Confirmed', year: 2024, isUpcoming: true },
    { id: '#67890', package: 'Coastal Kayaking Adventure', hotel: 'Oceanfront Resort, Coastal City', dates: 'Sep 05-10, 2024', guests: 4, price: '$2,200', status: 'Confirmed', year: 2024, isUpcoming: true },
    { id: '#11223', package: 'Forest Trekking Retreat', hotel: 'Whispering Pines Inn, Forestville', dates: 'Oct 01-05, 2024', guests: 3, price: '$1,800', status: 'Pending', year: 2024, isUpcoming: true },
    
    // Past Bookings (2024) - These are completed/past within the same year
    { id: '#44556', package: 'Desert Safari Expedition', hotel: 'Oasis Camp, Sahara', dates: 'Mar 10-15, 2024', guests: 3, price: '$2,500', status: 'Completed', year: 2024, isUpcoming: false },
    { id: '#77889', package: 'Tropical Island Hopping', hotel: 'Beach Bungalow, Maui', dates: 'Jan 20-28, 2024', guests: 2, price: '$3,100', status: 'Completed', year: 2024, isUpcoming: false },
    
    // Older Past Booking (2023)
    { id: '#99001', package: 'City Cycling Tour', hotel: 'Downtown Hotel, NY', dates: 'Nov 05-07, 2023', guests: 1, price: '$550', status: 'Completed', year: 2023, isUpcoming: false },
    
    // Even Older Past Booking (2022)
    { id: '#00000', package: 'European Rail Tour', hotel: 'Various', dates: 'Jun 01-15, 2022', guests: 2, price: '$4,000', status: 'Completed', year: 2022, isUpcoming: false },
];

const BREADCRUMB_PATH = [
    { label: 'Home', href: '/' },
];

const AVAILABLE_YEARS = ['All Years', '2024', '2023', '2022'];
const CURRENT_YEAR = 2024; // Define the current operational year for filtering 'Upcoming'

// ===================================================================
// Main Component: BookingHistoryPage
// ===================================================================
const BookingHistoryPage = () => {
    
    const [activeTab, setActiveTab] = useState('upcoming');
    // Initialize filterYear to show all bookings by default
    const [filterYear, setFilterYear] = useState('All Years');

    // ----------------------------------------------------------------------
    // CORE FILTERING LOGIC (Handles both Tab and Year)
    // ----------------------------------------------------------------------
    const filteredBookings = useMemo(() => {
        let list = ALL_BOOKINGS;

        // 1. Filter by Active Tab (Upcoming vs. Past/Completed)
        if (activeTab === 'upcoming') {
            // Upcoming logic: Any booking where the year is >= CURRENT_YEAR and status is not Completed/Canceled
            list = list.filter(b => b.isUpcoming); 
        } else {
            // Past logic: Any booking that is Completed or in a past year
            list = list.filter(b => !b.isUpcoming);
        }
        
        // 2. Filter by Year selection
        if (filterYear !== 'All Years') {
            const selectedYearInt = parseInt(filterYear, 10);
            list = list.filter(b => b.year === selectedYearInt);
        }

        return list;
    }, [activeTab, filterYear]); // Recalculates whenever tab or year changes

    return (
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
                        
                        {/* Simplified Filter UI - removed the manual 'Filter' button */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="year-filter" className="text-sm text-gray-700 dark:text-gray-300">Filter:</label>
                            <div className="relative">
                                <select 
                                    id="year-filter"
                                    className="w-full rounded-md border-gray-200 bg-background-light py-2 pl-3 pr-8 text-sm text-gray-500 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-gray-400"
                                    value={filterYear}
                                    onChange={(e) => setFilterYear(e.target.value)}
                                >
                                    {AVAILABLE_YEARS.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
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