import React from "react";

const PackageCard = ({ image, label, labelColor, title, description, rating, duration, price, cta }) => (
  <div className="bg-card-dark rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 group">
    <div className="relative">
      <img alt={title} src={image} className="w-full h-56 object-cover" />
      {label && (
        <span className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full ${labelColor || 'bg-primary'}`}>{label}</span>
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 cursor-pointer">
        <span className="material-icons text-white text-3xl">zoom_in</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      {description && <p className="text-sm text-subtext-dark mb-4">{description}</p>}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="material-icons text-yellow-400">star</span>
          <span className="ml-1 text-sm font-medium text-white">{rating}</span>
        </div>
        {duration && <span className="text-sm font-medium text-white">{duration}</span>}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-primary">{price} <span className="text-sm font-normal text-subtext-dark">/person</span></p>
        {cta}
      </div>
    </div>
  </div>
);

export default PackageCard;
