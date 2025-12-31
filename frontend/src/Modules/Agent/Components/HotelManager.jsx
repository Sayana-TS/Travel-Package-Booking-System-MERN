import React, { useState } from 'react';

export const HotelManager = ({ data = [], update }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Simulation of an API-sourced hotel list
  const availableHotels = [
    { id: 1, name: "Mountain View Resort", location: "Himalayas" },
    { id: 2, name: "City Center Grand", location: "Downtown" },
    { id: 3, name: "Lakeside Inn", location: "Lake District" },
    { id: 4, name: "The Royal Palace Hotel", location: "Heritage Site" },
    { id: 5, name: "Sunset Valley Lodge", location: "Western Ghats" },
  ];

  const handleAddHotel = (hotel) => {
    if (data.some(h => h.id === hotel.id)) return;
    
    const newHotelEntry = {
      ...hotel,
      rooms: [{ 
        id: Date.now(), // Unique ID for API syncing
        type: "Deluxe Room", 
        occupancy: 2, 
        price: "", 
        facilities: ["Wi-Fi", "AC"] 
      }]
    };
    update('hotels', [...data, newHotelEntry]);
    setSearchTerm(""); // Clear search after selection
  };

  const handleRemoveHotel = (hotelId) => {
    update('hotels', data.filter(h => h.id !== hotelId));
  };

  const handleAddRoom = (hotelIndex) => {
    const updatedHotels = [...data];
    updatedHotels[hotelIndex].rooms.push({ 
      id: Date.now(), 
      type: "Standard Room", 
      occupancy: 1, 
      price: "", 
      facilities: [] 
    });
    update('hotels', updatedHotels);
  };

  const updateRoom = (hotelIndex, roomIndex, field, value) => {
    const updatedHotels = [...data];
    updatedHotels[hotelIndex].rooms[roomIndex][field] = value;
    update('hotels', updatedHotels);
  };

  const removeRoom = (hotelIndex, roomIndex) => {
    const updatedHotels = [...data];
    updatedHotels[hotelIndex].rooms = updatedHotels[hotelIndex].rooms.filter((_, i) => i !== roomIndex);
    update('hotels', updatedHotels);
  };

  const filteredHotels = availableHotels.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Hotel Search & Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            Select Accommodation <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input 
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Search hotels by name or location..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Dropdown Results */}
            {searchTerm && (
              <div className="absolute z-30 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                {filteredHotels.length > 0 ? (
                  <ul>
                    {filteredHotels.map(hotel => (
                      <li 
                        key={hotel.id}
                        onClick={() => handleAddHotel(hotel)}
                        className="px-4 py-3 hover:bg-primary/5 cursor-pointer text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center justify-between border-b border-gray-50 dark:border-gray-800 last:border-0"
                      >
                        <div className="flex flex-col">
                          <span>{hotel.name}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{hotel.location}</span>
                        </div>
                        {data.some(h => h.id === hotel.id) ? (
                          <span className="material-symbols-outlined text-primary">check_circle</span>
                        ) : (
                          <span className="material-symbols-outlined text-gray-300">add_circle</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-400 font-bold uppercase">No hotels found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Hotel Tags */}
        <div className="flex flex-wrap gap-2">
          {data.map(hotel => (
            <div key={hotel.id} className="flex items-center gap-2 bg-primary text-white text-[10px] font-black uppercase pl-3 pr-1.5 py-1.5 rounded-lg shadow-sm shadow-primary/20">
              <span>{hotel.name}</span>
              <button onClick={() => handleRemoveHotel(hotel.id)} className="hover:bg-white/20 rounded p-0.5 transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Accommodation Detail Cards */}
      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl py-12 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 dark:bg-transparent">
            <span className="material-symbols-outlined text-4xl mb-3 opacity-20">hotel</span>
            <p className="text-xs font-black uppercase tracking-widest">No hotels selected yet</p>
          </div>
        ) : (
          data.map((hotel, hIdx) => (
            <div key={hotel.id} className="overflow-hidden border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-background-dark/30 shadow-sm animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{hotel.name}</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{hotel.location}</p>
                </div>
                <button 
                  onClick={() => handleRemoveHotel(hotel.id)}
                  className="text-[10px] font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg uppercase transition-all"
                >
                  Remove Hotel
                </button>
              </div>

              <div className="p-5 space-y-4">
                {hotel.rooms.map((room, rIdx) => (
                  <div key={room.id} className="relative p-4 border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-background-dark/50 rounded-xl">
                    {hotel.rooms.length > 1 && (
                      <button 
                        onClick={() => removeRoom(hIdx, rIdx)}
                        className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-red-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-tighter">Room Type</label>
                        <select 
                          className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-xs font-bold dark:text-white focus:ring-primary h-10 px-2"
                          value={room.type}
                          onChange={(e) => updateRoom(hIdx, rIdx, 'type', e.target.value)}
                        >
                          <option>Deluxe Room</option>
                          <option>Suite</option>
                          <option>Family Room</option>
                          <option>Penthouse</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-tighter">Max Occupancy</label>
                        <input 
                          className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-xs font-bold dark:text-white h-10 px-3" 
                          type="number" min="1"
                          value={room.occupancy}
                          onChange={(e) => updateRoom(hIdx, rIdx, 'occupancy', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-tighter">Price per Night ($)</label>
                        <input 
                          className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-xs font-bold dark:text-white h-10 px-3" 
                          placeholder="0.00" 
                          type="number"
                          value={room.price}
                          onChange={(e) => updateRoom(hIdx, rIdx, 'price', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                      <label className="block text-[9px] font-black uppercase text-gray-400 mb-3 tracking-tighter">Room Amenities</label>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {['Wi-Fi', 'AC', 'TV', 'Balcony', 'Mini Bar'].map(facility => (
                          <label key={facility} className="group flex items-center gap-2 text-[11px] font-bold text-gray-600 dark:text-gray-400 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={room.facilities.includes(facility)}
                              onChange={(e) => {
                                const nextFac = e.target.checked 
                                  ? [...room.facilities, facility]
                                  : room.facilities.filter(f => f !== facility);
                                updateRoom(hIdx, rIdx, 'facilities', nextFac);
                              }}
                              className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary/20 transition-all" 
                            /> 
                            <span className="group-hover:text-primary transition-colors">{facility}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => handleAddRoom(hIdx)}
                  className="w-full py-3 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl text-[10px] font-black text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-base">add_circle</span> 
                  Add Additional Room Category
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};