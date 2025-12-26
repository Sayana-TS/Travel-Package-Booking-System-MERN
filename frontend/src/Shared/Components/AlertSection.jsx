import React from 'react';
import { Bell } from 'lucide-react';

const AlertItem = ({ title, message, isActive }) => (
  <div className={`bg-[#0f1923] p-3 sm:p-4 rounded-xl border border-white/5 flex items-start gap-3 sm:gap-4 ${!isActive && 'opacity-60'}`}>
    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 shrink-0 ${isActive ? 'bg-[#056bd1] animate-pulse' : 'bg-slate-600'}`} />
    <div>
      <p className="text-xs sm:text-sm font-bold text-white">{title}</p>
      <p className="text-[10px] sm:text-xs text-slate-400">{message}</p>
    </div>
  </div>
);

const AlertSection = ({ alerts }) => (
  <section className="bg-[#056bd1]/5 border border-[#056bd1]/20 rounded-2xl p-4 sm:p-6">
    <div className="flex items-center gap-3 mb-4 sm:mb-6">
      <div className="p-2 bg-[#056bd1] rounded-lg text-white">
        <Bell size={18} />
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-white">System Alerts</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {alerts.map((alert, index) => (
        <AlertItem key={index} {...alert} />
      ))}
    </div>
  </section>
);

export default AlertSection;