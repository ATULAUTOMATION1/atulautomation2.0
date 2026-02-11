"use client";

import { Check, Star, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        desc: "Explore automation potential.",
        features: ["5 AI Modules", "Basic Workflow Simulator", "Community Support", "Weekly Trends Feed"],
        cta: "Start Free",
        popular: false,
    },
    {
        name: "Growth",
        price: "$499",
        period: "/mo",
        desc: "For businesses ready to scale.",
        features: ["Unlimited Workflows", "Priority 24/7 Support", "Custom JSON Configs", "Full API Access", "All Industry Modules", "Advanced Analytics"],
        cta: "Get Started",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        desc: "Full-scale digital transformation.",
        features: ["Dedicated AI Engineer", "Custom LLM Fine-tuning", "SLA & Uptime Guarantee", "White-label Options", "On-premise Deploy", "Custom Integrations"],
        cta: "Contact Sales",
        popular: false,
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="section-padding bg-transparent">
            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-badge mb-4">
                        <Zap className="h-3.5 w-3.5" /> Pricing
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4">
                        Simple, Transparent <span className="text-primary">Pricing</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-muted-foreground text-lg">
                        Choose the plan that fits your automation journey. No hidden fees.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start max-w-5xl mx-auto">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`relative bg-card border-2 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${plan.popular
                                ? "border-primary shadow-lg shadow-primary/10 md:scale-105"
                                : "border-border hover:border-primary/20"
                                }`}
                        >
                            {plan.popular && (
                                <div className="bg-primary text-white text-xs font-bold px-4 py-2 text-center flex items-center justify-center gap-1.5">
                                    <Star className="h-3 w-3 fill-white" /> Most Popular
                                </div>
                            )}

                            <div className="p-8 pb-6">
                                <h3 className="text-base font-semibold text-muted-foreground mb-3">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                                </div>
                                <p className="text-sm text-muted-foreground">{plan.desc}</p>
                            </div>

                            <div className="px-8 pb-8 flex-1 flex flex-col">
                                <div className="space-y-3 flex-1 mb-8">
                                    {plan.features.map((f, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <Check className={`h-4 w-4 shrink-0 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                                            <span className="text-sm">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${plan.popular
                                    ? "btn-primary w-full"
                                    : "bg-muted hover:bg-muted/70 text-foreground"
                                    }`}>
                                    {plan.cta} <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
