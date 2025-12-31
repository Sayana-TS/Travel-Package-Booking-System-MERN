import React, { useState, useEffect } from 'react';

export const BasicInfo = ({ data, update, errors = {} }) => {
    const inputBase = "w-full rounded-xl shadow-sm bg-white dark:bg-background-dark text-base md:text-sm dark:text-white transition-all p-3 md:p-2.5 outline-none appearance-none";
    const inputBorder = "border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary";
    const inputError = "border border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500";
    
    // Dynamic Calendar State
    const [viewDate, setViewDate] = useState(new Date()); // Controls which month is shown

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handleDateClick = (day, monthIdx, year) => {
      const clickedDate = new Date(year, monthIdx, day);
      const clickedTime = clickedDate.setHours(0, 0, 0, 0);
    
      const start = data.startDate;
      const end = data.endDate;
    
      if (!start || (start && end)) {
        update('startDate', clickedTime);
        update('endDate', null);
      } else {
        if (clickedTime < start) {
          update('startDate', clickedTime);
        } else {
          update('endDate', clickedTime);
        }
      }
    };

    // Helper to format the timestamp for the UI labels
    const formatDisplayDate = (timestamp) => {
        if (!timestamp) return "Select date";
        const d = new Date(timestamp);
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };
    

    const getDayClass = (day, monthIdx, year) => {
        const current = new Date(year, monthIdx, day).getTime();
        const start = data.startDate ? new Date(data.startDate).getTime() : null;
        const end = data.endDate ? new Date(data.endDate).getTime() : null;

        const base = "h-9 w-full flex items-center justify-center transition-all text-sm ";
        
        if (current === start && end) return base + "bg-primary text-white rounded-l-xl font-bold";
        if (current === start) return base + "bg-primary text-white rounded-xl font-bold";
        if (current === end) return base + "bg-primary text-white rounded-r-xl font-bold";
        if (start && end && current > start && current < end) {
            return base + "bg-primary/20 dark:bg-primary/30 text-primary-dark dark:text-white";
        }
        return base + "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg dark:text-white";
    };

    const renderMonth = (offset) => {
        const date = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        const year = date.getFullYear();
        const monthIdx = date.getMonth();
        const daysCount = getDaysInMonth(year, monthIdx);
        const firstDay = getFirstDayOfMonth(year, monthIdx);
        const prevMonthDays = getDaysInMonth(year, monthIdx - 1);

        return (
            <div className="flex-1 min-w-[280px]">
                <div className="flex items-center justify-between mb-4 px-2">
                    {offset === 0 ? (
                        <button type="button" onClick={() => setViewDate(new Date(year, monthIdx - 1, 1))} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                    ) : <div className="w-8" />}
                    
                    <h3 className="text-sm font-black dark:text-white uppercase tracking-widest">
                        {months[monthIdx]} {year}
                    </h3>

                    {offset === 1 ? (
                        <button type="button" onClick={() => setViewDate(new Date(year, monthIdx, 1))} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    ) : <div className="w-8" />}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-400 font-black mb-2">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {[...Array(firstDay).keys()].map(i => (
                        <div key={`prev-${i}`} className="h-9 flex items-center justify-center text-gray-300 dark:text-gray-700">
                            {prevMonthDays - firstDay + i + 1}
                        </div>
                    ))}
                    {[...Array(daysCount).keys()].map(i => (
                        <button 
                            key={i+1} 
                            type="button" 
                            onClick={() => handleDateClick(i+1, monthIdx, year)}
                            className={getDayClass(i+1, monthIdx, year)}
                        >
                            {i+1}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-500">Package Name *</label>
          <input 
            className={`${inputBase} ${errors.packageName ? inputError : inputBorder}`}
            type="text" 
            value={data.packageName || ""}
            onChange={(e) => update('packageName', e.target.value)}
          />
        </div>
  
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-500">Destination *</label>
          <input 
            className={`${inputBase} ${!data.destination ? inputError : inputBorder}`}
            type="text" 
            value={data.destination || ""}
            onChange={(e) => update('destination', e.target.value)}
          />
        </div>
  
        <div className="col-span-1 md:col-span-2 space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-500">Travel Dates *</label>
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark/30 p-4 md:p-6 shadow-inner">
            <div className="flex flex-col lg:flex-row gap-12 overflow-hidden">
                {renderMonth(0)}
                <div className="hidden lg:block border-l border-gray-100 dark:border-gray-800" />
                {renderMonth(1)}
            </div>
  
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><span className="material-symbols-outlined text-sm">calendar_today</span></div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase">Starts</label>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {formatDisplayDate(data.startDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><span className="material-symbols-outlined text-sm">event_available</span></div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase">Ends</label>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {formatDisplayDate(data.endDate)}
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
  
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-500">Total Travelers</label>
          <div className="relative flex items-center">
            <input 
              className={`${inputBase} ${inputBorder}`}
              type="number" 
              value={data.travelers || ""}
              onChange={(e) => update('travelers', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
};