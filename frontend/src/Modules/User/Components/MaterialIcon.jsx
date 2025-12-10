// src/components/MaterialIcon.jsx
import React from 'react';

// Props:
// - name: The icon name (e.g., "landscape", "schedule")
// - className: Additional Tailwind classes
const MaterialIcon = ({ name, className = '' }) => {
  return (
    <span
      className={`material-icons ${className}`}
      // Adding a style block here to ensure the icon font is loaded, 
      // though typically you'd handle this in your main CSS/index.html.
      style={{ fontFamily: 'Material Icons', fontFeatureSettings: 'liga', userSelect: 'none' }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;