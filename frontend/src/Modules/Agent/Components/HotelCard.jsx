import React from 'react';
import { Star, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  // Navigation handler
  const goToDetails = (e) => {
    // We stop propagation in case this is called from a nested button 
    // to prevent double-triggering logic
    e.stopPropagation();
    navigate(`/hotelDetails`); 
  };

  const goToEdit = (e) => {
    e.stopPropagation();
    navigate(`/agent/hotels/edit/${hotel.id}`);
  };
  

  return (
    <div 
      onClick={goToDetails} // Mobile-first: the whole card is clickable
      className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] group hover:border-[#056bd1]/30 transition-all duration-300 cursor-pointer lg:cursor-default"
    >
      <img 
        alt={hotel.name} 
        className="w-full h-48 object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
        src={hotel.image}
      />
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white leading-tight">{hotel.name}</h3>
          <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${
            hotel.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-400'
          }`}>
            {hotel.status}
          </span>
        </div>
        
        <p className="text-slate-400 text-sm mb-4">{hotel.location}</p>
        
        <div className="flex items-center gap-1 text-[#056bd1] font-bold">
          <Star size={16} fill="currentColor" />
          <span className="text-sm">{hotel.rating}</span>
        </div>
      </div>

      {/* Hover Overlay - hidden on small screens by default (md:hidden lg:flex) */}
      <div className="hidden lg:flex absolute inset-0 bg-[#0f1923]/80 backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-3 w-3/4">
        <button 
  onClick={goToEdit}
  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#056bd1] text-white font-bold text-sm hover:bg-blue-600 transition-colors"
>
  <Edit size={16} /> Quick Edit
</button>

          
          <button 
            onClick={goToDetails} // Explicit click for Desktop
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors"
          >
            <Eye size={16} /> View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;