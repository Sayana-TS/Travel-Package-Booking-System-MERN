import React, { useRef } from 'react';

export const ItemsManager = ({ inclusions, exclusions, update }) => {

  const inputRefs = useRef({});

  const handleAddItem = (field) => {
    update(field, [...(field === 'inclusions' ? inclusions : exclusions), ""]);
  };

  const handleRemoveItem = (field, index) => {
    const list = field === 'inclusions' ? inclusions : exclusions;
    update(field, list.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (field, index, value) => {
    const list = [...(field === 'inclusions' ? inclusions : exclusions)];
    list[index] = value;
    update(field, list);

    // restore focus after state update
    requestAnimationFrame(() => {
      inputRefs.current[`${field}-${index}`]?.focus();
    });
  };

  const ListSection = ({ title, items, field, icon }) => (
    <div className="bg-background-light dark:bg-background-dark/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${field}-${index}`} className="flex items-center gap-2 group">
            <span className="text-lg leading-none">{icon}</span>
            <input
              ref={(el) => (inputRefs.current[`${field}-${index}`] = el)}
              className="w-full h-11 px-4 bg-white dark:bg-background-dark border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white transition-all outline-none"
              type="text"
              value={item}
              placeholder="Add an item..."
              onChange={(e) =>
                handleUpdateItem(field, index, e.target.value)
              }
            />
            <button
              onClick={() => handleRemoveItem(field, index)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
              type="button"
            >
              <span className="material-symbols-outlined text-base">delete</span>
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleAddItem(field)}
        className="flex items-center gap-2 text-xs font-black text-primary hover:text-primary-darker mt-5 transition-colors uppercase tracking-tight"
        type="button"
      >
        <span className="material-symbols-outlined text-lg">add_circle</span>
        <span>Add Item</span>
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ListSection
        title="Included Items"
        items={inclusions}
        field="inclusions"
        icon="✅"
      />
      <ListSection
        title="Excluded Items"
        items={exclusions}
        field="exclusions"
        icon="🚫"
      />
    </div>
  );
};
