// src/components/InclusionsExclusions.jsx
import React from 'react';
import MaterialIcon from './MaterialIcon';

const InclusionList = ({ items }) => (
  <ul className="space-y-3 text-subtext-dark">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        <MaterialIcon name="arrow_right" className="text-primary mr-3 text-xl flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const ExclusionList = ({ items }) => (
  <ul className="space-y-3 text-subtext-dark">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        <MaterialIcon name="close" className="text-red-500 mr-3 text-xl flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const InclusionsExclusions = ({ inclusions, exclusions }) => (
  <section>
    <h3 className="text-2xl font-bold mb-4">Inclusions & Exclusions</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-border-dark">
        <h4 className="font-bold text-lg mb-4 flex items-center text-green-600 dark:text-green-400">
          <MaterialIcon name="check_circle" className="mr-2" />
          What's Included
        </h4>
        <InclusionList items={inclusions} />
      </div>
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-border-dark">
        <h4 className="font-bold text-lg mb-4 flex items-center text-red-600 dark:text-red-400">
          <MaterialIcon name="cancel" className="mr-2" />
          What's Not Included
        </h4>
        <ExclusionList items={exclusions} />
      </div>
    </div>
  </section>
);

export default InclusionsExclusions;