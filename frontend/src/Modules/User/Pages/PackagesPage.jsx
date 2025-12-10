import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

  // -----------------------
  // States
  // -----------------------
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    const qTravelers = params.get("travelers") || "";
    const qDate = params.get("date") || "";
    const qPrice = params.get("price") || "";

    if (qSearch) setSearch(qSearch);

    setFilters((prev) => ({
      ...prev,
      destination: qDestination || prev.destination,
      type: qType || prev.type,
      travelers: qTravelers || prev.travelers,
      travelDates: qDate || prev.travelDates,
      price: qPrice ? qPrice.split("-").map(Number) : prev.price,
    }));

    setCurrentPage(1);
  }, [location.search]);

  // -----------------------
  // Update filter manually
  // -----------------------
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearch("");
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
      ...recommended,
      ...featured,
      ...ongoing,
      ...upcoming,
      ...popular,
      ...budgetFriendly,
    ];

    // Convert price string → number
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

    // Search filter
    if (search.trim()) {
      allPackages = allPackages.filter((pkg) =>
        pkg.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Destination filter
    if (filters.destination) {
      allPackages = allPackages.filter(
        (pkg) =>
          pkg.destination.toLowerCase() ===
          filters.destination.toLowerCase()
      );
    }

    // Type filter
    if (filters.type) {
      allPackages = allPackages.filter((pkg) => pkg.type === filters.type);
    }

    // Travelers filter
    if (filters.travelers) {
      allPackages = allPackages.filter((pkg) =>
        pkg.travelers?.includes(filters.travelers)
      );
    }

    // Price filter
    if (filters.price && filters.price.length === 2) {
      allPackages = allPackages.filter(
        (pkg) =>
          pkg.numericPrice >= filters.price[0] &&
          pkg.numericPrice <= filters.price[1]
      );
    }

    // Sorting
    if (filters.sortBy === "low-high")
      allPackages.sort((a, b) => a.numericPrice - b.numericPrice);

    if (filters.sortBy === "high-low")
      allPackages.sort((a, b) => b.numericPrice - a.numericPrice);

    if (filters.sortBy === "rating")
      allPackages.sort((a, b) => b.rating - a.rating);

    if (filters.sortBy === "popularity")
      allPackages.sort((a, b) => b.popularity - a.popularity);

    return allPackages;
  }, [search, filters]);

  // -----------------------
  // Pagination (6 cards = 2 rows)
  // -----------------------
  const cardsPerPage = 6;
  const totalPages = Math.ceil(filteredPackages.length / cardsPerPage);

  const currentData = filteredPackages.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <UserLayout>
      <div className="flex flex-col lg:flex-row w-full py-2">
        {/* Sidebar */}
        <FilterSidebar
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
        />

        {/* Package Listing */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-4">
            All Packages ({filteredPackages.length})
          </h2>

          {/* Cards */}
          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-3
              gap-6
              w-full
            "
          >
            {currentData.map((pkg) => (
              <PackageCard
                key={pkg.id}
                image={pkg.image}
                label={pkg.label}
                labelColor={pkg.labelColor}
                title={pkg.title}
                description={pkg.description}
                rating={pkg.rating}
                duration={pkg.duration}
                price={pkg.price}
                cta={
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition">
                    Book Now
                  </button>
                }
              />
            ))}
          </div>

          {/* Empty */}
          {filteredPackages.length === 0 && (
            <p className="text-gray-400 text-center mt-12">
              No packages found.
            </p>
          )}

          {/* Pagination */}
          {filteredPackages.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => changePage(currentPage - 1)}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition disabled:opacity-40"
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={`px-3 py-2 rounded-lg transition ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => changePage(currentPage + 1)}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition disabled:opacity-40"
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
