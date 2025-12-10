// src/components/Breadcrumb.jsx
import React from 'react';

const Breadcrumb = ({ path, currentPage }) => (
  <div className="text-sm text-subtext-dark mb-8">
    {path.map((item, index) => (
      <React.Fragment key={index}>
        <a className="hover:text-primary" href={item.href}>{item.label}</a>
        <span className="mx-2">→</span>
      </React.Fragment>
    ))}
    <span className="text-text-light dark:text-text-dark font-medium">{currentPage}</span>
  </div>
);

export default Breadcrumb;