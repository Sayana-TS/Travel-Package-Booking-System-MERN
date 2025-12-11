import React from 'react';
import PackageCards from './PackageCards'; // Now importing the correct, plural component name

const RecommendedPackagesSection = ({ packages }) => (
    <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">You Might Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map(pkg => (
                <PackageCards 
                    key={pkg.id} 
                    title={pkg.title} 
                    price={pkg.price.toLocaleString()} // Pass price prop
                    imageSrc={pkg.imageSrc} 
                />
            ))}
        </div>
    </div>
);

export default RecommendedPackagesSection;