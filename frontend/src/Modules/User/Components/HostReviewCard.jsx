import React from 'react';

const HostReviewCard = ({ name, date, rating, comment, img, likes }) => {
  return (
    <div className="
      /* Layout & Spacing */
      flex flex-col gap-3 
      border-b border-card-dark 
      pb-6 mb-2
      last:border-0 
      last:mb-0
      
      /* Responsive Padding */
      px-1 md:px-2
    ">
      {/* Header: Avatar and Name */}
      <div className="flex items-center gap-3">
        <div 
          className="
            bg-center bg-no-repeat bg-cover 
            rounded-full 
            shrink-0
            /* Responsive Size */
            size-10 md:size-12
            border border-card-dark
          " 
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-white text-base font-semibold truncate">
            {name}
          </p>
          <p className="text-subtext-dark text-xs md:text-sm">
            {date}
          </p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`
              material-symbols-outlined 
              /* Larger icons on mobile for easier viewing */
              text-[18px] md:text-[20px] 
              ${i < rating ? 'text-primary' : 'text-card-dark'}
            `}
          >
            star
          </span>
        ))}
      </div>

      {/* Review Text */}
      <p className="
        text-white 
        text-sm md:text-base 
        font-normal 
        leading-relaxed 
        md:leading-normal
      ">
        {comment}
      </p>

      {/* Footer: Like/Dislike Buttons */}
      <div className="flex gap-8 md:gap-10 text-subtext-dark pt-1">
        <button className="flex items-center gap-2 group hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px] group-active:scale-125 transition-transform">
            thumb_up
          </span>
          <span className="text-xs md:text-sm font-medium">{likes}</span>
        </button>
        <button className="flex items-center gap-2 group hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px] group-active:scale-125 transition-transform">
            thumb_down
          </span>
        </button>
      </div>
    </div>
  );
};

export default HostReviewCard;