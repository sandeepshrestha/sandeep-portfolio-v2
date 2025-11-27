import React from "react";

const SuggestionChip = ({ label, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className="h-8 px-4 rounded-full bg-secondary/50 border border-border text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-primary/20 transition-all text-xs sm:text-sm flex items-center gap-2 shadow-sm whitespace-nowrap font-medium backdrop-blur-sm"
  >
    {Icon && <Icon size={14} className="opacity-50" />}
    <span>{label}</span>
  </button>
);

export default SuggestionChip;
