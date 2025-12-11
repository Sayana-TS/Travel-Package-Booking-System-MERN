import React from 'react';
import ConfirmationSummaryTable from './ConfirmationSummaryTable'; // Adjust path
import { useNavigate } from 'react-router-dom';

const ConfirmationCard = ({ data, summaryData }) => {

    const navigate = useNavigate()
    return (
        <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg p-8 md:p-12 border border-gray-200/50 dark:border-gray-800/50">
            <div className="text-center mb-8">

                {/* 1. ICON FIX: Removed 'transform scale-[0.5]' */}
                <span
                    className="material-symbols-outlined text-primary animate-[iconPop_0.5s_ease-out_0.2s_forwards]"
                    style={{ fontSize: '100px' }} // Use a direct style to enforce the size
                >
                    check_circle
                </span>

                {/* 2. TEXT FIX: Removed 'opacity-0' */}
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 animate-[fadeInUp_0.8s_ease-out_forwards] [animation-delay:0.4s]">
                    Booking Confirmed!
                </h2>

                {/* 3. PARAGRAPH FIX: Removed 'opacity-0' */}
                <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out_forwards] [animation-delay:0.6s]">
                    Thank you, {data.userName}, for booking your adventure with TrekFinder! Your booking is confirmed. Your Booking ID is
                    <span className="font-bold text-gray-800 dark:text-white"> {data.bookingId}</span>.
                </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700/50 my-8"></div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Booking Summary</h3>

            {/* Summary Table */}
            <ConfirmationSummaryTable data={summaryData} />

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary text-background-dark text-base font-bold shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105">
                    <span className="material-symbols-outlined">download</span>
                    <span>Download Ticket (PDF)</span>
                </button>
                <button onClick={()=>navigate('/')} className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary/20 dark:bg-primary/30 text-primary font-bold hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors">
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default ConfirmationCard;