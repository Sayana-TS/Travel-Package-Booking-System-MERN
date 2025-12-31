import React from 'react';

export const ActivitiesManager = ({ data = [], update }) => {
  const addActivity = () => {
    update('activities', [
      ...data, 
      { 
        id: Date.now(), 
        name: "", 
        description: "", 
        duration: "", 
        durationUnit: "Hours", 
        timing: "",
        image: null // Added image field
      }
    ]);
  };

  const removeActivity = (id) => {
    update('activities', data.filter((activity) => activity.id !== id));
  };

  const handleChange = (id, field, value) => {
    const newActivities = data.map(activity => {
      if (activity.id === id) {
        return { ...activity, [field]: value };
      }
      return activity;
    });
    update('activities', newActivities);
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange(id, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isRowComplete = (act) => 
    act.name?.trim() !== "" && 
    act.description?.trim() !== "" && 
    act.duration?.toString().trim() !== "";

  return (
    <div className="flex flex-col gap-6 w-full">
      {data.map((activity, index) => (
        <div 
          key={activity.id || index} 
          className="group p-4 md:p-5 border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-background-dark/30 relative transition-all hover:shadow-md animate-in fade-in slide-in-from-top-2"
        >
          {/* Header Row */}
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-2">
               <span className="flex items-center justify-center bg-primary/10 text-primary text-[10px] font-black w-6 h-6 rounded-md">
                 {index + 1}
               </span>
               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Activity Details</h4>
            </div>
            
            {data.length > 1 && (
              <button 
                onClick={() => removeActivity(activity.id)}
                className="flex items-center gap-1 text-[10px] font-black uppercase text-red-400 hover:text-red-600 transition-colors py-1 px-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                <span className="hidden xs:inline">Remove</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Image Upload Field */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                Activity Image
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  {activity.image ? (
                    <>
                      <img src={activity.image} alt="Activity" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => handleChange(activity.id, 'image', null)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </>
                  ) : (
                    <span className="material-symbols-outlined text-gray-400 text-3xl">image</span>
                  )}
                </div>
                <div className="flex-1 w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-100 dark:border-gray-800 border-dashed rounded-2xl cursor-pointer bg-white dark:bg-background-dark/30 hover:bg-gray-50 dark:hover:bg-background-dark transition-all">
                    <div className="flex flex-col items-center justify-center py-2">
                      <span className="material-symbols-outlined text-primary mb-1">upload_file</span>
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">Click to upload image</p>
                      <p className="text-[9px] text-gray-400 uppercase font-medium">PNG, JPG (Max 2MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(activity.id, e)} />
                  </label>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                Activity Name <span className="text-red-500">*</span>
              </label>
              <input 
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-sm dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all py-2.5 px-4" 
                type="text" 
                value={activity.name}
                onChange={(e) => handleChange(activity.id, 'name', e.target.value)}
                placeholder="e.g., Sunrise Paragliding over Valley"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                className={`w-full rounded-xl border bg-white dark:bg-background-dark text-sm dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all py-2.5 px-4 ${!activity.description && activity.name ? 'border-red-200' : 'border-gray-200 dark:border-gray-700'}`} 
                placeholder="Briefly describe what the traveler will experience..." 
                rows="3"
                value={activity.description}
                onChange={(e) => handleChange(activity.id, 'description', e.target.value)}
              />
            </div>

            {/* Duration */}
            <div className="w-full">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                Approx. Duration <span className="text-red-500">*</span>
              </label>
              <div className="flex w-full">
                <input 
                  className="flex-1 min-w-0 rounded-l-xl border-gray-200 dark:border-gray-700 border-r-0 bg-white dark:bg-background-dark text-sm dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary py-2.5 px-4" 
                  placeholder="2" 
                  type="number"
                  min="0"
                  value={activity.duration}
                  onChange={(e) => handleChange(activity.id, 'duration', e.target.value)}
                />
                <select 
                  className="w-24 sm:w-28 rounded-r-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-black uppercase tracking-tighter dark:text-white focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  value={activity.durationUnit}
                  onChange={(e) => handleChange(activity.id, 'durationUnit', e.target.value)}
                >
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                  <option value="Mins">Mins</option>
                </select>
              </div>
            </div>

            {/* Timing */}
            <div className="w-full">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                Preferred Timing
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">schedule</span>
                <input 
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-sm dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary py-2.5 pl-10 pr-4" 
                  placeholder="e.g., 09:00 AM" 
                  type="text"
                  value={activity.timing}
                  onChange={(e) => handleChange(activity.id, 'timing', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Footer Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-dashed border-gray-200 dark:border-gray-800">
        <button 
          type="button"
          onClick={addActivity}
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 py-3.5 px-8 rounded-xl transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span> 
          Add New Activity
        </button>
        <p className="text-[10px] font-bold text-gray-400 uppercase italic text-center sm:text-right max-w-[200px] leading-relaxed">
          Tip: Detailed activities increase booking conversion by 30%.
        </p>
      </div>
    </div>
  );
};