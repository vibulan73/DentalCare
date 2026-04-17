"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { chatbotResponses } from "@/lib/data";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

const quickReplies = [
  { label: "📅 Book Appointment", key: "appointment" },
  { label: "🦷 Services", key: "services" },
  { label: "📍 Locations", key: "locations" },
  { label: "🕐 Office Hours", key: "hours" },
  { label: "💳 Insurance", key: "insurance" },
  { label: "🚨 Emergency", key: "emergency" },
];

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule"))
    return chatbotResponses.appointment;
  if (lower.includes("service") || lower.includes("treatment") || lower.includes("offer"))
    return chatbotResponses.services;
  if (lower.includes("location") || lower.includes("address") || lower.includes("where") || lower.includes("direction"))
    return chatbotResponses.locations;
  if (lower.includes("hour") || lower.includes("time") || lower.includes("open") || lower.includes("close"))
    return chatbotResponses.hours;
  if (lower.includes("insurance") || lower.includes("payment") || lower.includes("pay") || lower.includes("cost"))
    return chatbotResponses.insurance;
  if (lower.includes("emergency") || lower.includes("urgent") || lower.includes("pain"))
    return chatbotResponses.emergency;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return chatbotResponses.greeting;
  return chatbotResponses.default;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", text: chatbotResponses.greeting, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      text: text.trim(),
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Bot response with delay
    setTimeout(() => {
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        text: getResponse(text),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-teal text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all z-50 animate-glow-pulse"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-card rounded-2xl border border-border shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-teal p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Dental Assistant</p>
                  <p className="text-white/70 text-xs">Online • Instant replies</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "gradient-teal text-white rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.text.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {quickReplies.map((qr) => (
                <button
                  key={qr.key}
                  onClick={() => sendMessage(qr.key)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-border hover:border-dental-teal/30 hover:bg-dental-teal/5 transition-all"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-dental-teal/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl gradient-teal text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
