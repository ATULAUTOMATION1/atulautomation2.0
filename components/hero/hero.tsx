"use client";

import { ArrowRight, Play, CheckCircle, Sparkles, Zap, Bot, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";

const WORKFLOW_STEPS = [
    { icon: "📧", label: "Incoming Lead", sub: "Webhook triggers", accent: "border-l-blue-500" },
    { icon: "🤖", label: "AI Qualifies", sub: "GPT-4 scoring", accent: "border-l-violet-500" },
    { icon: "📊", label: "Score & Route", sub: "CRM assignment", accent: "border-l-primary" },
    { icon: "💬", label: "Auto-Reply", sub: "Personalised email", accent: "border-l-emerald-500" },
    { icon: "✅", label: "CRM Updated", sub: "Pipeline sync", accent: "border-l-amber-500" },
];

const FLOATING_TAGS = [
    { text: "GPT-4", x: "left-[5%]", y: "top-[20%]" },
    { text: "Claude", x: "right-[8%]", y: "top-[15%]" },
    { text: "Zapier", x: "left-[12%]", y: "bottom-[30%]" },
    { text: "Make.com", x: "right-[5%]", y: "bottom-[25%]" },
];

export function Hero() {
    return (
        <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-transparent">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/[0.06] rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/[0.05] rounded-full blur-[70px]" />
                <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-accent/[0.03] rounded-full blur-[60px]" />
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "80px 80px"
                }}
            />

            {/* Static Floating Tags (Visible immediately) */}
            {FLOATING_TAGS.map((tag, i) => (
                <div key={i} className={`absolute ${tag.x} ${tag.y} hidden xl:block opacity-70`}>
                    <span className="text-[10px] font-mono font-semibold text-muted-foreground/40 bg-muted/30 border border-border/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {tag.text}
                    </span>
                </div>
            ))}

            <div className="container-custom relative z-10 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── Left: Copy ── */}
                    <div className="max-w-xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-orange-500/5 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            <span className="text-xs font-semibold text-primary tracking-wide uppercase">AI Automation Agency</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-heading font-extrabold tracking-tight leading-[1.08] mb-6 opacity-0 animate-fade-in-up delay-100">
                            Build to <span className="text-primary">Automate</span>,
                            <br />
                            Design to <span className="text-primary">Scale</span>.
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-md opacity-0 animate-fade-in-up delay-200">
                            We deploy AI agents that handle your marketing, sales & support —
                            so you can focus on growth.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mb-10 opacity-0 animate-fade-in-up delay-300">
                            <Link href="#contact" className="btn-primary group shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:shadow-xl transition-all">
                                Start Automating
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link href="#modules-demo" className="btn-secondary group relative overflow-hidden">
                                <span className="relative z-10 flex items-center">
                                    <Play className="mr-2 h-4 w-4 fill-current opacity-70 group-hover:text-primary transition-colors" />
                                    Watch Demo
                                </span>
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 opacity-0 animate-fade-in-up delay-500">
                            {[
                                { label: "200+ Automations", icon: Zap },
                                { label: "24/7 AI Support", icon: Shield },
                                { label: "Free Strategy Call", icon: TrendingUp },
                            ].map((item, i) => (
                                <span key={i} className="flex items-center gap-2 text-xs text-muted-foreground font-medium bg-muted/40 px-3 py-1.5 rounded-full border border-border/50">
                                    <item.icon className="h-3 w-3 text-accent" />
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Standard Card ── */}
                    <div className="relative hidden lg:block animate-fade-in-up delay-300">
                        <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                            {/* Window bar */}
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-gradient-to-r from-muted/50 to-muted/20">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                                    </div>
                                    <span className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">lead-pipeline.flow</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 tracking-wider">LIVE</span>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="p-4 space-y-1.5">
                                {WORKFLOW_STEPS.map((step, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border border-border bg-gradient-to-r from-muted/30 to-transparent border-l-[3px] ${step.accent}`}>
                                        <div className="w-10 h-10 rounded-lg bg-muted/80 flex items-center justify-center text-lg shrink-0 shadow-sm">
                                            {step.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground">{step.label}</p>
                                            <p className="text-[11px] text-muted-foreground">{step.sub}</p>
                                        </div>
                                        <CheckCircle className="h-4 w-4 text-accent shrink-0 opacity-50" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Stats strip ── */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0 animate-fade-in-up delay-500">
                    {[
                        { value: "300%", label: "More Leads", color: "text-primary", gradient: "from-primary/10 to-primary/0" },
                        { value: "150%", label: "Conversion", color: "text-secondary", gradient: "from-secondary/10 to-secondary/0" },
                        { value: "24/7", label: "AI Support", color: "text-accent", gradient: "from-accent/10 to-accent/0" },
                        { value: "50+", label: "AI Modules", color: "text-primary", gradient: "from-primary/10 to-primary/0" },
                    ].map((stat, i) => (
                        <div key={i} className={`text-center py-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-border/50 backdrop-blur-sm`}>
                            <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
