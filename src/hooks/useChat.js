import { useState, useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { getRandomResponse } from "../utils/chatLogic";
import { useTheme } from "../components/ThemeProvider";

export const useChat = () => {
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
    if (query.match(/\b(hi|hello|hey|greetings|sup|hola|howdy|yo|start)\b/)) {
      responses.push({ type: "text", content: getRandomResponse("greeting") });
      return responses;
    }

    // Resume / CV
    if (query.match(/\b(resume|cv|download|pdf|document)\b/)) {
      responses.push({ type: "text", content: getRandomResponse("resume") });
      responses.push({ type: "download", content: PORTFOLIO_DATA.resume });
      return responses;
    }

    // Data Queries
    if (
      query.match(
        /\b(experience|work|job|history|career|background|companies|roles)\b/
      )
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
      query.match(
        /\b(skill|stack|tech|languages|frameworks|tools|abilities|expertise|coding)\b/
      )
    ) {
      responses.push({ type: "text", content: getRandomResponse("skills") });
      responses.push({ type: "skills", content: PORTFOLIO_DATA.skills });
      return responses;
    }
    if (
      query.match(
        /\b(project|build|portfolio|work|app|website|design|case study|showcase)\b/
      )
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
      query.match(
        /\b(contact|email|reach|hire|connect|social|link|github|linkedin)\b/
      )
    ) {
      responses.push({ type: "text", content: getRandomResponse("contact") });
      responses.push({ type: "contact", content: PORTFOLIO_DATA.contact });
      return responses;
    }
    if (query.match(/\b(about|who|sandeep|bio|profile|intro)\b/)) {
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

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    hasStarted,
    messagesEndRef,
    handleSendMessage,
  };
};
