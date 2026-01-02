// src/components/PackageCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PackageCards = ({ title, price, imageSrc }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/packageDetail');
  };
  return (
  <div className="bg-background-light dark:bg-background-dark rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
    <img alt={title} className="w-full h-40 object-cover" src={imageSrc} />
    <div className="p-4">
      <h4 className="font-semibold text-lg mb-1">{title}</h4>
      <p className="text-primary font-bold text-lg mb-2">${price}</p>
      <button onClick={handleClick} className="w-full bg-primary/20 text-primary font-semibold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
        View Details
      </button>
    </div>
  </div>
  )};

export default PackageCards;