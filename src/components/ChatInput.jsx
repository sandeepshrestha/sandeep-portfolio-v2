import React from 'react';
import { Terminal, Send, User, Briefcase, Cpu, Code, Mail } from 'lucide-react';
import SuggestionChip from './SuggestionChip';

const ChatInput = ({ hasStarted, inputValue, setInputValue, handleSendMessage, isTyping, messages }) => {
  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent dark:from-zinc-950 dark:via-zinc-950/95 backdrop-blur-xl pb-6 pt-8 transition-all duration-700 ${hasStarted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        
        {/* Suggestion Chips */}
        {messages[messages.length - 1]?.role === 'bot' && !isTyping && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <SuggestionChip label="About" icon={User} onClick={() => handleSendMessage("Tell me about Sandeep")} />
            <SuggestionChip label="Experience" icon={Briefcase} onClick={() => handleSendMessage("What is his experience?")} />
            <SuggestionChip label="Skills" icon={Cpu} onClick={() => handleSendMessage("What are his technical skills?")} />
            <SuggestionChip label="Projects" icon={Code} onClick={() => handleSendMessage("Show me his projects")} />
            <SuggestionChip label="Contact" icon={Mail} onClick={() => handleSendMessage("How can I contact him?")} />
          </div>
        )}

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
          <div className="relative flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 focus-within:border-zinc-500 dark:focus-within:border-zinc-500 rounded-full p-2 pl-5 transition-all duration-300 shadow-xl dark:shadow-2xl">
            <Terminal size={18} className="text-zinc-500 dark:text-zinc-500 flex-shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about experience, skills, or projects..."
              className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-500 focus:outline-none text-sm min-w-0 font-medium"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 shadow-lg"
            >
              {isTyping ? (
                <div className="w-4 h-4 border-2 border-white/20 dark:border-black/20 border-t-white dark:border-t-black rounded-full animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">
            Portfolio Interface • Designed by Sandeep Shrestha
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
