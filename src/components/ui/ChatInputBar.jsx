import React from "react";
import { Terminal, Send } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

const ChatInputBar = ({
  inputValue,
  setInputValue,
  placeholder,
  fadeIn = true,
  isLoading = false,
  onSubmit,
  className,
  autoFocus = true,
  name = "chat-input",
  id,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSubmit(inputValue);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative group w-full", className)}
    >
      <div className="relative flex items-center w-full bg-background/30 backdrop-blur-xl border border-border/40 rounded-full shadow-lg ring-1 ring-black/5 p-1.5 transition-all duration-300 focus-within:bg-background/80 focus-within:shadow-xl hover:border-border/80 hover:ring-border/20">
        {/* Icon Wrapped for Symmetry */}
        <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground ring-1 ring-inset ring-black/5">
          <Terminal size={18} strokeWidth={2} />
        </div>

        <Input
          type="text"
          name={name}
          id={id || name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          style={{ "--placeholder-opacity": fadeIn ? "1" : "0" }}
          className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 px-4 text-base text-foreground placeholder:text-muted-foreground/70 h-full py-2"
          disabled={isLoading}
          autoFocus={autoFocus}
        />

        <Button
          type="submit"
          size="icon"
          disabled={!inputValue.trim() || isLoading}
          className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:scale-100"
        >
          <Send size={16} className={inputValue.trim() ? "ml-0.5" : ""} />
        </Button>
      </div>
    </form>
  );
};

export default ChatInputBar;
