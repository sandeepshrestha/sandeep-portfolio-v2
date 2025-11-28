import React from "react";
import ChatMessage from "../ChatMessage";
import ChatInput from "../ChatInput";

const ChatLayout = ({
  messages,
  isTyping,
  messagesEndRef,
  hasStarted,
  inputValue,
  setInputValue,
  handleSendMessage,
}) => {
  return (
    <div className="flex flex-col min-h-screen pt-16 pb-32 sm:pb-40">
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6">
        <div className="space-y-6 py-6">
          {messages.map((msg, idx) => (
            <div key={idx} className="w-full">
              <ChatMessage msg={msg} />
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono animate-pulse pl-4">
              <span className="w-2 h-2 rounded-full bg-primary/50" />
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        hasStarted={hasStarted}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        isTyping={isTyping}
        messages={messages}
      />
    </div>
  );
};

export default ChatLayout;
