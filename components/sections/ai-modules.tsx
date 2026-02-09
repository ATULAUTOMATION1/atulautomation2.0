"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, ShoppingBag, Home, Code } from "lucide-react";

import { WhatsAppBotDemo } from "@/components/modules/demos/whatsapp-bot";
import { CaptionGenerator } from "@/components/modules/demos/caption-generator";
import { DropshippingFlow } from "@/components/modules/demos/dropshipping-flow";
import { RealEstateLead } from "@/components/modules/demos/real-estate-lead";
import { PromptLoader } from "@/components/modules/demos/prompt-loader";

const TABS = [
    { id: "whatsapp", label: "WhatsApp Bot", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "social", label: "Social Media AI", icon: <Sparkles className="h-4 w-4" /> },
    { id: "dropshipping", label: "Dropshipping", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "realestate", label: "Real Estate", icon: <Home className="h-4 w-4" /> },
    { id: "dev", label: "JSON Config", icon: <Code className="h-4 w-4" /> },
];

export function AIModules() {
    const [activeTab, setActiveTab] = useState("whatsapp");

    return (
        <section id="modules-demo" className="section-padding bg-muted/30">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-4xl font-bold mb-4">Live <span className="text-primary">AI Demos</span></h2>
                    <p className="text-muted-foreground">
                        Experience our modular AI agents in action. Select a module below to test its capabilities.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-4 pb-4 md:pb-0 hide-scrollbar">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap md:whitespace-normal ${activeTab === tab.id
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "bg-background hover:bg-muted border border-border md:border-transparent"
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-background border border-border rounded-2xl p-6 md:p-8 shadow-sm min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
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
