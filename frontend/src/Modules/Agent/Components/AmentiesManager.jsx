import React, { useState } from 'react';

export const AmenitiesManager = ({ data = [], update }) => {
  const [customInput, setCustomInput] = useState("");

  const defaultAmenities = [
    { id: "wifi", label: "Free Wi-Fi", icon: "wifi" },
    { id: "breakfast", label: "Breakfast", icon: "free_breakfast" },
    { id: "pool", label: "Pool", icon: "pool" },
    { id: "gym", label: "Fitness Center", icon: "fitness_center" },
    { id: "parking", label: "Parking", icon: "local_parking" },
    { id: "ac", label: "AC", icon: "ac_unit" },
    { id: "pets", label: "Pet-Friendly", icon: "pets" },
    { id: "spa", label: "Spa", icon: "spa" },
  ];

  const toggleAmenity = (id) => {
    const newData = data.includes(id) 
      ? data.filter(item => item !== id) 
      : [...data, id];
    update('amenities', newData);
  };

  const addCustomAmenity = () => {
    const cleanInput = customInput.trim();
    if (cleanInput && !data.includes(cleanInput)) {
      update('amenities', [...data, cleanInput]);
      setCustomInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomAmenity();
    }
  };

  const customAmenities = data.filter(id => !defaultAmenities.find(a => a.id === id));

  return (
    <div className="flex flex-col gap-8">
      {/* Grid Selection */}
      <div className="space-y-4">
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
          Standard Amenities <span className="text-red-500">*</span>
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {defaultAmenities.map((amenity) => {
            const isChecked = data.includes(amenity.id);
            return (
              <button 
                key={amenity.id}
                type="button"
                onClick={() => toggleAmenity(amenity.id)}
                aria-checked={isChecked}
                role="checkbox"
                className={`group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 outline-none
                  ${isChecked 
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/10' 
                    : 'border-gray-100 dark:border-gray-800 hover:border-primary/30 bg-white dark:bg-background-dark/30 hover:shadow-md'
                  }`}
              >
                <span className={`material-symbols-outlined text-3xl transition-transform duration-300 group-active:scale-90 ${isChecked ? 'text-primary' : 'text-gray-400'}`}>
                  {amenity.icon}
                </span>
                <span className={`text-[11px] font-black uppercase tracking-tight text-center ${isChecked ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                  {amenity.label}
                </span>
                
                {isChecked && (
                  <div className="absolute -top-1.5 -right-1.5 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white dark:border-background-dark animate-in zoom-in duration-300">
                    <span className="material-symbols-outlined text-[14px] font-black">check</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Amenity Management */}
      <div className="space-y-4 p-5 rounded-3xl bg-gray-50/50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2" htmlFor="custom-amenity">
            Additional Unique Amenities
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-primary transition-colors">edit_note</span>
              <input 
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark pl-10 pr-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                id="custom-amenity" 
                placeholder="e.g., Rooftop Lounge or Private Cinema" 
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button 
              type="button"
              onClick={addCustomAmenity}
              className="px-6 rounded-xl bg-gray-900 dark:bg-primary text-white text-xs font-black uppercase hover:bg-black dark:hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none"
            >
              Add
            </button>
          </div>
        </div>
        
        {/* Custom Tags Display */}
        {customAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {customAmenities.map(custom => (
              <div 
                key={custom} 
                className="flex items-center gap-2 bg-white dark:bg-background-dark text-gray-700 dark:text-gray-300 text-[11px] font-black uppercase pl-3 pr-1.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-left-2"
              >
                <span>{custom}</span>
                <button 
                  type="button"
                  onClick={() => toggleAmenity(custom)} 
                  className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Ready Helper Text */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
        <span className="material-symbols-outlined text-primary text-xl">info</span>
        <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400 leading-relaxed">
          Amenities listed here will be used as filters for potential customers. 
          Ensure you select at least 3 items to optimize your visibility in search results.
        </p>
      </div>
    </div>
  );
};