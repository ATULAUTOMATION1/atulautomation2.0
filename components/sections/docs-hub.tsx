"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Video, FileText, Lightbulb } from "lucide-react";

const CATEGORIES = [
    { id: "courses", label: "Courses", icon: BookOpen, color: "text-primary", bg: "bg-primary/8" },
    { id: "guides", label: "Guides", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/8" },
    { id: "videos", label: "Videos", icon: Video, color: "text-rose-500", bg: "bg-rose-500/8" },
    { id: "prompts", label: "Prompts", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/8" },
];

const DOCS: Record<string, { title: string; desc: string; type: string }[]> = {
    courses: [
        { title: "AI Automation Fundamentals", desc: "Learn the basics of building intelligent workflows.", type: "Beginner" },
        { title: "Advanced Agent Pipelines", desc: "Build multi-step AI agents with memory and tools.", type: "Advanced" },
        { title: "No-Code Automation Mastery", desc: "Master no-code platforms for business automation.", type: "Intermediate" },
    ],
    guides: [
        { title: "WhatsApp Bot Setup Guide", desc: "Step-by-step guide to deploy your first WhatsApp bot.", type: "Technical" },
        { title: "CRM Integration Playbook", desc: "Connect your CRM with AI-powered lead scoring.", type: "Technical" },
    ],
    videos: [
        { title: "Building Your First AI Agent", desc: "Video walkthrough of creating an agent from scratch.", type: "Tutorial" },
        { title: "Automation ROI Calculator Explained", desc: "How to measure and maximize automation ROI.", type: "Explainer" },
    ],
    prompts: [
        { title: "Customer Support Prompts Pack", desc: "50+ tested prompts for support chatbots.", type: "AI Pack" },
        { title: "Sales & Marketing Templates", desc: "Copy-paste prompts for lead generation.", type: "AI Pack" },
    ],
};

export function DocsHub() {
    const [active, setActive] = useState("courses");

    return (
        <section id="resources" className="section-padding bg-muted/30">
            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-badge mb-4">
                        <BookOpen className="h-3.5 w-3.5" /> Resources
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4">
                        Learning <span className="text-primary">Hub</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-muted-foreground text-lg">
                        Courses, guides, videos and prompts to master AI automation.
                    </motion.p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = active === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActive(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? "bg-card border border-border shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Icon className={`h-4 w-4 ${isActive ? cat.color : ""}`} />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
                    >
                        {DOCS[active]?.map((doc, i) => {
                            const cat = CATEGORIES.find(c => c.id === active)!;
                            return (
                                <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cat.bg} ${cat.color}`}>{doc.type}</span>
                                    </div>
                                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
                                    <p className="text-sm text-muted-foreground">{doc.desc}</p>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
