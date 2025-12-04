import React from "react";

const WidePackageCard = ({ image, ribbon, title, description, rating, price, cta, badge }) => (
  <div className="bg-card-dark rounded-lg overflow-hidden shadow-lg hover:shadow-primary/40 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 border-2 border-primary/50 ring-2 ring-primary/20 group">
    <div className="relative">
      <img alt={title} src={image} className="w-full h-56 object-cover" />
      {ribbon && <div className="absolute top-0 right-0 bg-primary text-white text-sm font-semibold px-4 py-1 ribbon-style">{ribbon}</div>}
      <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="material-icons text-white text-3xl bg-black/40 rounded-full p-2">zoom_in</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-subtext-dark mb-4">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="material-icons text-yellow-400">star</span>
          <span className="ml-1 text-sm font-medium text-white">{rating}</span>
        </div>
        {badge && <span className="text-sm font-bold text-red-500">{badge}</span>}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-primary">{price} <span className="text-sm font-normal text-subtext-dark">/person</span></p>
        {cta}
      </div>
    </div>
  </div>
);

export default WidePackageCard;
