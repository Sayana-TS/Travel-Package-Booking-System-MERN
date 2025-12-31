import React from 'react';

export const LocationManager = ({ data, update }) => {
  const handleChange = (field, value) => {
    update('location', { ...data, [field]: value });
  };

  return (
    <div className="pt-4 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview Section */}
        <div className="bg-background-light dark:bg-background-dark/30 p-5 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col h-full">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
            <span className="text-base">🏞️</span>
            <span>Location Overview</span>
          </label>
          <div className="relative flex-1 flex flex-col">
            <textarea 
              className="w-full flex-1 rounded-xl border-gray-200 dark:border-gray-700 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary bg-white dark:bg-background-dark text-sm dark:text-white transition-all p-4 outline-none resize-none" 
              id="location-overview-textarea" 
              maxLength="500" 
              placeholder="e.g., Nestled in the heart of the Himalayas, this location offers breathtaking panoramic views..." 
              rows="12"
              value={data.overview}
              onChange={(e) => handleChange('overview', e.target.value)}
            />
            <div className="absolute bottom-3 right-4 px-2 py-1 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm rounded-md border border-gray-100 dark:border-gray-800">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                {data.overview?.length || 0} / 500
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-background-light dark:bg-background-dark/30 p-5 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Destination Map</label>
              <span className="material-symbols-outlined text-base text-primary/60 cursor-help" title="Enter destination name or coordinates to show map.">help</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                className="w-full h-11 px-4 rounded-xl border-gray-200 dark:border-gray-700 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary bg-white dark:bg-background-dark text-sm dark:text-white transition-all outline-none" 
                placeholder="Map URL or Address" 
                type="text"
                id="location-map-url"
                value={data.mapUrl}
                onChange={(e) => handleChange('mapUrl', e.target.value)}
              />
              <button 
                type="button"
                className="flex items-center justify-center gap-2 text-[10px] font-black text-primary hover:text-white whitespace-nowrap px-6 h-11 rounded-xl border-2 border-primary/30 hover:bg-primary transition-all uppercase tracking-widest active:scale-95"
              >
                <span>📍</span>
                <span>Get Coordinates</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <input 
                className="w-full h-11 px-4 rounded-xl border-gray-200 dark:border-gray-700 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary bg-white dark:bg-background-dark text-sm dark:text-white transition-all outline-none" 
                placeholder="Latitude" 
                type="number"
                id="location-lat"
                value={data.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
              />
              <input 
                className="w-full h-11 px-4 rounded-xl border-gray-200 dark:border-gray-700 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary bg-white dark:bg-background-dark text-sm dark:text-white transition-all outline-none" 
                placeholder="Longitude" 
                type="number"
                id="location-lng"
                value={data.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
              />
            </div>
          </div>

          {/* Map Preview Placeholder */}
          <div className="aspect-video w-full bg-gray-50 dark:bg-gray-900/50 rounded-2xl shadow-inner flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors hover:border-primary/30">
            <div className="text-center z-10 transition-all duration-500 group-hover:translate-y-[-2px]">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-2xl text-primary">map</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Map Preview Area</p>
              {data.mapUrl && <p className="text-[9px] font-bold text-primary mt-1 uppercase italic">URL Linked Successfully</p>}
            </div>
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-light.png')]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};