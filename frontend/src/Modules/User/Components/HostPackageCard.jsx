import React from 'react';

const HostPackageCard = ({ title, desc, img }) => {
  return (
    <div className="
      /* Layout & Sizing */
      flex h-full flex-col gap-3 
      rounded-lg 
      transition-all 
      duration-300
      
      /* Mobile: Maintain width for horizontal scroll */
      w-[260px] 
      flex-shrink-0
      
      /* Desktop: Allow flexibility in a grid if needed */
      md:w-full 
      md:min-w-0
      
      group cursor-pointer
    ">
      {/* Image Container */}
      <div 
        className="
          w-full 
          bg-center bg-no-repeat bg-cover 
          aspect-video 
          rounded-xl 
          transition-transform 
          duration-300
          group-hover:scale-[1.02]
          group-hover:shadow-lg
          group-hover:shadow-black/20
        " 
        style={{ backgroundImage: `url(${img})` }}
      />

      {/* Text Content */}
      <div className="px-1">
        <p className="
          text-white 
          text-base 
          font-semibold 
          leading-snug
          group-hover:text-primary 
          transition-colors
          line-clamp-1
        ">
          {title}
        </p>
        <p className="
          text-subtext-dark 
          text-sm 
          mt-1
          line-clamp-2 
          leading-relaxed
        ">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default HostPackageCard;