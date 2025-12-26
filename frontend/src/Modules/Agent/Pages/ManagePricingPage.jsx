import React, { useState, useMemo } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import SeasonalPricingModal from '../Components/SeasonalPricingModal'; // Assuming the component is in the same folder

const ManagePricingPage = () => {
  // --- Dummy Data (API Ready Structure) ---
  const [hotels] = useState([
    { id: 'h1', name: 'Grand Hyatt' },
    { id: 'h2', name: 'The Ritz-Carlton' }
  ]);

  const [packages] = useState([
    { id: 'p1', hotelId: 'h1', name: 'Luxury Beachfront Villa', category: 'Honeymoon' },
    { id: 'p2', hotelId: 'h1', name: 'Mountain Adventure', category: 'Family Fun' },
    { id: 'p3', hotelId: 'h2', name: 'Ocean View Suite', category: 'Honeymoon' },
  ]);

  const [seasonalPrices, setSeasonalPrices] = useState([
    { id: 's1', name: 'Summer Special', start: '2025-06-01', end: '2025-08-31', basePrice: 350.00, discount: 15 },
    { id: 's2', name: 'Spring Getaway', start: '2025-03-01', end: '2025-05-31', basePrice: 320.00, discount: 10 },
    { id: 's3', name: 'Autumn Escape', start: '2025-09-01', end: '2025-11-30', basePrice: 300.00, discount: 0 },
    { id: 's4', name: 'Winter Retreat', start: '2025-12-01', end: '2026-02-28', basePrice: 400.00, discount: 20 },
  ]);

  // --- States for Filtering & Selection ---
  const [selectedHotel, setSelectedHotel] = useState('h1');
  const [selectedPackageId, setSelectedPackageId] = useState('p1');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // --- NEW: Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // --- Derived Data ---
  const availablePackages = packages.filter(pkg => pkg.hotelId === selectedHotel);
  const currentPackage = packages.find(pkg => pkg.id === selectedPackageId);

  // --- Calculation Helpers ---
  const calculateFinalPrice = (base, discount) => base - (base * (discount / 100));

  const isCurrentlyActive = (start, end) => {
    const today = new Date();
    return today >= new Date(start) && today <= new Date(end);
  };

  // --- NEW: Modal Handlers ---
  const handleOpenAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingData({
      ...item,
      startDate: item.start, // Map key for modal
      endDate: item.end,     // Map key for modal
      price: item.basePrice  // Map key for modal
    });
    setIsModalOpen(true);
  };

  const handleSavePricing = (formData) => {
    if (editingData) {
      setSeasonalPrices(prev => prev.map(item => 
        item.id === editingData.id 
          ? { 
              ...item, 
              start: formData.startDate, 
              end: formData.endDate, 
              basePrice: parseFloat(formData.price), 
              discount: parseFloat(formData.discount) 
            } 
          : item
      ));
    } else {
      const newEntry = {
        id: `s${Date.now()}`,
        name: "New Seasonal Rate", // Or add a name field to your modal
        start: formData.startDate,
        end: formData.endDate,
        basePrice: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0
      };
      setSeasonalPrices(prev => [...prev, newEntry]);
    }
  };

  // --- Functional Logic ---
  const filteredPricing = useMemo(() => {
    return seasonalPrices.filter(price => {
      const matchesSearch = price.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = filterDate ? (new Date(filterDate) >= new Date(price.start) && new Date(filterDate) <= new Date(price.end)) : true;
      return matchesSearch && matchesDate;
    });
  }, [searchQuery, filterDate, seasonalPrices]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this seasonal pricing rule?")) {
      setSeasonalPrices(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <AgentLayout>
      <main className="flex-grow p-4 md:p-8 animate-[fadeIn_0.4s_ease-out]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar: Selection & Filter */}
          <aside className="lg:w-1/3 xl:w-1/4 space-y-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Filter / Search</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Select Hotel</label>
                  <select 
                    value={selectedHotel}
                    onChange={(e) => {
                        setSelectedHotel(e.target.value);
                        const firstPkg = packages.find(p => p.hotelId === e.target.value);
                        if(firstPkg) setSelectedPackageId(firstPkg.id);
                    }}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                  >
                    {hotels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                  >
                    <option value="">All Categories</option>
                    <option>Honeymoon</option>
                    <option>Family Fun</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Effective Date</label>
                  <input 
                    type="date" 
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Packages</h2>
              <select 
                value={selectedPackageId}
                onChange={(e) => setSelectedPackageId(e.target.value)}
                className="w-full p-3 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
              >
                {availablePackages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                  {currentPackage?.name || "Select a Package"}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Seasonal Pricing Management</p>
              </div>
              <button 
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">add</span>
                <span>Add Seasonal Price</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPricing.map((item) => {
                const active = isCurrentlyActive(item.start, item.end);
                const finalPrice = calculateFinalPrice(item.basePrice, item.discount);
                const savings = (item.basePrice * (item.discount / 100)).toFixed(2);

                return (
                  <div 
                    key={item.id} 
                    className={`group bg-white dark:bg-slate-900/50 rounded-2xl border-2 p-5 transition-all duration-300 ${
                      active ? 'border-primary shadow-xl ring-4 ring-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        {active && (
                          <span className="inline-flex items-center gap-1 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-full mb-3 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-xs">bolt</span> Active Season
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          {new Date(item.start).toLocaleDateString()} - {new Date(item.end).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 rounded-lg text-slate-400 hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400 mb-1">Base Price</p>
                        <p className="text-lg font-bold text-slate-600 dark:text-slate-400">${item.basePrice.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        {item.discount > 0 && (
                          <p className="text-xs font-bold text-emerald-500 mb-1">-{item.discount}% Saved (${savings})</p>
                        )}
                        <p className="text-3xl font-black text-primary">${finalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredPricing.length === 0 && (
                <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-900/20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 opacity-30">event_busy</span>
                  <p className="text-slate-500 font-medium text-lg">No pricing rules found for this search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL COMPONENT --- */}
      <SeasonalPricingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePricing}
        initialData={editingData}
      />
    </AgentLayout>
  );
};

export default ManagePricingPage;