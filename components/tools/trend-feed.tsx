"use client";

import { useState } from "react";
import { TrendingUp, Clock, ArrowRight, ExternalLink, MessageSquare, Heart, Flame, Sparkles, Bot, Zap, Code } from "lucide-react";

type Category = "all" | "ai" | "tools" | "guides";

interface TrendItem {
    id: number;
    title: string;
    tag: string;
    tagColor: string;
    category: Category;
    time: string;
    emoji: string;
    hot?: boolean;
    likes: number;
    comments: number;
}

const trends: TrendItem[] = [
    { id: 1, title: "GPT-5 Rumors: New Agent Capabilities", tag: "AI Models", tagColor: "text-purple-400 bg-purple-500/15", category: "ai", time: "2h ago", emoji: "🧠", hot: true, likes: 342, comments: 89 },
    { id: 2, title: "Zapier Releases Natural Language Actions", tag: "Integration", tagColor: "text-blue-400 bg-blue-500/15", category: "tools", time: "5h ago", emoji: "⚡", likes: 218, comments: 42 },
    { id: 3, title: "How to Automate Customer Support in 2026", tag: "Guide", tagColor: "text-emerald-400 bg-emerald-500/15", category: "guides", time: "1d ago", emoji: "📚", likes: 156, comments: 31 },
    { id: 4, title: "Claude 4 vs GPT-5: Which AI Agent Wins?", tag: "AI Models", tagColor: "text-purple-400 bg-purple-500/15", category: "ai", time: "1d ago", emoji: "🤖", hot: true, likes: 521, comments: 134 },
    { id: 5, title: "Make.com Introduces AI Scenario Builder", tag: "Tools", tagColor: "text-cyan-400 bg-cyan-500/15", category: "tools", time: "2d ago", emoji: "🔧", likes: 98, comments: 22 },
    { id: 6, title: "Build an AI Sales Agent in 30 Minutes", tag: "Tutorial", tagColor: "text-orange-400 bg-orange-500/15", category: "guides", time: "2d ago", emoji: "🎯", likes: 287, comments: 67 },
    { id: 7, title: "Autonomous AI Agents: The 2026 Landscape", tag: "Research", tagColor: "text-pink-400 bg-pink-500/15", category: "ai", time: "3d ago", emoji: "🔬", likes: 412, comments: 91 },
];

const CATEGORIES: { id: Category; label: string; icon: typeof TrendingUp }[] = [
    { id: "all", label: "All", icon: Flame },
    { id: "ai", label: "AI", icon: Bot },
    { id: "tools", label: "Tools", icon: Code },
    { id: "guides", label: "Guides", icon: Sparkles },
];

export function TrendFeed() {
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    const filtered = activeCategory === "all" ? trends : trends.filter(t => t.category === activeCategory);

    return (
        <div className="border border-border rounded-2xl bg-card flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-3 border-b border-border bg-muted/30">
                <div className="flex justify-between items-center mb-2.5">
                    <h3 className="font-bold text-sm flex items-center gap-1.5 text-foreground">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Automation Trends
                    </h3>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                    </span>
                </div>
                {/* Category tabs */}
                <div className="flex gap-1">
                    {CATEGORIES.map(cat => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${activeCategory === cat.id
                                    ? "bg-primary text-white"
                                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                    }`}
                            >
                                <Icon className="h-3 w-3" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Feed */}
            <div className="flex-1 overflow-y-auto max-h-[320px] p-2.5 space-y-1.5">
                {filtered.map((item, i) => (
                    <div
                        key={item.id}
                        className="group p-2.5 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all cursor-pointer animate-fade-in"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        <div className="flex items-start gap-2.5">
                            <div className="text-lg mt-0.5">{item.emoji}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.tagColor}`}>
                                        {item.tag}
                                    </span>
                                    {item.hot && (
                                        <span className="text-[9px] font-bold text-orange-400 flex items-center gap-0.5">
                                            <Flame className="h-3 w-3" /> HOT
                                        </span>
                                    )}
                                </div>
                                <h4 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                    {item.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                                    <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {item.time}</span>
                                    <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" /> {item.likes}</span>
                                    <span className="flex items-center gap-0.5"><MessageSquare className="h-3 w-3" /> {item.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-2.5 border-t border-border">
                <button className="w-full text-[11px] font-bold text-primary hover:bg-primary/5 rounded-lg py-1.5 flex items-center justify-center gap-1 transition-colors">
                    View Full Feed <ArrowRight className="h-3 w-3" />
                </button>
            </div>
        </div>
    );
}
