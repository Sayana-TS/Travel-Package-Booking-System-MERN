import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, trend, isPositive, icon: Icon }) => (
  <div className="bg-white/[0.03] border border-white/5 p-4 sm:p-6 rounded-2xl hover:border-[#056bd1]/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-[#056bd1]/10 rounded-lg text-[#056bd1]">
        <Icon size={18} />
      </div>
      <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trend}
      </div>
    </div>
    <p className="text-xs sm:text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{label}</p>
    <p className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">{value}</p>
  </div>
);

export default StatCard;