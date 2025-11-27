import React from 'react';
import { Terminal, Send, User, Briefcase, Cpu, Code, Mail } from 'lucide-react';
import SuggestionChip from './SuggestionChip';

const ChatInput = ({ hasStarted, inputValue, setInputValue, handleSendMessage, isTyping, messages }) => {
  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-zinc-950 via-zinc-950/95 backdrop-blur-xl pb-6 pt-8 transition-all duration-700 ${hasStarted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
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
          <div className="flex items-center gap-3 bg-zinc-900 rounded-full p-2 pl-3 pr-3 border border-zinc-800 shadow-lg hover:border-zinc-600 transition-all">
            <Terminal size={18} className="text-zinc-500 flex-shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about experience, skills, or projects..."
              className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-sm min-w-0 font-light"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isTyping ? <span className="loading-text">Thinking</span> : <Send size={16} />}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-[10px] text-zinc-600 font-mono">
            Portfolio Interface • Designed by Sandeep Shrestha
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
