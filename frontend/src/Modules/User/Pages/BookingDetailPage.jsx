import React from 'react';
import UserLayout from '../Layouts/UserLayout'; // Assuming existence
import Breadcrumb from '../../../Shared/Components/Breadcrumb'; // Assuming existence
import BookingHeaderCard from '../Components/BookingHeaderCard';
import PriceBreakdownCard from '../Components/PriceBreakdownCard';
import ReviewCard from '../Components/ReviewCard';
import ActionPanel from '../Components/ActionPanel';

// --- Consolidated Data Mockup matching HTML content ---
const DUMMY_BOOKING = {
    id: '#1234567890',
    package: 'Mountain Hiking Adventure',
    status: 'Completed', 
    
    // Header Card Data
    hotel: { 
        name: 'The Grand Summit Lodge', 
        address: '123 Summit Trail, Mountain View, CA 94043' 
    },
    dates: 'July 15 - 20, 2024',
    guests: '2 Adults',
    
    // Traveler Details
    travelers: {
        primaryName: 'John Doe',
        secondaryName: 'Jane Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
    },
    
    // Notes
    notes: `"We would appreciate a room with a mountain view if possible. Also, please note a nut allergy for Jane Doe."`,
    
    // Price Breakdown Data
    pricing: {
        basePrice: 1500.00,
        taxesFees: 150.00,
        totalPrice: 1650.00,
    },
    
    // Review Data (for the package)
    review: {
        rating: 4.5,
        comment: `"An unforgettable experience! The views were breathtaking and the guide was very knowledgeable. The lodge was cozy and comfortable. Highly recommend this adventure to any nature lover!"`,
        reviewer: {
            name: 'John Doe',
            date: 'July 22, 2024',
            avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwZ6X_ZXnqm5XwfsaSQjFAGGWgloVgFEYnxE2lZM64XDS6M0yR5Z4WTDe7NtypVMK7kP_63sqG27Iim_PML9BKqnOH6wcyPcQA_J4AttRB9wpw3-CS2adQ7ScKB-8QWJjKuvgs33un-WCb6NRfJB1RIeo7TzezPMdppRaJGGPkyLX33ZSx0DQVDXuDey6My3ddcHtYfw2HAS952HNStN7QfU-fxpPqOVpqU7vqu_c3qvWYOYXg3mGfKo5FDM9iQ324wtZiaQGJZPk",
        },
    }
};

const BREADCRUMB_PATH = [
    { label: 'Home', href: '/' },
    { label: 'Booking History', href: '/bookingHistory' },
];

// ===================================================================
// Main Component: BookingDetailPage
// ===================================================================

const BookingDetailPage = () => {
    const booking = DUMMY_BOOKING;
    
    // Current Page Breadcrumb
    const currentPageBreadcrumb = [
        ...BREADCRUMB_PATH,
    ];

    // Helper component for content cards
    const ContentCard = ({ title, children }) => (
        <div className="overflow-hidden rounded-xl border border-primary/30 bg-white dark:border-white/10 dark:bg-card-dark">
            <div className="border-b border-gray-200/50 p-6 dark:border-white/10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
    
    return (
        // The main wrapper that sits inside your UserLayout
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">
            <UserLayout>
                <main className="flex-1 px-4 py-8 sm:px-6 lg:px-40 lg:py-4">
                    <div className="mx-auto max-w-8xl">
                        
                        {/* 1. Breadcrumb Section */}
                        <div className="mb-12">
                             <Breadcrumb 
                                path={currentPageBreadcrumb} 
                                currentPage="Booking Details"
                            />
                        </div>

                        {/* 2. Top Booking Summary Card */}
                        <BookingHeaderCard booking={booking} />

                        {/* 3. Two-Column Layout */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            
                            {/* LEFT COLUMN: Traveler Details & Notes */}
                            <div className="space-y-8">
                                
                                {/* Traveler Details Card (Integrated directly into the page for simplicity) */}
                                <ContentCard title="Traveler Details">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-subtext-dark">Primary Traveler</p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{booking.travelers.primaryName}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-subtext-dark">Email Address</p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{booking.travelers.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-subtext-dark">Secondary Traveler</p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{booking.travelers.secondaryName}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-subtext-dark">Phone Number</p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{booking.travelers.phone}</p>
                                        </div>
                                    </div>
                                </ContentCard>

                                {/* Special Requests / Notes Card (Integrated directly) */}
                                <ContentCard title="Special Requests / Notes">
                                    <p className="text-gray-600 dark:text-gray-400">{booking.notes}</p>
                                </ContentCard>

                            </div>

                            {/* RIGHT COLUMN: Price Breakdown & Review */}
                            <div className="space-y-8">
                                
                                {/* Price Breakdown Card */}
                                <PriceBreakdownCard pricing={booking.pricing} />
                                
                                {/* Review & Ratings Card */}
                                <ReviewCard review={booking.review} />
                            </div>
                        </div>

                        {/* 4. Action Panel */}
                        <ActionPanel bookingId={booking.id} status={booking.status} />
                        
                    </div>
                </main>
            </UserLayout>
        </div>
    );
};

export default BookingDetailPage;