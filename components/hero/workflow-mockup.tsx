'use client';

import { CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const WORKFLOW_STEPS = [
    { icon: "📧", label: "Incoming Lead", sub: "Webhook triggers", accent: "border-l-blue-500", highlight: "bg-blue-500/10" },
    { icon: "🤖", label: "AI Qualifies", sub: "GPT-4 scoring", accent: "border-l-violet-500", highlight: "bg-violet-500/10" },
    { icon: "📊", label: "Score & Route", sub: "CRM assignment", accent: "border-l-primary", highlight: "bg-primary/10" },
    { icon: "💬", label: "Auto-Reply", sub: "Personalised email", accent: "border-l-emerald-500", highlight: "bg-emerald-500/10" },
    { icon: "✅", label: "CRM Updated", sub: "Pipeline sync", accent: "border-l-amber-500", highlight: "bg-amber-500/10" },
];

export function WorkflowMockup() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full bg-card border border-border rounded-2xl shadow-2xl overflow-hidden glass-morphism">
            {/* Window bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-gradient-to-r from-muted/50 to-muted/20">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-inner" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] shadow-inner" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] shadow-inner" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">lead-pipeline.flow</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    />
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 tracking-wider">LIVE</span>
                </div>
            </div>

            {/* Steps */}
            <div className="p-4 space-y-2 relative">
                {/* Connecting Line */}
                <div className="absolute left-[34px] top-10 bottom-10 w-px bg-border/40 z-0 hidden sm:block" />

                {WORKFLOW_STEPS.map((step, i) => {
                    const isCompleted = i < activeStep;
                    const isActive = i === activeStep;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                                opacity: 1, 
                                x: 0,
                                scale: isActive ? 1.02 : 1,
                            }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative z-10 flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-500 ${
                                isActive 
                                    ? `border-primary/30 shadow-lg ${step.highlight} ring-1 ring-primary/20` 
                                    : 'border-border bg-muted/10'
                            } border-l-[3px] ${step.accent}`}
                        >
                            {/* Icon Container with Status Circle */}
                            <div className="relative shrink-0">
                                <div className={`w-10 h-10 rounded-lg ${isActive ? 'bg-primary/20' : 'bg-muted/80'} flex items-center justify-center text-lg shadow-sm border border-border/50`}>
                                    {step.icon}
                                </div>
                                
                                {isActive && (
                                    <motion.div
                                        layoutId="step-indicator"
                                        className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full border-2 border-card z-20"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-foreground'}`}>
                                    {step.label}
                                </p>
                                <p className="text-[11px] text-muted-foreground font-medium">
                                    {isActive ? 'Processing...' : step.sub}
                                </p>
                            </div>

                            <div className="shrink-0 flex items-center gap-2">
                                <AnimatePresence mode="wait">
                                    {isCompleted || (isActive && activeStep === WORKFLOW_STEPS.length - 1) ? (
                                        <motion.div
                                            key="done"
                                            initial={{ scale: 0, rotate: -20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="text-accent"
                                        >
                                            <CheckCircle className="h-4.5 w-4.5" />
                                        </motion.div>
                                    ) : isActive ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-primary"
                                        >
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </motion.div>
                                    ) : (
                                        <div className="h-4.5 w-4.5 border border-border/40 rounded-full" />
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Automation Summary (Appears after cycle) */}
                <motion.div
                    className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10 text-center"
                    animate={{ 
                        opacity: activeStep === WORKFLOW_STEPS.length - 1 ? 1 : 0.6,
                        y: activeStep === WORKFLOW_STEPS.length - 1 ? 0 : 5
                    }}
                >
                    <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                        Cycle Completed in 0.8s — Saving $4.20 per lead
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
