import React from "react";

const categories = [
  { icon: "🏖️", label: "Beaches" },
  { icon: "🏔️", label: "Mountains" },
  { icon: "🏙️", label: "City Escapes" },
  { icon: "👨‍👩‍👧‍👦", label: "Family Trips" },
  { icon: "💎", label: "Luxury" },
];

const CategorySection = () => (
  <section className="py-12">
    <div className="flex items-center space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.label}
          className="px-6 py-2 rounded-full bg-card-dark text-white font-medium whitespace-nowrap hover:bg-primary hover:text-white transition-all flex items-center"
        >
          <span className="mr-1">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  </section>
);

export default CategorySection;
