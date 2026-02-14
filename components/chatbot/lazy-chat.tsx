"use client";

import dynamic from "next/dynamic";

const ChatWidgetInner = dynamic(
    () => import("@/components/chatbot/chat-widget").then(mod => ({ default: mod.ChatWidget })),
    { ssr: false }
);

export function LazyChat() {
    return <ChatWidgetInner />;
}
