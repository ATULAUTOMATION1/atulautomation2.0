"use client";

import { WorkflowSimulator } from "../tools/workflow-simulator";
import { AutomationPuzzle } from "../tools/automation-puzzle";
import { TrendFeed } from "../tools/trend-feed";
import { EcoAutomationGame } from "../games/eco-automation-game";
import { motion } from "framer-motion";
import { Sparkles, Gamepad2, Cpu } from "lucide-react";

export function InteractiveDemos() {
    return (
        <section id="interactive-demos" className="section-padding bg-transparent">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center mb-14"
                >
                    <p className="section-badge mb-4">
                        <Sparkles className="h-3.5 w-3.5" /> Hands-on Learning
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Interactive <span className="text-primary">Playground</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Build workflows, solve puzzles, and stay ahead of industry trends.
                    </p>
                </motion.div>

                {/* Build & Test */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Cpu className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Build & Test</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        <div className="lg:col-span-8"><WorkflowSimulator /></div>
                        <div className="lg:col-span-4 flex flex-col gap-5">
                            <AutomationPuzzle />
                            <TrendFeed />
                        </div>
                    </div>
                </motion.div>

                {/* Learn & Play */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Gamepad2 className="h-4 w-4 text-violet-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Learn & Play</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <EcoAutomationGame />
                        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-center">
                            <h4 className="text-xl font-bold mb-5">🚀 Why Learn Automation?</h4>
                            <div className="space-y-3">
                                {[
                                    { emoji: "⏱️", title: "Save 10+ Hours/Week", desc: "Automate repetitive tasks and focus on what matters" },
                                    { emoji: "📈", title: "Scale Without Hiring", desc: "AI agents work 24/7 without breaks or vacations" },
                                    { emoji: "🧠", title: "AI Is the Future", desc: "Companies using AI grow 3x faster" },
                                    { emoji: "💰", title: "High-Demand Skill", desc: "Automation engineers earn $120k+ on average" },
                                    { emoji: "🔗", title: "Connect Everything", desc: "1000+ app integrations with no-code tools" },
                                ].map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                                        <span className="text-lg">{tip.emoji}</span>
                                        <div>
                                            <p className="text-sm font-semibold">{tip.title}</p>
                                            <p className="text-xs text-muted-foreground">{tip.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
