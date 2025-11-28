import React, { useState } from "react";
import Toast from "./Toast";
import { MessageContainer } from "./ui/MessageContainer";
import TextMessage from "./chat-message/TextMessage";
import StatusMessage from "./chat-message/StatusMessage";
import AboutMessage from "./chat-message/AboutMessage";
import ExperienceMessage from "./chat-message/ExperienceMessage";
import SkillsMessage from "./chat-message/SkillsMessage";
import ProjectsMessage from "./chat-message/ProjectsMessage";
import ProjectDetailMessage from "./chat-message/ProjectDetailMessage";
import ContactMessage from "./chat-message/ContactMessage";

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
        return <TextMessage msg={msg} />;

      case "status":
        return <StatusMessage msg={msg} />;

      case "about":
        return <AboutMessage />;

      case "experience":
        return <ExperienceMessage msg={msg} />;

      case "skills":
        return <SkillsMessage msg={msg} />;

      case "projects":
        return <ProjectsMessage msg={msg} />;

      case "project_detail":
        return <ProjectDetailMessage msg={msg} />;

      case "contact":
        return (
          <ContactMessage
            msg={msg}
            copyEmailToClipboard={copyEmailToClipboard}
          />
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
