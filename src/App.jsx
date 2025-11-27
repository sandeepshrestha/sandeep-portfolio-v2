import React, { useState, useEffect, useRef } from 'react';
import { User, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { getRandomResponse } from './utils/chatLogic';
import Header from './components/Header';
import InitialView from './components/InitialView';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: "Interface initialized", type: 'status' },
    { role: 'bot', content: PORTFOLIO_DATA.intro, type: 'text' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hasStarted) {
      scrollToBottom();
    }
  }, [messages, hasStarted]);

  const handleProjectClick = (project) => {
    setMessages(prev => [
      ...prev, 
      { 
        role: 'user', 
        content: `Tell me more about ${project.name}`, 
        type: 'text' 
      }
    ]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: 'bot', 
          content: project, 
          type: 'project_detail' 
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const generateResponse = (query) => {
    const responses = [];

    // Greetings
    if (query.match(/\b(hi|hello|hey|greetings|sup)\b/)) {
      responses.push({ type: 'text', content: getRandomResponse('greeting') });
      return responses;
    }

    // Data Queries
    if (query.includes('experience') || query.includes('work') || query.includes('job') || query.includes('history')) {
      responses.push({ type: 'text', content: getRandomResponse('experience') });
      responses.push({ type: 'experience', content: PORTFOLIO_DATA.experience });
      return responses;
    }
    if (query.includes('skill') || query.includes('stack') || query.includes('tech')) {
      responses.push({ type: 'text', content: getRandomResponse('skills') });
      responses.push({ type: 'skills', content: PORTFOLIO_DATA.skills });
      return responses;
    }
    if (query.includes('project') || query.includes('build') || query.includes('portfolio')) {
      responses.push({ type: 'text', content: getRandomResponse('projects') });
      responses.push({ type: 'projects', content: PORTFOLIO_DATA.projects, onAction: handleProjectClick });
      return responses;
    }
    if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
      responses.push({ type: 'text', content: getRandomResponse('contact') });
      responses.push({ type: 'contact', content: PORTFOLIO_DATA.contact });
      return responses;
    }
    if (query.includes('about') || query.includes('who') || query.includes('sandeep')) {
      responses.push({ type: 'text', content: getRandomResponse('about') });
      responses.push({ type: 'about', content: PORTFOLIO_DATA.about });
      return responses;
    }
    
    // Default / Unknown
    responses.push({
      type: 'text',
      content: getRandomResponse('unknown')
    });
    return responses;
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    if (!hasStarted) setHasStarted(true);

    // Add user message
    const newMessages = [...messages, { role: 'user', content: text, type: 'text' }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Generate response(s)
    const responses = generateResponse(text.toLowerCase());
    
    // Simulate typing delay for the first message
    let currentDelay = Math.random() * 600 + 600; // 600ms - 1200ms

    // Helper to process responses sequentially
    const processResponseQueue = async (queue, index) => {
      if (index >= queue.length) {
        setIsTyping(false);
        return;
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', ...queue[index] }]);
        
        // If there are more messages, keep typing true and schedule next
        if (index < queue.length - 1) {
          setIsTyping(true);
          // Shorter delay for subsequent messages
          const nextDelay = Math.random() * 400 + 400; 
          processResponseQueue(queue, index + 1);
        } else {
          setIsTyping(false);
        }
      }, currentDelay);
    };

    processResponseQueue(responses, 0);
  };



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Ambient background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-500/5 via-white to-purple-500/5 dark:from-indigo-950/20 dark:via-zinc-950 dark:to-purple-950/20 pointer-events-none" />
      
      <Header hasStarted={hasStarted} />

      <InitialView 
        hasStarted={hasStarted}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
      />

      {/* Main Chat Area */}
      <main className={`relative flex-1 overflow-y-auto pt-20 transition-all duration-700 ${hasStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="max-w-3xl mx-auto px-6 py-8 pb-60">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                {msg.role === 'user' && (
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <User size={16} className="text-zinc-400" /> 
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-xs text-zinc-500 dark:text-zinc-500 font-mono mb-1.5">
                    {msg.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                  <div className={`${
                    msg.role === 'user' 
                      ? 'bg-white dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-300 dark:border-zinc-700/50 px-4 py-3 rounded-2xl rounded-tr-md shadow-sm'
                      : ''
                  }`}>
                    <ChatMessage msg={msg} handleProjectClick={handleProjectClick} />
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 dark:from-indigo-500/50 dark:to-purple-600/50 flex items-center justify-center">
                  <Sparkles size={16} className="text-indigo-500 dark:text-white/50" />
                </div>
                <div className="flex items-center gap-1 h-9">
                  <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      <ChatInput 
        hasStarted={hasStarted}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        isTyping={isTyping}
        messages={messages}
      />
    </div>
  );
}

