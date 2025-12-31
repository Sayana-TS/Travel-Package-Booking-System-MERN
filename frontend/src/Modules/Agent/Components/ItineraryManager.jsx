import React from 'react';

export const ItineraryManager = ({ data = [], update }) => {
  const addDay = () => {
    const nextDayNumber = data.length + 1;
    update('itinerary', [
      ...data, 
      { 
        tempId: Date.now(), // Unique ID for keying and API handling
        day: nextDayNumber, 
        title: "", 
        description: "" 
      }
    ]);
  };

  const removeDay = (index) => {
    // Filter out the day and then re-map to fix the sequence (Day 1, 2, 3...)
    const newData = data
      .filter((_, i) => i !== index)
      .map((item, i) => ({
        ...item,
        day: i + 1
      }));
    update('itinerary', newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    update('itinerary', newData);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Itinerary Timeline Container */}
      {/* Mobile: reduced margin-left; Tablet+: ml-4 */}
      <div className="relative flex flex-col gap-6 md:gap-8 ml-3 sm:ml-4 border-l-2 border-dashed border-gray-100 dark:border-gray-800">
        {data.map((item, index) => (
          <div 
            key={item.tempId || index} 
            className="relative pl-6 sm:pl-8 animate-in fade-in slide-in-from-left-4 duration-300"
          >
            {/* Timeline Node Icon */}
            <div className="absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white shadow-lg shadow-primary/20 ring-4 ring-white dark:ring-background-dark z-10">
              <span className="text-[10px] font-black">{item.day}</span>
            </div>

            {/* Day Card */}
            <div className="group p-4 sm:p-5 bg-white dark:bg-background-dark/40 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-primary/20 w-full">
              
              {/* Header Actions */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50 dark:border-gray-800 gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 truncate">
                  Plan for Day {item.day}
                </span>
                {data.length > 1 && (
                  <button 
                    onClick={() => removeDay(index)}
                    className="flex items-center gap-1 text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-colors shrink-0 p-1"
                    title="Remove Day"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                    <span className="hidden xs:inline">Remove</span>
                  </button>
                )}
              </div>

              {/* Input Fields */}
              <div className="space-y-5">
                {/* Title */}
                <div className="w-full">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Day Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-sm font-bold dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all py-2.5 px-4" 
                    placeholder="e.g., Sunrise Trek..." 
                    type="text" 
                    value={item.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Activities & Description <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    className={`w-full rounded-xl border bg-white dark:bg-background-dark text-sm dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all py-3 px-4 min-h-[100px] ${!item.description && item.title ? 'border-red-200 ring-1 ring-red-50' : 'border-gray-200 dark:border-gray-700'}`} 
                    placeholder="Provide a detailed breakdown of the day's events..." 
                    rows="4"
                    value={item.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                  />
                  {!item.description && item.title && (
                    <p className="text-red-500 text-[9px] mt-2 font-black uppercase tracking-tighter flex items-start sm:items-center gap-1 leading-tight">
                      <span className="material-symbols-outlined text-xs shrink-0">error</span>
                      Description is required for the customer view.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full">
        <button 
          onClick={addDay}
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-black text-white bg-primary hover:bg-primary-dark py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-widest"
        >
          <span className="material-symbols-outlined">add_circle</span> 
          Add Next Day
        </button>
        <p className="text-[10px] font-bold text-gray-400 uppercase italic text-center sm:text-left leading-relaxed max-w-xs sm:max-w-none">
          Maximum clarity in itinerary leads to fewer support queries.
        </p>
      </div>
    </div>
  );
};