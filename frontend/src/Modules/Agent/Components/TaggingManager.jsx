import React, { useState } from 'react';

export const TaggingManager = ({ tags, update }) => {
  const [inputValue, setInputValue] = useState("");
  const suggestions = ["Luxury", "Budget", "Trekking", "Honeymoon", "Beach", "Wildlife", "Adventure", "Family"];

  const addTag = (tag) => {
    const cleanTag = tag.trim();
    // API Prep: Normalize casing and prevent duplicates
    if (cleanTag && !tags.some(t => t.toLowerCase() === cleanTag.toLowerCase())) {
      update('tags', [...tags, cleanTag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove) => {
    update('tags', tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // UX: Remove last tag if backspace is pressed on empty input
      removeTag(tags[tags.length - 1]);
    }
  };

  const filteredSuggestions = suggestions.filter(
    s => s.toLowerCase().includes(inputValue.toLowerCase()) && 
    !tags.some(t => t.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="py-2 space-y-3">
      {/* Header with Tooltip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Tags / Categories <span className="text-red-500">*</span>
          </label>
          <div className="relative group ml-2 cursor-help">
            <span className="material-symbols-outlined text-sm text-gray-400">info</span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 text-[10px] font-bold leading-tight text-white bg-gray-900 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Categorizing helps our search algorithm place your package in front of the right travelers.
              <div className="absolute left-1/2 -translate-x-1/2 top-full border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
            </div>
          </div>
        </div>
        {tags.length > 0 && (
          <button 
            type="button"
            onClick={() => update('tags', [])}
            className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-tighter transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Input Container */}
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 p-2.5 w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all min-h-[50px]">
          <span className="material-symbols-outlined text-primary text-lg ml-1 shrink-0">label</span>
          
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="flex items-center gap-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-[11px] font-black uppercase pl-2.5 pr-1.5 py-1 rounded-lg border border-primary/10 animate-in zoom-in-95 duration-200"
              >
                {tag}
                <button 
                  type="button"
                  onClick={() => removeTag(tag)} 
                  className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-primary hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            ))}
          </div>

          <input
            className="flex-1 min-w-[120px] bg-transparent border-0 focus:ring-0 p-1 text-sm dark:text-white placeholder:text-gray-400"
            placeholder={tags.length === 0 ? "Add category (e.g. Honeymoon)..." : ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Suggestions Dropdown */}
        {inputValue && filteredSuggestions.length > 0 && (
          <div className="absolute z-30 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-1">
            <div className="p-2 border-b border-gray-50 dark:border-gray-800">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Suggested</p>
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => addTag(suggestion)}
                  className="px-4 py-2.5 hover:bg-primary hover:text-white cursor-pointer text-xs font-bold uppercase tracking-tight text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-between group"
                >
                  {suggestion}
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Quick Select Buttons (Optional but helpful for agents) */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase mr-1 flex items-center">Quick Add:</span>
        {suggestions.slice(0, 5).map(s => (
          <button
            key={s}
            type="button"
            disabled={tags.includes(s)}
            onClick={() => addTag(s)}
            className={`text-[9px] font-black uppercase px-2 py-1 rounded-md border transition-all ${
              tags.includes(s) 
              ? 'opacity-30 grayscale cursor-not-allowed border-gray-200' 
              : 'border-gray-100 dark:border-gray-800 text-gray-500 hover:border-primary hover:text-primary'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {tags.length === 0 && (
        <div className="flex items-center gap-2 text-[10px] font-bold text-red-500 mt-2 uppercase italic">
          <span className="material-symbols-outlined text-xs">warning</span>
          Please add at least one tag for better reach.
        </div>
      )}
    </div>
  );
};