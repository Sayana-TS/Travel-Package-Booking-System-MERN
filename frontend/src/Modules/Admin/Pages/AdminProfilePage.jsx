import React, { useState, useRef } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';

const AdminProfilePage = ({ role = 'admin' }) => {
  const fileInputRef = useRef(null);

  // --- Dummy Data (Ready for API Integration) ---
  const [profileData, setProfileData] = useState({
    fullName: "Admin Full Name",
    email: "admin-email@example.com",
    phone: "+1 234 567 890",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    roleLabel: "Administrator"
  });

  const [systemStats] = useState([
    { label: 'Total Users', value: '1,250', icon: 'group' },
    { label: 'Total Packages', value: '340', icon: 'package_2' },
    { label: 'Total Hotels', value: '89', icon: 'hotel' },
    { label: 'Bookings Today', value: '56', icon: 'book_online' },
  ]);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // --- Handlers ---
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Updating profile:", profileData);
    alert("Profile information updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Changing password...");
    alert("Password changed successfully!");
  };

  return (
    <AgentLayout role={role}>
      <main className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
            My Profile
          </h1>
          <p className="text-base font-normal text-slate-500 dark:text-subtext-dark">
            Manage your account details and view system statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Account Management */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Profile Information Section */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Profile Information</h2>
              
              {/* Profile Header (Avatar) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                <div className="relative group">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-slate-700 shadow-md transition-transform duration-300 group-hover:scale-105" 
                    style={{ backgroundImage: `url("${profileData.avatar}")` }}
                  />
                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleAvatarChange} 
                  />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-1 right-1 flex items-center justify-center h-10 w-10 bg-primary text-white rounded-full hover:scale-110 transition-all shadow-lg"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{profileData.fullName}</p>
                  <p className="text-base text-slate-500 dark:text-subtext-dark">{profileData.email}</p>
                  <span className="mt-2 inline-block w-fit bg-primary/10 text-primary font-bold text-xs py-1.5 px-4 rounded-full uppercase tracking-wider">
                    {profileData.roleLabel}
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                    <input 
                      type="text"
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 transition-all"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
                    <input 
                      type="text"
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 transition-all"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" className="h-11 px-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="h-11 px-6 rounded-lg bg-primary text-white font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-primary/20">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Password Management Section */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Password Management</h2>
              <form onSubmit={handlePasswordChange}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Current Password</label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 transition-all"
                      onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">New Password</label>
                    <input 
                      type="password"
                      placeholder="Enter new password"
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 transition-all"
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                    <input 
                      type="password"
                      placeholder="Confirm your new password"
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 transition-all"
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="h-11 px-6 rounded-lg bg-slate-900 dark:bg-primary text-white font-bold text-sm hover:opacity-90 transition-all shadow-md">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: System Overview */}
          <div className="flex flex-col gap-8">
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm sticky top-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">System Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {systemStats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="group bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl flex items-center gap-4 border border-transparent hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center size-14 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-subtext-dark">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-center font-bold text-slate-400 uppercase tracking-widest">
                  Last login: Dec 31, 2025 • 09:42 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AgentLayout>
  );
};

export default AdminProfilePage;