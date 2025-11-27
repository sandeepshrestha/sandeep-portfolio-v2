import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return createPortal(
    <div className="fixed bottom-6 left-1/2 z-[9999] animate-toast-in pointer-events-none">
      <div className="rounded-full bg-zinc-900 dark:bg-white border border-zinc-700 dark:border-zinc-300 px-5 py-3 shadow-2xl flex items-center gap-3 backdrop-blur-lg pointer-events-auto">
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
        <span className="text-sm font-medium text-white dark:text-zinc-900">
          {message}
        </span>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
