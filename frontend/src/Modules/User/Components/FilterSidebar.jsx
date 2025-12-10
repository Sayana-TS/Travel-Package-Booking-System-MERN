import React from "react";

const FilterSidebar = ({
  search,
  onSearchChange,
  onClear,
  filters,
  onFilterChange,
}) => {
  return (
    <aside className="w-full 
      lg:w-80 
      xl:w-96 
      flex-shrink-0 
      border-b 
      lg:border-b-0 
      lg:border-r 
      border-white/10 
      p-4 sm:p-6 
      space-y-6 
      lg:sticky 
      lg:top-24 
      lg:h-full
      mb-4
      ">

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          search
        </span>
        <input
          className="form-input w-full rounded-lg border-gray-300/20 dark:border-white/10 bg-background-light dark:bg-gray-800/30 h-12 pl-10 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus:ring-primary"
          placeholder="Search for a package"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Filters</h3>
          <button
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            onClick={onClear}
          >
            Clear Filters
          </button>
        </div>

        <div className="space-y-4">

          {/* Destination */}
          <select
  className="form-select w-full rounded-lg border-gray-300/20 dark:border-white/10 bg-background-light dark:bg-gray-800/30 text-gray-800 dark:text-white h-12 px-3 focus:border-primary focus:ring-primary"
  value={filters.destination}
  onChange={(e) => onFilterChange("destination", e.target.value)}
>

            <option value="">Destination</option>
            <option value="Mountain">Mountain</option>
            <option value="Coastal">Coastal</option>
            <option value="Forest">Forest</option>
          </select>

          {/* Travel Dates */}
          <select
            className="form-select w-full rounded-lg border-gray-300/20 dark:border-white/10 bg-background-light dark:bg-gray-800/30 text-gray-800 dark:text-white h-12 px-3 focus:border-primary focus:ring-primary"
            value={filters.travelDates}
            onChange={(e) => onFilterChange("travelDates", e.target.value)}
          >
            <option value="">Travel Dates</option>
            <option value="30">Next 30 days</option>
            <option value="90">Next 3 months</option>
            <option value="year">This Year</option>
          </select>

          {/* Price Range — static UI (no slider logic) */}
          {/* Price Range */}
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
    Price Range (${filters.price[0]} - ${filters.price[1]})
  </label>

  <div className="flex items-center space-x-2">
    <input
      type="range"
      min="500"
      max="2000"
      value={filters.price[0]}
      onChange={(e) => onFilterChange("price", [Number(e.target.value), filters.price[1]])}
      className="w-full h-2 bg-gray-300 rounded-lg accent-primary"
    />
    <input
      type="range"
      min="500"
      max="2000"
      value={filters.price[1]}
      onChange={(e) => onFilterChange("price", [filters.price[0], Number(e.target.value)])}
      className="w-full h-2 bg-gray-300 rounded-lg accent-primary"
    />
  </div>
</div>


          {/* Travelers */}
          <select
            className="form-select w-full rounded-lg border-gray-300/20 dark:border-white/10 bg-background-light dark:bg-gray-800/30 text-gray-800 dark:text-white h-12 px-3 focus:border-primary focus:ring-primary"
            value={filters.travelers}
            onChange={(e) => onFilterChange("travelers", e.target.value)}
          >
            <option value="">Total Travelers</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3+</option>
          </select>

          {/* Package Type */}
          <select
            className="form-select w-full rounded-lg border-gray-300/20 dark:border-white/10 bg-background-light dark:bg-gray-800/30 text-gray-800 dark:text-white h-12 px-3 focus:border-primary focus:ring-primary"
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
          >
            <option value="">Package Type</option>
            <option value="Adventure">Adventure</option>
            <option value="Relaxation">Relaxation</option>
            <option value="Cultural">Cultural</option>
          </select>

          {/* Sort */}
          <select
            className="form-select w-full rounded-lg border-gray-300/20 dark:border-white/10 bg-background-light dark:bg-gray-800/30 text-gray-800 dark:text-white h-12 px-3 focus:border-primary focus:ring-primary"
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="popularity">Popularity</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>

        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
