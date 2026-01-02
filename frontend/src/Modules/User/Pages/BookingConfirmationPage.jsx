import React, { useMemo } from 'react';
import Breadcrumb from '../../../Shared/Components/Breadcrumb'; 
import ConfirmationCard from '../Components/ConfirmationCard'; 
import RecommendedPackageSection from '../Components/RecommendedPackageSection'; 
import UserLayout from '../Layouts/UserLayout';

// --- Data for this specific page ---
const CONFIRMATION_DATA = {
    userName: "Sarah",
    bookingId: "#1234567890",
    package: "Mountain Escape",
    hotel: "The Alpine Lodge, 123 Summit Trail, Mountain View, CA 94043",
    travelDates: "July 15 - July 20, 2024",
    travelers: "2 Adults",
    totalPrice: "$1,500 (Includes taxes and fees)",
    breadcrumbPath: [
        { label: 'Home', href: '/' },
        { label: 'Mountain Escape', href: '/packageDetail' },
        { label: 'Booking', href: '/booking' },
    ]
};

// UPDATED DATA: Now includes 'price' for the PackageCards component
const RECOMMENDED_PACKAGES = [
    { 
        id: 1, 
        title: "Winter Wonderland", 
        price: 950, // Added price
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9LI-2iEeqnF3r14o4HF-Ho6ubiTZdfE4hCN37VxKHcclnNI4y5sIe8RhSzdMtXiUn1Ku_ubjNoRg8G-5-Eq_lmnhKLRc4ZHt0967tP2UZPjjPUbpDQ7A46P04VF7TWvDogVltUDWseBYOqcCV2khKGvCm775sViy6aliF9ipv-E_lJyIzkvHfAsG4WcHCJ7_E6skLAlBsGSlA1XR0GWfjS3kHsojEwu1cmj2HlS2327FNI3zyIzAmtfdv6x2EyPYuQW-E2SJ3D8s"
    },
    { 
        id: 2, 
        title: "Forest Retreat", 
        price: 680, // Added price
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPnpHIhbpmc5xpWfDZ06x3AKlAPQ5jcH3RAkSXPSw2QRE1nxkwWh9EfaNxufLgmuzeq1PgIsPeqwjOv8Era2_WW58TWIQOe1w47u93Wq_hEmQdp07CBYR9nEbyWdfvlchn6Ut4MQfuF0xVuIorbzvdWEgkDyCPMofcrnt2SdI94hqKX6WxBWhMAfeYWOGyNBZ6jnkbCwveYsvT2xgYVY8ratsH1G2tpOwGTEnYyTHqxETueVHr8ArVAu3afOByXd2xMsWeTkakc5k"
    },
    { 
        id: 3, 
        title: "Coastal Getaway", 
        price: 1200, // Added price
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAblCvFUt95zZp6Sfl7ZFVlbwtRNpg9BXeqNX1wmwodLQoVsIjcigsMlCWfMB-6YfmtSTjtceNvinBWes9jdAfkY8gaVg9u4qFCus7yM0ML6xnsHzkgRYq-32sgC2eehsX3lBlyhXyh3BPmZGM8C-JuO1Lv5ZWPfo09-oGKgDzHLms6OFBH1KiOlVaRTr-nFh0KQ4KpxaIqp2QXcqttLx-9HKzzpdd6MnOPH2yjgXhUE6o2AEpw96Sr2C4lwXIkQCv23w3Gg4cP7n8"
    },
];

// ===================================================================
// Main Component: BookingConfirmationPage
// ===================================================================
const BookingConfirmationPage = () => {
    
    // Convert flat data into structured data for the Summary Table
    const summaryData = useMemo(() => [
        { label: 'Package Name', value: CONFIRMATION_DATA.package },
        { label: 'Hotel Details', value: CONFIRMATION_DATA.hotel },
        { label: 'Travel Dates', value: CONFIRMATION_DATA.travelDates },
        { label: 'Number of Travelers', value: CONFIRMATION_DATA.travelers },
        { label: 'Total Price', value: CONFIRMATION_DATA.totalPrice },
    ], []);

    return (
        // Outermost wrapper for dark background and text
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">
            <UserLayout>
            <main className="flex-grow container mx-auto px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Breadcrumb 
                            path={CONFIRMATION_DATA.breadcrumbPath} 
                            currentPage="Confirmation"
                        />
                    </div>

                    {/* Main Confirmation Card */}
                    <ConfirmationCard 
                        data={CONFIRMATION_DATA} 
                        summaryData={summaryData} 
                    />

                    {/* Recommended Packages Section */}
                    <RecommendedPackageSection packages={RECOMMENDED_PACKAGES} />

                    {/* Footer Contact Info */}
                    <div className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
                        <p>For any questions or assistance, please contact our customer support team at <a className="text-primary hover:underline" href="mailto:support@trekfinder.com">support@trekfinder.com</a> or call us at (555) 123-4567.</p>
                    </div>

                </div>
            </main>
            </UserLayout>
        </div>
    );
};

export default BookingConfirmationPage;