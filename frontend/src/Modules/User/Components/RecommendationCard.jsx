import React from 'react';
import { Link } from 'react-router-dom';

const RecommendationCard = ({ recommendation }) => {
    return (
        <Link to='/packageDetail' className="group flex items-center gap-4">
            <div 
                className="h-20 w-20 shrink-0 rounded-lg bg-cover bg-center" 
                style={{ backgroundImage: `url("${recommendation.imageUrl}")` }}
            ></div>
            <div>
                <h4 className="font-bold text-gray-900 group-hover:text-primary dark:text-gray-200 transition-colors">
                    {recommendation.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {recommendation.subtitle}
                </p>
            </div>
        </Link>
    );
};

export default RecommendationCard;