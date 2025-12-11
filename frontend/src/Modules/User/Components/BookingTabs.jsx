import React from 'react';

const BookingTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: 'Upcoming Bookings', value: 'upcoming' },
        { name: 'Past Bookings', value: 'past' },
    ];

    const getTabClasses = (tabValue) => {
        const baseClasses = "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors";
        
        if (activeTab === tabValue) {
            // Active Tab Styling
            return `${baseClasses} border-primary text-primary`;
        } else {
            // Inactive Tab Styling
            return `${baseClasses} border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300`;
        }
    };

    return (
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        className={getTabClasses(tab.value)}
                        onClick={() => setActiveTab(tab.value)} // The toggle function
                        role="tab"
                        aria-selected={activeTab === tab.value}
                    >
                        {tab.name}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default BookingTabs;