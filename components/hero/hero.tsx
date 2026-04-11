
import { ArrowRight, Play, TrendingUp, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { WorkflowMockup } from "./workflow-mockup";

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
                        {/* Title */}
                        <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-heading font-extrabold tracking-tight leading-[1.08] mb-6">
                            AI Automation <span className="text-primary">Agency</span>
                            <br />
                            for Modern <span className="text-primary">Business</span>.
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-md">
                            We build intelligent AI agents, chatbots & workflow automation
                            that handle your marketing, sales & support 24/7.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mb-10 opacity-0 animate-fade-in-up delay-150">
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
                                { label: "USA, UK & Global Clients", icon: Zap },
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

                    <div className="relative hidden lg:block animate-fade-in-up delay-300">
                        <WorkflowMockup />
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
