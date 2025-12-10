import React, { useState } from "react"; // Ensure useState is imported

const PackageCard = ({
  image,
  label,
  labelColor,
  title,
  description,
  rating,
  duration,
  price,
  cta
}) => {
    const [isMobileActive, setIsMobileActive] = useState(false);

    const toggleMobileActive = (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
            setIsMobileActive(prev => !prev);
        }
    };

    const actionSectionClasses = `
        lg:opacity-100 lg:h-auto lg:mt-0 transition-all duration-300 ease-in-out
        ${isMobileActive ? 'h-auto opacity-100 pt-4' : 'h-0 opacity-0 pt-0 overflow-hidden'}
    `;

    // Fluid Sizing Definitions (Maps static Tailwind classes to dynamic CSS)
    const fluidPaddingStyle = {
        // Minimum 1rem (p-4), fluidly scales, maximum 1.5rem (p-6)
        padding: 'clamp(1rem, 2.5vw + 0.5rem, 1.5rem)', 
    };
    
    const fluidTitleStyle = {
        // Minimum 1.125rem (text-lg), fluidly scales, maximum 1.25rem (text-xl)
        fontSize: 'clamp(1.125rem, 2vw + 0.5rem, 1.25rem)', 
    };
    
    const fluidPriceStyle = {
        // Minimum 1.125rem (text-lg), fluidly scales, maximum 1.25rem (text-xl)
        fontSize: 'clamp(1.125rem, 2vw + 0.5rem, 1.25rem)', 
    };


    return (
    <div 
        className="w-full flex flex-col bg-card-dark rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 group cursor-pointer"
        onClick={toggleMobileActive}
    >
      {/* Image */}
      <div className="relative w-full">
        <img
            alt={title}
            src={image}
            className="w-full aspect-[4/3] object-cover"
        />
        
        {label && (
          <span
            className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full ${
              labelColor || "bg-primary"
            }`}
          >
            {label}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 cursor-pointer">
          <span className="material-icons text-white text-3xl">zoom_in</span>
        </div>
      </div>

      {/* Content */}
      {/* 1. Applying Fluid Padding */}
      <div style={fluidPaddingStyle} className="flex flex-col">
        {/* 2. Applying Fluid Title Size */}
        <h3 style={fluidTitleStyle} className="font-semibold mb-2 text-white">{title}</h3>

        {description && (
          <p className="text-sm text-subtext-dark mb-4 line-clamp-3">
            {description}
          </p>
        )}

        <div className="flex justify-between items-center mb-4 mt-auto">
          <div className="flex items-center">
            <span className="material-icons text-yellow-400">star</span>
            <span className="ml-1 text-sm font-medium text-white">
              {rating}
            </span>
          </div>

          {duration && (
            <span className="text-sm font-medium text-white">{duration}</span>
          )}
        </div>
        
        <div className={actionSectionClasses}>
          <div className="flex justify-between items-center">
            {/* 3. Applying Fluid Price Size */}
            <p style={fluidPriceStyle} className="font-bold text-primary">
              {price}{" "}
              <span className="text-sm font-normal text-subtext-dark">
                /person
              </span>
            </p>
            {cta}
          </div>
        </div>

        <div className="flex justify-center pt-2 text-xs text-subtext-dark lg:hidden">
            <span className="material-icons text-base mr-1">
                {isMobileActive ? 'expand_less' : 'expand_more'}
            </span>
            {isMobileActive ? 'Tap to hide price' : 'Tap to see price & book'}
        </div>
      </div>
    </div>
    );
};

export default PackageCard;