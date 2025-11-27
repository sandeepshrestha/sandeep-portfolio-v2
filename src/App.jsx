import React, { useState, useEffect, useRef } from "react";
import { User, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "./data/portfolioData";
import { getRandomResponse } from "./utils/chatLogic";
import Header from "./components/Header";
import InitialView from "./components/InitialView";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";
import BottomGlow from "./components/BottomGlow";
import { useTheme } from "./components/ThemeProvider";
import { Avatar, AvatarFallback } from "./components/ui/Avatar";

export default function App() {
  const { setTheme } = useTheme();
  const [messages, setMessages] = useState([
    { role: "system", content: "Interface initialized", type: "status" },
    { role: "bot", content: PORTFOLIO_DATA.intro, type: "text" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hasStarted) {
      scrollToBottom();
    }
  }, [messages, hasStarted]);

  const handleProjectClick = (project) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: `Tell me more about ${project.name}`,
        type: "text",
      },
    ]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: project,
          type: "project_detail",
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const generateResponse = (query) => {
    const responses = [];

    // Clear command
    if (query.match(/\b(clear|reset)\b/)) {
      responses.push({ type: "text", content: "Clearing..." });
      return responses;
    }

    // Greetings
    if (query.match(/\b(hi|hello|hey|greetings|sup)\b/)) {
      responses.push({ type: "text", content: getRandomResponse("greeting") });
      return responses;
    }

    // Data Queries
    if (
      query.includes("experience") ||
      query.includes("work") ||
      query.includes("job") ||
      query.includes("history")
    ) {
      responses.push({
        type: "text",
        content: getRandomResponse("experience"),
      });
      responses.push({
        type: "experience",
        content: PORTFOLIO_DATA.experience,
      });
      return responses;
    }
    if (
      query.includes("skill") ||
      query.includes("stack") ||
      query.includes("tech")
    ) {
      responses.push({ type: "text", content: getRandomResponse("skills") });
      responses.push({ type: "skills", content: PORTFOLIO_DATA.skills });
      return responses;
    }
    if (
      query.includes("project") ||
      query.includes("build") ||
      query.includes("portfolio")
    ) {
      responses.push({ type: "text", content: getRandomResponse("projects") });
      responses.push({
        type: "projects",
        content: PORTFOLIO_DATA.projects,
        onAction: handleProjectClick,
      });
      return responses;
    }
    if (
      query.includes("contact") ||
      query.includes("email") ||
      query.includes("reach")
    ) {
      responses.push({ type: "text", content: getRandomResponse("contact") });
      responses.push({ type: "contact", content: PORTFOLIO_DATA.contact });
      return responses;
    }
    if (
      query.includes("about") ||
      query.includes("who") ||
      query.includes("sandeep")
    ) {
      responses.push({ type: "text", content: getRandomResponse("about") });
      responses.push({ type: "about", content: PORTFOLIO_DATA.about });
      return responses;
    }

    // Default / Unknown
    responses.push({
      type: "text",
      content: getRandomResponse("unknown"),
    });
    return responses;
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    if (!hasStarted) setHasStarted(true);

    // Add user message
    const newMessages = [
      ...messages,
      { role: "user", content: text, type: "text" },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    // Check if clear command
    if (text.toLowerCase().match(/\b(clear|reset)\b/)) {
      setTimeout(() => {
        setMessages([{ role: "bot", content: "Clearing...", type: "text" }]);
        setIsTyping(false);

        setTimeout(() => {
          // Reset to initial state
          setMessages([
            {
              role: "system",
              content: "Interface initialized",
              type: "status",
            },
            { role: "bot", content: PORTFOLIO_DATA.intro, type: "text" },
          ]);
          setHasStarted(false);
        }, 1000);
      }, 600);
      return;
    }

    // Theme commands
    const lowerText = text.toLowerCase().trim();
    if (["light", "dark", "system"].includes(lowerText)) {
      setTheme(lowerText);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: `Switched to ${lowerText} mode`,
            type: "text",
          },
        ]);
        setIsTyping(false);
      }, 500);
      return;
    }

    // Generate response(s)
    const responses = generateResponse(text.toLowerCase());

    // Simulate typing delay for the first message
    let currentDelay = Math.random() * 600 + 600; // 600ms - 1200ms

    // Helper to process responses sequentially
    const processResponseQueue = async (queue, index) => {
      if (index >= queue.length) {
        setIsTyping(false);
        return;
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", ...queue[index] }]);

        // If there are more messages, keep typing true and schedule next
        if (index < queue.length - 1) {
          setIsTyping(true);
          // Shorter delay for subsequent messages
          const nextDelay = Math.random() * 400 + 400;
          processResponseQueue(queue, index + 1);
        } else {
          setIsTyping(false);
        }
      }, currentDelay);
    };

    processResponseQueue(responses, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <Header hasStarted={hasStarted} />

      {!hasStarted ? (
        <InitialView
          hasStarted={hasStarted}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <div className="flex flex-col min-h-screen pt-16 pb-32 sm:pb-40">
          <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6">
            <div className="space-y-6 py-6">
              {messages.map((msg, idx) => (
                <div key={idx} className="w-full">
                  {/* Avatar */}

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
      )}
      {/* <BottomGlow /> */}
    </div>
  );
}
