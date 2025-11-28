import React from "react";

const ExperienceMessage = ({ msg }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
        Professional Timeline
      </h3>
      {msg.content.map((job, idx) => (
        <div
          key={idx}
          className="group relative pl-5 border-l-2 border-border hover:border-indigo-500/40 transition-all duration-300"
        >
          <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-border group-hover:bg-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300" />
          <div className="pb-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
              <h4 className="text-foreground font-bold text-[15px]">
                {job.role}
              </h4>
              <span className="text-xs font-mono text-muted-foreground font-medium">
                {job.period}
              </span>
            </div>
            <div className="text-indigo-500 text-sm font-medium mb-2">
              {job.company}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {job.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceMessage;
