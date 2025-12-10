// src/components/StarRating.jsx
import React from 'react';
import MaterialIcon from './MaterialIcon';

// Props:
// - rating: The numerical rating (e.g., 4.5)
// - reviewCount: The total number of reviews (optional)
// - size: 'sm' for small, 'base' for default
const StarRating = ({ rating, reviewCount, size = 'base' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const iconSize = size === 'sm' ? 'text-sm' : 'text-base';
  const marginClass = size === 'sm' ? 'my-1' : '';

  for (let i = 0; i < 5; i++) {
    let iconName = 'star_border'; // Default to empty star
    if (i < fullStars) {
      iconName = 'star'; // Full star
    } else if (i === fullStars && hasHalfStar) {
      iconName = 'star_half'; // Half star
    }

    stars.push(
      <MaterialIcon key={i} name={iconName} className={`${iconSize}`} />
    );
  }

  return (
    <div className={`flex items-center text-yellow-500 ${marginClass}`}>
      <div className="flex">
        {stars}
      </div>
      {reviewCount && (
        <span className="ml-2 text-sm text-subtext-dark">({reviewCount} reviews)</span>
      )}
    </div>
  );
};

export default StarRating;