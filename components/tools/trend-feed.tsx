"use client";

import { TrendingUp, Clock, ArrowRight } from "lucide-react";

export function TrendFeed() {
    const trends = [
        { id: 1, title: "GPT-5 Rumors: New Agent Capabilities", tag: "AI Models", time: "2h ago" },
        { id: 2, title: "Zapier Releases Natural Language Actions", tag: "Integration", time: "5h ago" },
        { id: 3, title: "How to Automate Customer Support in 2026", tag: "Guide", time: "1d ago" },
        { id: 4, title: "Python vs Node.js for backend automation?", tag: "Discussion", time: "1d ago" },
    ];

    return (
        <div className="h-[400px] border border-border rounded-xl bg-background flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                <h3 className="font-bold flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                    Automation Trends
                </h3>
                <span className="text-xs text-green-500 animate-pulse font-mono">● LIVE</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {trends.map((item) => (
                    <div key={item.id} className="group p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                                {item.tag}
                            </span>
                            <span className="text-[10px] text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" /> {item.time}
                            </span>
                        </div>
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors leading-snug">
                            {item.title}
                        </h4>
                    </div>
                ))}
                {/* Placeholder skeleton for "loading" look at bottom */}
                <div className="space-y-2 opacity-30">
                    <div className="h-16 bg-muted rounded-lg w-full animate-pulse" />
                </div>
            </div>

            <div className="p-3 border-t border-border text-center">
                <button className="text-xs font-semibold text-primary hover:underline flex items-center justify-center w-full">
                    View Full Feed <ArrowRight className="h-3 w-3 ml-1" />
                </button>
            </div>
        </div>
    );
}
