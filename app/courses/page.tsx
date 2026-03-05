"use client";

import { useState, useMemo } from "react";
import {
    BookOpen, Video, FileText, Lightbulb,
    Search, Clock, Star, Play, ChevronRight,
    ExternalLink, Filter, TrendingUp, GraduationCap,
    Zap, Users, Award, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Resource {
    title: string;
    desc: string;
    type: string;
    duration: string;
    rating: number;
    difficulty: 1 | 2 | 3 | 4 | 5;
    featured?: boolean;
    topics?: string[];
}

const CATEGORIES = [
    { id: "courses", label: "Courses", icon: BookOpen, color: "text-primary", bg: "bg-primary/10", gradient: "from-primary/20 to-orange-500/10" },
    { id: "guides", label: "Guides", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", gradient: "from-blue-500/20 to-cyan-500/10" },
    { id: "videos", label: "Videos", icon: Video, color: "text-rose-500", bg: "bg-rose-500/10", gradient: "from-rose-500/20 to-pink-500/10" },
    { id: "prompts", label: "Prompts", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10", gradient: "from-amber-500/20 to-yellow-500/10" },
];

const DOCS: Record<string, Resource[]> = {
    courses: [
        { title: "AI Automation Fundamentals", desc: "Learn the basics of building intelligent workflows from scratch. Covers chatbot design, workflow logic, and connecting APIs without code.", type: "Beginner", duration: "2H 15M", rating: 4.8, difficulty: 1, featured: true, topics: ["No-Code", "Zapier", "Chatbot Basics"] },
        { title: "WhatsApp Bot Masterclass", desc: "Build & deploy a customer support bot on WhatsApp with 24/7 automation. Integrate with CRM, handle payments, and qualify leads automatically.", type: "Intermediate", duration: "4H 30M", rating: 4.9, difficulty: 3, topics: ["WhatsApp API", "WATI", "Lead Qualification"] },
        { title: "Advanced Agent Pipelines", desc: "Complex multi-step AI agents using LangChain and AutoGen for deep tasks. Build autonomous systems that think, plan, and execute.", type: "Advanced", duration: "6H 00M", rating: 5.0, difficulty: 5, featured: true, topics: ["LangChain", "AutoGen", "GPT-4", "Multi-Agent"] },
        { title: "AI for Real Estate Agents", desc: "Specific workflows for lead qualification, automated follow-ups, property matching, and virtual showing scheduling.", type: "Industry", duration: "3H 45M", rating: 4.7, difficulty: 2, topics: ["Real Estate", "Lead Gen", "CRM"] },
        { title: "SaaS Sales Automation", desc: "Automate your entire cold outreach pipeline — from prospecting to demo booking. AI-powered personalization at scale.", type: "Mastery", duration: "5H 20M", rating: 4.9, difficulty: 4, topics: ["Sales", "Outreach", "Apollo.io"] },
        { title: "No-Code CRM Mastery", desc: "Master GoHighLevel and HubSpot integrations with AI modules. Build a CRM that automates follow-ups and predicts conversions.", type: "Intermediate", duration: "3H 10M", rating: 4.6, difficulty: 3, topics: ["HubSpot", "GoHighLevel", "CRM"] },
        { title: "Marketing Automation with AI", desc: "Deploy AI-driven campaigns across email, social media, and paid ads. Generate content, A/B test, and optimize automatically.", type: "Intermediate", duration: "4H 00M", rating: 4.8, difficulty: 3, topics: ["Email", "Social Media", "Ad Campaigns"] },
        { title: "Voice AI & Phone Agents", desc: "Build AI agents that handle phone calls — appointment booking, support, and outbound sales calls powered by Vapi and ElevenLabs.", type: "Advanced", duration: "5H 00M", rating: 4.9, difficulty: 4, featured: true, topics: ["Vapi", "ElevenLabs", "Voice AI"] },
        { title: "E-Commerce AI Blueprint", desc: "Automate your Shopify/WooCommerce store with chatbots, abandoned cart recovery, personalized upsells, and inventory alerts.", type: "Industry", duration: "3H 30M", rating: 4.7, difficulty: 2, topics: ["Shopify", "E-Commerce", "Cart Recovery"] },
    ],
    guides: [
        { title: "Zapier vs Make vs n8n: 2026 Guide", desc: "A deep-dive comparison of pricing, features, performance, and when to use which platform for your business.", type: "Comparison", duration: "15 MIN READ", rating: 4.9, difficulty: 2, featured: true, topics: ["Zapier", "Make", "n8n"] },
        { title: "AI Voice Agents Setup", desc: "Step-by-step guide to setting up Vapi or Retell to handle phone calls — booking, support, and outbound automatically.", type: "Technical", duration: "25 MIN READ", rating: 4.8, difficulty: 4, topics: ["Vapi", "Retell", "Voice"] },
        { title: "Data Security in AI Systems", desc: "Ensuring GDPR/CCPA compliance and keeping your business data private while using LLMs and third-party AI APIs.", type: "Security", duration: "10 MIN READ", rating: 4.7, difficulty: 3, topics: ["GDPR", "CCPA", "Security"] },
        { title: "The 'AI First' Office Playbook", desc: "Complete guide on redesigning your internal operations around automation — from HR to finance to customer service.", type: "Strategy", duration: "20 MIN READ", rating: 4.9, difficulty: 2, topics: ["Strategy", "Operations", "Culture"] },
        { title: "Lead Magnet Blueprint", desc: "How to use AI-powered tools and quizzes to generate high-quality leads on autopilot — with zero ad spend.", type: "Marketing", duration: "12 MIN READ", rating: 4.6, difficulty: 1, topics: ["Lead Gen", "Quizzes", "Funnels"] },
        { title: "GPT-4 vs Claude for Business", desc: "Which AI model is best for your specific use case? Detailed comparison with cost analysis and performance benchmarks.", type: "Comparison", duration: "18 MIN READ", rating: 4.9, difficulty: 2, topics: ["GPT-4", "Claude", "LLMs"] },
        { title: "Building Your First AI Chatbot", desc: "Zero to deployed chatbot in under 2 hours. Complete beginner-friendly guide with screenshots and code snippets.", type: "Tutorial", duration: "30 MIN READ", rating: 4.8, difficulty: 1, featured: true, topics: ["Chatbot", "Beginner", "Deploy"] },
    ],
    videos: [
        { title: "Build a Bot in 10 Minutes", desc: "Live walkthrough of creating a customer support chatbot for a retail shop — from scratch to production.", type: "Build", duration: "10:24", rating: 4.9, difficulty: 2, featured: true, topics: ["Chatbot", "Live Build"] },
        { title: "The Future of AI Agents", desc: "Keynote on how autonomous agents will run 80% of business operations by 2027. Case studies and predictions.", type: "Insight", duration: "18:45", rating: 5.0, difficulty: 1, topics: ["AI Trends", "Future"] },
        { title: "n8n Self-Hosting Guide", desc: "How to host your own automation platform on a $5/month VPS for unlimited tasks — with Docker and SSL.", type: "Advanced", duration: "22:15", rating: 4.7, difficulty: 5, topics: ["n8n", "Docker", "Self-Host"] },
        { title: "ROI of AI Automation", desc: "3 real case studies of businesses that saved $50K+ per year using our automation systems.", type: "Business", duration: "14:30", rating: 4.8, difficulty: 2, topics: ["ROI", "Case Study"] },
        { title: "Claude vs GPT-4 for Business", desc: "Side-by-side comparison with real business workflows — which model wins in each category?", type: "Review", duration: "11:05", rating: 4.9, difficulty: 2, topics: ["Claude", "GPT-4", "Review"] },
        { title: "WhatsApp Automation Deep Dive", desc: "Complete walkthrough of building a WhatsApp bot that handles leads, payments, and support — all automated.", type: "Build", duration: "28:30", rating: 4.9, difficulty: 3, featured: true, topics: ["WhatsApp", "Live Build"] },
    ],
    prompts: [
        { title: "Master Support Prompt Pack", desc: "50+ battle-tested prompts we use to make chatbots sound natural, empathetic, and human. Works with GPT-4 and Claude.", type: "Library", duration: "50+ PROMPTS", rating: 4.9, difficulty: 1, featured: true, topics: ["Support", "Chatbot"] },
        { title: "LinkedIn Content Generator", desc: "Generate 30 days of viral LinkedIn posts in under 5 minutes — hooks, carousels, and engagement bait included.", type: "Marketing", duration: "12 PROMPTS", rating: 4.8, difficulty: 2, topics: ["LinkedIn", "Content"] },
        { title: "Cold Outreach Templates", desc: "High-converting email and DM scripts for AI agencies and SaaS companies. Personalization chains included.", type: "Sales", duration: "25 PROMPTS", rating: 4.7, difficulty: 2, topics: ["Email", "DM", "Outreach"] },
        { title: "SEO Content Brief Boilerplate", desc: "Generate perfect SEO-optimized content briefs that writers can execute — with keyword targeting and outline generation.", type: "SEO", duration: "5 PROMPTS", rating: 4.8, difficulty: 3, topics: ["SEO", "Content"] },
        { title: "Lead Scraper Instructions", desc: "AI-powered commands to extract targeted B2B leads from LinkedIn, directories, and public databases — ethically.", type: "Tools", duration: "8 PROMPTS", rating: 4.6, difficulty: 4, topics: ["Scraping", "B2B", "Leads"] },
        { title: "Sales Call AI Scripts", desc: "Prompts that power AI voice agents for cold calls, follow-ups, appointment confirms, and objection handling.", type: "Sales", duration: "15 PROMPTS", rating: 4.9, difficulty: 3, featured: true, topics: ["Voice AI", "Sales Calls"] },
    ],
};

const LEVEL_COLORS: Record<string, string> = {
    Beginner: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    Intermediate: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    Advanced: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    Industry: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    Mastery: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

function DifficultyDots({ level }: { level: number }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors",
                        i <= level ? "bg-primary" : "bg-muted-foreground/20"
                    )}
                />
            ))}
        </div>
    );
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold">{rating}</span>
        </div>
    );
}

