import React from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "../ui/Button";

const DownloadMessage = ({ msg }) => {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex items-center gap-3 p-4 bg-secondary/30 border border-border/50 rounded-xl">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <FileText size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">
            Product designer - Sandeep Shrestha.pdf
          </h4>
          <p className="text-xs text-muted-foreground">PDF Document</p>
        </div>
        <a href={msg.content} download="Sandeep_Shrestha_CV.pdf">
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Download size={16} />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default DownloadMessage;
