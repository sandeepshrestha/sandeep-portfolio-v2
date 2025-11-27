import React from "react";
import { Code } from "lucide-react";

const Header = ({ hasStarted }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl transition-all duration-500 ${
        hasStarted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
          <span className="font-light text-xs sm:text-sm text-zinc-400">
            Sandeep Shrestha<span className="text-zinc-600">.portfolio</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Code size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
