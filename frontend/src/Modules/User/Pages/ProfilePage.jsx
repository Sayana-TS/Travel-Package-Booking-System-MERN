// src/pages/ProfilePage.jsx - COLOR CORRECTED FOR THEME and BREADCRUMB MAX-WIDTH

import React, { useState } from 'react';
import UserLayout from '../Layouts/UserLayout';
import Breadcrumb from '../Components/Breadcrumb';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_USER_DATA = {
    name: 'Sophia Bennett',
    email: 'sophia.bennett@example.com',
    phone: '+1 234 567 890',
    memberSince: 2021,
    profilePictureUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGWrRDA0Sh68cDYgyWVbozfTvqDwkFRiPpZ-_8q2ffTDhbKZG5vMRxC_7H7J-JtNw4phLbHyrSBj1JRRATzcEe0D8QJIqKSE1omHAGIevIEP87yHcF3cS5ZjZFqpRw87zhNoFeBxni6GSPVWLdEH0JgBgaF4m8Vi06h_UHpWFgOz5nEAGmt0O-Xqdrm94TSpWnTBAYDBAHrs9Z8sreVjbUAY9HoJD0D6-LUqXF_HUVjUTQrbNtb6vkn2XscHZGReieiZpCIWKUGM0',
    coverPhotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI0lplzXt9UpoqVGOXJcxjnc01X-zlvkbXRljV3orUjm971B7ZQp4sFSZA1pjviomXoRcWm8Vk2UMl3dtVK2unlts346n_sVcIJAVAvIu2EC8NZYZZG7hvlcBuT6EfJCtYb4BZW_hzDYo7OM5u1CPGXzgZiLaTvpQki9GCViELI9MT-v0Y0U6e_yhPXgBvMJpI8l5KQ6X6v5CXm5QePh7MmRD9Pv8CP6o-EX27V2f2WQ5Pdny3X0IcMBCEzgSRkZgwUQX6jL21k9k',
};

const BREADCRUMB_PATH = [
    { label: 'Home', href: '/' },
];

