import React from "react";

const StatusMessage = ({ msg }) => {
  return (
    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {msg.content}
    </div>
  );
};

export default StatusMessage;
