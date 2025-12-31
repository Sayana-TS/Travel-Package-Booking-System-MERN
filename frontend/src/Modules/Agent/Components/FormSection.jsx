import React, { useState, useEffect } from 'react';

/**
 * @param {string} title - The section heading
 * @param {boolean} isCompleted - Changes icon color and type
 * @param {boolean} defaultOpen - Initial accordion state
 * @param {React.ReactNode} headerActions - Slot for toggles or buttons in the header
 * @param {boolean} isLoading - Disables interactions and shows a pulse effect
 * @param {boolean} hasError - Changes border color to indicate validation failure
 */
export const FormSection = ({ 
  title, 
  children, 
  isCompleted, 
  defaultOpen = false, 
  headerActions = null,
  isLoading = false,
  hasError = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Sync internal state if parent wants to force-open the section (API ready)
  useEffect(() => {
    if (defaultOpen) setIsOpen(true);
  }, [defaultOpen]);

  return (
    <div 
      className={`
        flex flex-col rounded-2xl border transition-all duration-300
        ${hasError 
          ? 'border-red-500 bg-red-50/30 dark:bg-red-900/10' 
          : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark'}
        ${isOpen ? 'shadow-xl shadow-black/5 dark:shadow-none' : 'shadow-sm'}
        ${isLoading ? 'opacity-70 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-3">
        {/* Left Side: Status & Title */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-1 items-center gap-3 cursor-pointer group text-left"
          type="button"
          aria-expanded={isOpen}
        >
          <span className={`
            material-symbols-outlined transition-all duration-300
            ${isCompleted ? 'text-green-500 scale-110' : 'text-gray-300 dark:text-gray-600'}
            ${hasError ? 'text-red-500' : ''}
          `}>
            {isCompleted ? 'check_circle' : (hasError ? 'error' : 'radio_button_unchecked')}
          </span>
          <p className="text-gray-900 dark:text-white text-base font-black tracking-tight leading-normal group-hover:text-primary transition-colors">
            {title}
          </p>
        </button>

        {/* Right Side: Header Actions & Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 dark:border-gray-800">
          {headerActions && (
            <div className="flex-1 sm:flex-initial">
              {headerActions}
            </div>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              material-symbols-outlined p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300
              text-gray-400 dark:text-gray-500
              ${isOpen ? 'rotate-180 text-primary' : ''}
            `}
            type="button"
          >
            expand_more
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div 
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-5 pt-2 pb-6 border-t border-gray-50 dark:border-gray-800/50">
          {isLoading ? (
            <div className="flex flex-col gap-4 animate-pulse py-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
              <div className="h-32 bg-gray-100 dark:bg-gray-800/50 rounded-xl"></div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-2 duration-500">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};