import React from 'react';

const SuggestionChip = ({ label, onClick, icon: Icon }) => (
  <button 
    onClick={onClick}
    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-sm transition-all duration-200 whitespace-nowrap backdrop-blur-sm shadow-sm dark:shadow-none"
  >
    {Icon && <Icon size={14} className="text-zinc-500 dark:text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />}
    <span>{label}</span>
  </button>
);

export default SuggestionChip;
