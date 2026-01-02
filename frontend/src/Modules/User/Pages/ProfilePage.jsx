// src/pages/ProfilePage.jsx

import React, { useState, useRef } from 'react';
import UserLayout from '../Layouts/UserLayout';
import Breadcrumb from '../../../Shared/Components/Breadcrumb';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_USER_DATA = {
    name: 'Sophia Bennett',
    email: 'sophia.bennett@example.com',
    phone: '+1 234 567 890',
    memberSince: 2021,
    profilePictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
};

const BREADCRUMB_PATH = [
    { label: 'Home', href: '/' },
];

// ===================================================================
// Sub-Component 1: ProfileHeaderBanner (FUNCTIONAL)
// ===================================================================
const ProfileHeaderBanner = ({ user, onUpdate }) => {
    const profileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            onUpdate({ [type]: imageUrl });
        }
    };

    return (
        <div className="relative w-full rounded-xl overflow-visible mb-12 shadow-lg">
            {/* Hidden Inputs */}
            <input 
                type="file" 
                ref={profileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleFileChange(e, 'profilePictureUrl')} 
            />
            <input 
                type="file" 
                ref={coverInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleFileChange(e, 'coverPhotoUrl')} 
            />

            {/* Cover Photo */}
            <div className="h-48 w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-card-dark">
                <img alt="Cover Photo" className="w-full h-full object-cover" src={user.coverPhotoUrl} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            
            {/* Change Cover Button */}
            <div className="absolute top-4 right-4">
                <button 
                    onClick={() => coverInputRef.current.click()}
                    className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm hover:bg-black/50 text-xs font-semibold py-1 px-3 rounded-full transition-all"
                >
                    <span className="material-symbols-outlined text-base">photo_camera</span>
                    Change Cover
                </button>
            </div>
            
            {/* Profile Picture */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="relative">
                    <div className="h-32 w-32 rounded-full border-4 border-background-light dark:border-background-dark bg-cover bg-center bg-no-repeat shadow-lg overflow-hidden">
                        <img alt="Profile Picture" className="h-full w-full object-cover" src={user.profilePictureUrl} />
                    </div>
                    <button 
                        onClick={() => profileInputRef.current.click()}
                        className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-110"
                    >
                        <span className="material-symbols-outlined text-lg">photo_camera</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// ===================================================================
// Sub-Component 2: ProfileInfoForm
// ===================================================================
const ProfileInfoForm = ({ user, onSave }) => {
    const [formData, setFormData] = useState(user);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col gap-6 p-6 rounded-xl shadow-md bg-white dark:bg-card-dark">
            <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                    <span className="material-symbols-outlined text-base">{isEditing ? 'close' : 'edit'}</span>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>
            <div className="space-y-6">
                {['name', 'email', 'phone'].map((key) => (
                    <label key={key} className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </p>
                        <input
                            name={key}
                            className="form-input h-12 w-full rounded-lg border-gray-300 bg-background-light/50 p-3 text-base text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-white/10 dark:text-white dark:placeholder:text-subtext-dark"
                            value={formData[key]}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </label>
                ))}
            </div>
            {isEditing && (
                <div className="flex justify-end pt-2">
                    <button 
                        onClick={handleSave}
                        className="flex h-11 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md"
                    >
                        <span className="truncate">Save Changes</span>
                    </button>
                </div>
            )}
        </div>
    );
};

// ===================================================================
// Sub-Component 3: ChangePasswordCard (Updated with Matching Logic)
// ===================================================================
const ChangePasswordCard = () => {
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [passwordStrength, setPasswordStrength] = useState({ strength: '', width: '0%', color: 'bg-gray-300' });

    const checkPasswordStrength = (val) => {
        if (!val) {
            setPasswordStrength({ strength: '', width: '0%', color: 'bg-gray-300' });
            return;
        }

        let score = 0;
        if (val.length >= 8) score++;
        if (val.length >= 12) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        if (score <= 2) {
            setPasswordStrength({ strength: 'Weak', width: '25%', color: 'bg-red-500' });
        } else if (score === 3) {
            setPasswordStrength({ strength: 'Medium', width: '50%', color: 'bg-yellow-500' });
        } else if (score === 4) {
            setPasswordStrength({ strength: 'Strong', width: '75%', color: 'bg-green-500' });
        } else {
            setPasswordStrength({ strength: 'Very Strong', width: '100%', color: 'bg-primary' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        if (name === 'new') checkPasswordStrength(value);
    };

    const handleUpdatePassword = () => {
        // Check if passwords match
        if (passwords.new !== passwords.confirm) {
            alert("New password and confirm password do not match!");
            return;
        }

        if (!passwords.new || !passwords.current) {
            alert("Please fill in the password fields.");
            return;
        }

        // Logic for successful update
        console.log("Password Updated successfully");
        
        // Reset fields to empty
        setPasswords({ current: '', new: '', confirm: '' });
        setPasswordStrength({ strength: '', width: '0%', color: 'bg-gray-300' });
    };

    return (
        <div className="flex flex-col gap-6 p-6 rounded-xl shadow-md bg-white dark:bg-card-dark">
            <h2 className="border-b border-black/10 dark:border-white/10 pb-4 text-xl font-bold text-gray-900 dark:text-white">Change Password</h2>
            <div className="space-y-6">
                <label className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</p>
                    <input 
                        name="current"
                        value={passwords.current}
                        onChange={handleInputChange}
                        className="form-input h-12 w-full rounded-lg border-gray-300 bg-background-light/50 p-3 text-base text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-white/10 dark:text-white dark:placeholder:text-subtext-dark" 
                        placeholder="Enter current password" 
                        type="password" 
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</p>
                    <input 
                        name="new"
                        value={passwords.new}
                        onChange={handleInputChange}
                        className="form-input h-12 w-full rounded-lg border-gray-300 bg-background-light/50 p-3 text-base text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-white/10 dark:text-white dark:placeholder:text-subtext-dark" 
                        placeholder="Enter new password" 
                        type="password" 
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</p>
                    <input 
                        name="confirm"
                        value={passwords.confirm}
                        onChange={handleInputChange}
                        className="form-input h-12 w-full rounded-lg border-gray-300 bg-background-light/50 p-3 text-base text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-white/10 dark:text-white dark:placeholder:text-subtext-dark" 
                        placeholder="Confirm new password" 
                        type="password" 
                    />
                </label>
            </div>
            <div className="flex items-center gap-2 pt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className={`${passwordStrength.color} h-1.5 rounded-full transition-all duration-300`} style={{ width: passwordStrength.width }}></div>
                </div>
                <span className={`text-xs font-medium min-w-[70px] text-right ${passwordStrength.color.replace('bg-', 'text-')}`}>{passwordStrength.strength}</span>
            </div>
            <div className="flex justify-end pt-2">
                <button 
                    onClick={handleUpdatePassword}
                    className="flex h-11 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md"
                >
                    <span className="truncate">Update Password</span>
                </button>
            </div>
        </div>
    );
};

// ===================================================================
// Sub-Component 4: QuickLinks
// ===================================================================
const QuickLinks = () => {
    const links = [
        { label: 'View Booking History', to: '/bookingHistory' },
        { label: 'Favorites / Wishlist', to: '/favorites' },
        { label: 'Customer Support', to: '/contactus' },
    ];
    return (
        <div className="mt-16 flex flex-col gap-4 p-6 rounded-xl shadow-md bg-white dark:bg-card-dark">
            <h2 className="border-b border-black/10 dark:border-white/10 pb-3 text-xl font-bold text-gray-900 dark:text-white">Quick Links</h2>
            {links.map((link) => (
                <Link key={link.label} className="flex items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors hover:bg-primary/10 dark:bg-white/10 dark:hover:bg-white/15" to={link.to}>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{link.label}</p>
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                </Link>
            ))}
        </div>
    );
};


// ===================================================================
// Main Component: ProfilePage
// ===================================================================

const ProfilePage = () => {
    const [user, setUser] = useState(MOCK_USER_DATA);

    const handleProfileUpdate = (newFields) => {
        setUser(prev => ({ ...prev, ...newFields }));
    };
    
    const currentPageBreadcrumb = [...BREADCRUMB_PATH];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
            <UserLayout>
                <main className="w-full mx-auto max-w-8xl px-4 py-8 sm:px-10"> 
                    <div className="mb-8">
                        <Breadcrumb 
                            path={currentPageBreadcrumb} 
                            currentPage="Profile"
                        />
                    </div>

                    <div className="mx-auto w-full max-w-5xl">
                        {/* Profile Banner with update handler */}
                        <ProfileHeaderBanner user={user} onUpdate={handleProfileUpdate} />

                        <div className="text-center pt-20 mb-12">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-base text-gray-500 dark:text-subtext-dark">Member since {user.memberSince}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            <ProfileInfoForm user={user} onSave={handleProfileUpdate} />
                            <ChangePasswordCard />
                        </div>
                        
                        <QuickLinks />
                    </div>
                </main>
            </UserLayout>
        </div>
    );
};

export default ProfilePage;