// src/components/ActivityCard.jsx
import React from 'react';
import MaterialIcon from './MaterialIcon';

const ActivityCard = ({ title, description, imageSrc, viewLink, duration, schedule }) => (
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
    <div className="p-4 space-y-3">
      <div className="flex flex-wrap gap-y-2 gap-x-4">
        {duration && (
          <div className="flex items-center text-xs text-subtext-dark">
            <MaterialIcon name="schedule" className="mr-1 text-primary text-sm" />
            {duration}
          </div>
        )}
        {schedule && (
          <div className="flex items-center text-xs text-subtext-dark">
            <MaterialIcon name="event" className="mr-1 text-primary text-sm" />
            {schedule}
          </div>
        )}
      </div>
      
      <p className="text-sm text-subtext-dark leading-relaxed">{description}</p>
      
      <a className="inline-block text-sm font-semibold text-primary hover:underline" href={viewLink}>
        View More
      </a>
    </div>
  </div>
);

export default ActivityCard;