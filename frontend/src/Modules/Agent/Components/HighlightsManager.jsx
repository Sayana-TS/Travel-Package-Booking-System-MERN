import React from 'react';

export const HighlightsManager = ({ description, highlights, update }) => {
  // Helper for word counting to ensure accuracy
  const getWordCount = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    update('description', value);
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    update('highlights', newHighlights);
  };

  const addHighlight = () => {
    if (highlights.length > 0 && highlights[highlights.length - 1].trim() === "") return;
    update('highlights', [...highlights, ""]);
  };

  const removeHighlight = (index) => {
    update('highlights', highlights.filter((_, i) => i !== index));
  };

  const wordCount = getWordCount(description);
  const isOverLimit = wordCount > 250;

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      {/* Package Summary */}
      <div className="relative group w-full">
        <label className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
          <span>Package Summary <span className="text-red-500">*</span></span>
          <span className={`${isOverLimit ? 'text-red-500 font-bold' : 'text-gray-400'} transition-colors`}>
            {wordCount} / 250 words
          </span>
        </label>
        
        <textarea 
          className={`w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark text-base md:text-sm dark:text-white transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary p-4 outline-none resize-none ${isOverLimit ? 'border-red-500 ring-1 ring-red-500' : ''}`}
          placeholder="Write a short description summarizing what this package offers…"
          rows="6"
          value={description}
          onChange={handleDescriptionChange}
        />
        
        <div className="absolute -z-10 inset-0 bg-primary/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl" />
      </div>

      {/* Highlights List */}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
            Highlights <span className="text-red-500">*</span>
          </label>
          <button 
            type="button"
            onClick={addHighlight}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 text-[10px] font-black uppercase tracking-wider text-white bg-primary hover:bg-primary/90 active:scale-95 rounded-full shadow-sm shadow-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Highlight
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 w-full">
          {highlights.map((highlight, idx) => {
            const words = highlight.trim().split(/\s+/).filter(w => w.length > 0);
            const isTooShort = highlight.length > 0 && words.length < 3;
            
            return (
              <div key={idx} className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300 w-full">
                <div className={`flex items-center gap-2 sm:gap-3 p-1.5 pr-2 sm:pr-3 rounded-xl border bg-white dark:bg-background-dark transition-all ${isTooShort ? 'border-red-400 bg-red-50/30 dark:bg-red-900/10' : 'border-gray-100 dark:border-gray-800 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10'}`}>
                  <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg h-8 w-8 sm:h-9 sm:w-9 shrink-0">
                    <span className="text-primary font-black text-xs">{idx + 1}</span>
                  </div>
                  
                  <input 
                    className="flex-1 min-w-0 bg-transparent border-0 p-2 text-base md:text-sm focus:ring-0 dark:text-white outline-none"
                    placeholder="e.g., Guided city tour..."
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(idx, e.target.value)}
                  />
                  
                  <button 
                    type="button"
                    onClick={() => removeHighlight(idx)}
                    className="flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8 sm:h-9 sm:w-9 rounded-lg transition-all shrink-0"
                    aria-label="Remove highlight"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                
                {isTooShort && (
                  <p className="text-[10px] font-bold text-red-500 ml-10 sm:ml-12 italic leading-tight">
                    Requires at least 3 words to be effective.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State UI */}
        {highlights.length === 0 && (
          <div className="border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl py-10 flex flex-col items-center justify-center text-gray-400 px-4 text-center">
            <span className="material-symbols-outlined text-4xl mb-3 opacity-20">Format_List_Bulleted</span>
            <p className="text-xs font-bold uppercase tracking-widest">No highlights added yet</p>
          </div>
        )}

        {/* Instruction Card */}
        <div className="text-[11px] text-gray-600 dark:text-gray-400 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 flex items-start gap-3 border border-gray-100 dark:border-gray-800">
          <span className="text-lg shrink-0">💡</span>
          <span className="leading-relaxed">
            <strong>Pro Tip:</strong> Focus on unique experiences (e.g., "Private sunset dinner") rather than generic items to increase booking rates.
          </span>
        </div>
      </div>
    </div>
  );
};