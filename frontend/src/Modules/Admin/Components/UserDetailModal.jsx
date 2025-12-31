import React from 'react';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  // Shared status badge logic
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500';
      case 'Pending Approval':
      case 'Pending': return 'bg-amber-500/10 text-amber-500';
      case 'Inactive': return 'bg-rose-500/10 text-rose-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative flex flex-col w-full max-w-2xl bg-background-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-xl font-black text-white tracking-tight">
            {user.role === 'Agent' ? 'Agent Profile' : 'Customer Profile'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-grow p-8 overflow-y-auto scrollbar-hide">
          
          {/* Section: General Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Full Name</label>
              <p className="text-base font-bold text-slate-200">{user.name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Email Address</label>
              <p className="text-base font-bold text-slate-200">{user.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Contact Number</label>
              <p className="text-base font-bold text-slate-200">{user.phone || '+1-202-555-0125'}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Role</label>
              <p className="text-base font-bold text-slate-200">{user.role}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Account Status</label>
              <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full w-fit ${getStatusStyle(user.status)}`}>
                {user.status}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Registration Date</label>
              <p className="text-base font-bold text-slate-200">{user.regDate || '2023-01-15'}</p>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full my-8" />

          {/* Conditional Sections */}
          {user.role === 'Agent' ? (
            /* AGENT SPECIFIC: Submitted Packages */
            <div className="space-y-6 animate-in slide-in-from-top-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory</span>
                Package Submissions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Portfolio Summary</label>
                  <p className="text-sm font-bold text-slate-200">
                    Active: {user.activePackages || 0}, Total: {user.history?.length || 0}
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Managed Properties</label>
                  <p className="text-sm font-bold text-slate-200">{user.managedHotels?.join(', ') || 'N/A'}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Submitted History</h4>
                <div className="space-y-2">
                  {(user.history || []).map((pkg, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/[0.08] transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <span className="material-symbols-outlined text-primary">local_offer</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-200">{pkg}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black">Published</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-mono">2024-12-01</p>
                    </div>
                  ))}
                  {(!user.history || user.history.length === 0) && (
                    <p className="text-center py-4 text-slate-600 text-xs italic">No packages submitted yet.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* CUSTOMER SPECIFIC: Booking History */
            <div className="space-y-6 animate-in slide-in-from-top-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">confirmation_number</span>
                Booking Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Booking Summary</label>
                  <p className="text-sm font-bold text-slate-200">
                    Total: {user.totalBookings || 0}, Upcoming: {user.upcoming || 0}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Package History</h4>
                <div className="space-y-2">
                  {(user.history || []).map((pkg, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/[0.08] transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <span className="material-symbols-outlined text-primary">package_2</span>
                        </div>
                        <p className="text-sm font-bold text-slate-200">{pkg}</p>
                      </div>
                      <p className="text-xs text-slate-500 font-mono">2023-07-20</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center p-6 border-t border-white/5 bg-white/[0.02] gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          {/* <button className="px-8 py-2.5 bg-primary hover:opacity-90 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
            Edit Profile
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;