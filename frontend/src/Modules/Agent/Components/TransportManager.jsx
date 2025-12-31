import React from 'react';

export const TransportManager = ({ data = [], update }) => {
  const serviceOptions = ["Airport Pickup / Drop", "Local Transfers", "Shuttle Service"];
  const vehicleOptions = ["Car", "Van", "Bus", "Private Transfer", "Flight", "Train"];

  const addTransport = () => {
    update('transportation', [...data, { 
      tempId: Date.now(),
      services: [], 
      vehicleType: "Car", 
      schedule: "", 
      duration: "", 
      durationUnit: "hours", 
      locations: "", 
      notes: "" 
    }]);
  };

  const removeTransport = (id) => {
    update('transportation', data.filter((item) => item.tempId !== id));
  };

  const handleChange = (id, field, value) => {
    const newData = data.map(item => 
      item.tempId === id ? { ...item, [field]: value } : item
    );
    update('transportation', newData);
  };

  const toggleService = (id, service) => {
    const newData = data.map(item => {
      if (item.tempId === id) {
        const services = item.services.includes(service)
          ? item.services.filter(s => s !== service)
          : [...item.services, service];
        return { ...item, services };
      }
      return item;
    });
    update('transportation', newData);
  };

  const getVehicleIcon = (type) => {
    switch(type) {
      case 'Flight': return 'flight';
      case 'Train': return 'train';
      case 'Bus': return 'directions_bus';
      case 'Van': return 'airport_shuttle';
      default: return 'directions_car';
    }
  };

  const isCardComplete = (item) => {
    return (
      item.services.length > 0 &&
      item.schedule.trim() !== "" &&
      item.duration.toString().trim() !== "" &&
      item.locations.trim() !== ""
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {data.map((item, index) => {
        const completed = isCardComplete(item);
        
        return (
          <div 
            key={item.tempId || index} 
            className={`group p-4 sm:p-5 border rounded-2xl bg-white dark:bg-background-dark/30 relative transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
              completed 
              ? 'border-green-500/50 shadow-md ring-1 ring-green-500/10' 
              : 'border-gray-100 dark:border-gray-800 hover:border-primary/20 shadow-sm'
            }`}
          >
            {/* Header Action Bar */}
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50 dark:border-gray-800 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className={`material-symbols-outlined p-2 rounded-lg transition-colors shrink-0 ${completed ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'}`}>
                  {completed ? 'check_circle' : getVehicleIcon(item.vehicleType)}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 truncate">
                    Transport Leg #{index + 1}
                  </span>
                  {completed && (
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">Ready for API</span>
                  )}
                </div>
              </div>
              
              {data.length > 1 && (
                <button 
                  onClick={() => removeTransport(item.tempId)}
                  className="flex items-center gap-1 text-[10px] font-black uppercase text-red-400 hover:text-red-600 transition-colors shrink-0 p-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">delete_sweep</span>
                  <span className="hidden xs:inline">Remove</span>
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Service Selection */}
              <div className="w-full">
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-3 ${item.services.length === 0 ? 'text-orange-500' : 'text-gray-500'}`}>
                  Inclusion Services {item.services.length === 0 && <span className="italic">(Pick at least one)</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map(service => {
                    const isActive = item.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(item.tempId, service)}
                        className={`px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-[11px] font-bold uppercase transition-all border-2 flex-1 sm:flex-none text-center ${
                          isActive 
                          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                          : 'border-gray-100 dark:border-gray-700 text-gray-400 hover:border-primary/30'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Vehicle Category</label>
                  <select 
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-sm font-bold dark:text-white focus:ring-2 focus:ring-primary/20 h-11 px-4 outline-none"
                    value={item.vehicleType}
                    onChange={(e) => handleChange(item.tempId, 'vehicleType', e.target.value)}
                  >
                    {vehicleOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Departure Schedule</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">event_repeat</span>
                    <input 
                      className={`w-full rounded-xl bg-white dark:bg-background-dark text-sm dark:text-white pl-10 h-11 transition-all outline-none ${!item.schedule ? 'border-orange-200 border focus:border-orange-400' : 'border-gray-200 border dark:border-gray-700'}`} 
                      placeholder="e.g., Terminal 3 pickup at 10 AM" 
                      type="text"
                      value={item.schedule}
                      onChange={(e) => handleChange(item.tempId, 'schedule', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Travel Duration</label>
                  <div className="flex">
                    <input 
                      className={`flex-1 min-w-0 rounded-l-xl border-r-0 bg-white dark:bg-background-dark text-sm font-bold dark:text-white h-11 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none border ${!item.duration ? 'border-orange-200' : 'border-gray-200 dark:border-gray-700'}`} 
                      placeholder="e.g., 2" 
                      type="number"
                      value={item.duration}
                      onChange={(e) => handleChange(item.tempId, 'duration', e.target.value)}
                    />
                    <select 
                      className="w-24 sm:w-28 rounded-r-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[10px] font-black uppercase tracking-tighter dark:text-white outline-none"
                      value={item.durationUnit}
                      onChange={(e) => handleChange(item.tempId, 'durationUnit', e.target.value)}
                    >
                      <option value="hours">Hours</option>
                      <option value="minutes">Mins</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Route (From - To)</label>
                  <input 
                    className={`w-full rounded-xl bg-white dark:bg-background-dark text-sm dark:text-white h-11 px-4 transition-all outline-none border ${!item.locations ? 'border-orange-200 focus:border-orange-400' : 'border-gray-200 dark:border-gray-700'}`} 
                    placeholder="e.g., Airport to Beach Resort" 
                    type="text"
                    value={item.locations}
                    onChange={(e) => handleChange(item.tempId, 'locations', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Driver / Transfer Notes (Optional)</label>
                  <textarea 
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-sm dark:text-white py-3 px-4 min-h-[80px] outline-none" 
                    placeholder="Mention driver contact info or luggage notes..." 
                    rows="2"
                    value={item.notes}
                    onChange={(e) => handleChange(item.tempId, 'notes', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button 
        onClick={addTransport}
        className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-black text-white bg-primary hover:bg-primary-dark py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-widest"
      >
        <span className="material-symbols-outlined">add_circle</span> 
        Add New Transport Leg
      </button>
    </div>
  );
};