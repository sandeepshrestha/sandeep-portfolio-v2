import React, { useMemo } from "react";
import { MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";

const AboutMessage = () => {
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
};

export default AboutMessage;
