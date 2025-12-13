import React from 'react';

const PriceBreakdownCard = ({ pricing }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-primary/30 bg-white dark:border-white/10 dark:bg-card-dark">
            <div className="border-b border-gray-200/50 p-6 dark:border-white/10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Price Breakdown</h3>
            </div>
            <div className="space-y-3 p-6">
                <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-gray-400">Package Price</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">${pricing.basePrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-gray-400">Taxes & Fees</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">${pricing.taxesFees.toFixed(2)}</p>
                </div>
                {/* Border-t using dashed style from original HTML, colored with primary/30 */}
                <div className="flex justify-between border-t border-dashed border-primary/30 pt-3 dark:border-primary/40">
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Total Price</p>
                    <p className="text-lg font-bold text-primary dark:text-primary">${pricing.totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default PriceBreakdownCard;