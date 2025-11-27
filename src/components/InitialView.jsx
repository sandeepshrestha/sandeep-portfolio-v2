import React, { useState, useEffect } from "react";
import { Terminal, Send, User, Code, Briefcase, Mail } from "lucide-react";
import SuggestionChip from "./SuggestionChip";

const placeholders = [
  "Ask me anything...",
  "Tell me about yourself",
  "Show me your projects",
  "What's your experience?",
  "What are your skills?",
  "How can I contact you?",
  "Type 'clear' to reset",
];

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
      className={`flex-1 flex flex-col items-center justify-center p-6 transition-all duration-700 absolute inset-0 z-40 ${
        hasStarted
          ? "opacity-0 pointer-events-none scale-95"
          : "opacity-100 scale-100"
      }`}
    >
      <div className="max-w-2xl w-full space-y-8 text-center relative z-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-light tracking-tighter text-white mb-8 opacity-90 select-none">
            Sandeep Shrestha
          </h1>
          <p className="text-lg text-zinc-600 max-w-lg mx-auto leading-relaxed font-light">
            Product UI/UX Designer & User Interface Developer crafting digital
            experiences.
          </p>
        </div>

        <div className="w-full max-w-lg mx-auto space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="relative group"
          >
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full p-2 pl-3 flex items-center shadow-2xl hover:border-zinc-600 transition-all duration-300 cursor-text">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white transition-colors shrink-0">
                <Terminal size={20} />
              </div>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                style={{
                  "--placeholder-opacity": fadeIn ? "1" : "0",
                }}
                className="flex-1 ml-4 bg-transparent text-zinc-100 focus:outline-none text-base min-w-0 font-light placeholder:transition-opacity placeholder:duration-300"
                autoFocus
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="mr-2 bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm hover:bg-zinc-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              >
                <Send size={16} />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            <SuggestionChip
              label="Tell me about yourself"
              icon={User}
              onClick={() => handleSendMessage("Tell me about yourself")}
            />
            <SuggestionChip
              label="Show me projects"
              icon={Code}
              onClick={() => handleSendMessage("Show me projects")}
            />
            <SuggestionChip
              label="Experience"
              icon={Briefcase}
              onClick={() => handleSendMessage("Experience")}
            />
            <SuggestionChip
              label="Contact info"
              icon={Mail}
              onClick={() => handleSendMessage("Contact info")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialView;
