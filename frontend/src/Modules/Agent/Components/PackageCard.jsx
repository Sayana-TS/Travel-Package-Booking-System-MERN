import React from 'react';

const PackageCard = ({ pkg, onView, onEdit, onDelete }) => {
  const statusStyles = {
    pending: 'bg-pending/80 text-white',
    active: 'bg-active/80 text-white',
    upcoming: 'bg-upcoming/80 text-white',
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <div 
          className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-500 hover:scale-110" 
          style={{ backgroundImage: `url(${pkg.imageUrl})` }}
        />
        <span className={`absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg ${statusStyles[pkg.status]}`}>
          {pkg.status}
        </span>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight line-clamp-1">{pkg.title}</p>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <p className="text-xs font-medium">{pkg.location}</p>
        </div>
        
        <div className="mt-3 space-y-1">
          <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm opacity-70">calendar_month</span>
            {pkg.startDate} - {pkg.endDate}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-tighter">
            Submitted: {pkg.submittedDate}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end items-center gap-1">
          <button onClick={() => onView(pkg)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View">
            <span className="material-symbols-outlined text-lg">visibility</span>
          </button>
          <button onClick={() => onEdit(pkg)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button onClick={() => onDelete(pkg.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard