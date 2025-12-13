// src/pages/FavoritesPage.jsx

import React, { useState, useMemo } from 'react'; // 💡 ADDED useMemo
import UserLayout from '../Layouts/UserLayout'; 
import Breadcrumb from '../Components/Breadcrumb'; 
import SortDropdown from '../Components/SortDropdown';
import FavPackageCard from '../Components/FavPackageCard';
import RecommendationCard from '../Components/RecommendationCard';
import { useNavigate } from 'react-router-dom';

// --- Dummy Data ---
// 💡 ADDED a fourth item to better demonstrate sorting
const FAVORITES_DATA = [
    {
        id: 'CBLG',
        title: 'Coastal Bliss Getaway',
        description: 'Relax on pristine beaches and enjoy the ocean breeze. A perfect seaside vacation.',
        price: 950,
        rating: 4.7,
        reviews: 95,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAptvGcf6UAK84Qdmw9r1JUrI7iQRUfidFggmTrmLi6DfXcmEduJSQM7WbSRhWBxRjkeeB1HdJhVCl_GivEr_ANF2Qy-1yCWuvtuoOzEbFRLh6tjsiSi3VNz8XyauR-9vi5AVLgx0JGH6ODTus56_bsl1gBWQDIO9iD3wG0_o2akI-mxbsXOzJRCZ7WKdCS97zaVvsyDNbiGzQ-WE5M2JZtWybB-dVTNhkJN2MFC_vy4xD9Q9J5-n5IlwpYEbYlNmi1gNGAdZEp2h0",
    },
    {
        id: 'SMRW',
        title: 'Serene Mountain Retreat',
        description: 'A peaceful escape to breathtaking alpine landscapes. Perfect for hiking and relaxation.',
        price: 1200,
        rating: 4.8,
        reviews: 120,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAvej-xsrozfUbaMht4uiIh1DqikT1EYKgTw4e9tLu8xrJo76_NK69qAz1Sl_QFXef-tJ0UKWNEPJfpF1sgZB33n1ey2Wzh1NdSuDsYaPcpcrpD1_sMkNrKtnxn10PXHwB4WXDZKUN_FPvj7TK2GwZ6ismFoNpIG_5jALK1E-Tw5eUuMr82b-CkHTEt3MvQ7sHaEJEpfteCH3FVp-jfoKm7A1Nz4ZTPUD8dorVd8JRg5-3VCo2-xxxGYsS_-wroXo9sFYgI-ZZthc",
    },
    {
        id: 'FAEC',
        title: 'Forest Adventure Expedition',
        description: 'Immerse yourself in the lush greenery of a dense forest. A true nature lover\'s dream.',
        price: 1500,
        rating: 4.9,
        reviews: 150,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqiOb9YlslSmgQctJ8llxcQ5epxSedGGMulYpa--N1zCTpk-IkBLYl08JJV3Dfn2bIeR_zA-9MwBvd20QIe57CFYn_RA2YTtLasG1dLAhproW5-fR0SOrx-ZIdqtLWXND17k1i8eqfhObLw5ktFc9yw7znTRUFcoOHNjIJ_DfuuMYyI5xOXJm-LhrLhRA7ePBC3KlJX5guT-gr4HpK0CD5CdGETZqxDWiR-TOOPkMEEDHMkW8BSl7tAZWuqnlWPtqQnx8r-qPs6Pk",
    },
    {
        id: 'CITY',
        title: 'Urban Explorer Tour',
        description: 'Experience the hustle and bustle of a major metropolis.',
        price: 800,
        rating: 4.2,
        reviews: 70,
        imageUrl: "http://googleusercontent.com/profile/picture/7",
    },
];

