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

    if (search) query.append("search", search);
    if (date) query.append("date", date);
    if (budget) query.append("budget", budget);

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
          Find your next adventure with us!
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
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card-dark/80 text-text-dark border-transparent focus:ring-2 focus:ring-primary"
                placeholder="Destination / Keyword"
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
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card-dark/80 text-text-dark border-transparent focus:ring-2 focus:ring-primary"
                placeholder="Travel Date"
                type="date"
              />
            </div>

            {/* Budget Field */}
            <div className="relative w-full">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                attach_money
              </span>
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card-dark/80 text-text-dark border-transparent focus:ring-2 focus:ring-primary"
                placeholder="Budget Range"
                type="text"
              />
            </div>

            {/* Search Button */}
            <button
              className="w-full md:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              type="submit"
            >
              <span className="material-icons">search</span> Search
            </button>
          </form>
        </div>

        {/* Buttons */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/packages")}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            ✨ Discover Packages
          </button>

          <button className="px-8 py-3 bg-slate-100/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-slate-100/30 transition-colors">
            🧭 Start Planning
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
