"use client";

import dynamic from "next/dynamic";
import { useChatbotReveal } from "@/hooks/useChatbotReveal";

const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ChatbotReveal() {
  const show = useChatbotReveal();
  return show ? <Chatbot /> : null;
}
