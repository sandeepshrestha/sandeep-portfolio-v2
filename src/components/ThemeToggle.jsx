import React, { useState, useRef, useEffect } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary border border-border transition-colors text-muted-foreground hover:text-foreground"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-popover border border-border shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => handleThemeChange("light")}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
              theme === "light" ? "text-primary font-medium" : "text-foreground"
            }`}
          >
            <Sun size={16} />
            <span>Light</span>
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
              theme === "dark" ? "text-primary font-medium" : "text-foreground"
            }`}
          >
            <Moon size={16} />
            <span>Dark</span>
          </button>
          <button
            onClick={() => handleThemeChange("system")}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
              theme === "system"
                ? "text-primary font-medium"
                : "text-foreground"
            }`}
          >
            <Laptop size={16} />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
