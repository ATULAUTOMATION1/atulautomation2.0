"use client";

import { useState } from "react";
import { ArrowRight, Zap, ChevronDown, ShoppingCart, MessageSquare, BarChart3, PenTool, ArrowRightLeft, CheckCircle2, TrendingUp, Clock, Users, Target, Workflow, Globe, Mail, Bot, Database, Megaphone, FileText, Search, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        challenge: "High cart abandonment rate (78%) and zero after-hours customer support, leading to lost sales from international customers in different time zones.",
        solution: "Deployed a GPT-4 powered WhatsApp bot that engages customers post-browse, recommends products, answers sizing queries, and recovers abandoned carts automatically.",
        process: [
            { step: 1, title: "Customer Browses Store", desc: "Shopify tracks browsing behavior, wishlist additions, and cart activity via pixel events.", icon: <Globe className="h-4 w-4" /> },
            { step: 2, title: "AI Triggers Engagement", desc: "If cart is abandoned for 30 min, the bot sends a personalized WhatsApp message with product suggestions.", icon: <Bot className="h-4 w-4" /> },
            { step: 3, title: "Conversational Selling", desc: "GPT-4 handles natural language queries — size guides, color options, delivery estimates, and discount codes.", icon: <MessageSquare className="h-4 w-4" /> },
            { step: 4, title: "Checkout & Upsell", desc: "Bot sends secure Shopify checkout link with 1-click payment. Suggests complementary items before confirmation.", icon: <ShoppingCart className="h-4 w-4" /> },
            { step: 5, title: "Post-Purchase Nurture", desc: "Automated delivery tracking, review requests, and loyalty program enrollment via WhatsApp.", icon: <Mail className="h-4 w-4" /> },
        ],
        channels: [
            { name: "WhatsApp Business API", role: "Primary customer interaction channel for chat-based selling", icon: <MessageSquare className="h-4 w-4 text-green-500" /> },
            { name: "Shopify Webhooks", role: "Real-time cart, order, and inventory event streaming", icon: <ShoppingCart className="h-4 w-4 text-blue-500" /> },
            { name: "OpenAI GPT-4 API", role: "Natural language understanding and product recommendations", icon: <Bot className="h-4 w-4 text-violet-500" /> },
            { name: "Stripe Payments", role: "Secure in-chat checkout and payment processing", icon: <CheckCircle2 className="h-4 w-4 text-primary" /> },
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
        challenge: "Customer data was scattered across 6 platforms (Gmail, Instagram DMs, WhatsApp, website forms, Calendly, Stripe) causing duplicate entries, missed follow-ups, and zero visibility into lead status.",
        solution: "Built a centralized automation hub that syncs all channels into HubSpot CRM in real-time, with AI-powered lead scoring and automated nurture sequences.",
        process: [
            { step: 1, title: "Lead Capture", desc: "Incoming leads from website forms, WhatsApp, Instagram DMs, and email are captured by Zapier webhooks.", icon: <Target className="h-4 w-4" /> },
            { step: 2, title: "De-duplication & Enrichment", desc: "AI checks for existing contacts, merges duplicates, and enriches profiles with LinkedIn & company data.", icon: <Database className="h-4 w-4" /> },
            { step: 3, title: "Lead Scoring", desc: "Each lead is scored (1-100) based on engagement, company size, budget signals, and intent keywords.", icon: <BarChart3 className="h-4 w-4" /> },
            { step: 4, title: "Smart Routing", desc: "Hot leads (80+) get instant Slack alerts to sales. Warm leads enter email nurture. Cold leads get retargeted.", icon: <ArrowRightLeft className="h-4 w-4" /> },
            { step: 5, title: "Pipeline Automation", desc: "Deal stages, meeting bookings, proposal tracking, and win/loss analysis all flow through HubSpot automatically.", icon: <Workflow className="h-4 w-4" /> },
        ],
        channels: [
            { name: "HubSpot CRM", role: "Central database for all contacts, deals, and pipeline management", icon: <Database className="h-4 w-4 text-orange-500" /> },
            { name: "Zapier + Webhooks", role: "Middleware connecting 6 platforms into a unified data stream", icon: <Workflow className="h-4 w-4 text-blue-500" /> },
            { name: "Slack Notifications", role: "Real-time alerts for hot leads, closed deals, and escalations", icon: <MessageSquare className="h-4 w-4 text-purple-500" /> },
            { name: "Calendly Integration", role: "Auto-scheduling meetings, reminders, and follow-up sequences", icon: <Clock className="h-4 w-4 text-green-500" /> },
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
        challenge: "Real estate agency spending ₹3L/month on Meta Ads but only 8% of leads were genuinely interested — the rest were unqualified or spam. Sales team wasted 70% of their time on dead leads.",
        solution: "Deployed an AI-powered lead qualification funnel that instantly engages ad respondents, asks qualifying questions, scores them, and auto-books tours for hot prospects.",
        process: [
            { step: 1, title: "Ad Click → Instant Engagement", desc: "When someone clicks a Facebook/Instagram property ad, they're instantly greeted by an AI chatbot on WhatsApp.", icon: <Megaphone className="h-4 w-4" /> },
            { step: 2, title: "Smart Qualification", desc: "Bot asks budget range, preferred location, timeline to buy, and loan status — all conversationally in Hindi/English.", icon: <Bot className="h-4 w-4" /> },
            { step: 3, title: "AI Lead Scoring", desc: "Each lead gets a score (Hot/Warm/Cold) based on answers, engagement speed, and ad interaction history.", icon: <BarChart3 className="h-4 w-4" /> },
            { step: 4, title: "Auto Tour Booking", desc: "Hot leads get an instant Calendly link for property tours. Agent gets a prep sheet with lead preferences.", icon: <Clock className="h-4 w-4" /> },
            { step: 5, title: "Nurture & Retarget", desc: "Warm leads enter a drip campaign with new listings. Cold leads get retargeted with different property types on Meta.", icon: <Mail className="h-4 w-4" /> },
        ],
        channels: [
            { name: "Meta Ads (FB + IG)", role: "Lead generation through targeted property ads with lead forms", icon: <Megaphone className="h-4 w-4 text-blue-600" /> },
            { name: "WhatsApp Business", role: "AI chatbot for instant lead qualification and conversation", icon: <MessageSquare className="h-4 w-4 text-green-500" /> },
            { name: "Google Calendar", role: "Automated tour scheduling with agent availability sync", icon: <Clock className="h-4 w-4 text-blue-500" /> },
            { name: "Google Sheets CRM", role: "Lead tracking, scoring dashboard, and sales performance reporting", icon: <BarChart3 className="h-4 w-4 text-emerald-500" /> },
        ],
        metrics: [
            { value: "8→34%", label: "Qualified Leads", color: "text-violet-500" },
            { value: "< 30s", label: "First Response", color: "text-emerald-500" },
            { value: "4.5x", label: "ROI on Ad Spend", color: "text-primary" },
            { value: "70%", label: "Time Saved", color: "text-blue-500" },
        ],
        timeline: "3 Weeks",
        industry: "Real Estate",
    },
    {
        title: "Content Factory Pipeline",
        desc: "Automated blog writing, SEO optimization, and social media distribution for a media company.",
        tags: ["Claude", "WordPress", "Buffer"],
        gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
        accent: "border-l-emerald-500",
        accentColor: "text-emerald-500",
        icon: <PenTool className="h-5 w-5" />,
        challenge: "Media company publishing 3 articles/week manually. Writers spent 4+ hours per article on research, writing, and formatting. Social media posts were inconsistent and not optimized for each platform.",
        solution: "Built an end-to-end content pipeline: AI researches trending topics, writes SEO-optimized articles, formats for WordPress, and auto-distributes platform-specific social posts.",
        process: [
            { step: 1, title: "Topic Research & Planning", desc: "AI scans Google Trends, competitor blogs, and Search Console data to identify high-opportunity keywords and topics.", icon: <Search className="h-4 w-4" /> },
            { step: 2, title: "AI Content Generation", desc: "Claude generates a draft with proper headings, internal links, meta descriptions, and schema markup. Maintains brand voice.", icon: <PenTool className="h-4 w-4" /> },
            { step: 3, title: "SEO Optimization", desc: "Automated keyword density check, readability scoring (Flesch-Kincaid), image alt-text generation, and URL slug optimization.", icon: <BarChart3 className="h-4 w-4" /> },
            { step: 4, title: "WordPress Publishing", desc: "Formatted article is auto-published to WordPress with featured images, categories, tags, and internal linking.", icon: <Globe className="h-4 w-4" /> },
            { step: 5, title: "Social Media Distribution", desc: "Buffer auto-posts platform-specific versions: Twitter threads, LinkedIn carousels, Instagram story snippets, and Facebook posts.", icon: <Megaphone className="h-4 w-4" /> },
        ],
        channels: [
            { name: "Claude AI (Anthropic)", role: "Long-form content generation with brand voice consistency", icon: <Bot className="h-4 w-4 text-violet-500" /> },
            { name: "WordPress REST API", role: "Automated publishing with SEO plugins (Yoast/RankMath)", icon: <Globe className="h-4 w-4 text-blue-500" /> },
            { name: "Buffer / Hootsuite", role: "Scheduled multi-platform social media distribution", icon: <Megaphone className="h-4 w-4 text-orange-500" /> },
            { name: "Google Search Console", role: "Performance tracking, indexing requests, and keyword monitoring", icon: <Search className="h-4 w-4 text-green-500" /> },
        ],
        metrics: [
            { value: "3→15", label: "Articles/Week", color: "text-emerald-500" },
            { value: "85%", label: "Time Saved", color: "text-primary" },
            { value: "320%", label: "Organic Traffic", color: "text-blue-500" },
            { value: "#1-3", label: "Google Rankings", color: "text-violet-500" },
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
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-badge mb-4">
                        <Zap className="h-3.5 w-3.5" /> Our Work
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-primary">Projects</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-muted-foreground text-lg">
                        Real results from real automation deployments. Click to explore the full process.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {PROJECTS.map((p, i) => {
                        const isExpanded = expandedIndex === i;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                layout
                                className={`bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 relative border-l-[3px] ${p.accent} ${isExpanded ? "shadow-2xl md:col-span-2 border-primary/30" : "hover:shadow-xl hover:border-primary/20 cursor-pointer"}`}
                            >
                                {/* Hover/active gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-500 pointer-events-none`} />

                                {/* Card Header — always visible */}
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
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isExpanded ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </motion.div>
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
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="relative z-10 overflow-hidden"
                                        >
                                            <div className="px-7 pb-8 space-y-8">
                                                {/* Divider */}
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                                                {/* Metrics Strip */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    {p.metrics.map((m, mi) => (
                                                        <motion.div
                                                            key={mi}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.1 + mi * 0.08 }}
                                                            className="text-center py-4 rounded-xl bg-muted/40 border border-border/50"
                                                        >
                                                            <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                                                            <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{m.label}</p>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                {/* Challenge & Solution */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="bg-red-500/5 border border-red-500/15 rounded-xl p-5"
                                                    >
                                                        <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">⚡ The Challenge</p>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">{p.challenge}</p>
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.25 }}
                                                        className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-5"
                                                    >
                                                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">✅ Our Solution</p>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">{p.solution}</p>
                                                    </motion.div>
                                                </div>

                                                {/* Process Steps */}
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5 flex items-center gap-2">
                                                        <Workflow className="h-4 w-4 text-primary" /> How It Works — Step by Step
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {p.process.map((step, si) => (
                                                            <motion.div
                                                                key={si}
                                                                initial={{ opacity: 0, x: -12 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.3 + si * 0.08 }}
                                                                className="flex items-start gap-4 group/step"
                                                            >
                                                                {/* Step connector */}
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
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Channels & Tools */}
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                                        <Zap className="h-4 w-4 text-primary" /> Channels & Tools Used
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {p.channels.map((ch, ci) => (
                                                            <motion.div
                                                                key={ci}
                                                                initial={{ opacity: 0, y: 8 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.5 + ci * 0.08 }}
                                                                className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-border transition-colors"
                                                            >
                                                                <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0 shadow-sm">
                                                                    {ch.icon}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-foreground">{ch.name}</p>
                                                                    <p className="text-xs text-muted-foreground leading-relaxed">{ch.role}</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* CTA */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.7 }}
                                                    className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border/50"
                                                >
                                                    <a href="#contact" className="btn-primary group text-sm">
                                                        Want Similar Results? <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    </a>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                        <Clock className="h-3 w-3" /> Delivered in {p.timeline} · {p.industry}
                                                    </span>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
