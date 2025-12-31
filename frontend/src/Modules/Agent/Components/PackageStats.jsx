import React from 'react';

const PackageStats = ({ config }) => {
  // config should be an array of { label, value, color }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {config.map((card, idx) => (
        <div 
          key={idx} 
          className="flex flex-col gap-2 rounded-xl p-6 border border-white/5 bg-white/[0.02] shadow-sm hover:bg-white/[0.04] transition-colors"
        >
          <p className="text-slate-400 text-sm font-medium">{card.label}</p>
          <p className={`tracking-tight text-3xl font-bold ${card.color || 'text-white'}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PackageStats;