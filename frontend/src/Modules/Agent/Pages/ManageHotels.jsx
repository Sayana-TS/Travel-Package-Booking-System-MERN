import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import HotelCard from '../Components/HotelCard';

const HOTELS_DATA = [
  { id: 1, name: "The Grand Oasis Resort", location: "Coastal City, CA", rating: 4.5, status: "Active", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
  { id: 2, name: "Mountain View Lodge", location: "Mountain Village, CO", rating: 4.2, status: "Active", image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600" },
  { id: 3, name: "Sunset Beach Hotel", location: "Coastal City, CA", rating: 4.8, status: "Inactive", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600" },
  { id: 4, name: "Urban Escape Suites", location: "Metro City, NY", rating: 4.6, status: "Active", image: "https://images.unsplash.com/photo-1551882547-ff43c63efe81?w=600" },
  { id: 5, name: "Lakeside Retreat", location: "Lake Town, WA", rating: 4.3, status: "Active", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600" },
  { id: 6, name: "Desert Sands Resort", location: "Desert City, AZ", rating: 4.1, status: "Inactive", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600" }
];

const ManageHotels = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHotels = HOTELS_DATA.filter(hotel => {
    const matchesFilter = filter === 'All' || hotel.status === filter;
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const navigate = useNavigate()

  return (
    <AgentLayout>
      <div className="px-4 sm:px-0 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
        
        {/* Header Area - Stacked on Mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Hotel Management</h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage property listings and availability.</p>
          </div>
          <button onClick={()=>navigate('/hotels/add')} className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#056bd1] text-white font-bold hover:shadow-[0_0_20px_rgba(5,107,209,0.3)] transition-all">
            <Plus size={18} /> 
            <span className="whitespace-nowrap">Add New Hotel</span>
          </button>
        </div>

        {/* Controls - Full width on mobile */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#056bd1] transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search by hotel name or location..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#056bd1]/20 focus:border-[#056bd1]/50 transition-all text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Segmented Control - Scrollable on very small screens */}
          <div className="flex bg-white/[0.03] border border-white/10 p-1 rounded-2xl overflow-x-auto scrollbar-hide">
            {['All', 'Active', 'Inactive'].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`flex-1 sm:flex-none px-5 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  filter === option 
                    ? 'bg-[#056bd1] text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Hotel Grid */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="py-16 sm:py-24 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-slate-500 font-medium">No hotels found matching your criteria.</p>
          </div>
        )}
      </div>
    </AgentLayout>
  );
};

export default ManageHotels;