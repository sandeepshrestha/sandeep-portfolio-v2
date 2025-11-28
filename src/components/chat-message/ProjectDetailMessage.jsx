import React from "react";

const ProjectDetailMessage = ({ msg }) => {
  const project = msg.content;
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
          <span className="text-xs font-mono text-indigo-400 px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 font-medium">
            {project.type}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">{project.desc}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            The Challenge
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed pl-3.5 border-l border-border">
            {project.details.challenge}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            The Solution
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed pl-3.5 border-l border-border">
            {project.details.solution}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Impact
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed pl-3.5 border-l border-border">
            {project.details.impact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailMessage;
