import React from "react";

const BottomGlow = () => {
  return (
    <>
      {/* Purple glow gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-200/20 via-purple-400/10 to-transparent dark:from-purple-900/10 dark:via-purple-500/3 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-200/20 via-indigo-400/10 to-transparent dark:from-indigo-900/8 dark:via-indigo-500/2 blur-2xl" />
      </div>

      {/* Sparkling particles */}
      <div className="fixed bottom-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-200/40 dark:bg-purple-300/25 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute w-2 h-2 bg-indigo-600/30 dark:bg-indigo-400/20 rounded-full animate-sparkle-slow blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 40}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BottomGlow;
