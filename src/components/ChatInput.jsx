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
          <div className="relative flex items-center bg-secondary/50 backdrop-blur-md border border-border rounded-full shadow-2xl p-1.5 sm:p-2 transition-all duration-300 hover:border-zinc-500/50 hover:shadow-zinc-500/10 hover:bg-secondary/80">
            <Terminal
              size={18}
              className="ml-3 text-muted-foreground mr-3 shrink-0"
            />
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-sm sm:text-base h-auto p-0"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isLoading}
              className="ml-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 shrink-0"
            >
              <Send size={14} className="sm:w-4 sm:h-4" />
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
