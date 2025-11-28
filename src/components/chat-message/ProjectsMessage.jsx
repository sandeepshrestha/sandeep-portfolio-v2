import React from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const ProjectsMessage = ({ msg }) => {
  return (
    <div className="space-y-4">
      {msg.content.map((project, idx) => (
        <Card
          key={idx}
          className="group rounded-3xl bg-secondary/20 border-border transition-all duration-300 backdrop-blur-sm hover:bg-secondary/40 hover:border-zinc-500/30 hover:shadow-lg relative overflow-hidden"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="text-foreground font-regular group-hover:text-indigo-500 transition-colors flex-1">
                {project.name}
              </h4>
              <Badge
                variant="secondary"
                className="text-[12px] bg-secondary/50"
              >
                {project.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4 font-light leading-relaxed">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="text-xs bg-background shadow-sm"
                >
                  {t}
                </Badge>
              ))}
            </div>
            {msg.onAction && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => msg.onAction(project, e)}
                className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-indigo-500 hover:text-indigo-600 hover:bg-transparent p-0 h-auto font-medium"
              >
                <span>View Case Study</span>
                <ExternalLink size={14} className="ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsMessage;
