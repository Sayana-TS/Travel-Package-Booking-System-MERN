import React from 'react';

export const PricingManager = ({ data, update }) => {
  const handlePricingChange = (field, value) => {
    update('pricing', { ...data, [field]: value });
  };

  // Logic for the Summary Box
  const basePrice = parseFloat(data.basePrice) || 0;
  const discountPercent = parseFloat(data.discount) || 0;
  const discountedBase = basePrice - (basePrice * (discountPercent / 100));

  return (
    <div className="space-y-8">
      {/* Base Pricing Grid */}
      <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Standard Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-tight text-gray-500">Base Price *</label>
            <div className="relative">
              <input 
                id="pricing-base-price"
                className="w-full h-11 px-4 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark text-sm font-bold dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" 
                type="number" 
                value={data.basePrice} 
                placeholder="0.00"
                onChange={(e) => handlePricingChange('basePrice', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-tight text-gray-500">Price Type *</label>
            <select 
              id="pricing-type"
              className="w-full h-11 px-3 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark text-sm font-bold dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
              value={data.priceType} 
              onChange={(e) => handlePricingChange('priceType', e.target.value)}
            >
              <option>Per Person</option>
              <option>Per Package</option>
              <option>Per Group</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-tight text-gray-500">Currency *</label>
            <select 
              id="pricing-currency"
              className="w-full h-11 px-3 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark text-sm font-bold dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
              value={data.currency} 
              onChange={(e) => handlePricingChange('currency', e.target.value)}
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-tight text-gray-500">Global Discount (%)</label>
            <div className="relative">
              <input 
                id="pricing-discount"
                className="w-full h-11 px-4 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark text-sm font-bold dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" 
                type="number" 
                value={data.discount} 
                placeholder="0"
                onChange={(e) => handlePricingChange('discount', e.target.value)}
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-[10px] font-black text-gray-400">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculated Overview */}
      <div className="pt-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 px-1">Live Price Preview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-background-dark/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:border-gray-200">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Listed Price</p>
            <p className="text-xl font-black text-gray-800 dark:text-white mt-1.5">
              <span className="text-xs font-bold text-gray-400 mr-1">{data.currency}</span>
              {basePrice.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-primary/5 dark:bg-primary/10 p-5 rounded-2xl border-2 border-primary/20 shadow-sm shadow-primary/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary">Final Selling Price</p>
            <p className="text-xl font-black text-primary mt-1.5">
              <span className="text-xs font-bold opacity-60 mr-1">{data.currency}</span>
              {discountedBase.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-background-dark/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Saving Amount</p>
            <p className="text-xl font-black text-green-500 mt-1.5">
              <span className="text-xs font-bold opacity-60 mr-1">{data.currency}</span>
              {(basePrice - discountedBase).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};