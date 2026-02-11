"use client";

import { ArrowRight, ExternalLink, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PROJECTS = [
    {
        title: "AI-Powered E-Commerce Assistant",
        desc: "Built a conversational commerce bot that increased sales by 180% for a fashion brand.",
        tags: ["GPT-4", "Shopify", "WhatsApp"],
        gradient: "from-primary/10 via-primary/5 to-transparent",
        accent: "border-l-primary",
    },
    {
        title: "Multi-Channel CRM Automation",
        desc: "Unified customer data from 6 platforms into a single intelligent pipeline.",
        tags: ["HubSpot", "Zapier", "Webhooks"],
        gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
        accent: "border-l-blue-500",
    },
    {
        title: "Real Estate Lead Qualifier",
        desc: "AI agent that qualifies leads from Facebook Ads and schedules property tours automatically.",
        tags: ["Meta Ads", "AI Agent", "Calendar"],
        gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
        accent: "border-l-violet-500",
    },
    {
        title: "Content Factory Pipeline",
        desc: "Automated blog writing, SEO optimization, and social media distribution for a media company.",
        tags: ["Claude", "WordPress", "Buffer"],
        gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
        accent: "border-l-emerald-500",
    },
];

export function FeaturedProjects() {
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
                        Real results from real automation deployments.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {PROJECTS.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`group bg-card border border-border rounded-2xl p-7 hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer relative overflow-hidden border-l-[3px] ${p.accent}`}
                        >
                            {/* Hover gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight pr-4">{p.title}</h3>
                                    <ExternalLink className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-1" />
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map((tag, j) => (
                                        <span key={j} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-muted/70 text-muted-foreground border border-border/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
