"use client";

import { useState } from "react";
import { Play, BookOpen, ArrowUpRight, Code, Terminal, Clock, FileText, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
    { id: "guides", label: "Step-by-Step Guides", icon: <FileText className="h-4 w-4" /> },
    { id: "videos", label: "Video Tutorials", icon: <Play className="h-4 w-4" /> },
    { id: "prompts", label: "Prompt Library", icon: <Terminal className="h-4 w-4" /> },
    { id: "course", label: "2026 AI Course", icon: <BookOpen className="h-4 w-4" /> },
];

const DATA = {
    guides: [
        { title: "JSON Config Mastery", desc: "Learn to configure agents dynamically using JSON payloads.", type: "Tech", time: "10 min" },
        { title: "Docker Deployment", desc: "Containerize your automation workflows for production.", type: "DevOps", time: "15 min" },
        { title: "API Integration 101", desc: "Connect any third-party app with REST/GraphQL.", type: "Integration", time: "20 min" },
        { title: "Webhook Handling", desc: "Setting up secure listeners for real-time events.", type: "Backend", time: "12 min" },
    ],
    videos: [
        { title: "The Agent Economy", desc: "Understanding the shift from SaaS to Service-as-Software.", type: "Strategy", time: "12 min" },
        { title: "Building Your First Workflow", desc: "Watch me build a lead qualification bot live.", type: "Tutorial", time: "45 min" },
        { title: "Scaling Autonomous Agents", desc: "Managing 100+ concurrent agent instances.", type: "DevOps", time: "30 min" },
        { title: "RAG Pipeline Setup", desc: "Integrating vector databases for smarter agents.", type: "AI", time: "25 min" },
    ],
    prompts: [
        { title: "Sales Objection Handler", desc: "Overcome common pricing objections with empathy.", type: "Sales", time: "Copy" },
        { title: "Cold Email Generator", desc: "Create high-converting outbound sequences.", type: "Marketing", time: "Copy" },
        { title: "Code Refactoring Agent", desc: "Instructions for cleaning up legacy codebases.", type: "Dev", time: "Copy" },
        { title: "SEO Blog Writer", desc: "Generate semantic, keyword-rich articles.", type: "Content", time: "Copy" },
    ],
    course: [
        { title: "Module 1: Foundations", desc: "History of AI, LLM basics, and setup environment.", type: "Beginner", time: "Completed" },
        { title: "Module 2: Prompt Engineering", desc: "Zero-shot, few-shot, and Chain-of-Thought techniques.", type: "Core", time: "In Progress" },
        { title: "Module 3: Tool Use", desc: "Giving agents access to Search, Calculator, and APIs.", type: "Advanced", time: "Locked" },
        { title: "Module 4: Multi-Agent Systems", desc: "Orchestrating teams of specialized agents.", type: "Mastery", time: "Locked" },
    ]
};

export function DocsHub() {
    const [activeTab, setActiveTab] = useState("course");

    return (
        <section id="learn" className="section-padding bg-muted/30">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold mb-4">Master the <span className="text-primary">Machine</span></h2>
                        <p className="text-muted-foreground text-lg">
                            Comprehensive guides, video tutorials, and prompt libraries to help you navigate the automation landscape.
                        </p>
                    </div>
                    <Link href="#" className="hidden md:inline-flex items-center text-primary font-semibold hover:underline mt-4 md:mt-0">
                        Visit Learning Hub <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex items-center space-x-2 px-6 py-2 rounded-full font-medium transition-all ${activeTab === cat.id
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "bg-background border border-border hover:border-primary/50 text-muted-foreground"
                                }`}
                        >
                            {cat.icon}
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {/* @ts-ignore */}
                            {DATA[activeTab].map((item: any, i: number) => (
                                <div key={i} className="group bg-background rounded-xl p-6 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded bg-muted text-primary uppercase tracking-wider`}>
                                            {item.type}
                                        </span>
                                        {activeTab === 'course' && item.time === 'Completed' ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <div className="text-xs text-muted-foreground flex items-center bg-muted/50 px-2 py-1 rounded-full">
                                                <Clock className="h-3 w-3 mr-1" /> {item.time}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                                        {item.desc}
                                    </p>

                                    <div className="pt-4 border-t border-border mt-auto">
                                        <span className="text-sm font-semibold flex items-center text-foreground group-hover:text-primary transition-colors">
                                            {activeTab === 'videos' ? 'Watch Now' : (activeTab === 'prompts' ? 'Copy Prompt' : 'Start Learning')}
                                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="#" className="inline-flex items-center text-primary font-semibold hover:underline">
                        View All Resources <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
