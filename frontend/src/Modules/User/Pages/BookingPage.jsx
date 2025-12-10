import React, { useState, useMemo } from 'react';
import Breadcrumb from '../Components/Breadcrumb'; // Your existing component
import BookingDetailsForm from '../Components/BookingDetailsForm';
import SidebarBooking from '../Components/SidebarBooking';
import UserLayout from '../Layouts/UserLayout';

// --- Static Data for the package ---
const STATIC_PACKAGE_DATA = {
    packageName: "Mountain Hiking Expedition",
    hotel: "The Summit Lodge",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ_1fFrAtsGFlMjez5mZYclrKzis1OfF-nlo1tfysSmJY5qMciM9o9g0OSdt3ufBIIEoNDMb_Q8vOSzkM3xB7AuWq8WZau6lluMejoxBkQ6vTQMlGs56eAiPGbr7v-hdpt0d450SyPX_1tzljuQtCzkVB-InstJn0cH-g0rJjVYr_EBslI1NzbmbmIB0C7Q8m7i5JKF__htKHMjb_ak6G9PXIsUf3VksP-NBZx-3wG_RfRkhPNFsSerGw49YQwZWN2DPycnaszI80",
    pricePerPerson: 1500,
    travelDates: "October 20-28, 2024",
    breadcrumbPath: [
        { label: 'Home', href: '#' },
        { label: 'Packages', href: '#' },
        { label: 'Mountain Hiking Expedition', href: '#' },
    ]
};

// ===================================================================
// Main Component: BookingPage
// ===================================================================
const BookingPage = () => {
    // 1. STATE FOR DYNAMIC BOOKING DETAILS
    const [numTravelers, setNumTravelers] = useState(2); // Start with default 2
    
    // NOTE: In a real application, you would initialize travelerDetails
    // with empty objects based on the initial numTravelers (e.g., Array(2).fill({}) )
    const [travelerDetails, setTravelerDetails] = useState([]); 

    // 2. CALCULATED VALUE
    const totalPrice = useMemo(() => {
        return numTravelers * STATIC_PACKAGE_DATA.pricePerPerson;
    }, [numTravelers]);
    
    // Data object used for the Sidebar
    const bookingSummaryData = {
        ...STATIC_PACKAGE_DATA,
        travelers: numTravelers,
        totalPrice: totalPrice,
    };
    
    // Data object used for the form to manage state and initial values
    const formProps = {
        initialDates: STATIC_PACKAGE_DATA.travelDates,
        numTravelers: numTravelers,
        setNumTravelers: setNumTravelers,
        // In a real app, you would pass travelerDetails state here too
    }

    return (
        <div className="min-h-screen bg-background-dark text-white">
            <UserLayout>
            <main className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* === Left Column: Details and Requests === */}
                    <div className="w-full lg:w-3/5 space-y-8">
                        
                        <div className="space-y-4">
                            <Breadcrumb 
                                path={STATIC_PACKAGE_DATA.breadcrumbPath} 
                                currentPage="Booking"
                            />
                            <h1 className="text-3xl md:text-4xl font-bold">
                                Confirm Your Booking
                            </h1>
                        </div>
                        
                        {/* Pass state and setter function to the form */}
                        <BookingDetailsForm data={formProps} />
                        
                    </div>

                    {/* === Right Column: Summary and Payment === */}
                    <div className="w-full lg:w-2/5 space-y-8">
                        {/* Pass the calculated data to the sidebar */}
                        <SidebarBooking data={bookingSummaryData} />
                    </div>

                </div>
            </main>
            </UserLayout> 
        </div>
    );
};

export default BookingPage;