export default function CoursesPage() {
    const [active, setActive] = useState("courses");
    const [search, setSearch] = useState("");

    const filteredDocs = useMemo(() => {
        const categoryDocs = DOCS[active] || [];
        if (!search) return categoryDocs;

        const term = search.toLowerCase();
        return categoryDocs.filter(d =>
            d.title.toLowerCase().includes(term) ||
            d.desc.toLowerCase().includes(term) ||
            d.type.toLowerCase().includes(term) ||
            d.topics?.some(t => t.toLowerCase().includes(term))
        );
    }, [active, search]);

    const totalResources = Object.values(DOCS).reduce((sum, arr) => sum + arr.length, 0);
    const avgRating = (Object.values(DOCS).flat().reduce((sum, d) => sum + d.rating, 0) / Object.values(DOCS).flat().length).toFixed(1);

    return (
        <main className="min-h-screen pt-24 md:pt-32 pb-24">
            {/* Hero */}
            <section className="container-custom mb-16 relative">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="text-center max-w-3xl mx-auto relative z-10">
                    <span className="section-badge mb-4">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Free Learning Resources
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        The Automation{' '}
                        <span className="text-gradient">Knowledge Hub</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                        Master AI automation with our curated collection of courses, guides, video tutorials, and prompt libraries — from beginner to advanced.
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-center gap-8 md:gap-12 mb-10">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl md:text-4xl font-bold text-primary">{totalResources}+</span>
                            <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">Resources</span>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div className="flex flex-col items-center">
                            <span className="text-3xl md:text-4xl font-bold text-blue-500">{avgRating}/5</span>
                            <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">Avg Rating</span>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div className="flex flex-col items-center">
                            <span className="text-3xl md:text-4xl font-bold text-emerald-500">Free</span>
                            <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">Always</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-4.5 w-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search courses, topics, or tools..."
                            className="w-full bg-card/50 backdrop-blur-sm border border-border group-hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl py-4 pl-12 pr-4 text-sm transition-all shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="container-custom mb-12">
                <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-muted/50 backdrop-blur-md rounded-2xl border border-border shadow-inner max-w-2xl mx-auto">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = active === cat.id;
                        const count = DOCS[cat.id]?.length || 0;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActive(cat.id)}
                                className={cn(
                                    "flex items-center gap-2.5 px-5 md:px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                                    isActive
                                        ? "bg-card text-foreground shadow-sm ring-1 ring-primary/20 scale-[1.02]"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <Icon className={cn("h-4.5 w-4.5 transition-transform", isActive ? cn(cat.color, "scale-110") : "")} />
                                {cat.label}
                                <span className={cn(
                                    "text-[10px] font-bold rounded-full px-1.5 py-0.5",
                                    isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                )}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Grid */}
            <section className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocs.length > 0 ? (
                        filteredDocs.map((doc, i) => {
                            const cat = CATEGORIES.find(c => c.id === active)!;
                            const levelColor = LEVEL_COLORS[doc.type] || "bg-muted text-muted-foreground border-border";

                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "group bg-card/60 backdrop-blur-xl border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/40 transition-all duration-500 flex flex-col relative",
                                        doc.featured && "ring-2 ring-primary/20 md:scale-[1.02] z-10 shadow-lg"
                                    )}
                                >
                                    {/* Gradient Top Bar */}
                                    <div className={cn("h-1.5 bg-gradient-to-r", cat.gradient)} />

                                    <div className="p-6 flex flex-col flex-1">
                                        {doc.featured && (
                                            <div className="absolute top-5 right-5">
                                                <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">
                                                    <TrendingUp className="h-3 w-3" /> Featured
                                                </div>
                                            </div>
                                        )}

                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-5">
                                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border", levelColor)}>
                                                {doc.type}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <StarRating rating={doc.rating} />
                                                <div className="h-3.5 w-px bg-border" />
                                                <DifficultyDots level={doc.difficulty} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug tracking-tight">
                                            {doc.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                                            {doc.desc}
                                        </p>

                                        {/* Topics */}
                                        {doc.topics && (
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {doc.topics.map(topic => (
                                                    <span key={topic} className="text-[10px] font-semibold bg-muted/70 text-muted-foreground px-2 py-0.5 rounded-full border border-border/50">
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/50">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span className="text-xs font-medium uppercase tracking-tighter">{doc.duration}</span>
                                            </div>

                                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/60 text-xs font-bold ring-1 ring-border group-hover:bg-primary group-hover:text-white group-hover:ring-primary transition-all shadow-sm">
                                                {active === 'videos' ? <Play className="h-3 w-3" /> : (active === 'prompts' ? <ExternalLink className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />)}
                                                {active === 'videos' ? 'Watch Now' : (active === 'prompts' ? 'Get Prompts' : 'Read Guide')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-muted w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <Filter className="h-8 w-8 text-muted-foreground/40" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No matching resources</h3>
                            <p className="text-muted-foreground">Try adjusting your search term for &quot;{search}&quot;</p>
                            <button
                                onClick={() => setSearch("")}
                                className="mt-4 text-primary font-bold text-sm hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Learn Section */}
            <section className="container-custom mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="rounded-2xl border border-border bg-card p-8 text-center hover:border-primary/20 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Zap className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Practical, Not Theory</h3>
                        <p className="text-sm text-muted-foreground">Every resource includes real workflows you can deploy immediately. No fluff, just actionable steps.</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-8 text-center hover:border-blue-500/20 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                            <Users className="h-7 w-7 text-blue-500" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Built for Business</h3>
                        <p className="text-sm text-muted-foreground">Tailored for entrepreneurs, marketers, and ops teams — not just developers. No coding required.</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-8 text-center hover:border-emerald-500/20 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                            <Award className="h-7 w-7 text-emerald-500" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Always Updated</h3>
                        <p className="text-sm text-muted-foreground">AI moves fast. Our content is refreshed monthly to cover the latest tools, models, and best practices.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container-custom">
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Want a custom learning path?</h3>
                            <p className="text-muted-foreground">Tell us your industry and goals — we&apos;ll build a personalized automation roadmap for free.</p>
                        </div>
                        <Link href="/#contact" className="btn-primary group whitespace-nowrap">
                            Build My Roadmap <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
