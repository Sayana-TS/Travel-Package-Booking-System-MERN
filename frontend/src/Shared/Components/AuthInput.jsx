import React from 'react';

const AuthInput = ({ 
  id, 
  name, 
  type = 'text', 
  label, 
  placeholder, 
  required = false,
  autoComplete,
  value,
  onChange
}) => {
  return (
    <div>
      <label 
        className="block text-sm font-medium text-slate-700 dark:text-slate-300" 
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-1.5">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 focus:shadow-sm hover:border-slate-400 dark:hover:border-slate-500"
        />
      </div>
    </div>
  );
};

export default AuthInput;

