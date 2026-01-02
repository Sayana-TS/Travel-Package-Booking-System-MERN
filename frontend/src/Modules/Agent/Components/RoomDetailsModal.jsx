import React, { useState, useEffect, useRef } from 'react';

const RoomDetailsModal = ({ isOpen, onClose, roomId }) => {
  // Define the empty structure for a new room
  const initialRoomState = {
    id: null,
    type: "",
    price: "",
    availability: "Available",
    capacity: "",
    bedType: "",
    size: "",
    view: "",
    description: "",
    amenities: [],
    images: []
  };

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialRoomState);
  
  // Amenity Modal State
  const [isAmenityModalOpen, setIsAmenityModalOpen] = useState(false);
  const [newAmenityName, setNewAmenityName] = useState("");
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (roomId) {
        // EDIT MODE: Fetch existing data
        setLoading(true);
        setIsEditing(false);
        setTimeout(() => {
          const mockData = {
            id: roomId,
            type: "Deluxe Ocean Suite",
            price: 250,
            availability: "Available",
            capacity: "2 Adults",
            bedType: "King Size",
            size: "600 sq ft",
            view: "Ocean View",
            description: "This luxurious suite offers breathtaking ocean views and a spacious layout...",
            amenities: [
              { icon: 'wifi', label: 'Wi-Fi' },
              { icon: 'ac_unit', label: 'Air Conditioning' }
            ],
            images: [
              'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80&sig=6'
            ]
          };
          setRoom(mockData);
          setFormData(mockData);
          setLoading(false);
        }, 600);
      } else {
        // ADD MODE: Start fresh
        setRoom(initialRoomState);
        setFormData(initialRoomState);
        setIsEditing(true);
        setLoading(false);
      }
    }
  }, [isOpen, roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRemoveAmenity = (index) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const handleConfirmAmenity = () => {
    if (newAmenityName.trim()) {
      const newAmenity = { icon: 'star', label: newAmenityName.trim() };
      setFormData({ ...formData, amenities: [...formData.amenities, newAmenity] });
      setNewAmenityName("");
      setIsAmenityModalOpen(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, images: [...formData.images, imageUrl] });
    }
  };

  // FUTURE READY API HANDLER
  const handleSave = async () => {
    try {
      if (roomId) {
        console.log("API CALL: PUT /api/rooms/" + roomId, formData);
        // await axios.put(`/api/rooms/${roomId}`, formData);
      } else {
        console.log("API CALL: POST /api/rooms", formData);
        // await axios.post('/api/rooms', formData);
      }
      
      setRoom(formData);
      setIsEditing(false);
      
      // If it was a new room, you might want to close the modal after saving
      if (!roomId) onClose(); 
      
    } catch (error) {
      console.error("Failed to save room:", error);
    }
  };

  if (!isOpen) return null;

  const labelClass = "text-sm font-bold text-gray-500 dark:text-gray-400 mb-1";
  const valueClass = "font-semibold text-gray-800 dark:text-gray-200 text-lg";
  const inputClass = "w-full rounded-lg border border-primary/20 bg-white py-2.5 px-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-primary/30 dark:bg-black/20 dark:text-white outline-none transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white dark:bg-background-dark rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-primary/10">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-black/40 dark:text-white/40 uppercase tracking-widest font-display">Loading Room...</p>
          </div>
        ) : room && (
          <>
            <header className="flex items-center justify-between p-6 border-b border-primary/20 dark:border-primary/30">
              <div className="flex-1">
                {isEditing ? (
                  <div className="max-w-md">
                    <label className={labelClass}>Room Title</label>
                    <input name="type" placeholder="e.g. Deluxe Suite" className={inputClass} value={formData.type} onChange={handleInputChange} />
                  </div>
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{room.type}</h2>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {roomId && (
                    <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center justify-center h-10 px-4 text-sm font-bold text-gray-900 bg-transparent border border-primary/50 rounded hover:bg-primary/10 dark:text-white dark:border-primary/50 dark:hover:bg-primary/20 transition-all"
                    >
                    <span className="material-symbols-outlined mr-2"> {isEditing ? 'visibility' : 'edit'} </span>
                    {isEditing ? 'Preview' : 'Edit Mode'}
                    </button>
                )}
                <button onClick={onClose} className="flex items-center justify-center w-10 h-10 text-gray-600 rounded-full hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-white/10">
                  <span className="material-symbols-outlined"> close </span>
                </button>
              </div>
            </header>

            <main className="flex-1 p-6 overflow-y-auto space-y-8 scrollbar-hide">
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  General Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col">
                    <span className={labelClass}>Internal Room ID</span>
                    <p className={valueClass}>{roomId ? `RM-${roomId}` : "New Room"}</p>
                  </div>

                  <div className="flex flex-col">
                    <label className={labelClass}>Price / Night ($)</label>
                    {isEditing ? (
                      <input name="price" type="number" className={inputClass} value={formData.price} onChange={handleInputChange} />
                    ) : (
                      <p className={`${valueClass} text-primary`}>${room.price}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className={labelClass}>Status</label>
                    {isEditing ? (
                      <select name="availability" className={inputClass} value={formData.availability} onChange={handleInputChange}>
                        <option value="Available">Available</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Occupied">Occupied</option>
                      </select>
                    ) : (
                      <span className={`font-bold px-2 py-1 rounded bg-primary/10 text-primary w-fit text-sm`}>{room.availability}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className={labelClass}>Max Capacity</label>
                    {isEditing ? (
                      <input name="capacity" placeholder="e.g. 2 Adults" className={inputClass} value={formData.capacity} onChange={handleInputChange} />
                    ) : (
                      <p className={valueClass}>{room.capacity}</p>
                    )}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Room Description</h3>
                {isEditing ? (
                  <textarea 
                    name="description"
                    placeholder="Describe the room features..."
                    className={`${inputClass} min-h-[120px] leading-relaxed`} 
                    value={formData.description} 
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{room.description || "No description provided."}</p>
                )}
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Included Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {(isEditing ? formData.amenities : room.amenities).map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/5 text-primary border border-primary/20 group relative">
                      <span className="material-symbols-outlined text-xl">{amenity.icon}</span>
                      <span className="text-sm font-bold">{amenity.label}</span>
                      {isEditing && (
                        <button onClick={() => handleRemoveAmenity(idx)} className="ml-1 text-red-500 hover:text-red-700 transition-colors">
                          <span className="material-symbols-outlined !text-sm">close</span>
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button onClick={() => setIsAmenityModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-primary/40 text-primary hover:bg-primary/5">
                      <span className="material-symbols-outlined text-xl">add</span>
                      <span className="text-sm font-bold">Add Amenity</span>
                    </button>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Media Gallery</h3>
                  {isEditing && (
                    <div>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                      <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center h-10 px-4 text-sm font-bold text-white bg-primary rounded hover:shadow-lg hover:shadow-primary/30 transition-all">
                        <span className="material-symbols-outlined mr-2"> add_photo_alternate </span>
                        Add Image
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(isEditing ? formData.images : room.images).map((url, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-black/5 dark:border-white/5 shadow-sm">
                      <img alt="Room" className="w-full h-full object-cover" src={url} />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        {isEditing && (
                          <button onClick={() => handleRemoveImage(idx)} className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-red-500 transition-colors">
                            <span className="material-symbols-outlined !text-lg">delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            <footer className="flex items-center justify-end gap-3 p-6 border-t border-primary/20 dark:border-primary/30 bg-black/[0.02] dark:bg-white/[0.02]">
              <button onClick={onClose} className="h-10 px-6 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Cancel</button>
              
              {roomId && (
                <button className="h-10 px-6 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all">
                    Delete Room
                </button>
              )}

              {isEditing ? (
                <button onClick={handleSave} className="h-10 px-8 text-sm font-bold text-white bg-primary rounded-lg hover:brightness-110 shadow-lg shadow-primary/30 transition-all">
                  {roomId ? 'Save Changes' : 'Create Room'}
                </button>
              ) : (
                <button onClick={onClose} className="h-10 px-8 text-sm font-bold text-white bg-primary rounded-lg hover:brightness-110 shadow-lg shadow-primary/30 transition-all">
                  Done
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      {/* Amenity Input Modal */}
      {isAmenityModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAmenityModalOpen(false)} />
          <div className="relative w-full max-w-sm bg-white dark:bg-background-dark p-6 rounded-xl shadow-2xl border border-primary/20">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add Amenity</h4>
            <input 
              autoFocus
              className={inputClass} 
              placeholder="e.g. Private Balcony" 
              value={newAmenityName} 
              onChange={(e) => setNewAmenityName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmAmenity()}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setIsAmenityModalOpen(false)} 
                className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmAmenity}
                className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:brightness-110"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailsModal;