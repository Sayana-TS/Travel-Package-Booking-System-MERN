import React from 'react';

const SectionTitle = ({ children }) => {
  return (
    <h2 className="
      /* Base Mobile Styles */
      text-white 
      text-[20px] 
      leading-tight 
      tracking-[-0.015em] 
      px-4 
      pb-2 
      pt-6 
      font-bold 
      font-display

      /* Tablet and Desktop Adjustments */
      md:text-[24px] 
      md:px-6 
      md:pt-8 
      md:pb-3
      lg:px-8
    ">
      {children}
    </h2>
  );
};

export default SectionTitle;