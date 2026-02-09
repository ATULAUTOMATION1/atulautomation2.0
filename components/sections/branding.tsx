"use client";

import { Download, FileText, Presentation } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Branding() {
    return (
        <section className="section-padding bg-background overflow-hidden">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">Our <span className="text-primary">Vision</span></h2>
                    <p className="text-muted-foreground">
                        Download our detailed assets to understand how we are reshaping the agency model with AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Visuals */}
                    <div className="relative h-[400px] flex items-center justify-center">
                        {/* Slide 1 */}
                        <motion.div
                            initial={{ rotate: -6, x: -20 }}
                            whileHover={{ rotate: -8, x: -30, scale: 1.05 }}
                            className="absolute w-64 h-48 bg-card border border-border rounded-xl shadow-md flex items-center justify-center z-10"
                        >
                            <span className="text-muted-foreground font-heading text-sm">Introduction // 01</span>
                        </motion.div>

                        {/* Slide 2 (Center) */}
                        <motion.div
                            initial={{ zIndex: 20 }}
                            whileHover={{ scale: 1.1 }}
                            className="absolute w-72 h-56 bg-background border-2 border-primary rounded-xl shadow-xl flex flex-col items-center justify-center p-6 text-center"
                        >
                            <div className="bg-primary/10 p-3 rounded-full mb-3">
                                <Presentation className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">Pitch Deck</h3>
                            <p className="text-xs text-muted-foreground">The strategic roadmap for 2026.</p>
                        </motion.div>

                        {/* Slide 3 */}
                        <motion.div
                            initial={{ rotate: 6, x: 20 }}
                            whileHover={{ rotate: 8, x: 30, scale: 1.05 }}
                            className="absolute w-64 h-48 bg-card border border-border rounded-xl shadow-md flex items-center justify-center z-0"
                        >
                            <span className="text-muted-foreground font-heading text-sm">Financials // 08</span>
                        </motion.div>
                    </div>

                    {/* Downloads */}
                    <div className="space-y-6">
                        <div className="bg-muted/30 p-8 rounded-2xl border border-border">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Presentation className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Investor Pitch Deck</h3>
                                        <p className="text-sm text-muted-foreground">PDF • 2.4 MB</p>
                                    </div>
                                </div>
                                <Link href="#" className="text-sm font-semibold text-primary hover:underline flex items-center">
                                    Download <Download className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                A comprehensive look at our business model, market analysis, and growth projections for the next 3 years.
                            </p>
                        </div>

                        <div className="bg-muted/30 p-8 rounded-2xl border border-border">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-secondary/10 rounded-lg">
                                        <FileText className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Services Brochure</h3>
                                        <p className="text-sm text-muted-foreground">PDF • 5.1 MB</p>
                                    </div>
                                </div>
                                <Link href="#" className="text-sm font-semibold text-secondary hover:underline flex items-center">
                                    Download <Download className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                Detailed breakdown of our AI modules, pricing tiers, and success stories from our enterprise clients.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
