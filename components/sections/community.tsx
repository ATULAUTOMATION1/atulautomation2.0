"use client";

import { Users, MessageCircle, Globe, ArrowRight } from "lucide-react";

const STATS = [
    { icon: Users, value: "2,400+", label: "Members", color: "text-primary", bg: "bg-primary/8" },
    { icon: MessageCircle, value: "500+", label: "Topics", color: "text-blue-500", bg: "bg-blue-500/8" },
    { icon: Globe, value: "30+", label: "Countries", color: "text-emerald-500", bg: "bg-emerald-500/8" },
];

export function Community() {
    return (
        <section id="community" className="section-padding bg-transparent">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <Users className="h-3.5 w-3.5" /> Community
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Join the <span className="text-primary">Movement</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10">
                        Connect with automation builders, share knowledge, and grow together.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto opacity-0 animate-fade-in-up delay-100">
                        {STATS.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={i} className="py-5 rounded-2xl bg-muted/50 border border-border/50 text-center hover:bg-muted transition-colors">
                                    <Icon className={`h-5 w-5 ${s.color} mx-auto mb-2`} />
                                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{s.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 opacity-0 animate-fade-in-up delay-200">
                        <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="btn-primary group">
                            Join Discord <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <a href="/blog" className="btn-secondary">
                            Visit Blog
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
