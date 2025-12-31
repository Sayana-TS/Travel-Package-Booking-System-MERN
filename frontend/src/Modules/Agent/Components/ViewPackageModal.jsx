// src/components/ViewPackageModal.jsx
import React, { useState, useEffect } from 'react';

const HARDCODED_FALLBACK = {
  title: "Yosemite National Park Adventure",
  destination: "Yosemite Valley, California, USA",
  description: "Experience the ultimate immersion into the Sierra Nevada. This curated adventure blends luxury lodging with rugged exploration. From the mist of the waterfalls to the silence of the ancient sequoia groves, every moment is designed to reconnect you with the wild.",
  basePrice: 1500,
  discount: 300,
  finalPrice: 1200,
  startDate: "2026-06-15",
  endDate: "2026-06-20",
  maxTravelers: 8,
  gallery: [
    "https://images.unsplash.com/photo-1533496199141-bccd9b139773?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505159947324-47d039f193c4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?auto=format&fit=crop&w=800&q=80"
  ],
  highlights: ["Guided Photography Tours", "Luxury Wilderness Villas", "Private Chef Dinners"],
  itinerary: [
    { day: 1, title: "Arrival & Welcome", desc: "Private transfer followed by a welcome dinner at the lodge." },
    { day: 2, title: "Valley Vistas", desc: "Guided photography tour of El Capitan and Bridalveil Fall." },
    { day: 3, title: "Giant Sequoia Walk", desc: "Immersive hike through Mariposa Grove with a naturalist." },
    { day: 4, title: "Summit Views", desc: "Drive to Glacier Point for panoramic sunset views." },
    { day: 5, title: "Final Farewell", desc: "Breakfast at the lodge and transfer to airport." }
  ],
  hotel: {
    name: "The Majestic Yosemite Lodge",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["Infinity Pool", "Mountain View Spa", "24/7 Concierge", "Free Wi-Fi"],
    rooms: [
      { type: "King Suite", occupancy: "2 Adults", price: "Included" },
      { type: "Family Villa", occupancy: "4 Adults", price: "+$200/night" }
    ]
  },
  activities: [
    { title: "Mist Trail Hiking", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400", desc: "A challenging yet rewarding hike past two massive waterfalls." },
    { title: "Stargazing Session", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400", desc: "Nightly sessions with high-powered telescopes and astronomers." }
  ],
  transport: {
    service: "Airport Pickup & Drop-off",
    vehicle: "Executive 4x4 SUV",
    schedule: "Every 4 hours from Fresno Int. (FAT) - 08:00 to 20:00",
    duration: "2.5 Hours",
    route: "Fresno (FAT) → Yosemite Lodge",
    note: "Complimentary snacks and bottled water provided during transit."
  },
  inclusions: ["All meals", "Guided tours", "Park entry fees", "Gear rental"],
  exclusions: ["Airfare to Fresno", "Personal tips", "Travel insurance"],
  locationOverview: "Located in the heart of the Sierra Nevada mountains, Yosemite Valley is world-renowned for its granite cliffs, waterfalls, and giant sequoia groves. Your base camp provides immediate access to iconic landmarks like Half Dome and El Capitan.",
  weather: [
    { day: "Mon", temp: "75°F", icon: "wb_sunny" },
    { day: "Tue", temp: "72°F", icon: "cloud" },
    { day: "Wed", temp: "70°F", icon: "wb_sunny" },
    { day: "Thu", temp: "78°F", icon: "partly_cloudy_day" },
    { day: "Fri", temp: "80°F", icon: "wb_sunny" }
  ],
  agent: {
    name: "Alex Rivera",
    agency: "Nomad Horizon Travels",
    contact: "+1 (555) 987-6543",
    email: "alex.rivera@nomadhorizon.com",
    submissionDate: "2025-12-28"
  },
  status: 'pending'
};

const ViewPackageModal = ({ isOpen, onClose, onApprove, onReject, onSetFeatured, onEdit, packageData, userRole = 'agent' }) => {
  const [activeImg, setActiveImg] = useState(0);

  const data = (packageData && Object.keys(packageData).length > 0 && packageData.gallery) 
    ? packageData 
    : HARDCODED_FALLBACK;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveImg(0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const Icon = ({ name, className = "" }) => (
    <span className={`material-symbols-outlined ${className}`} style={{ fontSize: 'inherit' }}>{name}</span>
  );

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { 
          bg: 'bg-emerald-500/10', 
          text: 'text-emerald-500', 
          border: 'border-emerald-500/20', 
          icon: 'check_circle', 
          label: 'Active / Live' 
        };
      case 'upcoming':
        return { 
          bg: 'bg-blue-500/10', 
          text: 'text-blue-500', 
          border: 'border-blue-500/20', 
          icon: 'event_upcoming', 
          label: 'Upcoming' 
        };
      case 'pending':
      default:
        return { 
          bg: 'bg-amber-500/10', 
          text: 'text-amber-500', 
          border: 'border-amber-500/20', 
          icon: 'history', 
          label: 'Pending Review' 
        };
    }
  };

  const statusStyle = getStatusStyles(data.status);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-7xl max-h-[92vh] bg-background-dark text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/10 font-display">
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 bg-background-dark/50 border-b border-primary/20 sticky top-0 z-20 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{data.title}</h2>
              <span className={`px-3 py-1 ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1`}>
                <Icon name={statusStyle.icon} className="text-xs" /> {statusStyle.label}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <Icon name="location_on" className="text-sm" /> {data.destination}
              </span>
              <span className="text-subtext-dark text-xs font-bold uppercase tracking-widest flex items-center gap-1 border-l border-white/10 pl-4">
                <Icon name="calendar_today" className="text-sm" /> {data.startDate} — {data.endDate}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn flex items-center gap-2 px-4 py-2 border border-white/5">
            <Icon name="close" className="text-xl" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-grow overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 p-6 md:p-10 space-y-12 border-r border-white/5">
              
              {/* Cinematic Carousel Section */}
              <div className="relative rounded-2xl overflow-hidden aspect-video group bg-card-dark shadow-xl">
                <img 
                  src={data.gallery?.[activeImg]} 
                  className="w-full h-full object-cover transition-all duration-700" 
                  alt="Gallery" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {data.gallery?.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-primary scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt={`view-${idx}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Overview */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Icon name="info" /> Package Overview
                </h3>
                <p className="text-subtext-dark leading-relaxed text-base">{data.description}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {data.highlights?.map((h, i) => (
                    <span key={i} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-2 border border-primary/20">
                      <Icon name="star" className="text-sm" /> {h}
                    </span>
                  ))}
                </div>
              </section>

              {/* Activities Section */}
              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2"><Icon name="explore" className="text-primary" /> Included Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.activities?.map((act, i) => (
                    <div key={i} className="bg-card-dark rounded-2xl overflow-hidden border border-white/5 flex flex-col">
                      <img src={act.image} className="h-40 w-full object-cover" alt={act.title} />
                      <div className="p-4">
                        <h4 className="font-bold text-primary">{act.title}</h4>
                        <p className="text-sm text-subtext-dark mt-1 line-clamp-2">{act.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Itinerary */}
              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2"><Icon name="route" className="text-primary" /> The Journey</h3>
                <div className="border-l-2 border-primary/30 ml-3 space-y-8">
                  {data.itinerary?.map((step, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background-dark shadow-[0_0_10px_rgba(5,107,209,0.4)]" />
                      <h4 className="font-bold">Day {step.day}: {step.title}</h4>
                      <p className="text-sm text-subtext-dark mt-1">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Hotel Section */}
              <section className="space-y-6 p-6 bg-card-dark rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold">Stay at {data.hotel?.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <img src={data.hotel?.image} className="rounded-2xl h-48 w-full object-cover" alt="Hotel" />
                    <div className="flex flex-wrap gap-2">
                        {data.hotel?.amenities?.map((a, i) => (
                            <span key={i} className="text-[10px] text-subtext-dark uppercase font-bold bg-white/5 px-2 py-1 rounded border border-white/5">{a}</span>
                        ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase text-primary">Available Room Types</h4>
                    {data.hotel?.rooms?.map((room, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-xl flex justify-between items-center border border-white/5">
                        <div>
                          <p className="font-bold text-sm">{room.type}</p>
                          <p className="text-[10px] text-subtext-dark uppercase tracking-widest">{room.occupancy}</p>
                        </div>
                        <span className="text-xs font-bold text-primary">{room.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Transportation Section */}
              <section className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2"><Icon name="local_shipping" className="text-primary" /> Transportation Logistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div><p className="text-[10px] text-subtext-dark uppercase font-bold mb-1">Service</p><p className="text-sm font-medium">{data.transport?.service}</p></div>
                  <div><p className="text-[10px] text-subtext-dark uppercase font-bold mb-1">Vehicle</p><p className="text-sm font-medium">{data.transport?.vehicle}</p></div>
                  <div><p className="text-[10px] text-subtext-dark uppercase font-bold mb-1">Duration</p><p className="text-sm font-medium">{data.transport?.duration}</p></div>
                  <div className="col-span-2"><p className="text-[10px] text-subtext-dark uppercase font-bold mb-1">Schedule</p><p className="text-sm font-medium">{data.transport?.schedule}</p></div>
                  <div><p className="text-[10px] text-subtext-dark uppercase font-bold mb-1">Route</p><p className="text-sm font-medium">{data.transport?.route}</p></div>
                </div>
                <div className="p-3 bg-background-dark/50 rounded-lg text-xs italic text-subtext-dark flex items-start gap-2">
                    <Icon name="info" className="text-primary text-sm mt-0.5" /> Note: {data.transport?.note}
                </div>
              </section>

              {/* Map & Weather Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <section className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><Icon name="map" className="text-primary" /> Location Overview</h3>
                  <p className="text-xs text-subtext-dark leading-relaxed">{data.locationOverview}</p>
                  <div className="h-48 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-20" />
                    <span className="text-subtext-dark text-[10px] uppercase font-bold tracking-widest z-10">[ Interactive Map ]</span>
                  </div>
                </section>
                <section className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><Icon name="thermostat" className="text-primary" /> Weather Forecast</h3>
                  <div className="grid grid-cols-5 gap-2 h-full">
                    {data.weather?.map((w, i) => (
                      <div key={i} className="text-center p-3 bg-card-dark rounded-xl border border-white/5 flex flex-col justify-center">
                        <p className="text-[10px] font-bold text-subtext-dark uppercase">{w.day}</p>
                        <Icon name={w.icon} className="text-primary my-2 text-xl" />
                        <p className="text-xs font-bold">{w.temp}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Sticky Right Sidebar Container */}
            <div className="lg:col-span-4 sticky top-0 self-start p-8 flex flex-col space-y-8 bg-white/[0.01]">
              
              {/* Agent Details Section */}
              <section className="p-6 rounded-3xl bg-primary/5 border border-primary/10 shadow-xl space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Icon name="person" className="text-sm" /> {userRole === 'admin' ? 'Agent Details' : 'Submission Info'}
                </h4>
                <div className="space-y-3">
                  {userRole === 'admin' && (
                    <>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-subtext-dark font-bold">Agent Name</span>
                        <span className="text-sm font-medium">{data.agent?.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-subtext-dark font-bold">Agency Name</span>
                        <span className="text-sm font-medium">{data.agent?.agency}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-subtext-dark font-bold">Contact Number</span>
                        <span className="text-sm font-medium">{data.agent?.contact}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-subtext-dark font-bold">Email Address</span>
                        <span className="text-sm font-medium lowercase">{data.agent?.email}</span>
                      </div>
                    </>
                  )}
                  <div className={`flex flex-col ${userRole === 'admin' ? 'pt-2 border-t border-white/5' : ''}`}>
                    <span className="text-[10px] uppercase text-subtext-dark font-bold">Submitted On</span>
                    <span className="text-sm font-medium text-primary">{data.agent?.submissionDate}</span>
                  </div>
                </div>
              </section>

              <section className="p-6 rounded-3xl bg-card-dark border border-white/5 shadow-xl">
                <h4 className="text-xs font-black uppercase tracking-widest text-subtext-dark mb-6">Price Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-subtext-dark">Base Package</span>
                    <span className="line-through opacity-40 font-medium">${data.basePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-primary">
                    <span className="font-medium italic">Theme Exclusive Discount</span>
                    <span className="font-bold">-${data.discount}</span>
                  </div>
                  <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold uppercase text-xs tracking-tighter mb-1">Final Total</span>
                    <span className="text-4xl font-black">${data.finalPrice}</span>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase text-primary mb-4 flex items-center gap-2">
                    <Icon name="check_circle" className="text-sm" /> Included
                  </h4>
                  <ul className="space-y-3">
                    {data.inclusions?.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-medium text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-red-500/80 mb-4 flex items-center gap-2">
                    <Icon name="cancel" className="text-sm" /> Excluded
                  </h4>
                  <ul className="space-y-3">
                    {data.exclusions?.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-medium opacity-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <div className="p-5 bg-primary/10 rounded-2xl border border-primary/20 text-center">
                <p className="text-[10px] text-primary uppercase font-black tracking-widest">
                  Maximum Travelers: {data.maxTravelers}
                </p>
                <p className="text-[9px] text-subtext-dark mt-1 uppercase">Limited slots available for these dates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-8 py-6 bg-background-dark/80 border-t border-white/10 flex items-center justify-between backdrop-blur-md z-30">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-subtext-dark text-sm font-bold hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <Icon name="close" /> Close
          </button>
          
          <div className="flex items-center gap-4">
            {userRole === 'admin' ? (
              <>
                <button 
                  onClick={() => onReject(data)}
                  className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                >
                  <Icon name="thumb_down" /> Reject Submission
                </button>
                <button 
                  onClick={() => onSetFeatured(data)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 text-sm font-bold hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2"
                >
                  <Icon name="verified_user" /> Set as Featured
                </button>
                <button 
                  onClick={() => onApprove(data)}
                  className="px-10 py-2.5 rounded-xl bg-primary text-white text-sm font-black hover:brightness-110 shadow-[0_0_20px_rgba(5,107,209,0.3)] transition-all flex items-center gap-2"
                >
                  <Icon name="verified" /> Approve Package
                </button>
              </>
            ) : (
              // Only show Edit button for 'pending' or 'upcoming' status
              (data.status?.toLowerCase() === 'pending' || data.status?.toLowerCase() === 'upcoming') && (
                <button 
                  onClick={() => onEdit(data)}
                  className="px-12 py-2.5 rounded-xl bg-primary text-white text-sm font-black hover:brightness-110 shadow-[0_0_20px_rgba(5,107,209,0.3)] transition-all flex items-center gap-2"
                >
                  <Icon name="edit" /> Edit Package Details
                </button>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewPackageModal;