// src/components/HighlightsGrid.jsx
import React from 'react';
import MaterialIcon from './MaterialIcon';

const HighlightItem = ({ icon, text }) => (
  <div className="bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center">
    <div className="bg-primary/10 p-3 rounded-full mb-3">
      <MaterialIcon name={icon} className="text-primary text-3xl" />
    </div>
    <p className="font-semibold">{text}</p>
  </div>
);

const HighlightsGrid = ({ highlights }) => (
  <section>
    <h3 className="text-2xl font-bold mb-4">Highlights</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {highlights.map((item, index) => (
        <HighlightItem key={index} icon={item.icon} text={item.text} />
      ))}
    </div>
  </section>
);

export default HighlightsGrid;