import React from 'react';

// Renders the star rating (using the Material Symbols icons)
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                // Full Star
                stars.push(<span key={i} className="material-symbols-outlined fill-1">star</span>);
            } else if (i === fullStars && hasHalfStar) {
                // Half Star
                stars.push(<span key={i} className="material-symbols-outlined fill-1">star_half</span>);
            } else {
                // Empty Star (or border)
                stars.push(<span key={i} className="material-symbols-outlined text-gray-300 dark:text-gray-600">star</span>);
            }
        }
        return stars;
    };

    return (
        <div className="flex text-yellow-400">
            {renderStars()}
        </div>
    );
};

const ReviewCard = ({ review }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-primary/30 bg-white dark:border-white/10 dark:bg-card-dark">
            <div className="border-b border-gray-200/50 p-6 dark:border-white/10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reviews & Ratings</h3>
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {review.rating.toFixed(1)} / 5
                    </p>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    "{review.comment}"
                </p>
                <div className="mt-4 flex items-center gap-3">
                    <div 
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
                        style={{ backgroundImage: `url("${review.reviewer.avatarUrl}")` }}
                    ></div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{review.reviewer.name}</p>
                        <p className="text-sm text-gray-500 dark:text-subtext-dark">{review.reviewer.date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;