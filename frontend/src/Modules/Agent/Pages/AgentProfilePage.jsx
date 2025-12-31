import React, { useState, memo, useRef } from 'react';
import MaterialIcon from '../../User/Components/MaterialIcon';
import AgentLayout from '../../../Shared/layouts/AgentLayout';

// --- Dummy Data for API Readiness ---
const AGENT_DATA = {
  profile: {
    fullName: "Olivia Chen",
    contactNumber: "+1 (555) 123-4567",
    agencyName: "Wanderlust Travels",
    address: "New York, USA",
    currentLocation: "Manhattan, NY",
    email: "olivia.chen@email.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw7zlGGuf-OgPwKzyfO_8tTuCdGEozdHimZ4y6JU9FQO0HWpTvXLK9wSiLGuURRjYkiFaAteXznnMNsdvB0aPeuNhRIAGgwzq_N7tgx7V8ajs8aEiKmOFYfL9_FIo90rIDZ4wI5297KEUYCau6YQmNvN_nN_vwN3s9RRPjnsyCzaXLy3CbsWbgQkrmuQ9-92O39ZeWE3XTVOKrXpruOJEb4N7WsMlCb6tdM7_S8siVx6UKrpijhlbMD0xaqAu7HdtlpKdp_RLnqK0",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlnMMQqFThlf7Qw9ogt6F2cGKBnF0R9ysz2VfFyHqBmhox4GwuEzqQVBhX0ZQfPz4Pl-7gNjU2G4T8r3YH9QqMjya8blYp-B0XONY-J9sEjppmi1soh1vfMLkU0iIKwbc3CafBiO-4M77kJ79ccfZj6nRM5ZwhcxNEBQ3styTQPlZNB_GevlLmqkO3k6vbauwBhV0OwYO6OA74HbdfI1zP5mym6lL1AlpyhtNgxUtjMCSeyebTLRkdrdRatP2W5jc2wFvjMHpJWDM",
    verified: true,
    about: "I'm a passionate travel architect with 10+ years of experience in crafting bespoke journeys. I believe that travel is not just about seeing new places, but about gaining new perspectives.",
    links: {
      whatsapp: "+15551234567",
      instagram: "wanderlust.chen",
      website: "www.wanderlusttravels.com"
    }
  },
  stats: {
    packages: { total: 28, active: 25, pending: 3 },
    hotels: { total: 15, active: 12, inactive: 3 },
    revenue: { monthly: 12450, total: 148200, growth: "+12.5%" }
  },
  gallery: {
    landscape: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb", "https://images.unsplash.com/photo-1472214103451-9374bd1c798e"],
    activities: ["https://images.unsplash.com/photo-1533692328991-08159ff19fca"],
    cuisine: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836"],
    accommodation: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"]
  }
};

