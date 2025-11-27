import React, { useEffect, useRef } from "react";
import {
  X,
  ExternalLink,
  Calendar,
  User,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

const CaseStudySlideout = ({ isOpen, onClose, project }) => {
  const slideoutRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slideout Panel */}
      <div
        ref={slideoutRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-background border-l border-border shadow-2xl z-[101] transform transition-transform duration-500 ease-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-background/50 backdrop-blur-md hover:bg-secondary"
        >
          <X size={20} />
        </Button>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Header Image */}
          <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img
              src={project.details?.images?.[0] || "/api/placeholder/800/600"}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <Badge
                variant="secondary"
                className="mb-2 bg-secondary/80 backdrop-blur-sm"
              >
                {project.type}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Award size={18} className="text-primary" />
              Overview
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              {project.details?.overview || project.desc}
            </p>
          </div>

          {/* Role & Timeline Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/20 border border-border">
              <div className="flex items-center gap-2 text-foreground mb-2">
                <User size={16} className="text-primary" />
                <span className="font-medium text-sm">Role</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.details?.role || "Lead Developer"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/20 border border-border">
              <div className="flex items-center gap-2 text-foreground mb-2">
                <Calendar size={16} className="text-primary" />
                <span className="font-medium text-sm">Timeline</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.details?.timeline || "2024"}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="bg-background">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.details?.features && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.details.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-muted-foreground text-sm"
                  >
                    <ArrowRight
                      size={14}
                      className="mt-1 text-primary shrink-0"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="pt-6 border-t border-border flex gap-4">
            {project.details?.link && (
              <Button
                className="flex-1"
                onClick={() => window.open(project.details.link, "_blank")}
              >
                Visit Live Site <ExternalLink size={16} className="ml-2" />
              </Button>
            )}
            {project.details?.github && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(project.details.github, "_blank")}
              >
                View Code
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudySlideout;
