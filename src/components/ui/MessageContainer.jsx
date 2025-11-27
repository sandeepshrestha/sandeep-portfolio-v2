import React from "react";
import { cva } from "class-variance-authority";
import { User, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import Toast from "../Toast";

// --- 1. Container Styles ---
// This handles the main layout of the message row.
// 'cva' lets us define different styles based on the 'role' prop.
const containerVariants = cva("flex gap-4 w-full", {
  variants: {
    role: {
      // If role is 'user', reverse the row so items start from the right
      user: "flex-row-reverse",
      // If role is 'bot' or 'system', keep normal left-to-right flow
      bot: "flex-row",
      system: "flex-row",
    },
  },
  defaultVariants: {
    role: "bot",
  },
});

// --- 2. Avatar Styles ---
// This handles the circle icon next to the message.
const avatarVariants = cva(
  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
  {
    variants: {
      role: {
        // User: Primary color theme (lighter background in light mode)
        user: "bg-primary/10 text-primary dark:bg-accent dark:text-primary",
        // Bot: Emerald (green) color theme
        bot: "bg-emerald-500/10 text-emerald-500",
        // System: No avatar shown
        system: "hidden",
      },
    },
    defaultVariants: {
      role: "bot",
    },
  }
);

// --- 3. Content Area Styles ---
// This handles the wrapper around the actual text/message bubble.
const contentVariants = cva("flex-1 max-w-[85%]", {
  variants: {
    role: {
      // User text aligns to the right
      user: "text-right",
      // Bot and System text aligns to the left
      bot: "text-left",
      system: "text-left",
    },
  },
  defaultVariants: {
    role: "bot",
  },
});

const MessageContainer = ({
  role = "bot",
  children,
  showToast,
  onToastClose,
  className,
}) => {
  return (
    // Apply container styles based on role
    <div className={cn(containerVariants({ role }), className)}>
      {/* Render Avatar (Icon) if it's not a system message */}
      {role !== "system" && (
        <div className={avatarVariants({ role })}>
          {/* Show User icon for user, Sparkles for bot */}
          {role === "user" ? <User size={16} /> : <Sparkles size={16} />}
        </div>
      )}

      {/* Render the actual message content (the bubble or text) */}
      <div className={contentVariants({ role })}>{children}</div>

      {/* Show toast notification if needed (e.g. for copied email) */}
      {showToast && (
        <Toast message="Email address copied!" onClose={onToastClose} />
      )}
    </div>
  );
};

export { MessageContainer, containerVariants };