const GallerySection = memo(({ gallery, activeTab, setActiveTab, onTriggerUpload, deleteImage }) => (
  <section className="bg-card-light dark:bg-card-dark rounded-xl border border-white/5 p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold flex items-center gap-2"><MaterialIcon name="collections" className="text-primary" /> Gallery</h3>
      <button onClick={() => onTriggerUpload('gallery')} className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 hover:bg-primary hover:text-white transition-all">
        <MaterialIcon name="add_circle" className="!text-sm" /> Add New
      </button>
    </div>

    <div className="flex gap-4 border-b border-white/5 mb-6 overflow-x-auto scrollbar-hide">
      {['landscape', 'activities', 'cuisine', 'accommodation'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 text-sm font-bold capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-subtext-dark hover:text-white'}`}
        >
          {tab}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {gallery[activeTab].map((url, idx) => (
        <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden bg-black/40">
          <img src={url} alt={activeTab} className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button onClick={() => deleteImage(activeTab, idx)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              <MaterialIcon name="delete" className="!text-lg" />
            </button>
          </div>
        </div>
      ))}
      {gallery[activeTab].length === 0 && (
        <div className="col-span-full py-12 text-center text-subtext-dark border-2 border-dashed border-white/5 rounded-xl">
          No images found in this category.
        </div>
      )}
    </div>
  </section>
));

const AgentProfilePage = () => {
  const [formData, setFormData] = useState(AGENT_DATA.profile);
  const [gallery, setGallery] = useState(AGENT_DATA.gallery);
  const [activeTab, setActiveTab] = useState('landscape');
  const [uploadTarget, setUploadTarget] = useState(null); // 'avatar', 'banner', or 'gallery'
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLinkChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [id]: value }
    }));
  };

  const triggerFilePicker = (target) => {
    setUploadTarget(target);
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    if (uploadTarget === 'avatar') {
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
    } else if (uploadTarget === 'banner') {
      setFormData(prev => ({ ...prev, banner: imageUrl }));
    } else if (uploadTarget === 'gallery') {
      setGallery(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], imageUrl]
      }));
    }
    
    e.target.value = ''; 
    setUploadTarget(null);
  };

  const deleteImage = (category, index) => {
    setGallery(prev => {
      const updated = [...prev[category]];
      updated.splice(index, 1);
      return { ...prev, [category]: updated };
    });
  };

  return (
    <AgentLayout>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileUpload} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <section className="bg-card-light dark:bg-card-dark rounded-xl border border-white/5 overflow-hidden shadow-sm">
              <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: `url(${formData.banner})` }}>
                <div className="absolute inset-0 bg-black/20"></div>
                <button 
                  onClick={() => triggerFilePicker('banner')}
                  className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-medium bg-white/90 dark:bg-black/60 text-background-dark dark:text-white px-2 py-1 rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                  <MaterialIcon name="photo_camera" className="!text-sm" />
                  <span>Edit Cover</span>
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-end -mt-16 mb-6">
                  <div className="relative group">
                    <img src={formData.avatar} alt="Profile" className="size-24 rounded-full border-4 border-background-light dark:border-background-dark object-cover shadow-lg" />
                    <button 
                      onClick={() => triggerFilePicker('avatar')}
                      className="absolute bottom-1 right-1 flex items-center justify-center size-7 rounded-full bg-primary text-white hover:scale-110 transition-transform"
                    >
                      <MaterialIcon name="edit" className="!text-[16px]" />
                    </button>
                  </div>
                  {formData.verified && (
                    <div className="ml-4 mb-2 flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold border border-primary/20">
                      <MaterialIcon name="verified" className="!text-sm" />
                      Verified Agent
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Full Name", id: "fullName", type: "text" },
                    { label: "Agency Name", id: "agencyName", type: "text" },
                    { label: "Email Address", id: "email", type: "email" },
                    { label: "Contact Number", id: "contactNumber", type: "text" },
                    { label: "Address", id: "address", type: "text" },
                  ].map((field) => (
                    <div key={field.id} className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-subtext-dark">{field.label}</label>
                      <input 
                        className="w-full py-3 rounded-lg border-white/10 bg-background-light dark:bg-background-dark/50 text-white focus:ring-primary focus:border-primary transition-all" 
                        id={field.id} 
                        type={field.type} 
                        value={formData[field.id] || ""} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  ))}
                  
                  <div className="pt-4 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-subtext-dark">Connectivity</label>
                    <div className="flex items-stretch gap-2 bg-background-light dark:bg-background-dark/50 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center px-1"><MaterialIcon name="chat" className="text-green-500 !text-lg" /></div>
                      <input className="bg-transparent border-none text-xs w-full py-2 focus:ring-0 text-white" placeholder="WhatsApp" value={formData.links.whatsapp} onChange={(e) => handleLinkChange('whatsapp', e.target.value)} />
                    </div>
                    <div className="flex items-stretch gap-2 bg-background-light dark:bg-background-dark/50 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center px-1"><MaterialIcon name="camera_alt" className="text-pink-500 !text-lg" /></div>
                      <input className="bg-transparent border-none text-xs w-full py-2 focus:ring-0 text-white" placeholder="Instagram" value={formData.links.instagram} onChange={(e) => handleLinkChange('instagram', e.target.value)} />
                    </div>
                    <div className="flex items-stretch gap-2 bg-background-light dark:bg-background-dark/50 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center px-1"><MaterialIcon name="language" className="text-blue-400 !text-lg" /></div>
                      <input className="bg-transparent border-none text-xs w-full py-2 focus:ring-0 text-white" placeholder="Website" value={formData.links.website} onChange={(e) => handleLinkChange('website', e.target.value)} />
                    </div>
                  </div>

                  <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-4">
                    Update Profile
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-card-light dark:bg-card-dark rounded-xl border border-white/5 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MaterialIcon name="security" className="text-primary" /> Security</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-subtext-dark">Current Password</label>
                  <input className="w-full py-3 rounded-lg border-white/10 bg-background-light dark:bg-background-dark/50 text-white focus:ring-primary focus:border-primary transition-all" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-subtext-dark">New Password</label>
                  <input className="w-full py-3 rounded-lg border-white/10 bg-background-light dark:bg-background-dark/50 text-white focus:ring-primary focus:border-primary transition-all" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-subtext-dark">Confirm Password</label>
                  <input className="w-full py-3 rounded-lg border-white/10 bg-background-light dark:bg-background-dark/50 text-white focus:ring-primary focus:border-primary transition-all" type="password" placeholder="••••••••" />
                </div>
                <button className="w-full bg-white/5 text-white font-bold py-3 rounded-lg hover:bg-white/10 transition-all border border-white/10 text-sm">
                  Change Password
                </button>
              </div>
            </section>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8 sticky top-0 self-start">
            <section className="bg-card-light dark:bg-card-dark rounded-xl border border-white/5 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MaterialIcon name="person" className="text-primary" />
                About Host
              </h2>
              <textarea 
                className="w-full rounded-lg border-white/10 bg-background-light dark:bg-background-dark/50 text-white focus:ring-primary focus:border-primary transition-all text-sm leading-relaxed p-3" 
                id="about" 
                rows="4" 
                value={formData.about} 
                onChange={handleInputChange}
                placeholder="Tell your clients about yourself..."
              ></textarea>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><MaterialIcon name="dashboard" className="text-primary" /> At a Glance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary p-6 rounded-xl text-white relative overflow-hidden group">
                  <MaterialIcon name="payments" className="absolute -right-2 -bottom-2 text-6xl opacity-20 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium opacity-80">Monthly Revenue</p>
                  <p className="text-3xl font-bold mt-1">${AGENT_DATA.stats.revenue.monthly.toLocaleString()}</p>
                </div>
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                  <p className="text-sm text-subtext-dark font-medium">My Packages</p>
                  <p className="text-3xl font-bold text-white mt-1">{AGENT_DATA.stats.packages.total}</p>
                </div>
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                  <p className="text-sm text-subtext-dark font-medium">Partner Hotels</p>
                  <p className="text-3xl font-bold text-white mt-1">{AGENT_DATA.stats.hotels.total}</p>
                </div>
              </div>
            </section>

            <GallerySection 
              gallery={gallery} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onTriggerUpload={triggerFilePicker} 
              deleteImage={deleteImage} 
            />
          </div>
        </div>
      </main>
    </AgentLayout>
  );
};

export default AgentProfilePage;