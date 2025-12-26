import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. FIXED: Component defined OUTSIDE to prevent focus loss
const FormInput = ({ icon, ...props }) => (
  <div className="relative group">
    {icon && (
      <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors text-lg">
        {icon}
      </span>
    )}
    <input 
      {...props} 
      className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 ${icon ? 'pl-12' : 'pl-5'} pr-5 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600 text-sm`}
    />
  </div>
);

const AgentOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profilePicture: null,
    bio: '',
    city: '',
    country: '',
    experience: '1-3',
    specializations: [],
    primaryRegion: '',
    whatsapp: '',
    instagram: '',
    linkedin: '',
    website: '',
    licenseNumber: '',
    verificationDoc: null,
    agreedToTerms: false
  });

  const steps = [
    { id: 1, name: 'Identity', icon: 'person' },
    { id: 2, name: 'Expertise', icon: 'travel_explore' },
    { id: 3, name: 'Connect', icon: 'alternate_email' },
    { id: 4, name: 'Verify', icon: 'verified' },
  ];

  const travelNiches = ['Adventure', 'Honeymoon', 'Religious', 'Luxury', 'Budget', 'Educational', 'Wildlife', 'Beach', 'Solo'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const toggleNiche = (niche) => {
    const current = formData.specializations;
    const updated = current.includes(niche) ? current.filter(n => n !== niche) : [...current, niche];
    setFormData({ ...formData, specializations: updated });
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else navigate('/agent');
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto py-8 px-6">
        
        <header className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest font-bold mb-2">
            Partner Program
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Create your profile</h1>
        </header>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative px-2">
            <div className="absolute top-[18px] left-0 w-full h-px bg-white/10 -z-0"></div>
            <div 
              className="absolute top-[18px] left-0 h-px bg-blue-500 transition-all duration-500 -z-0"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 cursor-pointer" onClick={() => step.id < currentStep && setCurrentStep(step.id)}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                  currentStep >= step.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-[#0a0f14] border-white/10 text-gray-600'
                }`}>
                  <span className="material-icons text-base">{currentStep > step.id ? 'check' : step.icon}</span>
                </div>
                <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-widest ${
                  currentStep >= step.id ? 'text-blue-500' : 'text-gray-600'
                }`}>
                  {step.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <main className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative group shrink-0 mx-auto md:mx-0">
                    <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-white/20 overflow-hidden bg-white/5 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                      {formData.profilePicture ? (
                        <img src={formData.profilePicture} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <span className="material-icons text-3xl text-gray-700">add_a_photo</span>
                      )}
                    </div>
                    <label className="absolute -bottom-1 -right-1 bg-blue-600 p-1.5 rounded-lg cursor-pointer hover:bg-blue-500 transition-all">
                      <span className="material-icons text-white text-xs">edit</span>
                      <input type="file" className="hidden" onChange={(e) => setFormData({...formData, profilePicture: URL.createObjectURL(e.target.files[0])})} />
                    </label>
                  </div>
                  <div className="flex-grow w-full space-y-3">
                    <h2 className="text-lg font-bold text-white">Identity Details</h2>
                    <textarea 
                      name="bio" value={formData.bio} onChange={handleInputChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm h-24 focus:border-blue-500/50 outline-none transition-all" 
                      placeholder="Agency mission..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormInput icon="location_city" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
                  <FormInput icon="public" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-lg font-bold text-white">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {travelNiches.map(niche => (
                    <button 
                      key={niche} onClick={() => toggleNiche(niche)} 
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                        formData.specializations.includes(niche) 
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                        : 'bg-white/5 border-transparent text-gray-500 hover:bg-white/10'
                      }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
                <FormInput icon="explore" name="primaryRegion" placeholder="Operating Region" value={formData.primaryRegion} onChange={handleInputChange} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-lg font-bold text-white">Connectivity</h2>
                <div className="grid grid-cols-1 gap-3">
                  <FormInput icon="chat" name="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleInputChange} />
                  <FormInput icon="interests" name="instagram" placeholder="Instagram" value={formData.instagram} onChange={handleInputChange} />
                  <FormInput icon="language" name="website" placeholder="Website" value={formData.website} onChange={handleInputChange} />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-lg font-bold text-white">Verification</h2>
                <FormInput icon="badge" name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleInputChange} />
                <div className="relative group">
                    <div className="border border-dashed border-white/20 rounded-2xl p-6 text-center group-hover:bg-white/[0.02] transition-all cursor-pointer">
                        <input type="file" onChange={(e) => setFormData({...formData, verificationDoc: e.target.files[0]?.name})} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <span className="material-icons text-blue-500 text-xl mb-1">upload_file</span>
                        <p className="text-[11px] text-gray-400">{formData.verificationDoc || 'Click to upload license'}</p>
                    </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleInputChange} className="h-3.5 w-3.5 accent-blue-600" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-tighter">I agree to the Terms of Service.</span>
                </label>
              </div>
            )}
          </div>

          <footer className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <button 
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)} 
              className={`text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest ${currentStep === 1 ? 'invisible' : ''}`}
            >
              Back
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentStep === 4 && (!formData.agreedToTerms || !formData.licenseNumber)}
              className="bg-blue-600 disabled:opacity-20 text-white text-[11px] font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <span>{currentStep === 4 ? 'Finish' : 'Next'}</span>
              <span className="material-icons text-xs">east</span>
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AgentOnboarding;