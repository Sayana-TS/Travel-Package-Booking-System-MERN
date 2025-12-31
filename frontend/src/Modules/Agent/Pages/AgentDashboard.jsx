import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Hotel, BedDouble, Users, 
  DollarSign, Calendar 
} from 'lucide-react';

// Import your new modular components
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import StatCard from '../../../Shared/Components/StatCard';
import BookingTable from '../../../Shared/Components/BookingTable';
import AlertSection from '../../../Shared/Components/AlertSection';

const DASHBOARD_DATA = {
  stats: [
    { label: "Total Bookings", value: "245", trend: "+12%", isPositive: true, icon: Calendar },
    { label: "Revenue", value: "$12,500", trend: "+8%", isPositive: true, icon: DollarSign },
    { label: "Satisfaction", value: "92%", trend: "-2%", isPositive: false, icon: Users },
    { label: "Packages", value: "32", trend: "+5%", isPositive: true, icon: Package },
    { label: "Hotels", value: "48", trend: "+3 new", isPositive: true, icon: Hotel },
    { label: "Total Rooms", value: "1,200", trend: "Capacity", isPositive: true, icon: BedDouble },
  ],
  bookings: [
    { id: "BK12345", customer: "Sophia Clark", destination: "Paris", status: "Confirmed", date: "2024-07-20" },
    { id: "BK12346", customer: "Ethan Bennett", destination: "Tokyo", status: "Pending", date: "2024-07-22" },
    { id: "BK12347", customer: "Olivia Turner", destination: "Rome", status: "Confirmed", date: "2024-07-25" },
    { id: "BK12348", customer: "Liam Foster", destination: "London", status: "Cancelled", date: "2024-07-28" },
    { id: "BK12349", customer: "Ava Mitchell", destination: "Barcelona", status: "Confirmed", date: "2024-07-30" },
  ],
  alerts: [
    { title: "New Booking Request", message: "Sophia Clark - July 20.", isActive: true },
    { title: "Payment Received", message: "June commission processed.", isActive: false }
  ],
  hotels: [
    { name: "The Grand Majestic", desc: "Luxury hotel in NYC", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=120&fit=crop" },
    { name: "Sunset Paradise", desc: "Resort in Maldives", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=120&fit=crop" },
    { name: "Mountain Lodge", desc: "Swiss Alps", img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=200&h=120&fit=crop" },
  ],
  packages: [
    { name: "Romantic Getaway", desc: "3 nights in Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=120&fit=crop" },
    { name: "Adventure Seeker", desc: "5 nights Costa Rica", img: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=200&h=120&fit=crop" },
    { name: "Family Fun", desc: "7 nights in Orlando", img: "https://images.unsplash.com/photo-1540448051910-09cdaddf084c?w=200&h=120&fit=crop" },
  ]
};

// Internal PreviewItem component (keep here if only used for previews on this page)
const PreviewItem = ({ item }) => (
  <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 flex items-center gap-4 hover:bg-white/[0.04] transition-all cursor-pointer">
    <img src={item.img} alt={item.name} className="w-16 h-12 sm:w-20 sm:h-16 rounded-lg object-cover grayscale-[20%] hover:grayscale-0 transition-all shrink-0" />
    <div className="min-w-0">
      <p className="font-bold text-white text-xs sm:text-sm truncate">{item.name}</p>
      <p className="text-[10px] sm:text-xs text-slate-500 truncate">{item.desc}</p>
    </div>
  </div>
);

const AgentDashboard = () => {

  const navigate = useNavigate()

  return (
    <AgentLayout>
      <div className="space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
        
        {/* Header Section */}
        <header>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-lg">
            Welcome back, <span className="text-white font-semibold">Emily</span>.
          </p>
        </header>

        {/* Modular Stats Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 sm:gap-5">
            {DASHBOARD_DATA.stats.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* Modular Bookings Table */}
        <section>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-white">Recent Bookings</h2>
            <Link to="/bookings" className="text-[10px] font-bold uppercase tracking-widest text-[#056bd1] hover:text-blue-400 transition-colors">View All</Link>
          </div>
          <BookingTable bookings={DASHBOARD_DATA.bookings} />
        </section>

        {/* Previews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Hotel size={18} className="text-[#056bd1]" /> Managed Hotels
            </h2>
            <div onClick={()=>navigate('/hotelDetails')} className="space-y-3">
              {DASHBOARD_DATA.hotels.map((h, i) => <PreviewItem key={i} item={h} />)}
            </div>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Package size={18} className="text-[#056bd1]" /> Active Packages
            </h2>
            <div onClick={()=>navigate('/agent/packages')} className="space-y-3">
              {DASHBOARD_DATA.packages.map((p, i) => <PreviewItem key={i} item={p} />)}
            </div>
          </section>
        </div>

        {/* Modular Notifications Section */}
        <AlertSection alerts={DASHBOARD_DATA.alerts} />

      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;