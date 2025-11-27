import React from 'react';

const SuggestionChip = ({ label, onClick, icon: Icon }) => (
  <button 
    onClick={onClick}
    className="h-10 px-5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all text-sm flex items-center gap-2 shadow-lg whitespace-nowrap font-light"
  >
    {Icon && <Icon size={14} className="opacity-50" />}
    <span>{label}</span>
  </button>
);

export default SuggestionChip;
