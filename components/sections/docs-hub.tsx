"use client";

import { useState, useMemo } from "react";
import {
    BookOpen, Video, FileText, Lightbulb,
    Search, Clock, Star, Play, ChevronRight,
    BarChart, ExternalLink, Filter, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
    title: string;
    desc: string;
    type: string;
    duration: string;
    rating: number;
    difficulty: 1 | 2 | 3 | 4 | 5;
    featured?: boolean;
}

const CATEGORIES = [
    { id: "courses", label: "Courses", icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { id: "guides", label: "Guides", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "videos", label: "Videos", icon: Video, color: "text-rose-500", bg: "bg-rose-500/10" },
    { id: "prompts", label: "Prompts", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const DOCS: Record<string, Resource[]> = {
    courses: [
        { title: "AI Automation Fundamentals", desc: "Learn the basics of building intelligent workflows from scratch.", type: "Beginner", duration: "2h 15m", rating: 4.8, difficulty: 1, featured: true },
        { title: "WhatsApp Bot Masterclass", desc: "Build & deploy a customer support bot on WhatsApp with 24/7 automation.", type: "Intermediate", duration: "4h 30m", rating: 4.9, difficulty: 3 },
        { title: "Advanced Agent Pipelines", desc: "Complex multi-step AI agents using LangChain and AutoGen for deep tasks.", type: "Advanced", duration: "6h 00m", rating: 5.0, difficulty: 5, featured: true },
        { title: "AI for Real Estate Agents", desc: "Specific workflows for lead qualification and automated property showings.", type: "Industry", duration: "3h 45m", rating: 4.7, difficulty: 2 },
        { title: "SaaS Sales Automation", desc: "Automate your entire cold outreach and lead nurturing pipeline.", type: "Mastery", duration: "5h 20m", rating: 4.9, difficulty: 4 },
        { title: "No-Code CRM Mastery", desc: "Master GoHighLevel and HubSpot integrations with AI modules.", type: "Intermediate", duration: "3h 10m", rating: 4.6, difficulty: 3 },
    ],
    guides: [
        { title: "Zapier vs Make: 2026 Guide", desc: "A deep dive into pricing, features, and when to use which platform.", type: "Comparison", duration: "15m read", rating: 4.9, difficulty: 2, featured: true },
        { title: "AI Voice Agents Setup", desc: "How to setup Vapi or Retell to handle phone calls automatically.", type: "Technical", duration: "25m read", rating: 4.8, difficulty: 4 },
        { title: "Data Security in AI", desc: "Ensuring your business data remains private while using LLMs.", type: "Security", duration: "10m read", rating: 4.7, difficulty: 3 },
        { title: "The 'AI First' Office", desc: "Guide on redesigning your internal operations around automation.", type: "Strategy", duration: "20m read", rating: 4.9, difficulty: 2 },
        { title: "Lead Magnet Blueprint", desc: "How to use AI to generate leads using free tools.", type: "Marketing", duration: "12m read", rating: 4.6, difficulty: 1 },
    ],
    videos: [
        { title: "Build a Bot in 10 Minutes", desc: "Live walkthrough of creating a support chatbot for a retail shop.", type: "Build", duration: "10:24", rating: 4.9, difficulty: 2, featured: true },
        { title: "The Future of AI Agents", desc: "Keynote on how autonomous agents will run businesses by 2027.", type: "Insight", duration: "18:45", rating: 5.0, difficulty: 1 },
        { title: "n8n Self-Hosting Guide", desc: "How to host your own automation platform for unlimited tasks.", type: "Advanced", duration: "22:15", rating: 4.7, difficulty: 5 },
        { title: "ROI of AI Automation", desc: "Case studies of 3 Indian businesses that saved millions.", type: "Business", duration: "14:30", rating: 4.8, difficulty: 2 },
        { title: "Claude vs GPT-4 for Business", desc: "Which model should you choose for your specific workflow?", type: "Review", duration: "11:05", rating: 4.9, difficulty: 2 },
    ],
    prompts: [
        { title: "Master Support Prompt Pack", desc: "Secret prompts we use to make chatbots sound human.", type: "Library", duration: "50+ Prompts", rating: 4.9, difficulty: 1, featured: true },
        { title: "LinkedIn Content Generator", desc: "Prompts to create 30 days of viral posts in 5 minutes.", type: "Marketing", duration: "12 Prompts", rating: 4.8, difficulty: 2 },
        { title: "Cold Outreach Templates", desc: "High-converting email and DM scripts for AI agencies.", type: "Sales", duration: "25 Prompts", rating: 4.7, difficulty: 2 },
        { title: "SEO Content Brief Boilerplate", desc: "Generate perfect content briefs for your blog writers.", type: "SEO", duration: "5 Prompts", rating: 4.8, difficulty: 3 },
        { title: "Lead Scraper Instructions", desc: "Commands to use with AI scrapers for targeted B2B leads.", type: "Tools", duration: "8 Prompts", rating: 4.6, difficulty: 4 },
    ],
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

export function DocsHub() {
    const [active, setActive] = useState("courses");
    const [search, setSearch] = useState("");

    const filteredDocs = useMemo(() => {
        const categoryDocs = DOCS[active] || [];
        if (!search) return categoryDocs;

        const term = search.toLowerCase();
        return categoryDocs.filter(d =>
            d.title.toLowerCase().includes(term) ||
            d.desc.toLowerCase().includes(term) ||
            d.type.toLowerCase().includes(term)
        );
    }, [active, search]);

    return (
        <section id="resources" className="section-padding bg-transparent relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <BookOpen className="h-3.5 w-3.5" /> Premium Learning
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        The Automation <span className="text-gradient">Knowledge Hub</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                        A curated collection of resources designed to help you master AI automation, from beginner foundations to advanced agent orchestration.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-4.5 w-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search resources, topics, or difficulty..."
                            className="w-full bg-card/50 backdrop-blur-sm border border-border group-hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl py-4 pl-12 pr-4 text-sm transition-all shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                            <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">ESC</span>
                        </div>
                    </div>
                </div>

                {/* Categories & Stats */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-muted/50 backdrop-blur-md rounded-2xl border border-border shadow-inner">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = active === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActive(cat.id)}
                                    className={cn(
                                        "flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                                        isActive
                                            ? "bg-card text-foreground shadow-sm ring-1 ring-primary/20 scale-[1.02]"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    <Icon className={cn("h-4.5 w-4.5 transition-transform", isActive ? cn(cat.color, "scale-110") : "")} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-6 items-center">
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-primary">50+</span>
                            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Resources</span>
                        </div>
                        <div className="h-10 w-px bg-border hidden sm:block" />
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-blue-500">4.9/5</span>
                            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Avg Rating</span>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                    {filteredDocs.length > 0 ? (
                        filteredDocs.map((doc, i) => {
                            const cat = CATEGORIES.find(c => c.id === active)!;
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "group bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-7 hover:shadow-2xl hover:border-primary/40 transition-all duration-500 flex flex-col relative overflow-hidden",
                                        doc.featured && "ring-2 ring-primary/20 md:scale-[1.03] z-10 shadow-xl"
                                    )}
                                >
                                    {doc.featured && (
                                        <div className="absolute top-4 right-4 animate-pulse">
                                            <TrendingUp className="h-4 w-4 text-primary" />
                                        </div>
                                    )}

                                    {/* Card Header info */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", cat.bg, cat.color)}>
                                            {doc.type}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                                <span className="text-xs font-bold">{doc.rating}</span>
                                            </div>
                                            <div className="h-3 w-px bg-border" />
                                            <DifficultyDots level={doc.difficulty} />
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug tracking-tight">
                                            {doc.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6 italic opacity-85 group-hover:opacity-100 transition-opacity">
                                            &quot;{doc.desc}&quot;
                                        </p>
                                    </div>

                                    {/* Meta & Action */}
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
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

                {/* Footer CTA */}
                <div className="mt-20 text-center opacity-0 animate-fade-in-up delay-[400ms]">
                    <div className="p-8 rounded-3xl border border-dashed border-border bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                        <div className="text-left">
                            <h4 className="font-bold text-lg mb-1">Want a custom learning path?</h4>
                            <p className="text-sm text-muted-foreground">Tell us your industry and we&apos;ll build a personalized automation roadmap for you.</p>
                        </div>
                        <a href="/#contact" className="btn-primary group whitespace-nowrap">
                            Build My Roadmap <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
