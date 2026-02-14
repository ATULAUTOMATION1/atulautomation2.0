"use client";

import Link from "next/link";
import { ArrowRight, Cpu, MessageSquare, Zap, BarChart, Building, Users } from "lucide-react";

const services = [
    { icon: Cpu, title: "AI Automation", description: "Self-learning algorithms that adapt to your business and streamline complex processes.", href: "/capabilities/ai-agents", color: "text-primary", bg: "bg-primary/8", border: "group-hover:border-primary/40", glow: "group-hover:shadow-primary/10" },
    { icon: MessageSquare, title: "Intelligent Chatbots", description: "24/7 conversational bots with natural language processing that never miss a beat.", href: "/capabilities/chatbots", color: "text-blue-500", bg: "bg-blue-500/8", border: "group-hover:border-blue-500/40", glow: "group-hover:shadow-blue-500/10" },
    { icon: Zap, title: "Workflow Automation", description: "Connect apps and data sources into a seamless pipeline that runs on autopilot.", href: "/capabilities/workflow", color: "text-emerald-500", bg: "bg-emerald-500/8", border: "group-hover:border-emerald-500/40", glow: "group-hover:shadow-emerald-500/10" },
    { icon: BarChart, title: "AI Marketing", description: "Data-driven campaigns across Meta & Google optimized for maximum ROI.", href: "/capabilities/marketing", color: "text-violet-500", bg: "bg-violet-500/8", border: "group-hover:border-violet-500/40", glow: "group-hover:shadow-violet-500/10" },
    { icon: Building, title: "Real Estate Services", description: "Automated lead capture and virtual tours to sell properties 3x faster.", href: "/capabilities/real-estate", color: "text-amber-600", bg: "bg-amber-500/8", border: "group-hover:border-amber-500/40", glow: "group-hover:shadow-amber-500/10" },
    { icon: Users, title: "CRM Solutions", description: "Centralize customer data and automate follow-ups for higher retention.", href: "/capabilities/crm", color: "text-rose-500", bg: "bg-rose-500/8", border: "group-hover:border-rose-500/40", glow: "group-hover:shadow-rose-500/10" },
];

export function Services() {
    return (
        <section id="services" className="section-padding bg-transparent relative">
            {/* Section accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />

            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <Zap className="h-3.5 w-3.5" /> What We Do
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Our <span className="text-primary">Capabilities</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        A full suite of digital transformation tools to scale faster.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className="opacity-0 animate-fade-in-up delay-100">
                                <Link href={s.href} className={`group flex flex-col h-full p-7 bg-card border border-border rounded-2xl ${s.border} ${s.glow} hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                                    {/* Hover gradient background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={`h-7 w-7 ${s.color}`} />
                                        </div>
                                        <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{s.description}</p>
                                        <span className={`text-sm font-semibold ${s.color} flex items-center gap-1.5 group-hover:gap-2.5 transition-all`}>
                                            Learn More <ArrowRight className="h-3.5 w-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
