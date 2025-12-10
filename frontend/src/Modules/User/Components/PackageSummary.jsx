// src/components/PackageSummary.jsx
import React from 'react';
import MaterialIcon from './MaterialIcon';
import StarRating from './StarRating';

const PackageSummary = ({ title, duration, location, season, price, rating, reviewCount }) => (
  <div className="flex justify-between items-start">
    <div>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <div className="flex items-center space-x-4 text-sm text-subtext-dark">
        <span>
          <MaterialIcon name="schedule" className="text-sm mr-1" />
          {duration}
        </span>
        <span>
          <MaterialIcon name="place" className="text-sm mr-1" />
          {location}
        </span>
        <span>
          <MaterialIcon name="date_range" className="text-sm mr-1" />
          {season}
        </span>
      </div>
    </div>
    <div className="text-right">
      <p className="text-2xl font-bold text-primary">${price}</p>
      <StarRating rating={rating} reviewCount={reviewCount} />
    </div>
  </div>
);

export default PackageSummary;