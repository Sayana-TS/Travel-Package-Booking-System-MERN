import React from 'react';

const PackageStats = ({ stats }) => {
  const cards = [
    { label: 'Total Packages Submitted', value: stats.total, color: 'text-gray-900 dark:text-white' },
    { label: 'Pending Approvals', value: stats.pending, color: 'text-pending' },
    { label: 'Active / Live', value: stats.active, color: 'text-active' },
    { label: 'Upcoming', value: stats.upcoming, color: 'text-upcoming' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{card.label}</p>
          <p className={`tracking-tight text-3xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default PackageStats;