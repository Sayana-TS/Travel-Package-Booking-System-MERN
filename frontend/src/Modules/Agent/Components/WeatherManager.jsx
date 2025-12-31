import React from 'react';

export const WeatherManager = ({ data, update }) => {
  const weatherOptions = ["☀️ Sunny", "🌤️ Partly Cloudy", "🌧️ Rainy", "⛈️ Stormy", "🌫️ Foggy", "❄️ Snowy"];

  const handleDayChange = (index, field, value) => {
    const newDays = [...data.days];
    newDays[index][field] = value;
    
    // Auto-calculate average temperature if temp changes
    let newAvg = data.avgTemp;
    if (field === 'temp') {
      const temps = newDays.map(d => parseFloat(d.temp)).filter(t => !isNaN(t));
      newAvg = temps.length ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1) : "";
    }

    update('weather', { ...data, days: newDays, avgTemp: newAvg });
  };

  const addDay = () => {
    const lastDate = new Date(data.days[data.days.length - 1]?.date || '2025-12-28');
    lastDate.setDate(lastDate.getDate() + 1);
    const nextDate = lastDate.toISOString().split('T')[0];
    
    update('weather', {
      ...data,
      days: [...data.days, { 
        id: Date.now(), // Added for stable React keys
        date: nextDate, 
        condition: "☀️ Sunny", 
        temp: "", 
        humidity: "", 
        wind: "", 
        note: "" 
      }]
    });
  };

  const removeDay = (index) => {
    update('weather', { ...data, days: data.days.filter((_, i) => i !== index) });
  };

  // Helper to check if a day's mandatory fields are filled
  const isDayComplete = (day) => day.condition && day.temp;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">cloudy_snowing</span> 
          Weather Forecast
        </h3>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
          {data.days.length} Days Planned
        </span>
      </div>

      <div className="space-y-4">
        {data.days.map((day, idx) => {
          const completed = isDayComplete(day);
          return (
            <div 
              key={day.id || idx} // Stable key to prevent focus loss
              className={`bg-white dark:bg-card-dark p-5 rounded-2xl border transition-all duration-300 ${
                completed ? 'border-green-500/30 shadow-md' : 'border-gray-100 dark:border-gray-800 shadow-sm'
              } relative group animate-in fade-in slide-in-from-top-2`}
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${completed ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}`} />
                  <h4 className="text-[11px] font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">
                    Day {idx + 1} — <span className="text-primary">{day.date}</span>
                  </h4>
                </div>
                <button 
                  onClick={() => removeDay(idx)} 
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">delete_outline</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-tight text-gray-500">Condition *</label>
                  <select 
                    className="w-full h-11 px-3 rounded-xl text-sm font-bold bg-gray-50 dark:bg-background-dark border-gray-200 dark:border-gray-700 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
                    value={day.condition}
                    onChange={(e) => handleDayChange(idx, 'condition', e.target.value)}
                  >
                    <option value="">Select...</option>
                    {weatherOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-tight text-gray-500">Temp (°C) *</label>
                  <input 
                    type="number" 
                    className="w-full h-11 px-4 rounded-xl text-sm font-bold bg-gray-50 dark:bg-background-dark border-gray-200 dark:border-gray-700 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    value={day.temp}
                    placeholder="25"
                    onChange={(e) => handleDayChange(idx, 'temp', e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-tight text-gray-500">Humidity (%)</label>
                  <input 
                    type="number" 
                    className="w-full h-11 px-4 rounded-xl text-sm font-bold bg-gray-50 dark:bg-background-dark border-gray-200 dark:border-gray-700 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    value={day.humidity}
                    placeholder="60"
                    onChange={(e) => handleDayChange(idx, 'humidity', e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-tight text-gray-500">Wind (km/h)</label>
                  <input 
                    type="number" 
                    className="w-full h-11 px-4 rounded-xl text-sm font-bold bg-gray-50 dark:bg-background-dark border-gray-200 dark:border-gray-700 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    value={day.wind}
                    placeholder="10"
                    onChange={(e) => handleDayChange(idx, 'wind', e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4 space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-tight text-gray-400">Activity Note</label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-4 rounded-xl text-sm bg-gray-50 dark:bg-background-dark border-gray-200 dark:border-gray-700 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    value={day.note}
                    placeholder="e.g., Clear skies in the morning, perfect for trekking"
                    onChange={(e) => handleDayChange(idx, 'note', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={addDay} 
        className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-primary/5 hover:bg-primary text-primary hover:text-white text-[11px] font-black uppercase tracking-widest transition-all active:scale-95"
      >
        <span className="material-symbols-outlined">add_circle</span> Add Forecast Day
      </button>

      <div className="pt-8 mt-4 border-t border-gray-100 dark:border-gray-800">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Summary Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase text-gray-500">Avg Temperature</label>
            <div className="relative">
              <input 
                className="w-full h-12 px-4 rounded-xl bg-gray-100 dark:bg-gray-800/50 border-transparent text-sm font-black text-primary cursor-not-allowed transition-all" 
                value={data.avgTemp}
                placeholder="---"
                readOnly
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-[10px] font-black text-gray-400">°C</span>
            </div>
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-[10px] font-black uppercase text-gray-500">Seasonal Context</label>
            <textarea 
              className="w-full rounded-xl bg-white dark:bg-background-dark border-gray-200 dark:border-gray-700 p-4 text-sm dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
              value={data.seasonalNotes}
              placeholder="Describe the overall weather pattern for this time of year..."
              rows="3"
              onChange={(e) => update('weather', { ...data, seasonalNotes: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};