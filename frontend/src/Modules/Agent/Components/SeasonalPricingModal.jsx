import React, { useState, useEffect } from 'react';

/**
 * SeasonalPricingModal Component
 * @param {boolean} isOpen - Controls visibility
 * @param {function} onClose - Function to close the modal
 * @param {function} onSave - Returns the form data object on submit
 * @param {object} initialData - Optional data for "Edit" mode
 */
const SeasonalPricingModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    discount: ''
  });

  // Sync state with initialData when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        discount: initialData.discount || ''
      });
    } else {
      setFormData({ name: '', startDate: '', endDate: '', discount: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl w-full max-w-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {initialData ? 'Edit Seasonal Pricing' : 'Add Seasonal Pricing'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Set the details for a {initialData ? 'selected' : 'new'} seasonal period.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="mt-6 space-y-5">
            {/* Season Name Field */}
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="name">
                Season Name
              </label>
              <input 
                className="mt-1.5 w-full p-3.5 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                id="name" 
                type="text"
                placeholder="e.g. Summer Special 2025"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="startDate">
                  Start Date
                </label>
                <input 
                  className="mt-1.5 w-full p-3.5 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                  id="startDate" 
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="endDate">
                  End Date
                </label>
                <input 
                  className="mt-1.5 w-full p-3.5 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                  id="endDate" 
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="discount">
                Discount Percentage
              </label>
              <div className="mt-1.5 relative rounded-lg shadow-sm">
                <input 
                  className="w-full p-3.5 pr-12 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                  id="discount" 
                  placeholder="0" 
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-slate-500 dark:text-slate-400 font-bold">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-primary rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">save</span>
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalPricingModal;