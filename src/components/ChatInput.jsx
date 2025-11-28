import React, { useState, useEffect } from "react";
import { Send, Terminal, User, Briefcase, Cpu, Code, Mail } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import SuggestionChip from "./ui/SuggestionChip";

const placeholders = [
  "Ask about experience, skills, or projects...",
  "Tell me about your experience",
  "What are your technical skills?",
  "Show me your projects",
  "How can I contact you?",
  "What's your design process?",
  "Type 'clear' to reset",
];

const ChatInput = ({
  hasStarted,
  inputValue,
  setInputValue,
  handleSendMessage,
  isTyping,
  isLoading,
  messages,
}) => {
  // Placeholder rotation logic removed as per instruction
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setFadeIn(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-background via-background/95 backdrop-blur-xl pb-4 sm:pb-6 pt-6 sm:pt-8 transition-all duration-700 ${
        hasStarted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-3 sm:space-y-4">
        {/* Suggestion Chips */}
        {messages[messages.length - 1]?.role === "bot" && !isTyping && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <SuggestionChip
              label="About"
              icon={User}
              onClick={() => handleSendMessage("Tell me about Sandeep")}
            />
            <SuggestionChip
              label="Experience"
              icon={Briefcase}
              onClick={() => handleSendMessage("What is his experience?")}
            />
            <SuggestionChip
              label="Skills"
              icon={Cpu}
              onClick={() =>
                handleSendMessage("What are his technical skills?")
              }
            />
            <SuggestionChip
              label="Projects"
              icon={Code}
              onClick={() => handleSendMessage("Show me his projects")}
            />
            <SuggestionChip
              label="Contact"
              icon={Mail}
              onClick={() => handleSendMessage("How can I contact him?")}
            />
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="relative group"
        >
          <div className="relative flex items-center w-full bg-background/60 backdrop-blur-xl border border-border/40 rounded-full shadow-lg ring-1 ring-black/5 p-1.5 transition-all duration-300 focus-within:bg-background/80 focus-within:shadow-xl hover:border-border/80 hover:ring-border/20">
            {/* 1. Icon Wrapped for Symmetry (matches button size) */}
            <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground ring-1 ring-inset ring-black/5">
              <Terminal size={18} strokeWidth={2} />
            </div>

            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              style={{ "--placeholder-opacity": fadeIn ? "1" : "0" }}
              // 2. Improved Text Spacing & Typography
              className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 px-4 text-base text-foreground placeholder:text-muted-foreground/70 h-full py-2"
              disabled={isLoading}
              autoFocus
            />

            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isLoading}
              // 3. Consistent Button Sizing & Interactive States
              className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:scale-100"
            >
              <Send size={16} className={inputValue.trim() ? "ml-0.5" : ""} />
            </Button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-mono">
            Portfolio Interface • Designed by Sandeep Shrestha
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
