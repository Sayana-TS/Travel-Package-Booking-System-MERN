import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthTabs from '../components/AuthTabs';
import AuthInput from '../Components/AuthInput';
import SocialButtons from '../components/SocialButtons';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', loginForm);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    console.log('Register:', registerForm);
  };

  const navigate = useNavigate();

  return (
    <AuthLayout quote="The world is a book, and those who do not travel read only one page.">
      <AuthCard>
        <div>
          {/* Logo and Title */}
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3.75 9h16.5M3.75 15h16.5M12 3v18"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              GlobeGo
            </h1>
          </div>

          {/* Tabs */}
          <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4" method="POST">
            <AuthInput
              id="email"
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
              required
              value={loginForm.email}
              onChange={handleLoginChange}
            />
            <AuthInput
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              required
              value={loginForm.password}
              onChange={handleLoginChange}
            />
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  className="font-medium text-primary hover:text-primary/80"
                  href="#"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={() => navigate('/')}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Login
              </button>
            </div>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form
            onSubmit={handleRegisterSubmit}
            className="space-y-4"
            method="POST"
          >
            <AuthInput
              id="register-email"
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
              required
              value={registerForm.email}
              onChange={handleRegisterChange}
            />
            <AuthInput
              id="register-password"
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
              required
              value={registerForm.password}
              onChange={handleRegisterChange}
            />
            <AuthInput
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              autoComplete="new-password"
              required
              value={registerForm.confirmPassword}
              onChange={handleRegisterChange}
            />
            <div>
              <button
                type="submit"
                onClick={() => navigate('/')}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Register
              </button>
            </div>
          </form>
        )}

        {/* Social Buttons */}
        <SocialButtons />

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="space-x-3">
            <a className="hover:text-primary" href="#">
              Terms & Conditions
            </a>
            <a className="hover:text-primary" href="#">
              Privacy Policy
            </a>
          </div>
          <p className="mt-2">© 2024 GlobeGo. All rights reserved.</p>
        </footer>
      </AuthCard>
    </AuthLayout>
  );
};

export default AuthPage;

