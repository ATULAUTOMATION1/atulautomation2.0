"use client";

import { useState } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";

export function WhatsAppBotDemo() {
    const [messages, setMessages] = useState([
        { role: "bot", content: "👋 Hi there! I'm your AI assistant. How can I help you automate your business today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages(prev => [...prev, { role: "user", content: input }]);
        setInput("");
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                role: "bot",
                content: "That sounds like a great use case! I can set up a workflow to handle that automatically. Would you like to see a demo?"
            }]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[400px] border border-border rounded-xl overflow-hidden bg-background">
            <div className="bg-primary/10 p-4 border-b border-border flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="font-bold text-sm">Automated Assistant</h4>
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                : 'bg-card border border-border rounded-bl-none'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-card border border-border p-3 rounded-lg rounded-bl-none">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-border bg-background flex space-x-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-muted border-none rounded-full px-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                />
                <button
                    onClick={handleSend}
                    className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                    <Send className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
