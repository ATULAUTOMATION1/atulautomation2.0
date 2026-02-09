"use client";

import { ExternalLink, MoveUpRight, Activity, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PROJECTS = [
    {
        category: "AI AGENT",
        title: "HealthCare AI support Bot",
        desc: "A compliant AI assistant handling patient intake and scheduling for a regional clinic.",
        tags: ["Python", "OpenAI", "Next.js"],
        color: "bg-orange-50",
        iconColor: "text-orange-500",
        graphic: (
            <svg viewBox="0 0 100 40" className="w-full h-full opacity-50 stroke-orange-300 fill-none stroke-2">
                <path d="M0 20 L20 20 L30 10 L40 30 L50 20 L100 20" />
            </svg>
        )
    },
    {
        category: "AUTOMATION",
        title: "E-Commerce Auto-Scaler",
        desc: "Automated inventory management and ad-spend optimization system for Shopify stores.",
        tags: ["Node.js", "Shopify API", "MongoDB"],
        color: "bg-blue-50",
        iconColor: "text-blue-500",
        graphic: (
            <div className="relative w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-200/50 rounded-lg transform rotate-12" />
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-300/30 rounded-lg transform -rotate-6" />
            </div>
        )
    },
    {
        category: "WEB DEV",
        title: "FinTech Dashboard",
        desc: "Real-time financial analytics dashboard with predictive revenue modeling.",
        tags: ["React", "D3.js", "Firebase"],
        color: "bg-emerald-50",
        iconColor: "text-emerald-500",
        graphic: (
            <div className="flex items-end justify-center h-full gap-2 pb-4 opacity-40">
                <div className="w-4 h-8 bg-emerald-300 rounded-t" />
                <div className="w-4 h-12 bg-emerald-400 rounded-t" />
                <div className="w-4 h-6 bg-emerald-300 rounded-t" />
                <div className="w-4 h-16 bg-emerald-500 rounded-t" />
                <div className="w-4 h-10 bg-emerald-400 rounded-t" />
            </div>
        )
    }
];

export function FeaturedProjects() {
    return (
        <section className="section-padding bg-background">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">Featured <span className="text-primary">Projects</span></h2>
                    <p className="text-muted-foreground text-lg">
                        Real-world applications driving value across industries.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PROJECTS.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-card rounded-[2rem] border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Top Graphic Section */}
                            <div className={`h-48 ${project.color} relative p-6 flex flex-col justify-between`}>
                                <span className="self-start bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-muted-foreground shadow-sm">
                                    {project.category}
                                </span>

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
                                    {project.graphic}
                                </div>
                            </div>

                            {/* Bottom Content Section */}
                            <div className="p-8 relative">
                                <div className="absolute top-8 right-8 text-muted-foreground group-hover:text-primary transition-colors">
                                    <ExternalLink className="h-5 w-5" />
                                </div>

                                <h3 className="font-serif text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors pr-8">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {project.desc}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, j) => (
                                        <span key={j} className="px-3 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
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
