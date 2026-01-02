import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();

    // These keys match the qSearch, qDate, and qPrice logic in your PackagesPage
    if (search) query.append("search", search);
    if (date) query.append("date", date);
    
    // If budget is selected, we pass it as a range (e.g., 500-1000) 
    // which your PackagesPage .split("-") logic will handle
    if (budget) query.append("price", budget);

    navigate(`/packages?${query.toString()}`);
  };

  return (
    <section
      className="relative min-h-[70vh] md:min-h-[70vh] rounded-lg overflow-hidden flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 p-6 md:p-8 max-w-6xl w-full">
        <h1 className="text-3xl md:text-6xl font-bold mb-4 tracking-tight">
          Find your next adventure with us!
        </h1>

        <p className="text-base md:text-xl mb-6 md:mb-8 text-slate-300">
          Discover handpicked destinations at the best prices.
        </p>

        {/* Search Box */}
        <div className="bg-black/30 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg w-full">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center w-full"
          >
            {/* Search Field */}
            <div className="relative w-full">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                place
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/80 text-white border-transparent focus:ring-2 focus:ring-primary outline-none"
                placeholder="Where to?"
                type="text"
              />
            </div>

            {/* Date Field */}
            <div className="relative w-full">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                calendar_today
              </span>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/80 text-white border-transparent focus:ring-2 focus:ring-primary outline-none"
                type="date"
              />
            </div>

            {/* Budget Field - Changed to Select for better UX */}
            <div className="relative w-full">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                attach_money
              </span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/80 text-white border-transparent focus:ring-2 focus:ring-primary outline-none appearance-none"
              >
                <option value="">Any Budget</option>
                <option value="0-500">Under $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-5000">$2,000+</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              className="w-full md:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              type="submit"
            >
              <span className="material-icons">search</span> Search
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/packages")}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg"
          >
            ✨ Discover All Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;