// src/components/ActivityCard.jsx
import React from 'react';

const ActivityCard = ({ title, description, imageSrc, viewLink }) => (
  <div className="rounded-lg overflow-hidden group border border-gray-200 dark:border-border-dark hover:shadow-xl transition-all duration-300">
    <div className="relative h-40">
      <img
        alt={title}
        className="w-full h-full object-cover"
        src={imageSrc}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h4 className="text-white font-bold text-lg">{title}</h4>
      </div>
    </div>
    <div className="p-4 space-y-2">
      <p className="text-sm text-subtext-dark">{description}</p>
      <a className="text-sm font-semibold text-primary hover:underline" href={viewLink}>
        View More
      </a>
    </div>
  </div>
);

export default ActivityCard;