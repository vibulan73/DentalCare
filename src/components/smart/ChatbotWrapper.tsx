"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("@/components/smart/Chatbot"), {
  ssr: false,
});

export default function ChatbotWrapper() {
  return <Chatbot />;
}
