import React from 'react';

const AuthCard = ({ children }) => {
  return (
    <div className="max-w-md w-full space-y-4 bg-background-light dark:bg-background-dark lg:bg-transparent lg:dark:bg-transparent lg:shadow-none p-6 rounded-xl lg:p-0">
      {children}
    </div>
  );
};

export default AuthCard;

