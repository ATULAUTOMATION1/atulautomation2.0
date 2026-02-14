"use client";

import { motion } from "framer-motion";
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
    { text: "GPT-4", x: "left-[5%]", y: "top-[20%]", delay: 1.5 },
    { text: "Claude", x: "right-[8%]", y: "top-[15%]", delay: 2.0 },
    { text: "Zapier", x: "left-[12%]", y: "bottom-[30%]", delay: 2.5 },
    { text: "Make.com", x: "right-[5%]", y: "bottom-[25%]", delay: 3.0 },
];

export function Hero() {
    return (
        <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-transparent">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/[0.06] rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/[0.05] rounded-full blur-[70px]" />
                <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-accent/[0.03] rounded-full blur-[60px]" />
            </div>

            {/* Animated grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "80px 80px"
                }}
            />

            {/* Floating tech tags */}
            {FLOATING_TAGS.map((tag, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, -8, 0] }}
                    transition={{ opacity: { delay: tag.delay }, y: { delay: tag.delay, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                    className={`absolute ${tag.x} ${tag.y} hidden xl:block`}
                >
                    <span className="text-[10px] font-mono font-semibold text-muted-foreground/40 bg-muted/30 border border-border/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {tag.text}
                    </span>
                </motion.div>
            ))}

            <div className="container-custom relative z-10 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── Left: Copy ── */}
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-orange-500/5 border border-primary/20 rounded-full px-4 py-2 mb-6"
                        >
                            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                            </motion.div>
                            <span className="text-xs font-semibold text-primary tracking-wide uppercase">AI Automation Agency</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.08 }}
                            className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-heading font-extrabold tracking-tight leading-[1.08] mb-6"
                        >
                            Build to{" "}
                            <span className="relative inline-block">
                                <span className="text-primary">Automate</span>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full origin-left"
                                />
                            </span>,
                            <br />
                            Design to{" "}
                            <span className="relative inline-block">
                                <span className="text-primary">Scale</span>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1.0, duration: 0.6 }}
                                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full origin-left"
                                />
                            </span>.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.16 }}
                            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-md"
                        >
                            We deploy AI agents that handle your marketing, sales & support —
                            so you can focus on growth.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.24 }}
                            className="flex flex-col sm:flex-row gap-3 mb-10"
                        >
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
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-x-6 gap-y-3"
                        >
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
                        </motion.div>
                    </div>

                    {/* ── Right: Live workflow card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Animated glow ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-8 rounded-3xl opacity-30"
                                style={{
                                    background: "conic-gradient(from 0deg, transparent, var(--primary), transparent, var(--secondary), transparent)"
                                }}
                            />
                            <div className="absolute -inset-7 bg-background rounded-3xl" />

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
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                        </span>
                                        <span className="text-[10px] font-bold text-green-600 dark:text-green-400 tracking-wider">LIVE</span>
                                    </div>
                                </div>

                                {/* Steps */}
                                <div className="p-4 space-y-1.5">
                                    {WORKFLOW_STEPS.map((step, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + i * 0.12, duration: 0.35 }}
                                        >
                                            <motion.div
                                                animate={{
                                                    borderColor: ["var(--border)", "var(--primary)", "var(--border)"],
                                                }}
                                                transition={{
                                                    delay: 2 + i * 1.4,
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    repeatDelay: WORKFLOW_STEPS.length * 1.4 - 2,
                                                }}
                                                className={`flex items-center gap-3 p-3.5 rounded-xl border border-border bg-gradient-to-r from-muted/30 to-transparent hover:from-muted/50 transition-all border-l-[3px] ${step.accent}`}
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-muted/80 flex items-center justify-center text-lg shrink-0 shadow-sm">
                                                    {step.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-foreground">{step.label}</p>
                                                    <p className="text-[11px] text-muted-foreground">{step.sub}</p>
                                                </div>
                                                <motion.div
                                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                                    transition={{
                                                        delay: 2 + i * 1.4,
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatDelay: WORKFLOW_STEPS.length * 1.4 - 2,
                                                    }}
                                                >
                                                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                                                </motion.div>
                                            </motion.div>

                                            {i < WORKFLOW_STEPS.length - 1 && (
                                                <div className="flex justify-center">
                                                    <motion.div
                                                        initial={{ scaleY: 0 }}
                                                        animate={{ scaleY: 1 }}
                                                        transition={{ delay: 0.6 + i * 0.12 }}
                                                        className="w-px h-2 bg-gradient-to-b from-border to-transparent origin-top"
                                                    />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="px-5 py-3.5 border-t border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
                                    <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                                        <Zap className="h-3 w-3 text-primary" /> Avg. 0.8s / step
                                    </span>
                                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">5 steps · Autopilot</span>
                                </div>
                            </div>

                            {/* Floating cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: [0, -6, 0] }}
                                transition={{ opacity: { delay: 1.2 }, y: { delay: 1.2, duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                                className="absolute -bottom-5 -left-5 bg-card border border-border rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                                        <Zap className="h-4 w-4 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">300% More Leads</p>
                                        <p className="text-[10px] text-muted-foreground">vs manual processing</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: [0, 6, 0] }}
                                transition={{ opacity: { delay: 1.4 }, y: { delay: 1.4, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                                className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                                        <Bot className="h-4 w-4 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">24/7 Active</p>
                                        <p className="text-[10px] text-muted-foreground">Never sleeps</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* ── Stats strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { value: "300%", label: "More Leads", color: "text-primary", gradient: "from-primary/10 to-primary/0" },
                        { value: "150%", label: "Conversion", color: "text-secondary", gradient: "from-secondary/10 to-secondary/0" },
                        { value: "24/7", label: "AI Support", color: "text-accent", gradient: "from-accent/10 to-accent/0" },
                        { value: "50+", label: "AI Modules", color: "text-primary", gradient: "from-primary/10 to-primary/0" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03, y: -2 }}
                            className={`text-center py-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-border/50 backdrop-blur-sm hover:border-border transition-all cursor-default`}
                        >
                            <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
