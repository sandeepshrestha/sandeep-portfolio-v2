import React from "react";
import { Sparkles, Code } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";

const SkillsMessage = ({ msg }) => {
  return (
    <div className="space-y-4">
      <Card className="rounded-3xl bg-secondary/20 border-border backdrop-blur-sm hover:bg-secondary/40 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3 text-foreground font-light">
            <Sparkles size={16} className="text-indigo-400" />
            <span>Design</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {msg.content.design.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-background hover:border-zinc-500 hover:text-foreground shadow-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl bg-secondary/20 border-border backdrop-blur-sm hover:bg-secondary/40 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3 text-foreground font-light">
            <Code size={16} className="text-emerald-400" />
            <span>Development</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {msg.content.dev.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-background hover:border-zinc-500 hover:text-foreground shadow-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsMessage;
