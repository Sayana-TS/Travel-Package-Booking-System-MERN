import React, { useState } from 'react';

const HostReviewCard = ({ name, date, rating, comment, img, likes }) => {
  // 1. Initialize state. We convert 'likes' prop to a number.
  const [likeCount, setLikeCount] = useState(parseInt(likes) || 0);
  const [userAction, setUserAction] = useState(null); // 'liked', 'disliked', or null

  // 2. Logic for Liking
  const handleLike = () => {
    if (userAction === 'liked') {
      setLikeCount(prev => prev - 1);
      setUserAction(null);
    } else {
      // If they previously disliked, we don't change count (or you can adjust logic)
      setLikeCount(prev => (userAction === 'disliked' ? prev + 1 : prev + 1));
      setUserAction('liked');
    }
  };

  // 3. Logic for Disliking
  const handleDislike = () => {
    if (userAction === 'disliked') {
      setUserAction(null);
    } else {
      if (userAction === 'liked') setLikeCount(prev => prev - 1);
      setUserAction('disliked');
    }
  };

  return (
    <div className="flex flex-col gap-3 border-b border-card-dark pb-6 mb-2 last:border-0 last:mb-0 px-1 md:px-2">
      {/* Header: Avatar and Name */}
      <div className="flex items-center gap-3">
        <div 
          className="bg-center bg-no-repeat bg-cover rounded-full shrink-0 size-10 md:size-12 border border-card-dark" 
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-white text-base font-semibold truncate">{name}</p>
          <p className="text-subtext-dark text-xs md:text-sm">{date}</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`material-symbols-outlined text-[18px] md:text-[20px] ${i < rating ? 'text-primary' : 'text-card-dark'}`}
          >
            star
          </span>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-white text-sm md:text-base font-normal leading-relaxed">
        {comment}
      </p>

      {/* Footer: Like/Dislike Buttons */}
      <div className="flex gap-8 md:gap-10 pt-1">
        {/* Like Button */}
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 group transition-colors ${userAction === 'liked' ? 'text-primary' : 'text-subtext-dark hover:text-primary'}`}
        >
          <span className={`material-symbols-outlined text-[20px] group-active:scale-125 transition-transform ${userAction === 'liked' ? 'fill-1' : ''}`}>
            thumb_up
          </span>
          <span className="text-xs md:text-sm font-medium">{likeCount}</span>
        </button>

        {/* Dislike Button */}
        <button 
          onClick={handleDislike}
          className={`flex items-center gap-2 group transition-colors ${userAction === 'disliked' ? 'text-red-500' : 'text-subtext-dark hover:text-red-500'}`}
        >
          <span className={`material-symbols-outlined text-[20px] group-active:scale-125 transition-transform ${userAction === 'disliked' ? 'fill-1' : ''}`}>
            thumb_down
          </span>
        </button>
      </div>
    </div>
  );
};

export default HostReviewCard;