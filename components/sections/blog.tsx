"use client";

import { ArrowRight, BookOpen, Clock } from "lucide-react";

const POSTS = [
    {
        title: "How AI Chatbots are Revolutionizing Customer Service",
        excerpt: "Discover how businesses are using AI chatbots to provide instant support and increase customer satisfaction.",
        category: "AI Trends",
        date: "Jan 2026",
        readTime: "5 min",
        color: "text-primary",
        gradient: "from-primary/10 to-transparent",
        accent: "border-t-primary",
    },
    {
        title: "Top 10 Workflow Automations That Save 20+ Hours",
        excerpt: "We break down the most impactful automations you can deploy today to reclaim your time.",
        category: "Automation",
        date: "Jan 2026",
        readTime: "7 min",
        color: "text-blue-500",
        gradient: "from-blue-500/10 to-transparent",
        accent: "border-t-blue-500",
    },
    {
        title: "The Future of No-Code AI Agents for SMBs",
        excerpt: "No-code platforms are making AI accessible to every business. Here's what's coming next.",
        category: "Industry",
        date: "Dec 2025",
        readTime: "6 min",
        color: "text-violet-500",
        gradient: "from-violet-500/10 to-transparent",
        accent: "border-t-violet-500",
    }
];

export function Blog() {
    return (
        <section id="blog" className="section-padding bg-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />

            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <BookOpen className="h-3.5 w-3.5" /> Blog
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Latest <span className="text-primary">Insights</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Stay ahead with expert takes on AI, automation, and digital growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {POSTS.map((post, i) => (
                        <article
                            key={i}
                            className={`group bg-card border border-border border-t-[3px] ${post.accent} rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer relative opacity-0 animate-fade-in-up delay-${(i + 1) * 100}`}
                        >
                            {/* Hover gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${post.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="p-7 relative z-10">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className={`text-[11px] font-bold ${post.color} bg-muted/50 px-2.5 py-1 rounded-full`}>{post.category}</span>
                                    <span className="text-muted-foreground/30">·</span>
                                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

                                <div className="flex items-center justify-between pt-5 border-t border-border/50">
                                    <span className="text-xs text-muted-foreground">{post.date}</span>
                                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
