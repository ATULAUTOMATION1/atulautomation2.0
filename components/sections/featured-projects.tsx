"use client";

import { useState } from "react";
import { ArrowRight, Zap, ChevronDown, ShoppingCart, MessageSquare, BarChart3, PenTool, ArrowRightLeft, CheckCircle2, TrendingUp, Clock, Users, Target, Workflow, Globe, Mail, Bot, Database, Megaphone, Search } from "lucide-react";

interface ProjectStep {
    step: number;
    title: string;
    desc: string;
    icon: React.ReactNode;
}

interface ProjectChannel {
    name: string;
    role: string;
    icon: React.ReactNode;
}

interface ProjectMetric {
    value: string;
    label: string;
    color: string;
}

interface Project {
    title: string;
    desc: string;
    tags: string[];
    gradient: string;
    accent: string;
    accentColor: string;
    icon: React.ReactNode;
    challenge: string;
    solution: string;
    process: ProjectStep[];
    channels: ProjectChannel[];
    metrics: ProjectMetric[];
    timeline: string;
    industry: string;
}

const PROJECTS: Project[] = [
    {
        title: "AI-Powered E-Commerce Assistant",
        desc: "Built a conversational commerce bot that increased sales by 180% for a fashion brand.",
        tags: ["GPT-4", "Shopify", "WhatsApp"],
        gradient: "from-primary/10 via-primary/5 to-transparent",
        accent: "border-l-primary",
        accentColor: "text-primary",
        icon: <ShoppingCart className="h-5 w-5" />,
        challenge: "High cart abandonment rate (78%) and zero after-hours customer support.",
        solution: "Deployed a GPT-4 powered WhatsApp bot that engages customers post-browse, recommends products, and recovers abandoned carts automatically.",
        process: [
            { step: 1, title: "Customer Browses Store", desc: "Shopify tracks browsing behavior, wishlist additions, and cart activity via pixel events.", icon: <Globe className="h-4 w-4" /> },
            { step: 2, title: "AI Triggers Engagement", desc: "If cart is abandoned for 30 min, the bot sends a personalized WhatsApp message.", icon: <Bot className="h-4 w-4" /> },
            { step: 3, title: "Conversational Selling", desc: "GPT-4 handles natural language queries — size guides, color options, and delivery estimates.", icon: <MessageSquare className="h-4 w-4" /> },
            { step: 4, title: "Checkout & Upsell", desc: "Bot sends secure Shopify checkout link with 1-click payment.", icon: <ShoppingCart className="h-4 w-4" /> },
            { step: 5, title: "Post-Purchase Nurture", desc: "Automated delivery tracking, review requests, and loyalty program enrollment.", icon: <Mail className="h-4 w-4" /> },
        ],
        channels: [
            { name: "WhatsApp Business API", role: "Primary interaction channel", icon: <MessageSquare className="h-4 w-4 text-green-500" /> },
            { name: "Shopify Webhooks", role: "Real-time cart tracking", icon: <ShoppingCart className="h-4 w-4 text-blue-500" /> },
            { name: "OpenAI GPT-4 API", role: "Product recommendations", icon: <Bot className="h-4 w-4 text-violet-500" /> },
            { name: "Stripe", role: "Secure in-chat checkout", icon: <CheckCircle2 className="h-4 w-4 text-primary" /> },
        ],
        metrics: [
            { value: "180%", label: "Sales Increase", color: "text-primary" },
            { value: "62%", label: "Cart Recovery", color: "text-emerald-500" },
            { value: "< 3s", label: "Response Time", color: "text-blue-500" },
            { value: "24/7", label: "Availability", color: "text-violet-500" },
        ],
        timeline: "4 Weeks",
        industry: "Fashion E-Commerce",
    },
    {
        title: "Multi-Channel CRM Automation",
        desc: "Unified customer data from 6 platforms into a single intelligent pipeline.",
        tags: ["HubSpot", "Zapier", "Webhooks"],
        gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
        accent: "border-l-blue-500",
        accentColor: "text-blue-500",
        icon: <Database className="h-5 w-5" />,
        challenge: "Customer data was scattered across 6 platforms causing duplicate entries and missed follow-ups.",
        solution: "Built a centralized automation hub that syncs all channels into HubSpot CRM in real-time, with AI-powered lead scoring.",
        process: [
            { step: 1, title: "Lead Capture", desc: "Incoming leads from website forms, WhatsApp, and DM are captured by Zapier.", icon: <Target className="h-4 w-4" /> },
            { step: 2, title: "De-duplication", desc: "AI checks for existing contacts and merges duplicates.", icon: <Database className="h-4 w-4" /> },
            { step: 3, title: "Lead Scoring", desc: "Each lead is scored (1-100) based on engagement and intent.", icon: <BarChart3 className="h-4 w-4" /> },
            { step: 4, title: "Smart Routing", desc: "Hot leads get instant Slack alerts to sales. Others get nurtured.", icon: <ArrowRightLeft className="h-4 w-4" /> },
            { step: 5, title: "Pipeline Automation", desc: "Deal stages flow through HubSpot automatically.", icon: <Workflow className="h-4 w-4" /> },
        ],
        channels: [
            { name: "HubSpot CRM", role: "Central database", icon: <Database className="h-4 w-4 text-orange-500" /> },
            { name: "Zapier", role: "Data middleware", icon: <Workflow className="h-4 w-4 text-blue-500" /> },
            { name: "Slack", role: "Real-time alerts", icon: <MessageSquare className="h-4 w-4 text-purple-500" /> },
            { name: "Calendly", role: "Auto-scheduling", icon: <Clock className="h-4 w-4 text-green-500" /> },
        ],
        metrics: [
            { value: "6→1", label: "Platforms Unified", color: "text-blue-500" },
            { value: "45%", label: "Faster Follow-up", color: "text-emerald-500" },
            { value: "0", label: "Duplicate Leads", color: "text-primary" },
            { value: "3.2x", label: "Conversion Rate", color: "text-violet-500" },
        ],
        timeline: "6 Weeks",
        industry: "B2B SaaS",
    },
    {
        title: "Real Estate Lead Qualifier",
        desc: "AI agent that qualifies leads from Facebook Ads and schedules property tours automatically.",
        tags: ["Meta Ads", "AI Agent", "Calendar"],
        gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
        accent: "border-l-violet-500",
        accentColor: "text-violet-500",
        icon: <Target className="h-5 w-5" />,
        challenge: "Agency spending heavily on ads but sales team wasting 70% of time on unqualified leads.",
        solution: "Deployed an AI qualification funnel that engages ad respondents, scores them, and books tours for hot prospects.",
        process: [
            { step: 1, title: "Ad Click Engagement", desc: "Clicks on ads trigger instant AI greeting on WhatsApp.", icon: <Megaphone className="h-4 w-4" /> },
            { step: 2, title: "Smart Qualification", desc: "Bot asks budget, location, and timeline in natural language.", icon: <Bot className="h-4 w-4" /> },
            { step: 3, title: "AI Lead Scoring", desc: "Leads scored Hot/Warm/Cold based on answers.", icon: <BarChart3 className="h-4 w-4" /> },
            { step: 4, title: "Auto Tour Booking", desc: "Hot leads get Calendly link. Agent gets prep sheet.", icon: <Clock className="h-4 w-4" /> },
            { step: 5, title: "Nurture", desc: "Warm leads listed in drip campaign. Cold leads retargeted.", icon: <Mail className="h-4 w-4" /> },
        ],
        channels: [
            { name: "Meta Ads", role: "Lead generation", icon: <Megaphone className="h-4 w-4 text-blue-600" /> },
            { name: "WhatsApp", role: "Conversational qualification", icon: <MessageSquare className="h-4 w-4 text-green-500" /> },
            { name: "Google Calendar", role: "Tour scheduling", icon: <Clock className="h-4 w-4 text-blue-500" /> },
            { name: "Google Sheets", role: "Performance reporting", icon: <BarChart3 className="h-4 w-4 text-emerald-500" /> },
        ],
        metrics: [
            { value: "34%", label: "Qualified Leads", color: "text-violet-500" },
            { value: "< 30s", label: "First Response", color: "text-emerald-500" },
            { value: "4.5x", label: "ROI on Ad Spend", color: "text-primary" },
            { value: "70%", label: "Time Saved", color: "text-blue-500" },
        ],
        timeline: "3 Weeks",
        industry: "Real Estate",
    },
    {
        title: "Content Factory Pipeline",
        desc: "Automated blog writing, SEO optimization, and social media distribution.",
        tags: ["Claude", "WordPress", "Buffer"],
        gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
        accent: "border-l-emerald-500",
        accentColor: "text-emerald-500",
        icon: <PenTool className="h-5 w-5" />,
        challenge: "Manual publishing was inconsistent and time-consuming (4+ hours per article).",
        solution: "Built an end-to-end pipeline: AI researches, writes SEO articles, publishes to WP, and schedules social posts.",
        process: [
            { step: 1, title: "Topic Research", desc: "AI scans trends to identify high-opportunity topics.", icon: <Search className="h-4 w-4" /> },
            { step: 2, title: "Content Generation", desc: "Claude writes SEO-optimized draft with internal links.", icon: <PenTool className="h-4 w-4" /> },
            { step: 3, title: "Optimization", desc: "Automated checks for readability and keyword density.", icon: <BarChart3 className="h-4 w-4" /> },
            { step: 4, title: "Publishing", desc: "Auto-publish to WordPress with images and tags.", icon: <Globe className="h-4 w-4" /> },
            { step: 5, title: "Distribution", desc: "Buffer schedules posts for Twitter, LinkedIn, etc.", icon: <Megaphone className="h-4 w-4" /> },
        ],
        channels: [
            { name: "Claude AI", role: "Content generation", icon: <Bot className="h-4 w-4 text-violet-500" /> },
            { name: "WordPress", role: "CMS publishing", icon: <Globe className="h-4 w-4 text-blue-500" /> },
            { name: "Buffer", role: "Social distribution", icon: <Megaphone className="h-4 w-4 text-orange-500" /> },
            { name: "Search Console", role: "Indexing & tracking", icon: <Search className="h-4 w-4 text-green-500" /> },
        ],
        metrics: [
            { value: "15", label: "Articles/Week", color: "text-emerald-500" },
            { value: "85%", label: "Time Saved", color: "text-primary" },
            { value: "320%", label: "Organic Traffic", color: "text-blue-500" },
            { value: "#1", label: "Rankings", color: "text-violet-500" },
        ],
        timeline: "5 Weeks",
        industry: "Digital Media",
    },
];

