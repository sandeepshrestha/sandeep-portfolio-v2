import React, { useState, useEffect } from "react";
import { Terminal, Send, User, Code, Briefcase, Mail } from "lucide-react";

import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import SuggestionChip from "./ui/SuggestionChip";

const placeholders = [
  "Ask me anything...",
  "Tell me about yourself",
  "Show me your projects",
  "What's your experience?",
  "What are your skills?",
  "How can I contact you?",
  "Type 'clear' to reset",
];

const SUGGESTIONS = [
  {
    label: "Tell me about yourself",
    text: "Tell me about yourself",
    icon: User,
  },
  { label: "Show me projects", text: "Show me projects", icon: Code },
  { label: "Experience", text: "Experience", icon: Briefcase },
  { label: "Contact info", text: "Contact info", icon: Mail },
];

import bgVideoDark from "../assets/bg-dark.mp4";
import bgVideoLight from "../assets/bg-light.mp4";

const InitialView = ({
  hasStarted,
  inputValue,
  setInputValue,
  handleSendMessage,
}) => {
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
    <div
      className={`flex-1 flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-700 absolute inset-0 z-40 ${
        hasStarted
          ? "opacity-0 pointer-events-none scale-95"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Video Backgrounds */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10 dark:hidden transition-opacity duration-500"
      >
        <source src={bgVideoLight} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10 hidden dark:block transition-opacity duration-500"
      >
        <source src={bgVideoDark} type="video/mp4" />
      </video>
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8 text-center relative z-10">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter text-foreground mb-4 sm:mb-8 opacity-90 select-none">
            Sandeep Shrestha
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed font-light px-4 sm:px-0">
            Product UI/UX Designer & User Interface Developer crafting digital
            experiences.
          </p>
        </div>

        <div className="w-full max-w-lg mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="relative group"
          >
            <div className="relative flex items-center w-full max-w-2xl bg-background/40 backdrop-blur-xl border border-white/10 rounded-full shadow-lg ring-1 ring-black/5 p-1.5 transition-all duration-300 focus-within:bg-background/60 focus-within:shadow-xl hover:border-zinc-500/20 hover:bg-background/50">
              {/* Left Icon Container - perfectly circular and subtle */}
              <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground ring-1 ring-inset ring-white/10">
                <Terminal size={18} strokeWidth={2} />
              </div>

              {/* Input - improved typography and spacing */}
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                style={{ "--placeholder-opacity": fadeIn ? "1" : "0" }}
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 px-4 text-base text-foreground placeholder:text-muted-foreground/70 font-normal tracking-tight h-full py-2"
                autoFocus
              />

              {/* Submit Button - symmetrical to left icon, interactive states */}
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim()}
                className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:scale-100"
              >
                <Send size={16} className={inputValue.trim() ? "" : ""} />
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((suggestion, index) => (
              <div
                key={index}
                style={{
                  animationDelay: `${index * 100 + 500}ms`,
                }}
                className={`transition-all duration-300 ${
                  hasStarted
                    ? "opacity-0 translate-y-4 pointer-events-none"
                    : "opacity-100 translate-y-0 animate-fade-in-up"
                }`}
              >
                <SuggestionChip
                  icon={suggestion.icon}
                  label={suggestion.label}
                  onClick={() => handleSendMessage(suggestion.text)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialView;
