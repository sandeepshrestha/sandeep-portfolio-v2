import React from "react";
import { MousePointer } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/Button";

const Header = ({ hasStarted }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all duration-500 ${
        hasStarted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-transparent p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => window.location.reload()}
        >
          <MousePointer size={18} />
          <span className="font-mono text-sm">sandeep.design</span>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
