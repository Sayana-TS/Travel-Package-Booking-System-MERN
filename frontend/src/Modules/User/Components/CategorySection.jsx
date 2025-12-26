import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: "🌎", label: "All" },
  { icon: "🏖️", label: "Beaches" },
  { icon: "🏔️", label: "Mountains" },
  { icon: "🏙️", label: "City Escapes" },
  { icon: "👨‍👩‍👧‍👦", label: "Family Trips" },
  { icon: "💎", label: "Luxury" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (label) => {
    // Navigate to the packages page with a query parameter
    // If "All" is clicked, we just go to /packages without a filter
    if (label === "All") {
      navigate("/packages");
    } else {
      navigate(`/packages?category=${label}`);
    }
  };

  return (
    <section className="py-8">
      <div className="flex items-center space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => handleCategoryClick(cat.label)}
            className="px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center border bg-white/[0.05] border-white/10 text-[#9ca3af] hover:border-[#056bd1] hover:text-white"
          >
            <span className="mr-2 text-lg">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;