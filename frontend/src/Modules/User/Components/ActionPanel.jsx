import React from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable Action Button Component
const ActionButton = ({ onClick, children, isPrimary, isDestructive, isBack }) => {
    let classes = 'flex items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-bold transition-colors w-full sm:w-auto cursor-pointer';

    if (isPrimary) {
        classes += ' bg-primary text-white hover:bg-primary/90'; 
    } else if (isDestructive) {
        classes += ' text-red-600 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/10';
    } else if (isBack) {
        classes += ' bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30';
    } else {
         classes += ' bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30';
    }

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
};

const ActionPanel = ({ bookingId, status }) => {
    const navigate = useNavigate();
    
    // Determine which buttons to show based on status
    const canModify = status === 'Pending';
    const canCancel = status === 'Pending' || status === 'Confirmed';
    
    return (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
                
                {/* 1. Download Ticket */}
                <ActionButton 
                    isPrimary 
                    onClick={() => console.log('Downloading...', bookingId)}
                >
                    <span className="material-symbols-outlined">download</span>
                    Download Ticket
                </ActionButton>
                
                {/* 2. Modify Booking */}
                {canModify && (
                    <ActionButton onClick={() => navigate(`/booking`)}>
                        <span className="material-symbols-outlined">edit</span>
                        Modify Booking
                    </ActionButton>
                )}
                
                {/* 3. Cancel Booking */}
                {canCancel && (
                    <ActionButton 
                        isDestructive 
                        onClick={() => navigate(`/cancel/${bookingId}`)}
                    >
                        <span className="material-symbols-outlined">cancel</span>
                        Cancel Booking
                    </ActionButton>
                )}
            </div>
            
            {/* Right side: Back Button */}
            {/* navigate(-1) goes back to the previous page. 
                Alternatively, use navigate('/bookings') to go to a fixed list. */}
            <ActionButton isBack onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back to History
            </ActionButton>
        </div>
    );
};

export default ActionPanel;