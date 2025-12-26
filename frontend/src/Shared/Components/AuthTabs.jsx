import React from 'react';

const AuthTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-6">
      <div className="flex border-b border-slate-300 dark:border-slate-700">
        <button
          onClick={() => onTabChange('login')}
          className={`flex-1 py-3 text-center font-semibold border-b-2 transition ${
            activeTab === 'login'
              ? 'border-primary text-primary'
              : 'text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => onTabChange('register')}
          className={`flex-1 py-3 text-center font-semibold border-b-2 transition ${
            activeTab === 'register'
              ? 'border-primary text-primary'
              : 'text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default AuthTabs;

