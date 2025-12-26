import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import AuthCard from '../Components/AuthCard';
import AuthTabs from '../Components/AuthTabs';
import AuthInput from '../Components/AuthInput';
import SocialButtons from '../Components/SocialButtons';

const AuthPage = ({ role = 'user' }) => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    fullName: '',
    businessName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (role === 'admin') setActiveTab('login');
  }, [role]);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Logic: check credentials -> navigate based on role
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'agent') navigate('/agent/dashboard');
    else navigate('/');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Logic: Save to DB -> If Agent, go to Onboarding
    if (role === 'agent') {
      navigate('/agent/onboarding'); // Redirect to the wizard we built
    } else {
      navigate('/');
    }
  };

  return (
    <AuthLayout quote="The world is a book, and those who do not travel read only one page.">
      {/* Background set to your dark theme color */}
      <div className="min-h-screen bg-[#0f1923] flex flex-col justify-center py-12">
        <AuthCard>
          <div className="space-y-6">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-7 w-7 text-[#056bd1]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.75 9h16.5M3.75 15h16.5M12 3v18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1 className="text-xl font-bold text-white capitalize">
                GlobeGo {role !== 'user' && <span className="text-[#056bd1]">| {role}</span>}
              </h1>
            </div>

            {role !== 'admin' ? (
              <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
            ) : (
              <div className="border-b border-white/10 mb-6">
                <p className="py-2 text-sm font-medium text-[#056bd1]">Administrator Login</p>
              </div>
            )}

            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <AuthInput
                  id="email"
                  name="email"
                  type="email"
                  label={`${role.charAt(0).toUpperCase() + role.slice(1)} Email`}
                  required
                  value={loginForm.email}
                  onChange={handleLoginChange}
                />
                <AuthInput
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  required
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
                <button type="submit" className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-[#056bd1] hover:bg-[#056bd1]/90 transition-all shadow-[0_0_15px_rgba(5,107,209,0.2)]">
                  Login as {role}
                </button>
              </form>
            )}

            {activeTab === 'register' && role !== 'admin' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {role === 'agent' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AuthInput id="fullName" name="fullName" type="text" label="Full Name" required value={registerForm.fullName} onChange={handleRegisterChange} />
                    <AuthInput id="businessName" name="businessName" type="text" label="Business Name" required value={registerForm.businessName} onChange={handleRegisterChange} />
                  </div>
                ) : (
                  <AuthInput id="username" name="username" type="text" label="Username" required value={registerForm.username} onChange={handleRegisterChange} />
                )}
                
                <AuthInput id="register-email" name="email" type="email" label="Email address" required value={registerForm.email} onChange={handleRegisterChange} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AuthInput id="register-password" name="password" type="password" label="Password" required value={registerForm.password} onChange={handleRegisterChange} />
                  <AuthInput id="confirm-password" name="confirmPassword" type="password" label="Confirm Password" required value={registerForm.confirmPassword} onChange={handleRegisterChange} />
                </div>

                <button type="submit" className="w-full mt-2 py-3 px-4 rounded-lg text-sm font-medium text-white bg-[#056bd1] hover:bg-[#056bd1]/90 transition-all shadow-[0_0_15px_rgba(5,107,209,0.2)]">
                  Register as {role}
                </button>
              </form>
            )}

            {role !== 'admin' && <SocialButtons />}
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;