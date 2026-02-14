"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, ArrowDown, Minus, RotateCcw } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
    timestamp: Date;
}

function formatBotMessage(text: string) {
    const lines = text.split("\n");
    return lines.map((line, i) => {
        // Bold
        let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Empty line
        if (formatted.trim() === "") return <br key={i} />;
        // Bullet points (- or •)
        if (formatted.trim().startsWith("- ") || formatted.trim().startsWith("• ")) {
            return (
                <span key={i} className="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                    dangerouslySetInnerHTML={{ __html: formatted.replace(/^[\s]*[-•]\s/, '') }} />
            );
        }
        return <span key={i} className="block" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
}

const WELCOME_MESSAGE: Message = {
    id: "welcome",
    role: "bot",
    content: `Hey there! 👋 I'm the **Atul Automation** AI assistant.\n\nI know everything about our services, pricing, process, and how AI automation can transform your business.\n\nAsk me anything — I'm here to help!`,
    timestamp: new Date(),
};

const SUGGESTED_QUESTIONS = [
    "What services do you offer?",
    "Tell me about pricing",
    "How can AI help my business?",
    "What's your process?",
];

// Generate a unique session ID per browser tab
function getSessionId() {
    if (typeof window === "undefined") return "server";
    let sid = sessionStorage.getItem("atul-chat-session");
    if (!sid) {
        sid = `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        sessionStorage.setItem("atul-chat-session", sid);
    }
    return sid;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        setMessages([{
            ...WELCOME_MESSAGE,
            timestamp: new Date()
        }]);
    }, []);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, scrollToBottom]);

    useEffect(() => {
        if (isOpen && !isMinimized) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, isMinimized]);

    useEffect(() => {
        if (!hasInteracted) {
            const timer = setTimeout(() => setUnreadCount(1), 5000);
            return () => clearTimeout(timer);
        }
    }, [hasInteracted]);

    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container) return;
        const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 60;
        setShowScrollDown(!isAtBottom);
    };

    const sendMessage = async (text: string) => {
        if (!text.trim() || isTyping) return;

        const userMsg: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: text.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);
        setHasInteracted(true);
        setUnreadCount(0);
        setShowSuggestions(false);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text.trim(),
                    sessionId: getSessionId(),
                }),
            });

            const data = await response.json();

            const botMsg: Message = {
                id: `bot-${Date.now()}`,
                role: "bot",
                content: data.reply || "Sorry, I couldn't process that. Please try again!",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg: Message = {
                id: `bot-${Date.now()}`,
                role: "bot",
                content: "Oops! I'm having trouble connecting. Please try again, or reach us at **hello@atulautomation.com** 📧",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const resetChat = () => {
        setMessages([WELCOME_MESSAGE]);
        setShowSuggestions(true);
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("atul-chat-session");
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
        setUnreadCount(0);
        setHasInteracted(true);
    };

    return (
        <>
            {/* ── Chat Window ── */}
            {isOpen && !isMinimized && (
                <div className="fixed bottom-24 right-5 z-[9999] w-[400px] max-w-[calc(100vw-2.5rem)] h-[580px] max-h-[calc(100vh-8rem)] flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-orange-500 px-5 py-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Atul AI Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-white/80 text-[11px]">Powered by Gemini AI</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={resetChat} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Reset chat" title="New conversation">
                                <RotateCcw className="h-3.5 w-3.5 text-white/80" />
                            </button>
                            <button onClick={() => setIsMinimized(true)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Minimize">
                                <Minus className="h-4 w-4 text-white/80" />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Close chat">
                                <X className="h-4 w-4 text-white/80" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        ref={messagesContainerRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth relative bg-background"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2.5 animate-fade-in-up ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "bot" && (
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                )}

                                <div className={`max-w-[82%] ${msg.role === "user" ? "order-1" : ""}`}>
                                    <div className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${msg.role === "user"
                                        ? "bg-primary text-white rounded-br-md"
                                        : "bg-muted/60 border border-border/50 text-foreground rounded-bl-md"
                                        }`}>
                                        {msg.role === "bot" ? formatBotMessage(msg.content) : msg.content}
                                    </div>
                                    <p className={`text-[10px] text-muted-foreground mt-1 ${msg.role === "user" ? "text-right" : ""}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>

                                {msg.role === "user" && (
                                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1 order-2">
                                        <User className="h-3.5 w-3.5 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Suggested Questions (shown after welcome) */}
                        {showSuggestions && messages.length === 1 && (
                            <div className="flex flex-wrap gap-1.5 pl-9 animate-fade-in-up">
                                {SUGGESTED_QUESTIONS.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(q)}
                                        className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/15 hover:bg-primary/15 hover:border-primary/30 transition-all cursor-pointer active:scale-95"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex gap-2.5 animate-fade-in-up">
                                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <div className="bg-muted/60 border border-border/50 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Scroll to bottom */}
                    {showScrollDown && (
                        <button
                            onClick={scrollToBottom}
                            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white shadow-lg flex items-center justify-center z-10 animate-bounce"
                        >
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    )}

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-border bg-card shrink-0">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything about Atul Automation..."
                                className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                                disabled={isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 active:scale-95"
                                aria-label="Send message"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-center mt-2">
                            AI-powered by Gemini • atulautomation.in
                        </p>
                    </form>
                </div>
            )}

            {/* ── Minimized Bar ── */}
            {isOpen && isMinimized && (
                <button
                    onClick={() => setIsMinimized(false)}
                    className="fixed bottom-24 right-5 z-[9999] bg-gradient-to-r from-primary to-orange-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-3 hover:shadow-xl transition-all cursor-pointer animate-fade-in-up"
                >
                    <Bot className="h-5 w-5" />
                    <span className="text-sm font-semibold">Atul AI — {messages.length - 1} messages</span>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </button>
            )}

            {/* ── Floating Chat Button ── */}
            <button
                onClick={toggleChat}
                className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen
                    ? "bg-muted border border-border text-foreground hover:bg-muted/80"
                    : "bg-gradient-to-br from-primary to-orange-500 text-white hover:shadow-xl hover:shadow-primary/25"
                    }`}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <MessageCircle className="h-5 w-5" />
                )}

                {!isOpen && unreadCount > 0 && (
                    <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-bounce"
                    >
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* ── Tooltip (first visit) ── */}
            {!isOpen && !hasInteracted && (
                <div
                    className="fixed bottom-8 right-[5.5rem] z-[9998] bg-card border border-border rounded-xl shadow-lg px-4 py-2.5 max-w-[220px] cursor-pointer animate-fade-in"
                    onClick={toggleChat}
                >
                    <p className="text-xs font-medium text-foreground">
                        👋 Hey! Ask me anything about AI automation
                    </p>
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-[-45deg]" />
                </div>
            )}
        </>
    );
}
