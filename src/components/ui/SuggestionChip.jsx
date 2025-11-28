import React from "react";

const SuggestionChip = ({ label, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className="
    h-8 px-4 rounded-full 
    bg-background/40 backdrop-blur-md 
    border border-border/40 
    text-muted-foreground text-xs sm:text-sm font-normal 
    shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] 
    transition-all duration-300 
    hover:bg-background/60 hover:text-foreground hover:border-primary/20 hover:shadow-md
    flex items-center gap-2 whitespace-nowrap
  "
  >
    {Icon && <Icon size={14} className="opacity-50" />}
    <span>{label}</span>
  </button>
);

export default SuggestionChip;
