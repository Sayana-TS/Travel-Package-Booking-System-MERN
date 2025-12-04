import React from 'react';

const AuthLayout = ({ children, quote }) => {
  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
      {/* Left side - Image and Quote */}
      <div className="hidden lg:block relative h-full w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww"
          alt="Auth Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center p-8 z-10">
          <div 
            className="relative max-w-2xl px-8"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          >
            {/* Simple Opening Quote */}
            <div className="absolute -top-2 left-0 text-white/50 text-6xl lg:text-7xl font-serif leading-none animate-pulse">
              "
            </div>
            
            {/* Main Quote Text */}
            <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center leading-relaxed max-w-xl tracking-normal drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              {quote}
            </p>
            
            {/* Simple Closing Quote */}
            <div className="absolute -bottom-2 right-0 text-white/50 text-6xl lg:text-7xl font-serif leading-none animate-pulse">
              "
            </div>
            
            {/* Travel Compass Icon - Subtle */}
            <div className="absolute top-1/2 -right-12 w-16 h-16 text-white/20 animate-[spin_30s_linear_infinite]">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            {/* Subtle Glow Behind Text */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-full h-32 bg-gradient-to-r from-amber-500/5 via-orange-500/10 to-amber-500/5 blur-2xl animate-[pulse_4s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Content */}
      <div className="h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

