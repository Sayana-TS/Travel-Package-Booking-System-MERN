import React, { useState, useMemo } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import PackageStats from '../Components/PackageStats';
import PackageCard from '../Components/PackageCard';

const MyPackagesPage = () => {
  // --- Dummy Data ---
  const [packages] = useState([
    { id: 1, title: 'Exotic Bali Adventure', location: 'Bali, Indonesia', startDate: 'Oct 15', endDate: 'Oct 25, 2024', submittedDate: 'Oct 01, 2024', status: 'pending', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'Parisian Charm Tour', location: 'Paris, France', startDate: 'Nov 10', endDate: 'Nov 17, 2024', submittedDate: 'Sep 28, 2024', status: 'active', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'Ancient Rome Discovery', location: 'Rome, Italy', startDate: 'Dec 01', endDate: 'Dec 08, 2024', submittedDate: 'Sep 25, 2024', status: 'upcoming', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'Tokyo Neon Nights', location: 'Tokyo, Japan', startDate: 'Jan 10', endDate: 'Jan 20, 2025', submittedDate: 'Sep 22, 2024', status: 'pending', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80' },
  ]);

  const stats = { total: 124, pending: 12, active: 80, upcoming: 32 };

  // --- States ---
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Date');

  // --- Filtering Logic ---
  const filteredPackages = useMemo(() => {
    return packages
      .filter(pkg => pkg.status === activeTab)
      .filter(pkg => 
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [packages, activeTab, searchQuery]);

  return (
    <AgentLayout>
      <main className="flex-1 px-4 md:px-10 py-8 w-full max-w-screen-xl mx-auto animate-[fadeIn_0.3s_ease-out]">
        
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-gray-900 dark:text-white text-4xl font-black tracking-tight">My Packages</h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-medium mt-1">View and manage your submitted travel offerings.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all active:scale-95">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Create New Package</span>
          </button>
        </div>

        <PackageStats stats={stats} />

        {/* Filters & Tabs Bar */}
        <div className="pb-3 border-b border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Custom Tabs */}
            <div className="flex gap-8">
              {['pending', 'active', 'upcoming'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-4 pt-2 text-sm font-bold capitalize transition-all ${
                    activeTab === tab 
                    ? `text-${tab} border-b-2 border-${tab}` 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border-b-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {tab === 'active' ? 'Active / Live' : tab}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      activeTab === tab ? `bg-${tab}/10` : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      {stats[tab]}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
                <input 
                  type="text"
                  placeholder="Search title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              {/* <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-primary focus:border-primary outline-none cursor-pointer"
              >
                <option>Sort by Date</option>
                <option>Sort by Name</option>
              </select> */}
            </div>
          </div>
        </div>

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard 
                key={pkg.id} 
                pkg={pkg} 
                onView={(p) => console.log('View', p)} 
                onEdit={(p) => console.log('Edit', p)}
                onDelete={(id) => console.log('Delete', id)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-700 mb-4">inventory_2</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No packages found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        )}

        {/* Pagination Dummy */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center p-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-sm">2</button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>

      </main>
    </AgentLayout>
  );
};

export default MyPackagesPage;