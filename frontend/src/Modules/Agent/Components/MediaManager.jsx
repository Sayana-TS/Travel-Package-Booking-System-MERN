import React from 'react';

export const MediaManager = ({ media, thumbnailId, update }) => {
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (media.length + files.length > 10) {
      alert("Max 10 images allowed.");
      return;
    }

    const newMedia = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      status: 'uploaded'
    }));

    const updatedGallery = [...media, ...newMedia];
    update('media', updatedGallery);
    
    if (!thumbnailId && updatedGallery.length > 0) {
      update('thumbnailId', updatedGallery[0].id);
    }
  };

  const removeImage = (id) => {
    const filtered = media.filter(img => img.id !== id);
    update('media', filtered);
    if (thumbnailId === id) {
      update('thumbnailId', filtered.length > 0 ? filtered[0].id : null);
    }
  };

  const setThumbnail = (id) => update('thumbnailId', id);

  return (
    <div className="space-y-6 w-full">
      {/* Upload Area */}
      <div className="space-y-2">
        <label className="block text-[10px] font-black uppercase text-gray-500">Upload Package Images *</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full min-h-[140px] md:h-40 border-2 border-gray-100 dark:border-gray-800 border-dashed rounded-2xl cursor-pointer bg-white dark:bg-background-dark/30 hover:bg-gray-50 dark:hover:bg-background-dark transition-all p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl mb-2">🖼️</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-bold leading-tight">
                Drag & drop images <span className="hidden sm:inline">here</span> or <span className="text-primary">browse</span>
              </p>
              <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black mt-2 tracking-tighter">
                JPG, PNG, WEBP (Max 10 images, 5MB each)
              </p>
            </div>
            <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Grid Preview */}
      {media.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-2">
            <h3 className="text-[10px] md:text-xs font-black uppercase text-gray-500">
              Image Preview ({media.length}/10)
            </h3>
            <button 
              onClick={() => update('media', [])} 
              className="text-[10px] font-black uppercase text-red-500 hover:text-red-600 transition-colors whitespace-nowrap"
            >
              Remove All
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {media.map((img) => (
              <div 
                key={img.id} 
                className={`relative group rounded-xl overflow-hidden border-2 transition-all ${thumbnailId === img.id ? 'border-primary shadow-lg shadow-primary/10' : 'border-gray-100 dark:border-gray-800'}`}
              >
                {thumbnailId === img.id && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-black uppercase px-2 py-1 rounded-full z-10 shadow-sm flex items-center gap-1">
                    <span>⭐</span> Thumbnail
                  </div>
                )}
                
                <img src={img.url} alt="Preview" className="aspect-square w-full object-cover" />
                
                {/* Overlay - Opacity 100 on touch devices by default for accessibility, or keep group-hover */}
                <div className="absolute inset-0 bg-black/60 sm:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  {thumbnailId !== img.id && (
                    <button 
                      onClick={() => setThumbnail(img.id)}
                      className="bg-white text-black text-[9px] font-black uppercase px-3 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      Set Thumbnail
                    </button>
                  )}
                  <button 
                    onClick={() => removeImage(img.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>

                <div className="p-2 sm:p-3 bg-white dark:bg-card-dark border-t border-gray-50 dark:border-gray-800">
                  <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300 truncate">{img.name}</p>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mt-0.5">{img.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {(media.length === 0 || !thumbnailId) && (
        <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 flex items-start sm:items-center gap-2 text-red-600 dark:text-red-400">
          <span className="material-symbols-outlined text-lg shrink-0">error_outline</span>
          <span className="text-[10px] md:text-[11px] font-black uppercase leading-tight">
            Please upload at least one image and select a thumbnail.
          </span>
        </div>
      )}
    </div>
  );
};