const RECOMMENDATIONS = [
    { title: 'Mountain Hiking', subtitle: 'Explore the peaks', imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuANXx6vuw65kcVF7xJBUNppZx75Jf241p3Oiw6fiRrfU1xzbZHLdyeI9Wvpmlx7cWfSuxFIk34UQ8WsLSkm59MpkctkVggoT4I4eMSeXfBJDCZpxUOtIbCmWbRnYWnqfT0Or4JpI7ps4zWOXmcjbrCJMfBRHNhJecroykzWYg7993S1TBlG9LVeEhuoEQmVHCFEW21b8JP5WnVRq50MnYJnRgf1eKdqTpPWJEG7uz5sCWPIBMwQx3FRJQHrS-zEAN1KbHF8Q0xAegs", link: '#/packages/mountain' },
    { title: 'Beach Relaxation', subtitle: 'Relax by the sea', imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfMmCsZJhuiVhvgzdSlG3wjQ2wlDQnFkmRmxct8bnYACw8Rtco8hHJFv456YAbB8kpXIbbsWoqjA8gFn-GCWnhOt7B42e-nJ0kcg9Y6skAjZ1wehIaWVpW6_kO1jOy_I7ctQp4fptXJHF0_jKri7_jC6kJi7wrP69EprXJLbSjWoOFts53hPpcwwdYQ-S4d3_e-pGBr7zkMu05_RgZL-5IGttYb8IjT4g1Is4l-mgOQefR80TD25_gYuxQFdnbB1f8Ez_2NcHyrKM", link: '#/packages/beach' },
    { title: 'Jungle Trekking', subtitle: 'Discover the wild', imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz7d2li2-pbuXiqSwrTyKA6LOq2iJC1LoQrA79D1RoQWKq31kvLcPI-j1T81FyvKEMqL8VDsnAjMy8CfssfMnoHsLAWPziEitIMuB4fC8lq5NVDr76o9OP8ZAdrrRH37ZJs_cbXT9mCHOoXOn_pNL48QuLJvvrof2dBhpP4samTvVvbwRGcgAKu8VV5Yjro3w5c9EnXvi4oIV1sYWw24rA1bt7hvQMPdkqbZvUgKwYTSAb2Fe_GVxefQ1GvTswZojwjQcwp04JeGg", link: '#/packages/jungle' },
];

const BREADCRUMB_PATH = [
    { label: 'Home', href: '#' },
];

// ===================================================================
// Main Component: FavoritesPage
// ===================================================================

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState(FAVORITES_DATA);
    // 💡 UPDATED: Set initial sort to a valid value from SortDropdown component
    const [currentSort, setCurrentSort] = useState('price_asc'); 
    const navigate = useNavigate();

    const handleRemoveFavorite = (id) => {
        // Filter out the item with the given ID, plus any falsy items just in case
        setFavorites(favorites.filter(item => item && item.id !== id));
        console.log(`Removed favorite: ${id}`);
    };

    const handleViewDetails = (id) => {
        navigate(`/packageDetail`);
    };

    const handleSortChange = (newSort) => {
        setCurrentSort(newSort);
    };

    // 💡 SORTING LOGIC: Use useMemo to perform the sorting calculation efficiently
    const sortedFavorites = useMemo(() => {
        // Create a shallow copy and filter out any invalid items before sorting
        const sortableArray = favorites.filter(Boolean).slice(); 

        switch (currentSort) {
            case 'price_asc':
                return sortableArray.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return sortableArray.sort((a, b) => b.price - a.price);
            case 'rating_desc':
                return sortableArray.sort((a, b) => b.rating - a.rating);
            default:
                return sortableArray;
        }
    }, [favorites, currentSort]); // Dependencies: Re-run when favorites list or sort option changes

    // Current Page Breadcrumb
    const currentPageBreadcrumb = [
        ...BREADCRUMB_PATH,
        
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
            <UserLayout>
                <main className="mx-auto w-full max-w-8xl flex-grow px-6 py-4 lg:px-8">
                    
                    {/* Breadcrumb Section */}
                    <div className="mb-8">
                        <Breadcrumb 
                            path={currentPageBreadcrumb} 
                            currentPage="Favorites"
                        />
                    </div>

                    {/* Main Content Area (Two-Column Layout) */}
                    <div className="mt-6 flex flex-col gap-12 lg:flex-row">
                        
                        {/* LEFT COLUMN: Favorites List */}
                        <div className="flex-grow">
                            
                            {/* Header and Sorting */}
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Favorites</h2>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">The travel packages you've saved for future adventures.</p>
                                </div>
                                {/* 💡 Pass currentSort and handleSortChange */}
                                <SortDropdown currentSort={currentSort} onSortChange={handleSortChange} /> 
                            </div>

                            {/* Favorites List */}
                            <div className="mt-8 flex flex-col gap-6">
                                {/* 💡 MAP OVER THE SORTED LIST */}
                                {sortedFavorites.length > 0 ? (
                                    sortedFavorites.map((item) => (
                                        <FavPackageCard 
                                            key={item.id} 
                                            item={item} 
                                            onRemoveFavorite={handleRemoveFavorite}
                                            onViewDetails={handleViewDetails}
                                        />
                                    ))
                                ) : (
                                    <div className="p-10 text-center rounded-xl border border-black/10 dark:border-white/10 dark:bg-card-dark text-gray-500 dark:text-gray-400">
                                        You currently have no favorite packages saved. Start exploring!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Recommendations Sidebar */}
                        {/* 💡 THE FIX: Applied sticky classes for lg screens and up */}
                        <aside className="w-full shrink-0 lg:w-80 lg:sticky lg:top-24 lg:self-start">
                            <div className="rounded-xl p-6 bg-white dark:bg-background-dark/50 shadow-sm border border-black/10 dark:border-white/10">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Packages</h3>
                                <div className="mt-6 flex flex-col gap-6">
                                    {RECOMMENDATIONS.map((rec, index) => (
                                        <RecommendationCard key={index} recommendation={rec} />
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </UserLayout>
        </div>
    );
};

export default FavoritesPage;