export function FeaturedProjects() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section id="projects" className="section-padding bg-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />

            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <Zap className="h-3.5 w-3.5" /> Our Work
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Real results from real automation deployments. Click to explore.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {PROJECTS.map((p, i) => {
                        const isExpanded = expandedIndex === i;
                        return (
                            <div
                                key={i}
                                className={`bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 relative border-l-[3px] opacity-0 animate-fade-in-up delay-100 ${p.accent} ${isExpanded ? "shadow-2xl md:col-span-2 border-primary/30" : "hover:shadow-xl hover:border-primary/20 cursor-pointer"}`}
                            >
                                {/* Hover/active gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-500 pointer-events-none`} />

                                {/* Card Header */}
                                <div
                                    className="relative z-10 p-7 cursor-pointer group"
                                    onClick={() => toggleExpand(i)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl bg-muted/70 flex items-center justify-center ${p.accentColor} shrink-0`}>
                                                {p.icon}
                                            </div>
                                            <div>
                                                <h3 className={`text-lg font-bold leading-tight transition-colors ${isExpanded ? p.accentColor : "group-hover:text-primary"}`}>{p.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-semibold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{p.industry}</span>
                                                    <span className="text-[10px] text-muted-foreground">· {p.timeline}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isExpanded ? "bg-primary/10 text-primary rotate-180" : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {p.tags.map((tag, j) => (
                                            <span key={j} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-muted/70 text-muted-foreground border border-border/50">
                                                {tag}
                                            </span>
                                        ))}
                                        {!isExpanded && (
                                            <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${p.accentColor} bg-muted/50 border border-border/50 flex items-center gap-1`}>
                                                Click to explore <ArrowRight className="h-3 w-3" />
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="relative z-10 animate-fade-in-up">
                                        <div className="px-7 pb-8 space-y-8">
                                            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                                            {/* Metrics Strip */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {p.metrics.map((m, mi) => (
                                                    <div key={mi} className="text-center py-4 rounded-xl bg-muted/40 border border-border/50">
                                                        <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                                                        <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{m.label}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Challenge & Solution */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-5">
                                                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">⚡ The Challenge</p>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">{p.challenge}</p>
                                                </div>
                                                <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-5">
                                                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">✅ Our Solution</p>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">{p.solution}</p>
                                                </div>
                                            </div>

                                            {/* Process Steps */}
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5 flex items-center gap-2">
                                                    <Workflow className="h-4 w-4 text-primary" /> How It Works
                                                </h4>
                                                <div className="space-y-3">
                                                    {p.process.map((step, si) => (
                                                        <div key={si} className="flex items-start gap-4 group/step">
                                                            <div className="flex flex-col items-center shrink-0">
                                                                <div className={`w-9 h-9 rounded-xl border-2 border-border flex items-center justify-center ${p.accentColor} bg-card group-hover/step:border-primary/40 transition-colors`}>
                                                                    {step.icon}
                                                                </div>
                                                                {si < p.process.length - 1 && (
                                                                    <div className="w-px h-6 bg-gradient-to-b from-border to-transparent mt-1" />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 pb-2">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className={`text-[10px] font-bold ${p.accentColor} bg-muted/50 px-1.5 py-0.5 rounded`}>STEP {step.step}</span>
                                                                    <h5 className="text-sm font-bold text-foreground">{step.title}</h5>
                                                                </div>
                                                                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Channels */}
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                                    <Zap className="h-4 w-4 text-primary" /> Channels & Tools Used
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {p.channels.map((ch, ci) => (
                                                        <div key={ci} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-border transition-colors">
                                                            <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0 shadow-sm">
                                                                {ch.icon}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold text-foreground">{ch.name}</p>
                                                                <p className="text-xs text-muted-foreground leading-relaxed">{ch.role}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border/50">
                                                <a href="#contact" className="btn-primary group text-sm">
                                                    Want Similar Results? <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                </a>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3" /> Delivered in {p.timeline} · {p.industry}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
