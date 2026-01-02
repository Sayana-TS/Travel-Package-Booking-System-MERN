import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout";
import FilterSidebar from "../Components/FilterSidebar";
import PackageCard from "../components/PackageCard";
import {
  recommended,
  featured,
  ongoing,
  upcoming,
  popular,
  budgetFriendly,
} from "../data/packages";

const PackagesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // -----------------------
  // States
  // -----------------------
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filters, setFilters] = useState({
    destination: "",
    travelDates: "",
    travelers: "",
    type: "",
    sortBy: "",
    price: [500, 2000],
  });

  // -----------------------
  // Load query params from URL
  // -----------------------
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qSearch = params.get("search") || "";
    const qDestination = params.get("destination") || "";
    const qType = params.get("type") || "";
    const qCategory = params.get("category") || "All";
    const qPrice = params.get("price") || "";

    if (qSearch) setSearch(qSearch);
    setSelectedCategory(qCategory);

    setFilters((prev) => ({
      ...prev,
      destination: qDestination || prev.destination,
      type: qType || prev.type,
      price: qPrice ? qPrice.split("-").map(Number) : prev.price,
    }));

    setCurrentPage(1);
  }, [location.search]);

  // -----------------------
  // Handlers
  // -----------------------
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearch("");
    navigate("/packages"); 
    setFilters({
      destination: "",
      travelDates: "",
      travelers: "",
      type: "",
      sortBy: "",
      price: [500, 2000],
    });
    setCurrentPage(1);
  };

  // -----------------------
  // Filtering Logic
  // -----------------------
  const filteredPackages = useMemo(() => {
    let allPackages = [
      ...recommended, ...featured, ...ongoing, ...upcoming, ...popular, ...budgetFriendly,
    ];

    allPackages = allPackages.map((pkg) => {
      let numPrice = 0;
      if (typeof pkg.price === "string") {
        const match = pkg.price.replace(/,/g, "").match(/\d+/);
        if (match) numPrice = parseInt(match[0]);
      } else {
        numPrice = pkg.price;
      }
      return { ...pkg, numericPrice: numPrice };
    });

    if (selectedCategory !== "All") {
      allPackages = allPackages.filter((pkg) => 
        pkg.category === selectedCategory || pkg.type === selectedCategory
      );
    }

    if (search.trim()) {
      allPackages = allPackages.filter((pkg) =>
        pkg.title.toLowerCase().includes(search.toLowerCase()) ||
        pkg.destination?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.destination) {
      allPackages = allPackages.filter((pkg) =>
        pkg.destination?.toLowerCase() === filters.destination.toLowerCase()
      );
    }

    if (filters.type) {
      allPackages = allPackages.filter((pkg) => pkg.type === filters.type);
    }

    if (filters.travelers) {
      allPackages = allPackages.filter((pkg) =>
        pkg.travelers?.includes(filters.travelers)
      );
    }

    if (filters.price && filters.price.length === 2) {
      allPackages = allPackages.filter((pkg) =>
          pkg.numericPrice >= filters.price[0] &&
          pkg.numericPrice <= filters.price[1]
      );
    }

    const sorted = [...allPackages];
    if (filters.sortBy === "low-high") sorted.sort((a, b) => a.numericPrice - b.numericPrice);
    if (filters.sortBy === "high-low") sorted.sort((a, b) => b.numericPrice - a.numericPrice);
    if (filters.sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (filters.sortBy === "popularity") sorted.sort((a, b) => b.popularity - a.popularity);

    return sorted;
  }, [search, filters, selectedCategory]);

  // -----------------------
  // Pagination Calculation (FIX APPLIED)
  // -----------------------
  const cardsPerPage = 6;
  const totalPages = Math.ceil(filteredPackages.length / cardsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return filteredPackages.slice(start, start + cardsPerPage);
  }, [filteredPackages, currentPage]);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <UserLayout>
      <div className="flex flex-col lg:flex-row w-full py-2 gap-6">
        <FilterSidebar
          search={search}
          onSearchChange={(val) => { setSearch(val); setCurrentPage(1); }}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
        />

        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === "All" ? "All Packages" : `${selectedCategory} Packages`}
              <span className="text-gray-400 text-sm font-normal ml-3">
                ({filteredPackages.length} found)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {currentData.map((pkg, index) => (
              <PackageCard
                /* KEY FIX: Combining index and filters forces React to redraw the cards */
                key={`${pkg.id}-${search}-${filters.destination}-${filters.sortBy}-${index}`}
                {...pkg}
                cta={
                  <button onClick={()=>navigate('/packageDetail')} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition w-full">
                    Book Now
                  </button>
                }
              />
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-xl border border-dashed border-white/10 mt-4">
              <p className="text-gray-400">No packages found for this category or filter.</p>
              <button onClick={handleClear} className="mt-4 text-primary hover:underline">
                Reset All Filters
              </button>
            </div>
          )}

          {filteredPackages.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-12 mb-8">
              <button
                onClick={() => changePage(currentPage - 1)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-40"
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={`w-10 h-10 rounded-lg transition ${
                    currentPage === i + 1 ? "bg-primary text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => changePage(currentPage + 1)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-40"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default PackagesPage;