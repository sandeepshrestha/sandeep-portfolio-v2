import React from "react";
import Header from "./components/Header";
import InitialView from "./components/InitialView";
import ChatLayout from "./components/layout/ChatLayout";
import { useTheme } from "./components/ThemeProvider";
import { useChat } from "./hooks/useChat";

export default function App() {
  const { theme } = useTheme();
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    hasStarted,
    messagesEndRef,
    handleSendMessage,
  } = useChat();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <Header hasStarted={hasStarted} />

      {!hasStarted ? (
        <InitialView
          hasStarted={hasStarted}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          theme={theme}
        />
      ) : (
        <ChatLayout
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          hasStarted={hasStarted}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}
