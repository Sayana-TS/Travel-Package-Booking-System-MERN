import React from "react";
import { topDestinations } from "../data/packages";

const TopDestinations = () => (
  <section className="py-12">
    <h2 className="text-3xl font-bold mb-8 text-center text-white">Top Destinations</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {topDestinations.map((dest, idx) => (
        <div key={idx} className="relative rounded-lg overflow-hidden h-64 group">
          <img alt={dest.title} src={dest.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-xl font-bold text-white">{dest.title}</h3>
            <button className="mt-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg text-sm hover:opacity-90 flex items-center gap-1">
              <span className="material-icons text-base">search</span>
              Explore Packages
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TopDestinations;


