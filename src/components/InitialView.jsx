import React, { useRef } from 'react';
import { Terminal, Send, User, Code, Briefcase, Mail } from 'lucide-react';
import SuggestionChip from './SuggestionChip';
import LaserFlow from './LaserFlow';

const InitialView = ({ hasStarted, inputValue, setInputValue, handleSendMessage }) => {
  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-6 transition-all duration-700 absolute inset-0 z-40 ${hasStarted ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
      
      {/* LaserFlow Background */}
      <div className="absolute inset-0 overflow-hidden -z-10 bg-gray-50 dark:bg-zinc-950">
        <LaserFlow 
          color="#6366f1" 
          flowSpeed={0.4} 
          wispDensity={1.2}
          fogIntensity={0.6}
        />
      </div>

      <div className="max-w-2xl w-full space-y-8 text-center relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-mono mb-4 shadow-sm dark:shadow-none backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-white dark:to-zinc-500">
            Sandeep Shrestha
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Product UI/UX Designer & User Interface Developer crafting digital experiences.
          </p>
        </div>

        <div className="w-full max-w-lg mx-auto space-y-6">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-500" />
            <div className="relative flex items-center gap-3 bg-white/90 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-600 focus-within:border-zinc-500 dark:focus-within:border-zinc-500 rounded-2xl p-4 transition-all duration-300 shadow-xl dark:shadow-2xl backdrop-blur-xl">
              <Terminal size={20} className="text-zinc-500 dark:text-zinc-500 flex-shrink-0 ml-1" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-500 focus:outline-none text-base min-w-0 font-medium"
                autoFocus
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            <SuggestionChip label="Tell me about yourself" icon={User} onClick={() => handleSendMessage("Tell me about yourself")} />
            <SuggestionChip label="Show me projects" icon={Code} onClick={() => handleSendMessage("Show me projects")} />
            <SuggestionChip label="Experience" icon={Briefcase} onClick={() => handleSendMessage("Experience")} />
            <SuggestionChip label="Contact info" icon={Mail} onClick={() => handleSendMessage("Contact info")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialView;
