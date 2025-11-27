import React, { useState } from 'react';
import { MapPin, Sparkles, Code, Terminal, Mail, ExternalLink, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import Toast from './Toast';

const ChatMessage = ({ msg }) => {
  const [showToast, setShowToast] = useState(false);

  const copyEmailToClipboard = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      setShowToast(true);
    }).catch((err) => {
      console.error('Failed to copy email:', err);
    });
  };

  const renderMessageContent = (msg) => {
    switch (msg.type) {
      case 'text':
        return <p className="leading-relaxed text-zinc-800 dark:text-zinc-300 text-[15px] font-medium">{msg.content}</p>;
      
      case 'status':
        return (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            {msg.content}
          </div>
        );

      case 'about':
        return (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
               <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-white/10 shadow-lg flex-shrink-0">
                  <img 
                    src={PORTFOLIO_DATA.about.avatar} 
                    alt="Sandeep Shrestha" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="flex-1">
                 <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{PORTFOLIO_DATA.about.role}</h3>
                 <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-sm">
                   <MapPin size={13} />
                   <span>{PORTFOLIO_DATA.about.location}</span>
                 </div>
               </div>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[15px]">{PORTFOLIO_DATA.about.summary}</p>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-5">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">Professional Timeline</h3>
            {msg.content.map((job, idx) => (
              <div key={idx} className="group relative pl-5 border-l-2 border-zinc-300 dark:border-zinc-800 hover:border-indigo-500/40 transition-all duration-300">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-700 group-hover:bg-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300" />
                <div className="pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                    <h4 className="text-zinc-900 dark:text-white font-bold text-[15px]">{job.role}</h4>
                    <span className="text-xs font-mono text-zinc-500 font-medium">{job.period}</span>
                  </div>
                  <div className="text-indigo-700 dark:text-indigo-400 text-sm font-semibold mb-2">{job.company}</div>
                  <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800/50 p-5 border border-zinc-300 dark:border-zinc-700 shadow-md dark:shadow-none backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3 text-zinc-900 dark:text-white font-bold">
                <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span>Design</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {msg.content.design.map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-300 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 font-mono font-medium hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800/50 p-5 border border-zinc-300 dark:border-zinc-700 shadow-md dark:shadow-none backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3 text-zinc-900 dark:text-white font-bold">
                <Code size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span>Development</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {msg.content.dev.map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-300 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 font-mono font-medium hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-3">
            {msg.content.map((project, idx) => (
              <div 
                key={idx} 
                onClick={() => msg.onAction && msg.onAction(project)}
                className={`group rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800/50 border border-zinc-300 dark:border-zinc-700 p-5 transition-all duration-300 backdrop-blur-sm shadow-md dark:shadow-none ${msg.onAction ? 'cursor-pointer hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1' : ''}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-zinc-900 dark:text-white font-bold group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors flex-1">{project.name}</h4>
                  <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-300 dark:border-zinc-700/50 whitespace-nowrap font-medium">
                    {project.type}
                  </span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed">{project.desc}</p>
                {msg.onAction && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Case Study</span>
                    <ExternalLink size={12} />
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'project_detail':
        const project = msg.content;
        return (
          <div className="space-y-6">
            <div className="border-b border-zinc-300 dark:border-zinc-800 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{project.name}</h3>
                <span className="text-xs font-mono text-indigo-700 dark:text-indigo-400 px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 font-medium">
                  {project.type}
                </span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-400 text-sm">{project.desc}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-300 mb-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  The Challenge
                </h4>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed pl-3.5 border-l border-zinc-300 dark:border-zinc-800">
                  {project.details.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-300 mb-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  The Solution
                </h4>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed pl-3.5 border-l border-zinc-300 dark:border-zinc-800">
                  {project.details.solution}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-300 mb-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Impact
                </h4>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed pl-3.5 border-l border-zinc-300 dark:border-zinc-800">
                  {project.details.impact}
                </p>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800/50 border border-zinc-300 dark:border-zinc-700 p-6 backdrop-blur-sm shadow-md dark:shadow-none">
             <h3 className="text-zinc-900 dark:text-white font-bold mb-4 flex items-center gap-2 text-base">
               <Terminal size={18} className="text-indigo-600 dark:text-indigo-400" />
               <span>Contact</span>
             </h3>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm">
                 <Mail size={16} className="text-zinc-500" />
                 <button 
                   onClick={() => copyEmailToClipboard(msg.content.email)}
                   className="text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium cursor-pointer text-left"
                 >
                   {msg.content.email}
                 </button>
               </li>
               <li className="flex items-center gap-3 text-sm">
                 <Phone size={16} className="text-zinc-500" />
                 <a 
                   href={`https://wa.me/${msg.content.whatsapp.replace(/[^0-9]/g, '')}`} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium"
                 >
                   {msg.content.whatsapp}
                 </a>
               </li>
               <li className="flex items-center gap-3 text-sm">
                 <ExternalLink size={16} className="text-zinc-500" />
                 <a href={`https://${msg.content.linkedin}`} target="_blank" rel="noreferrer" className="text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium">
                   LinkedIn Profile
                 </a>
               </li>
             </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderMessageContent(msg)}
      {showToast && (
        <Toast 
          message="Email address copied!" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </>
  );
};

export default ChatMessage;
