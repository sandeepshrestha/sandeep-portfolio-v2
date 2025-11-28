import React, { useState, useEffect } from "react";
import { User, Briefcase, Cpu, Code, Mail, Download } from "lucide-react";
import SuggestionChip from "./ui/SuggestionChip";
import ChatInputBar from "./ui/ChatInputBar";

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
              label="Projects"
              icon={Code}
              onClick={() => handleSendMessage("Show me his projects")}
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
              label="Contact"
              icon={Mail}
              onClick={() => handleSendMessage("How can I contact him?")}
            />
            <SuggestionChip
              label="Download CV"
              icon={Download}
              onClick={() => handleSendMessage("Download CV")}
            />
          </div>
        )}

        {/* Input Bar */}
        <ChatInputBar
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={placeholders[placeholderIndex]}
          fadeIn={fadeIn}
          isLoading={isLoading}
          onSubmit={handleSendMessage}
          name="main-chat-input"
          id="main-chat-input"
        />

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
