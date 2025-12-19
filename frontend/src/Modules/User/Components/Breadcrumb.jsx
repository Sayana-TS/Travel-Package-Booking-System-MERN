// src/components/Breadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ path, currentPage }) => (
  <div className="text-sm text-subtext-dark mb-8">
    {path.map((item, index) => (
      <React.Fragment key={index}>
        <Link className="hover:text-primary" to={item.href}>{item.label}</Link>
        <span className="mx-2">→</span>
      </React.Fragment>
    ))}
    <span className="text-text-light dark:text-text-dark font-medium">{currentPage}</span>
  </div>
);

export default Breadcrumb;