// ===================================================================
// Sub-Component 1: ProfileHeaderBanner
// ===================================================================
const ProfileHeaderBanner = ({ user }) => (
    <div className="relative w-full rounded-xl overflow-visible mb-12 shadow-lg">
        {/* Cover Photo */}
        <div className="h-48 w-full overflow-hidden rounded-xl">
            <img alt="Cover Photo" className="w-full h-full object-cover" src={user.coverPhotoUrl} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
        
        {/* Change Cover Button */}
        <div className="absolute top-4 right-4">
            {/* Using standard dark/light text colors, keeping backdrop blur for effect */}
            <button className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm hover:bg-black/50 text-xs font-semibold py-1 px-3 rounded-full transition-all">
                <span className="material-symbols-outlined text-base">photo_camera</span>
                Change Cover
            </button>
        </div>
        
        {/* Profile Picture */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="relative">
                {/* Border uses primary background color variables */}
                <div className="h-32 w-32 rounded-full border-4 border-background-light dark:border-background-dark bg-cover bg-center bg-no-repeat shadow-lg overflow-hidden">
                    <img alt="Profile Picture" className="h-full w-full object-cover" src={user.profilePictureUrl} />
                </div>
                {/* Button uses primary color */}
                <button className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-110">
                    <span className="material-symbols-outlined text-lg">photo_camera</span>
                </button>
            </div>
        </div>
    </div>
);

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
        console.log('Saving profile data:', formData);
        onSave(formData);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col gap-6 p-6 rounded-xl shadow-md bg-white dark:bg-card-dark">
            <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                {/* Text uses primary color */}
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
                        {/* Label text uses standard text colors */}
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {key.charAt(0).toUpperCase() + key.slice(1).replace('e', ' E')}
                        </p>
                        <input
                            name={key}
                            // Input styling updated to use theme colors for border and background
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
                    {/* Button uses primary color */}
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
// Sub-Component 3: ChangePasswordCard
// ===================================================================
const ChangePasswordCard = () => {
    // Mock state for password input/strength
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ strength: 'Weak', width: '25%', color: 'bg-red-500' });

    const checkPasswordStrength = (newPassword) => {
        // Simple mock strength check
        let strength = 'Weak';
        let width = '25%';
        let color = 'bg-red-500';
        if (newPassword.length >= 8 && /[a-z]/.test(newPassword)) {
            strength = 'Medium';
            width = '50%';
            color = 'bg-yellow-500';
        }
        if (newPassword.length >= 10 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)) {
            strength = 'Strong';
            width = '75%';
            color = 'bg-green-500';
        }
        if (newPassword.length >= 12 && /[^A-Za-z0-9]/.test(newPassword)) {
            strength = 'Very Strong';
            width = '100%';
            color = 'bg-primary'; // Using primary blue for Very Strong
        }
        setPasswordStrength({ strength, width, color });
        setPassword(newPassword);
    };

    return (
        <div className="flex flex-col gap-6 p-6 rounded-xl shadow-md bg-white dark:bg-card-dark">
            <h2 className="border-b border-black/10 dark:border-white/10 pb-4 text-xl font-bold text-gray-900 dark:text-white">Change Password</h2>
            <div className="space-y-6">
                {/* Inputs updated to use theme colors */}
                <label className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</p>
                    <input className="form-input h-12 w-full rounded-lg border-gray-300 bg-background-light/50 p-3 text-base text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-white/10 dark:text-white dark:placeholder:text-subtext-dark" placeholder="Enter current password" type="password" />
                </label>
                <label className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</p>
                    <input 
                        className="form-input h-12 w-full rounded-lg border-gray-300 bg-background-light/50 p-3 text-base text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-white/10 dark:text-white dark:placeholder:text-subtext-dark" 
                        placeholder="Enter new password" 
                        type="password" 
                        onChange={(e) => checkPasswordStrength(e.target.value)}
                        value={password}
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</p>
                    <input className="form-input h-12 w-full rounded-lg border-gray-300 bg-background-light/50 p-3 text-base text-gray-900 transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-white/10 dark:text-white dark:placeholder:text-subtext-dark" placeholder="Confirm new password" type="password" />
                </label>
            </div>
            {/* Password Strength Indicator */}
            <div className="flex items-center gap-2 pt-2">
                <div className="w-full bg-gray-300 rounded-full h-1.5 dark:bg-gray-700">
                    <div className={`${passwordStrength.color} h-1.5 rounded-full transition-all duration-300`} style={{ width: passwordStrength.width }}></div>
                </div>
                {/* Text uses dynamic color or standard text */}
                <span className={`text-xs font-medium ${passwordStrength.color.replace('bg', 'text')}`}>{passwordStrength.strength}</span>
            </div>
            <div className="flex justify-end pt-2">
                {/* Button uses primary color */}
                <button className="flex h-11 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md">
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
                    <p class="text-base font-medium text-gray-900 dark:text-white">{link.label}</p>
                    <span class="material-symbols-outlined text-primary">arrow_forward</span>
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

    const handleProfileUpdate = (newUserData) => {
        setUser(newUserData);
    };
    
    // Current Page Breadcrumb
    const currentPageBreadcrumb = [
        ...BREADCRUMB_PATH,
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
            <UserLayout>
                {/* WIDE CONTAINER FOR BREADCRUMB */}
                <main className="w-full mx-auto max-w-8xl px-4 py-8 sm:px-10"> 
                    
                    {/* Breadcrumb is now at max-w-8xl */}
                    <div className="mb-8">
                        <Breadcrumb 
                            path={currentPageBreadcrumb} 
                            currentPage="Profile"
                        />
                    </div>

                    {/* MAIN CONTENT CONTAINER: max-w-5xl and centered */}
                    <div className="mx-auto w-full max-w-5xl">
                        
                        {/* Profile Banner */}
                        <ProfileHeaderBanner user={user} />

                        {/* Name and Member Info */}
                        <div className="text-center pt-20 mb-12">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-base text-gray-500 dark:text-subtext-dark">Member since {user.memberSince}</p>
                        </div>
                        
                        {/* Main Content: Info & Password (Two-Column Grid) */}
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            <ProfileInfoForm user={user} onSave={handleProfileUpdate} />
                            <ChangePasswordCard />
                        </div>
                        
                        {/* Quick Links */}
                        <QuickLinks />
                        
                    </div>
                </main>
            </UserLayout>
        </div>
    );
};

export default ProfilePage;