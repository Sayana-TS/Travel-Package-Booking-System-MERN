import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Helper for Nav Items
const NavItem = ({ icon, label, to = "#", color = "text-[#9ca3af] hover:text-white hover:bg-white/5" }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${active ? 'bg-[#056bd1] text-white shadow-lg shadow-[#056bd1]/20' : color}`}>
      <span className={`material-symbols-outlined text-xl ${active ? 'text-white' : 'group-hover:text-[#056bd1]'}`}>{icon}</span>
      <span className="text-sm font-medium tracking-wide whitespace-nowrap">{label}</span>
    </Link>
  );
};

const AgentLayout = ({ children, role = "agent" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // 1. Role-based Configuration
  const isAgent = role === 'agent';
  const config = {
    title: isAgent ? "Agent Portal" : "Admin Panel",
    basePath: isAgent ? "/agent" : "/admin",
    user: isAgent ? { name: "Emily Carter", role: "Verified Agent" } : { name: "Alex Admin", role: "Super User" },
    menu: isAgent ? [
      { to: "/agent", icon: "dashboard", label: "Dashboard" },
      { to: "/agent/packages", icon: "package", label: "Packages" },
      { to: "/hotels", icon: "hotel", label: "Hotels" },
      { to: "/agent/bookings", icon: "luggage", label: "Bookings" },
      { to: "/agent/rooms", icon: "house", label: "Rooms" },
      { to: "/agent/images", icon: "photo", label: "Gallery" },
      { to: "/agent/pricing", icon: "money", label: "Pricing" },
    ] : [
      { to: "/admin", icon: "analytics", label: "Overview" },
      { to: "/admin/users", icon: "group", label: "Manage Users" },
      { to: "/admin/packages", icon: "trip", label: "Packages" },
      { to: "/admin/bookings", icon: "book", label: "Bookings" },
    ]
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#0f1923] font-display text-slate-200 overflow-hidden relative">
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-[70] lg:relative ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-20'} flex-shrink-0 bg-[#16212b] lg:bg-white/[0.02] border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="p-4 flex flex-col h-full min-w-[256px] lg:min-w-0">
          <div className="flex items-center gap-3 mb-10 px-2 h-10">
            <div className="w-8 h-8 bg-[#056bd1] rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-xl">travel_explore</span>
            </div>
            {(isSidebarOpen || isMobile) && <Link to={config.basePath} className="text-3xl font-bold text-primary">GlobeGo</Link>}
          </div>

          <nav className="flex-grow flex flex-col gap-1.5">
            {config.menu.map((item) => (
              <NavItem key={item.to} to={item.to} icon={item.icon} label={(isSidebarOpen || isMobile) ? item.label : ""} />
            ))}
          </nav>

          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
          <NavItem 
  to={isAgent ? "/agent/tickets" : "/admin/tickets"} 
  icon="support_agent" 
  label={(isSidebarOpen || isMobile) ? "Support" : ""} 
/>
            <NavItem to="/logout" icon="logout" label={(isSidebarOpen || isMobile) ? "Logout" : ""} color="text-red-400 hover:bg-red-400/10" />
          </div>
        </div>
      </aside>

      {/* --- CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <header className="h-16 bg-[#0f1923]/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-white/5 text-[#9ca3af]"><span className="material-symbols-outlined">menu</span></button>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 hidden md:block">{config.title}</h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div onClick={() => navigate(`${config.basePath}/profile`)} className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-white/10 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white group-hover:text-[#056bd1] transition-colors line-clamp-1">{config.user.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-bold">{config.user.role}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#056bd1] to-cyan-500 flex items-center justify-center font-bold text-white uppercase">{config.user.name[0]}</div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;