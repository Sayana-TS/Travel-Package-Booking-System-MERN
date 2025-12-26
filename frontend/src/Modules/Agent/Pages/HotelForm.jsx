import React, { useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import Breadcrumb from '../../../Shared/Components/Breadcrumb';
import { dummyHotel } from '../dummyHotels';

const HotelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const fileInputRef = useRef(null);

  // Reusable class for consistent, larger inputs
  const inputClass = "form-input w-full rounded-md border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark focus:border-primary focus:ring-primary/50 text-dark-text dark:text-light-text py-3 px-4 text-base transition-all";
  const selectClass = "form-select w-full rounded-md border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark focus:border-primary focus:ring-primary/50 py-3 px-4 text-base transition-all";

  const emptyHotel = {
    name: '',
    address: '',
    city: '',
    category: '',
    description: '',
    amenities: [],
    rooms: [
      { id: 1, type: '', price: '', count: '', description: '', error: true }
    ],
    tags: [],
    specialNotes: '',
    latitude: '',
    longitude: '',
    locationSearch: ''
  };
  
  // Local state for inputs that aren't directly in formData yet
  const [customAmenity, setCustomAmenity] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState(
    isEditMode ? dummyHotel : emptyHotel
  );  

  // --- Handlers ---

  // Handle Room Changes
  const handleRoomChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.map(room => {
        if (room.id === id) {
          const updatedRoom = { ...room, [field]: value };
          // Simple validation logic
          updatedRoom.error = !updatedRoom.type || !updatedRoom.price;
          return updatedRoom;
        }
        return room;
      })
    }));
  };

  const addRoom = () => {
    const newId = formData.rooms.length > 0 ? Math.max(...formData.rooms.map(r => r.id)) + 1 : 1;
    setFormData(prev => ({
      ...prev,
      rooms: [...prev.rooms, { id: newId, type: "", price: "", count: "", description: "", error: true }]
    }));
  };

  const removeRoom = (id) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.filter(room => room.id !== id)
    }));
  };

  // Handle Amenities
  const toggleAmenity = (amenity) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists 
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim()) {
      toggleAmenity(customAmenity.trim());
      setCustomAmenity("");
    }
  };

  // Handle Tags
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle Geolocation
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        }));
      }, (error) => {
        alert("Unable to retrieve your location");
      });
    }
  };

  // File Upload (Simulation)
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  // Derived State for Pricing
  const pricingOverview = useMemo(() => {
    const prices = formData.rooms
      .map(r => parseFloat(r.price))
      .filter(p => !isNaN(p) && p > 0);
    return {
      min: prices.length ? Math.min(...prices).toFixed(2) : "0.00",
      max: prices.length ? Math.max(...prices).toFixed(2) : "0.00"
    };
  }, [formData.rooms]);

  return (
    <AgentLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Breadcrumb 
            path={[{ label: 'Hotels', href: '/hotels' }]} 
            currentPage={isEditMode ? 'Edit Hotel' : 'Add New Hotel'} 
          />
          <h1 className="text-3xl font-extrabold tracking-tight text-dark-text dark:text-light-text mt-2">
            {isEditMode ? 'Edit Hotel' : 'Add New Hotel'}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-2">
            
            {/* Basic Information */}
            <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-subtle">
              <h2 className="mb-6 text-xl font-bold">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Hotel Name*</label>
                  <input 
                    type="text"
                    className={inputClass}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Full Address / Location*</label>
                  <input 
                    type="text" 
                    className={inputClass}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">City*</label>
                  <select 
                    className={selectClass}
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  >
                    <option value="Peaksville">Peaksville</option>
                    <option value="Lakeview">Lakeview</option>
                    <option value="Metropolis">Metropolis</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Category / Type*</label>
                  <select 
                    className={selectClass}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Luxury Resort">Luxury Resort</option>
                    <option value="Boutique Hotel">Boutique Hotel</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Hotel Description*</label>
                  <textarea 
                    rows="5"
                    className={`${inputClass} resize-none`}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-subtle">
              <h2 className="mb-6 text-xl font-bold">Amenities & Facilities</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {['Wi-Fi', 'Parking', 'Pool', 'Gym', 'Restaurant', 'Pet Friendly', 'Spa', 'Bar'].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-3 rounded-md border border-transparent p-3 hover:bg-background-light dark:hover:bg-background-dark cursor-pointer text-base select-none">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 rounded text-primary focus:ring-primary/50 bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)} 
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-end gap-2">
                <div className="flex-grow w-full">
                  <label className="mb-2 block text-sm font-medium">Add Custom Amenity</label>
                  <input 
                    className={inputClass} 
                    placeholder="e.g., Rooftop Bar" 
                    type="text"
                    value={customAmenity}
                    onChange={(e) => setCustomAmenity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomAmenity()}
                  />
                </div>
                <button 
                  type="button"
                  onClick={addCustomAmenity}
                  className="w-full sm:w-auto flex h-[52px] items-center justify-center gap-2 rounded-md bg-primary/10 px-6 text-base font-semibold text-primary hover:bg-primary/20 dark:bg-primary/20 transition-colors"
                >
                  <span className="material-symbols-outlined !text-2xl">add</span>
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Room Information Section */}
            <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-subtle">
              <h2 className="mb-6 text-xl font-bold">Room Information</h2>
              <div className="space-y-6">
                {formData.rooms.map((room) => (
                  <div 
                    key={room.id} 
                    className={`rounded-lg border p-6 ${room.error ? 'border-error-red bg-error-red/5 dark:bg-error-red/10' : 'border-border-light dark:border-border-dark'}`}
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                      <div className="md:col-span-2">
                        <label className={`mb-2 block text-sm font-medium ${room.error && !room.type ? 'text-error-red' : 'text-muted-light dark:text-muted-dark'}`}>Room Type*</label>
                        <input 
                          type="text" 
                          className={`${inputClass} ${room.error && !room.type ? 'border-error-red focus:border-error-red' : ''}`}
                          value={room.type} 
                          onChange={(e) => handleRoomChange(room.id, 'type', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={`mb-2 block text-sm font-medium ${room.error && !room.price ? 'text-error-red' : 'text-muted-light dark:text-muted-dark'}`}>Price/Night*</label>
                        <input 
                          type="number" 
                          className={`${inputClass} ${room.error && !room.price ? 'border-error-red focus:border-error-red' : ''}`}
                          value={room.price} 
                          onChange={(e) => handleRoomChange(room.id, 'price', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-muted-light dark:text-muted-dark"># Rooms*</label>
                        <input 
                          className={inputClass} 
                          type="number" 
                          value={room.count}
                          onChange={(e) => handleRoomChange(room.id, 'count', e.target.value)}
                        />
                      </div>
                      <div className="flex items-end justify-end">
                        <button 
                          onClick={() => removeRoom(room.id)}
                          className="flex h-[52px] w-[52px] items-center justify-center rounded-md text-muted-light hover:bg-error-red/10 hover:text-error-red dark:text-muted-dark transition-colors border border-transparent hover:border-error-red/20"
                        >
                          <span className="material-symbols-outlined !text-2xl">delete</span>
                        </button>
                      </div>
                      <div className="md:col-span-5">
                        <label className="mb-2 block text-sm font-medium text-muted-light dark:text-muted-dark">Description</label>
                        <input 
                          className={inputClass} 
                          type="text" 
                          value={room.description}
                          onChange={(e) => handleRoomChange(room.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                    {room.error && <p className="mt-3 text-sm font-medium text-error-red">Room type and price are required.</p>}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button 
                  onClick={addRoom}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-primary-darker transition-colors"
                >
                  <span className="material-symbols-outlined !text-2xl">add</span>
                  <span>Add Another Room Type</span>
                </button>
              </div>
            </div>

            {/* Images Gallery */}
            <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-subtle">
              <h2 className="mb-6 text-xl font-bold">Images / Gallery</h2>
              <div className="rounded-lg border-2 border-dashed border-border-light dark:border-border-dark p-12 text-center hover:bg-background-light dark:hover:bg-background-dark transition-colors cursor-pointer" onClick={handleFileSelect}>
                <input type="file" multiple ref={fileInputRef} className="hidden" />
                <div className="flex flex-col items-center gap-3 text-muted-light dark:text-muted-dark">
                  <span className="material-symbols-outlined text-6xl text-primary">cloud_upload</span>
                  <p className="text-lg font-semibold text-dark-text dark:text-light-text">
                    Drag & drop images here, or <button className="font-semibold text-primary hover:underline">browse</button>
                  </p>
                  <p className="text-sm">JPG, PNG, WEBP supported (max 10MB each, up to 10 images)</p>
                </div>
              </div>
            </div>

            {/* Special Notes Section */}
            <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-subtle">
              <h2 className="mb-6 text-xl font-bold">Special Notes / Terms</h2>
              <textarea 
                className={`${inputClass} resize-none`}
                placeholder="e.g., Check-in from 3:00 PM, check-out until 11:00 AM. No smoking." 
                rows="5"
                value={formData.specialNotes}
                onChange={(e) => setFormData({...formData, specialNotes: e.target.value})}
              ></textarea>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-8">
              <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-subtle">
                <h2 className="mb-6 text-xl font-bold">Pricing Overview</h2>
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-light dark:text-muted-dark">Min Price / Night</p>
                    <div className="flex h-[52px] items-center rounded-md bg-background-light px-4 dark:bg-background-dark border border-border-light dark:border-border-dark">
                      <p className="text-lg font-bold text-dark-text dark:text-light-text">${pricingOverview.min}</p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-light dark:text-muted-dark">Max Price / Night</p>
                    <div className="flex h-[52px] items-center rounded-md bg-background-light px-4 dark:bg-background-dark border border-border-light dark:border-border-dark">
                      <p className="text-lg font-bold text-dark-text dark:text-light-text">${pricingOverview.max}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Map */}
              <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-subtle">
                <h2 className="mb-6 text-xl font-bold">Location Map</h2>
                <div className="space-y-6">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark !text-2xl">search</span>
                    <input 
                      className={`${inputClass} pl-12`} 
                      placeholder="Search location..." 
                      type="text"
                      value={formData.locationSearch}
                      onChange={(e) => setFormData({...formData, locationSearch: e.target.value})}
                    />
                  </div>
                  <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden relative group">
                    {formData.latitude ? (
                      <div className="text-center p-2">
                         <span className="material-symbols-outlined !text-4xl text-primary mb-2">location_on</span>
                         <p className="text-xs font-mono">Lat: {formData.latitude}</p>
                         <p className="text-xs font-mono">Lng: {formData.longitude}</p>
                      </div>
                    ) : (
                       <p className="text-sm text-muted-light dark:text-muted-dark">Map Preview</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Latitude</label>
                      <input 
                        className={inputClass} 
                        placeholder="Auto-filled" 
                        type="text"
                        value={formData.latitude}
                        onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Longitude</label>
                      <input 
                        className={inputClass} 
                        placeholder="Auto-filled" 
                        type="text"
                        value={formData.longitude}
                        onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleUseMyLocation}
                    className="flex w-full h-[52px] items-center justify-center gap-2 rounded-md border border-border-light px-4 text-base font-semibold text-dark-text hover:bg-background-light dark:border-border-dark dark:text-light-text dark:hover:bg-background-dark transition-all"
                  >
                    <span className="material-symbols-outlined !text-2xl">my_location</span>
                    Use My Location
                  </button>
                </div>
              </div>

              {/* Tags Section */}
              <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-subtle">
                <h2 className="mb-6 text-xl font-bold">Tags / Categorization</h2>
                <input 
                  className={inputClass} 
                  placeholder="Type and press Enter..." 
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <div className="mt-5 flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <div key={tag} className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-base font-medium text-primary dark:bg-primary/20">
                      <span>{tag}</span>
                      <button 
                        onClick={() => removeTag(tag)}
                        className="text-primary/70 hover:text-primary leading-none"
                      >
                        <span className="material-symbols-outlined !text-lg">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY FOOTER ACTION BAR */}
      <footer className="bottom-0 z-10 mt-auto  dark:border-border-dark  backdrop-blur-md">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
            {/* <button 
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto rounded-lg px-6 py-3 text-base font-semibold text-muted-light dark:text-muted-dark hover:bg-gray-100 dark:hover:bg-border-dark transition-colors"
            >
              Cancel
            </button> */}
            <button
            onClick={() => navigate(-1)}
             className="w-full sm:w-auto rounded-lg border border-primary px-6 py-3 text-base font-semibold text-primary hover:bg-primary/5 transition-colors">
              Cancel
            </button>
            <button 
              onClick={() => console.log(formData)}
              className="w-full sm:w-auto rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-primary-darker transition-all transform active:scale-[0.98]"
            >
              {isEditMode ? 'Update Hotel' : 'Submit for Approval'}

            </button>
          </div>
        </div>
      </footer>
    </AgentLayout>
  );
};

export default HotelForm;