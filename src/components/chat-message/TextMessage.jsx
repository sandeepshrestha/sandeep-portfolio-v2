import React from "react";
import { cn } from "../../lib/utils";

const TextMessage = ({ msg }) => {
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
};

export default TextMessage;
