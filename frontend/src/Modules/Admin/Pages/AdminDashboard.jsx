import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AgentLayout from '../../../Shared/layouts/AgentLayout'; 
import PackageStats from '../../Agent/Components/PackageStats'; 

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Functional state for alerts to allow 'Clear All' functionality
  const [dashboardData, setDashboardData] = useState({
    customersCount: '1,234',
    totalPackages: '78',
    totalBookings: '123',
    revenue: '$1234',
    activities: [
      { id: 'PKG-1021', agent: 'Skyline Travels', packageName: 'Exotic Bali Escape', date: 'Oct 29, 2025', status: 'Pending' },
      { id: 'PKG-1022', agent: 'Global Tours', packageName: 'Alpine Ski Adventure', date: 'Oct 28, 2025', status: 'Confirmed' },
      { id: 'PKG-1023', agent: 'Elite Getaways', packageName: 'Desert Safari Luxe', date: 'Oct 27, 2025', status: 'Confirmed' },
      { id: 'PKG-1024', agent: 'Nomad Soul', packageName: 'Tokyo Neon Nights', date: 'Oct 26, 2025', status: 'Cancelled' },
    ],
    alerts: [
      { id: 1, type: 'critical', title: 'High-Priority Support', desc: '#12345 - Login Issue', icon: 'error' },
      { id: 2, type: 'warning', title: 'Approval Required', desc: 'Booking ID: #67890', icon: 'hourglass_top' },
      { id: 3, type: 'info', title: 'New Package Submitted', desc: '"Summer Getaway" by AgentX', icon: 'task_alt' },
    ]
  });

  // Handler to clear notifications
  const clearNotifications = () => {
    setDashboardData(prev => ({ ...prev, alerts: [] }));
  };

  const adminStatsConfig = [
    { label: 'Total Customers', value: dashboardData.customersCount, color: 'text-white' },
    { label: 'Total Packages', value: dashboardData.totalPackages, color: 'text-emerald-500' },
    { label: 'Bookings', value: dashboardData.totalBookings, color: 'text-primary' },
    { label: 'Revenue', value: dashboardData.revenue, color: 'text-primary' },
  ];

  return (
    <AgentLayout role="admin">
      {/* Container with responsive padding */}
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
        
        {/* Overview Header & Stats */}
        <section>
          <div className="flex items-end gap-3 mb-6 px-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/20">System Overview</h2>
            <div className="h-px flex-grow bg-white/5 mb-1"></div>
          </div>
          <PackageStats config={adminStatsConfig} />
        </section>

        {/* Responsive Grid: Stacks on mobile/tablet, 3-cols on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* RECENT PACKAGE SUBMISSIONS TABLE */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-2 flex-wrap gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Recent Submissions</h3>
              <button 
                onClick={() => navigate('/admin/packages')}
                className="text-[10px] font-bold text-primary hover:opacity-80 transition-opacity uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10"
              >
                View All Packages
              </button>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
              {/* Horizontal scroll container for small screens */}
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-white/[0.03] border-b border-white/5">
                    <tr>
                      {['Agent', 'Package Name', 'Submitted Date', 'Status'].map((header) => (
                        <th key={header} className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {dashboardData.activities.map((item) => (
                      <tr 
                        key={item.id}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.agent}</p>
                          <p className="text-[10px] font-mono text-slate-500 uppercase">{item.id}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{item.packageName}</td>
                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">{item.date}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full tracking-tighter inline-block ${
                            item.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500' :
                            item.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 
                            'bg-rose-500/10 text-rose-500'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SYSTEM ALERTS SECTION */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight px-2">System Alerts</h3>
            <div className="space-y-3">
              {dashboardData.alerts.length > 0 ? (
                dashboardData.alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 items-start group hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${
                      alert.type === 'critical' ? 'bg-rose-500/10 text-rose-500' : 
                      alert.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
                      'bg-primary/10 text-primary'
                    }`}>
                      <span className="material-symbols-outlined text-xl">{alert.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">{alert.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{alert.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center rounded-2xl border border-dashed border-white/5">
                   <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">No active alerts</p>
                </div>
              )}

              {dashboardData.alerts.length > 0 && (
                <button 
                  onClick={clearNotifications}
                  className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-slate-500 text-xs font-bold uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all mt-2 active:scale-[0.98]"
                >
                  Clear All Notifications
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </AgentLayout>
  );
};

export default AdminDashboard;