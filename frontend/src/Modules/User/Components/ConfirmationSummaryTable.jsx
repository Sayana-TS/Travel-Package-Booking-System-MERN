import React from 'react';

// NOTE: data should be an array of { label: string, value: string } objects.
const ConfirmationSummaryTable = ({ data }) => (
    <div className="space-y-4">
        {data.map((item, index) => (
            <div 
                key={index}
                className={`flex justify-between items-start py-4 ${index < data.length - 1 ? 'border-b border-gray-200 dark:border-gray-700/50' : ''}`}
            >
                <p className="text-gray-500 dark:text-gray-400 font-medium">{item.label}</p>
                <p className="text-gray-800 dark:text-white font-semibold text-right">
                    {item.label === 'Total Price' ? (
                        <>
                            {item.value.split(' ')[0]} 
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                {item.value.split(' ').slice(1).join(' ')}
                            </span>
                        </>
                    ) : (
                        item.value
                    )}
                </p>
            </div>
        ))}
    </div>
);

export default ConfirmationSummaryTable;