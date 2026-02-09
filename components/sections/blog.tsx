"use client";

import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";

const BLOG_POSTS = [
    {
        title: "Why 2026 is the Year of Autonomous Agents",
        excerpt: "Discover how multi-agent systems are replacing traditional SaaS tools and reshaping the enterprise landscape.",
        date: "Feb 10, 2026",
        author: "Atul K.",
        category: "Industry Trends",
        readTime: "5 min read"
    },
    {
        title: "Dropshipping on Autopilot: A Case Study",
        excerpt: "How we used custom AI workflows to scale a Shopify store from $0 to $10k/month without manual intervention.",
        date: "Feb 05, 2026",
        author: "Sarah J.",
        category: "Case Study",
        readTime: "8 min read"
    },
    {
        title: "Prompt Engineering vs. Agent Orchestration",
        excerpt: "Stop writing better prompts and start building smarter systems. The shift from single-turn to multi-step reasoning.",
        date: "Jan 28, 2026",
        author: "Dev Team",
        category: "Technical Guide",
        readTime: "12 min read"
    }
];

export function Blog() {
    return (
        <section id="blog" className="section-padding bg-muted/20">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">Insights & <span className="text-primary">Intelligence</span></h2>
                    <p className="text-muted-foreground text-lg">
                        Deep dives into the future of work, automation strategies, and technical breakdowns.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <article className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg flex flex-col h-full group">
                                <div className="aspect-video bg-muted relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
                                        <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {post.date}</span>
                                        <span className="flex items-center"><User className="h-3 w-3 mr-1" /> {post.author}</span>
                                    </div>

                                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-border flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{post.readTime}</span>
                                        <Link href="#" className="font-semibold text-primary flex items-center hover:underline">
                                            Read Article <ArrowRight className="h-4 w-4 ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
