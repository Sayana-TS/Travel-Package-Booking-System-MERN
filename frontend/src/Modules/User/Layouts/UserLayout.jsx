// Updated UserLayout with exact HTML match styling\import React, { useState } from "react";
import React, { useState } from "react";

const UserLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-dark font-display text-text-dark flex flex-col">
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-sm shadow-md shadow-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="text-3xl font-bold text-primary">GlobeGo</a>

            <nav className="hidden md:flex items-center space-x-8">
              <a className="text-sm font-medium text-primary" href="#">Home</a>
              <a className="text-sm font-medium text-subtext-dark hover:text-primary transition-colors" href="#">Packages</a>
              <a className="text-sm font-medium text-subtext-dark hover:text-primary transition-colors" href="#">Favorites</a>
              <a className="text-sm font-medium text-subtext-dark hover:text-primary transition-colors" href="#">Bookings</a>
              <a className="text-sm font-medium text-subtext-dark hover:text-primary transition-colors" href="#">Profile</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-card-dark transition-colors">
                <span className="material-icons text-subtext-dark">notifications</span>
              </button>

              <button className="p-2 rounded-full hover:bg-card-dark transition-colors">
                <span className="material-icons text-subtext-dark">favorite_border</span>
              </button>

              <button className="flex items-center space-x-2">
                <img
                  alt="User profile"
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8iDfT8GktfwuTIZmupembnW_VIOq8LJV4T3nkTJc2gt-XWNHtlLdjLwkCJrTq9EVS4FKffHtc6PjGqRTUYcgG0bD4BOfPWNcVCHrfE5h7ZNmacdVyP4LLKNSiivfNw4Dw18NMuUTQcYfwkxJvKkuLvJ66RiqEPKLBtvIxBS231K0FYUHY49txjON7hFZyXTZYS0bQo_yAJrcufXosfpztppPlSxy-Nat97d91fntzt13_jenwwOyVQgknTiX1dbf1ySyyMTi72xY"
                />
              </button>

              <button className="hidden md:inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:opacity-90 transition-opacity">
                Logout
              </button>

              <button
                className="md:hidden p-2 rounded-lg border border-border-dark text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span className="material-icons">{mobileOpen ? "close" : "menu"}</span>
              </button>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center py-2 border-t border-white space-x-6 text-sm opacity-50">
            <a className="text-subtext-dark hover:text-primary transition-colors" href="#">Contact</a>
            <a className="text-subtext-dark hover:text-primary transition-colors" href="#">About</a>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-background-dark border-t border-white px-6 py-4 space-y-4">
            <a className="block text-subtext-dark hover:text-primary transition-colors" href="#">Home</a>
            <a className="block text-subtext-dark hover:text-primary transition-colors" href="#">Packages</a>
            <a className="block text-subtext-dark hover:text-primary transition-colors" href="#">Favorites</a>
            <a className="block text-subtext-dark hover:text-primary transition-colors" href="#">Bookings</a>
            <a className="block text-subtext-dark hover:text-primary transition-colors" href="#">Profile</a>

            <div className="border-t border-white pt-4 flex justify-between">
              <a className="text-subtext-dark hover:text-primary transition-colors" href="#">Contact</a>
              <a className="text-subtext-dark hover:text-primary transition-colors" href="#">About</a>
            </div>

            <button className="w-full py-2 bg-primary rounded-lg font-medium hover:opacity-90">Logout</button>
          </div>
        )}
      </header>

      <main className="flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      {/* FOOTER (UNCHANGED) */}
      <footer className="bg-card-dark border-t border-border-dark mt-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold mb-4 text-white">GlobeGo</h3>
              <p className="text-sm text-subtext-dark">Get latest deals and travel inspiration!</p>
              <form className="mt-4 flex">
                <input type="email" placeholder="Your email for deals" className="w-full px-4 py-2 rounded-l-lg bg-background-dark border-border-dark focus:ring-primary focus:border-primary" />
                <button className="px-4 py-2 bg-primary text-white font-semibold rounded-r-lg hover:opacity-90">Subscribe</button>
              </form>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">About</a></li>
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">Contact</a></li>
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">Terms</a></li>
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">Help Center</a></li>
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">FAQ</a></li>
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">Booking Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4 text-white">Social</h4>
              <ul className="space-y-2 text-sm">
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">Instagram</a></li>
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">YouTube</a></li>
                <li><a className="text-subtext-dark hover:text-primary text-white" href="#">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-subtext-dark text-white">© 2024 Travel Booking System</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {/* Social Icons (replace with Icons if available) */}
              <a className="text-subtext-dark hover:text-primary text-white" href="#"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.03998C6.48 2.03998 2 6.51998 2 12.04C2 17.56 6.48 22.04 12 22.04C17.52 22.04 22 17.56 22 12.04C22 6.51998 17.52 2.03998 12 2.03998ZM17.32 9.75998H15.17C14.99 9.75998 14.86 9.87998 14.82 10.05L14.47 11.73H17.31C17.21 12.24 16.59 14.6 16.36 15.63C16.33 15.75 16.22 15.83 16.1 15.83H14.32V20.15C14.32 20.26 14.23 20.35 14.12 20.35H11.51C11.4 20.35 11.31 20.26 11.31 20.15V15.83H9.54C9.43 15.83 9.34 15.74 9.34 15.63V13.38C9.34 13.27 9.43 13.18 9.54 13.18H11.31V10.27C11.31 8.35998 12.44 7.31998 14.2 7.31998L16.03 7.32998C16.14 7.32998 16.23 7.41998 16.23 7.52998V9.63998C16.23 9.71998 16.18 9.75998 16.12 9.75998C16.09 9.75998 15.76 9.75998 15.76 9.75998C15.54 9.75998 15.17 9.75998 15.17 10.15V11.73H13.11V9.75998H17.32Z" /></svg></a>
              <a className="text-subtext-dark hover:text-primary text-white" href="#"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.29 10.45C17.29 10.51 17.29 10.57 17.29 10.63C17.29 13.92 14.81 17.75 9.47 17.75C7.57 17.75 5.82 17.2 4.33 16.22C4.6 16.25 4.86 16.26 5.13 16.26C6.71 16.26 8.16 15.72 9.3 14.84C7.82 14.81 6.55 13.82 6.13 12.5C6.35 12.54 6.58 12.56 6.81 12.56C7.12 12.56 7.42 12.52 7.7 12.45C6.18 12.13 5.03 10.74 5.03 9.07V9.03C5.5 9.29 6.05 9.46 6.64 9.48C5.7 8.86 5.08 7.9 5.08 6.8C5.08 6.16 5.25 5.56 5.53 5.04C7.18 7.02 9.45 8.35 12.05 8.49C11.98 8.23 11.94 7.96 11.94 7.68C11.94 6.2 13.12 5 14.58 5C15.34 5 16.02 5.31 16.52 5.81C17.1 5.7 17.65 5.46 18.12 5.15C17.92 5.76 17.53 6.27 17.02 6.6C17.53 6.54 18.02 6.4 18.47 6.17C18.12 6.68 17.73 7.12 17.29 7.48V7.52L17.28 7.53C17.27 7.52 17.27 7.52 17.27 7.52C17.27 7.52 17.27 7.51 17.27 7.51C17.27 7.51 17.27 7.51 17.27 7.51L17.29 10.45Z" /></svg></a>
              <a className="text-subtext-dark hover:text-primary text-white" href="#"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.02 17.22H5.66V9.2H8.02V17.22ZM6.84 8.21C6.02 8.21 5.36 7.55 5.36 6.73C5.36 5.91 6.02 5.25 6.84 5.25C7.66 5.25 8.32 5.91 8.32 6.73C8.32 7.55 7.66 8.21 6.84 8.21ZM18.34 17.22H15.98V13.37C15.98 12.48 15.96 11.31 14.77 11.31C13.56 11.31 13.35 12.28 13.35 13.29V17.22H11V9.2H13.23V10.22H13.27C13.6 9.61 14.45 8.99 15.49 8.99C17.91 8.99 18.34 10.58 18.34 12.86V17.22Z" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;



