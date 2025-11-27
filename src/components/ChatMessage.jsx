import React, { useState, useMemo } from "react";
import {
  MapPin,
  Sparkles,
  Code,
  Terminal,
  Mail,
  ExternalLink,
  Phone,
  User,
  FileText,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { cn } from "../lib/utils";
import Toast from "./Toast";
import CaseStudySlideout from "./CaseStudySlideout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { MessageContainer } from "./ui/MessageContainer";

const ChatMessage = ({ msg }) => {
  const [showToast, setShowToast] = useState(false);

  const copyEmailToClipboard = (email) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setShowToast(true);
      })
      .catch((err) => {
        console.error("Failed to copy email:", err);
      });
  };

  const renderMessageContent = (msg) => {
    switch (msg.type) {
      case "text":
        return (
          <div
            className={cn(
              "leading-relaxed text-[15px] font-light inline-block",
              msg.role === "user"
                ? "font-regular bg-accent text-primary px-5 py-2.5 rounded-3xl rounded-tr-sm shadow-sm text-left"
                : "font-regular text-foreground"
            )}
          >
            {msg.content}
          </div>
        );

      case "status":
        return (
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {msg.content}
          </div>
        );

      case "about":
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const randomBio = useMemo(() => {
          const bios = PORTFOLIO_DATA.about.summary;
          return bios[Math.floor(Math.random() * bios.length)];
        }, []);

        return (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 rounded-2xl border border-border shadow-lg shrink-0">
                <AvatarImage
                  src={PORTFOLIO_DATA.about.avatar}
                  alt="Sandeep Shrestha"
                />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-xl font-bold text-foreground">
                  {PORTFOLIO_DATA.about.name}
                </h3>
                <div className="text-sm font-medium text-indigo-500">
                  {PORTFOLIO_DATA.about.role}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  {PORTFOLIO_DATA.about.location}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <p className="text-muted-foreground leading-relaxed font-light whitespace-pre-line text-[15px]">
                {randomBio}
              </p>
            </div>
          </div>
        );

      case "experience":
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

      case "skills":
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

      case "projects":
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

      case "project_detail":
        const project = msg.content;
        return (
          <div className="space-y-6">
            <div className="border-b border-border pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground">
                  {project.name}
                </h3>
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

      case "contact":
        return (
          <div className="rounded-3xl bg-secondary/30 border border-border p-6 backdrop-blur-sm hover:bg-secondary/50 transition-colors">
            <h3 className="text-foreground font-bold mb-4 flex items-center gap-2 text-base">
              <Terminal size={18} className="text-indigo-400" />
              <span>Contact</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-muted-foreground" />
                <button
                  onClick={() => copyEmailToClipboard(msg.content.email)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer text-left"
                >
                  {msg.content.email}
                </button>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-muted-foreground" />
                <a
                  href={`https://wa.me/${msg.content.whatsapp.replace(
                    /[^0-9]/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {msg.content.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <ExternalLink size={16} className="text-muted-foreground" />
                <a
                  href={`https://${msg.content.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
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
    <MessageContainer
      role={msg.role}
      showToast={showToast}
      onToastClose={() => setShowToast(false)}
    >
      {renderMessageContent(msg)}
    </MessageContainer>
  );
};

export default ChatMessage;
