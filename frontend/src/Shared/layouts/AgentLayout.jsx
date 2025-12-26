import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon, label, active = false, onClick, color = "text-[#9ca3af] hover:text-white hover:bg-white/5" }) => (
  <Link 
    to="#" 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-[#056bd1] text-white shadow-lg shadow-[#056bd1]/20' 
        : color
    }`}
  >
    <span className={`material-symbols-outlined text-xl ${active ? 'text-white' : 'group-hover:text-[#056bd1]'}`}>
      {icon}
    </span>
    <span className="text-sm font-medium tracking-wide whitespace-nowrap">{label}</span>
  </Link>
);

const AgentLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resizing to switch between mobile/desktop behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    
    handleResize(); // Init on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#0f1923] font-display text-slate-200 overflow-hidden relative">
      
      {/* --- MOBILE OVERLAY --- */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-[70] lg:relative 
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-20'} 
          flex-shrink-0 bg-[#16212b] lg:bg-white/[0.02] border-r border-white/5 
          flex flex-col transition-all duration-300 ease-in-out overflow-hidden
        `}
      >
        <div className="p-4 flex flex-col h-full min-w-[256px] lg:min-w-0">
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-10 px-2 h-10">
            <div className="w-8 h-8 bg-[#056bd1] rounded-lg flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-white text-xl">travel_explore</span>
            </div>
            {(isSidebarOpen || isMobile) && (
              <Link to="/" className="text-3xl font-bold text-primary">GlobeGo</Link>
            )}
          </div>

          {/* Nav Links */}
          <nav className="flex-grow flex flex-col gap-1.5">
            <NavItem icon="dashboard" label={(isSidebarOpen || isMobile) ? "Dashboard" : ""} active />
            <NavItem icon="hotel" label={(isSidebarOpen || isMobile) ? "Manage Hotels" : ""} />
            <NavItem icon="luggage" label={(isSidebarOpen || isMobile) ? "Bookings" : ""} />
            <NavItem icon="sell" label={(isSidebarOpen || isMobile) ? "Pricing" : ""} />
          </nav>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
            <NavItem icon="support_agent" label={(isSidebarOpen || isMobile) ? "Support" : ""} />
            <NavItem icon="logout" label={(isSidebarOpen || isMobile) ? "Logout" : ""} color="text-red-400 hover:bg-red-400/10" />
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        
        {/* --- NAVBAR --- */}
        <header className="h-16 bg-[#0f1923]/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-white/5 text-[#9ca3af] transition-colors"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 hidden md:block">Agent Portal</h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative p-2 rounded-full hover:bg-white/5 text-[#9ca3af]">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#056bd1] ring-2 ring-[#0f1923]"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-white/10 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white group-hover:text-[#056bd1] transition-colors line-clamp-1">Emily Carter</p>
                <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-bold">Verified Agent</p>
              </div>
              <img 
                alt="Avatar" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover ring-2 ring-white/5" 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
              />
            </div>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
          <div className="flex-grow p-4 sm:p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>

          {/* --- RESPONSIVE FOOTER --- */}
          <footer className="mt-auto border-t border-white/5 bg-white/[0.01] py-6 px-4 sm:px-10">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#056bd1]/20 rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#056bd1] text-sm">verified_user</span>
                </div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-bold text-[#9ca3af] text-center lg:text-left">
                  Secure Agent Portal <span className="hidden sm:inline text-white/20 mx-2">|</span> <br className="sm:hidden" /> © 2024 Verdant Travels
                </p>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                <Link to="#" className="text-[10px] uppercase tracking-widest font-bold text-[#9ca3af] hover:text-[#056bd1] transition-colors">Privacy</Link>
                <Link to="#" className="text-[10px] uppercase tracking-widest font-bold text-[#9ca3af] hover:text-[#056bd1] transition-colors">Terms</Link>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                    <span className="material-symbols-outlined text-sm text-[#9ca3af]">help_outline</span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;