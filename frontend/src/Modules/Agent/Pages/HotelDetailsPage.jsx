import React from 'react';
import { 
    MapPin, Phone, Mail, Globe, 
    Wifi, Waves, Dumbbell, Coffee, 
    Utensils, Sparkles, Image as ImageIcon,
    Edit, Eye, ChevronRight, Hotel // <--- Add Hotel here
  } from 'lucide-react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import { useNavigate } from 'react-router-dom';

const HOTEL_DETAIL = {
  id:"hotel_001",
  name: "The Grand Oasis Resort",
  address: "123 Ocean Drive, Miami, FL 33139",
  phone: "(305) 555-1234",
  email: "reservations@grandoasis.com",
  website: "www.grandoasisresort.com",
  description: "The Grand Oasis Resort is a luxurious beachfront hotel located in the heart of Miami. With stunning ocean views, world-class amenities, and exceptional service, it offers an unforgettable experience for both leisure and business travelers.",
  mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  amenities: [
    { name: "Beachfront Access", icon: Waves },
    { name: "Swimming Pool", icon: Waves },
    { name: "Spa & Wellness", icon: Sparkles },
    { name: "Fitness Center", icon: Dumbbell },
    { name: "Multiple Dining", icon: Utensils },
    { name: "Free Wi-Fi", icon: Wifi },
    { name: "Business Center", icon: Globe },
    { name: "Concierge", icon: Coffee },
  ],
  roomImages: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"
  ],
  hotelImages: [
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400"
  ],
  packages: [
    { name: "Romantic Getaway", desc: "Includes a suite, champagne, and dinner for two.", status: "Active" },
    { name: "Family Fun", desc: "Includes family suite and access to kids' club.", status: "Inactive" }
  ],
  stats: {
    totalRooms: 250,
    types: "Standard, Deluxe, Suite",
    availability: "Available"
  }
};

// Reusable Section Wrapper
const InfoSection = ({ title, children, className = "" }) => (
  <div className={`bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden ${className}`}>
    <div className="p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <div className="w-1.5 h-6 bg-[#056bd1] rounded-full" />
        {title}
      </h2>
      {children}
    </div>
  </div>
);

const HotelDetailsPage = () => {

  const navigate = useNavigate()

  return (
    <AgentLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
          <div>
            <div className="flex items-center gap-2 text-[#056bd1] font-bold text-sm mb-2 uppercase tracking-widest">
              <Hotel size={14} /> Property Details
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{HOTEL_DETAIL.name}</h1>
            <p className="text-slate-400 mt-1 flex items-center gap-2">
              <MapPin size={16} /> {HOTEL_DETAIL.address}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>navigate(`/agent/hotels/edit/${HOTEL_DETAIL.id}`)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#056bd1] text-white font-bold hover:shadow-[0_0_20px_rgba(5,107,209,0.3)] transition-all">
              <Edit size={18} /> Edit Hotel
            </button>
            {/* <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all">
              <Eye size={18} /> Preview
            </button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* General Info */}
            <InfoSection title="Hotel Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Contact Details</p>
                    <div className="space-y-2 text-slate-300">
                      <p className="flex items-center gap-2"><Phone size={14} className="text-[#056bd1]" /> {HOTEL_DETAIL.phone}</p>
                      <p className="flex items-center gap-2"><Mail size={14} className="text-[#056bd1]" /> {HOTEL_DETAIL.email}</p>
                      <p className="flex items-center gap-2"><Globe size={14} className="text-[#056bd1]" /> {HOTEL_DETAIL.website}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Description</p>
                  <p className="text-slate-300 leading-relaxed text-sm">{HOTEL_DETAIL.description}</p>
                </div>
              </div>
              <div 
                className="h-72 w-full rounded-xl bg-cover bg-center grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                style={{ backgroundImage: `url(${HOTEL_DETAIL.mainImage})` }} 
              />
            </InfoSection>

            {/* Amenities Grid */}
            <InfoSection title="Amenities">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {HOTEL_DETAIL.amenities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300">
                    <item.icon size={18} className="text-[#056bd1]" />
                    <span className="text-xs font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </InfoSection>

            {/* Image Galleries */}
            <div className="space-y-6">
              {[
                { title: "Room Images", images: HOTEL_DETAIL.roomImages },
                { title: "Property Images", images: HOTEL_DETAIL.hotelImages }
              ].map((gallery, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="font-bold text-white">{gallery.title}</h3>
                    <button className="text-xs font-bold text-[#056bd1] hover:underline uppercase tracking-widest">Manage Images</button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {gallery.images.map((img, i) => (
                      <div key={i} className="aspect-video rounded-xl bg-cover bg-center border border-white/5" style={{ backgroundImage: `url(${img})` }} />
                    ))}
                    <button className="aspect-video rounded-xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-[#056bd1] hover:border-[#056bd1]/50 transition-all">
                      <ImageIcon size={20} />
                      <span className="text-[10px] font-bold uppercase">View All</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Packages Table */}
            <InfoSection title="Active Packages">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-white/5">
                    <tr>
                      <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Package Name</th>
                      <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Status</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {HOTEL_DETAIL.packages.map((pkg, i) => (
                      <tr key={i} className="group hover:bg-white/[0.01]">
                        <td className="py-4">
                          <p className="text-sm font-bold text-white">{pkg.name}</p>
                          <p className="text-xs text-slate-500">{pkg.desc}</p>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                            pkg.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                          }`}>
                            {pkg.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="p-2 text-slate-600 hover:text-white transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InfoSection>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Summary Card */}
              <div className="bg-[#056bd1]/5 border border-[#056bd1]/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Room Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400 text-sm">Total Capacity</span>
                    <span className="text-white font-bold">{HOTEL_DETAIL.stats.totalRooms} Rooms</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400 text-sm">Room Categories</span>
                    <span className="text-white font-bold text-right text-xs max-w-[120px]">{HOTEL_DETAIL.stats.types}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400 text-sm">Current Status</span>
                    <span className="flex items-center gap-1.5 text-emerald-500 font-bold text-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {HOTEL_DETAIL.stats.availability}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-8 py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                  Manage Rooms
                </button>
              </div>

              {/* Location/Map Preview */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Location</h3>
                <div className="aspect-square rounded-xl bg-slate-800 flex items-center justify-center border border-white/5 overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400" 
                    className="w-full h-full object-cover opacity-50 grayscale"
                    alt="Map Preview"
                   />
                   <div className="absolute flex flex-col items-center">
                      <MapPin size={32} className="text-[#056bd1] fill-[#056bd1]/20" />
                      <span className="text-[10px] font-bold text-white mt-2 uppercase tracking-tighter bg-black/50 px-2 py-1 rounded">View on Map</span>
                   </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </AgentLayout>
  );
};

export default HotelDetailsPage;