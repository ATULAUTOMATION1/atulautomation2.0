"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, ShoppingBag, Home, Code, Bot } from "lucide-react";

import { WhatsAppBotDemo } from "@/components/modules/demos/whatsapp-bot";
import { CaptionGenerator } from "@/components/modules/demos/caption-generator";
import { DropshippingFlow } from "@/components/modules/demos/dropshipping-flow";
import { RealEstateLead } from "@/components/modules/demos/real-estate-lead";
import { PromptLoader } from "@/components/modules/demos/prompt-loader";

const TABS = [
    { id: "whatsapp", label: "WhatsApp Bot", icon: MessageSquare, color: "text-green-500", bg: "bg-green-500/10", ring: "ring-green-500/30" },
    { id: "social", label: "Social Media AI", icon: Sparkles, color: "text-pink-500", bg: "bg-pink-500/10", ring: "ring-pink-500/30" },
    { id: "dropshipping", label: "Dropshipping", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10", ring: "ring-blue-500/30" },
    { id: "realestate", label: "Real Estate", icon: Home, color: "text-amber-500", bg: "bg-amber-500/10", ring: "ring-amber-500/30" },
    { id: "dev", label: "JSON Config", icon: Code, color: "text-violet-500", bg: "bg-violet-500/10", ring: "ring-violet-500/30" },
];

export function AIModules() {
    const [activeTab, setActiveTab] = useState("whatsapp");

    return (
        <section id="modules-demo" className="section-padding bg-muted/30">
            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-badge mb-4">
                        <Bot className="h-3.5 w-3.5" /> Try It Live
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4">
                        Live <span className="text-primary">AI Demos</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-muted-foreground text-lg">
                        Experience our AI agents in action. Select a module to test.
                    </motion.p>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-3 md:pb-0 hide-scrollbar">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap md:whitespace-normal w-full ${isActive
                                            ? `bg-card border border-border shadow-sm ring-2 ${tab.ring}`
                                            : "bg-transparent border border-transparent hover:bg-card hover:border-border"
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? tab.bg : "bg-muted"} transition-colors`}>
                                        <Icon className={`h-4 w-4 ${isActive ? tab.color : "text-muted-foreground"} transition-colors`} />
                                    </div>
                                    <span className={isActive ? "text-foreground font-semibold" : "text-muted-foreground"}>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-card border border-border rounded-2xl p-6 md:p-8 min-h-[480px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === "whatsapp" && <WhatsAppBotDemo />}
                                {activeTab === "social" && <CaptionGenerator />}
                                {activeTab === "dropshipping" && <DropshippingFlow />}
                                {activeTab === "realestate" && <RealEstateLead />}
                                {activeTab === "dev" && <PromptLoader />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
