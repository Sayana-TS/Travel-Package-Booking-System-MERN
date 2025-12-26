import React, { useState, useRef } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';

const ManageImagesPage = () => {
  const [activeTab, setActiveTab] = useState('hotel'); // 'hotel' or 'package'
  const [selectedId, setSelectedId] = useState('h1');
  const fileInputRef = useRef(null);

  // --- Dummy Data (API Ready Structure) ---
  const [data, setData] = useState({
    hotels: [
      {
        id: "h1",
        name: "Grand Palace Hotel",
        images: [
          { id: "i1", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400", isFeatured: true, category: "Exterior" },
          { id: "i2", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400", isFeatured: false, category: "Room" },
          { id: "i3", url: "https://images.unsplash.com/photo-1551882547-ff43c63be5c2?w=400", isFeatured: false, category: "Lobby" },
          { id: "i4", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400", isFeatured: false, category: "Pool" },
          { id: "i5", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400", isFeatured: false, category: "Restaurant" },
        ]
      },
      { id: "h2", name: "Seaside Resort", images: [] },
      { id: "h3", name: "Mountain View Lodge", images: [] }
    ],
    packages: [
      {
        id: "p1",
        name: "Honeymoon Special",
        images: [
          { id: "i20", url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400", isFeatured: true },
          { id: "i21", url: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=400", isFeatured: false },
        ]
      },
      { id: "p2", name: "Family Fun Package", images: [] }
    ]
  });

  // --- Helpers ---
  const currentEntity = activeTab === 'hotel' 
    ? data.hotels.find(h => h.id === selectedId)
    : data.packages.find(p => p.id === selectedId);

  // --- Handlers ---
  const handleToggleFeatured = (imageId) => {
    const updatedData = { ...data };
    const list = activeTab === 'hotel' ? updatedData.hotels : updatedData.packages;
    const entity = list.find(item => item.id === selectedId);
    
    entity.images = entity.images.map(img => ({
      ...img,
      isFeatured: img.id === imageId
    }));
    
    setData(updatedData);
  };

  const handleDelete = (imageId) => {
    if(!window.confirm("Are you sure you want to delete this image?")) return;
    
    const updatedData = { ...data };
    const list = activeTab === 'hotel' ? updatedData.hotels : updatedData.packages;
    const entity = list.find(item => item.id === selectedId);
    
    entity.images = entity.images.filter(img => img.id !== imageId);
    setData(updatedData);
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      isFeatured: false,
      category: activeTab === 'hotel' ? 'General' : null
    }));

    const updatedData = { ...data };
    const list = activeTab === 'hotel' ? updatedData.hotels : updatedData.packages;
    const entity = list.find(item => item.id === selectedId);
    entity.images = [...entity.images, ...newImages];
    setData(updatedData);
  };

  return (
    <AgentLayout>
      <main className="flex-1 p-4 md:p-8 animate-[fadeIn_0.4s_ease-out]">
        <div className="max-w-7xl mx-auto">
          
          <header className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-center md:text-left">Manage Gallery</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-center md:text-left">Organize and update visual assets for your properties and packages.</p>
          </header>

          {/* Tab Navigation - Scrollable on Mobile */}
          <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            <nav className="flex gap-4 md:gap-8 min-w-max px-2">
              {[
                { id: 'hotel', label: 'Hotel + Room Images', icon: 'apartment' },
                { id: 'package', label: 'Package Images', icon: 'inventory_2' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    const firstId = tab.id === 'hotel' ? data.hotels[0].id : data.packages[0].id;
                    setSelectedId(firstId);
                  }}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar: Selection & Info */}
            <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Select {activeTab === 'hotel' ? 'Hotel' : 'Package'}
                </label>
                <select 
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full p-3.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-base font-medium focus:ring-primary focus:border-primary transition-all cursor-pointer shadow-sm"
                >
                  {(activeTab === 'hotel' ? data.hotels : data.packages).map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>

                <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">info</span>
                    <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                      The image marked with a <span className="font-bold">Star</span> will be used as the main thumbnail in search results.
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Card */}
              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">cloud_upload</span>
                  Quick Upload
                </h3>
                <div 
                  onClick={handleUploadClick}
                  className="group cursor-pointer border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary rounded-xl p-8 transition-all text-center"
                >
                  <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-primary transition-colors">add_photo_alternate</span>
                  <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">Drag or Click to upload</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase">JPG, PNG up to 10MB</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden" 
                    multiple 
                    accept="image/*" 
                  />
                </div>
              </div>
            </aside>

            {/* Main: Gallery Grid */}
            <section className="lg:col-span-8 order-1 lg:order-2">
              <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[400px]">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                  <h3 className="font-bold text-slate-900 dark:text-white truncate pr-4">
                    {currentEntity?.name} <span className="text-slate-400 font-normal text-sm ml-2">({currentEntity?.images.length} images)</span>
                  </h3>
                </div>

                {currentEntity?.images.length > 0 ? (
                  <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {currentEntity.images.map((img) => (
                      <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                        <img src={img.url} alt="Gallery item" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        
                        {/* Featured Badge */}
                        {img.isFeatured && (
                          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg flex items-center gap-1 z-10">
                            <span className="material-symbols-outlined text-[12px]">star</span> FEATURED
                          </div>
                        )}

                        {/* Category Tag */}
                        {img.category && (
                          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded z-10">
                            {img.category}
                          </div>
                        )}

                        {/* Action Overlays - Visible on hover (Desktop) and always on touch (Mobile) via flex gap */}
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          {!img.isFeatured && (
                            <button 
                              onClick={() => handleToggleFeatured(img.id)}
                              className="bg-white/20 hover:bg-primary text-white p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90"
                              title="Set as Featured"
                            >
                              <span className="material-symbols-outlined text-lg">star</span>
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(img.id)}
                            className="bg-white/20 hover:bg-red-500 text-white p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90"
                            title="Delete Image"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400 px-6 text-center">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-20">image_not_supported</span>
                    <p className="font-medium">No images uploaded for this {activeTab}.</p>
                    <button onClick={handleUploadClick} className="mt-4 text-primary font-bold hover:underline text-sm uppercase">Upload First Image</button>
                  </div>
                )}
              </div>
            </section>

          </div>
        </div>
      </main>
    </AgentLayout>
  );
};

export default ManageImagesPage;