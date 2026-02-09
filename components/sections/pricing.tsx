"use client";

import { Check, Star } from "lucide-react";

const PLANS = [
    {
        name: "Starter",
        price: "Free",
        desc: "Perfect for exploring automation potential.",
        features: ["Access to 5 AI Modules", "Basic Workflow Simulator", "Community Support", "Weekly Trends Feed"],
        cta: "Start Free",
        popular: false
    },
    {
        name: "Growth",
        price: "$499/mo",
        desc: "For businesses ready to scale operations.",
        features: ["Unlimited Workflow Steps", "Priority Support", "Custom JSON Configs", "API Access", "Dropshipping & Real Estate Modules"],
        cta: "Get Started",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "Full-scale digital transformation.",
        features: ["Dedicated AI Engineer", "Custom LLM Fine-tuning", "SLA & Uptime Guarantee", "White-label Options", "On-premise Deployment"],
        cta: "Contact Sales",
        popular: false
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="section-padding bg-background">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">Simple, Transparent <span className="text-primary">Pricing</span></h2>
                    <p className="text-muted-foreground text-lg">
                        Choose the plan that fits your automation journey. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PLANS.map((plan, i) => (
                        <div key={i} className={`relative bg-card border ${plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'} rounded-2xl p-8 shadow-sm flex flex-col`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                                <p className="text-sm text-muted-foreground">{plan.desc}</p>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, j) => (
                                    <div key={j} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-3 rounded-lg font-bold transition-all ${plan.popular
                                    ? 'btn-nature-primary'
                                    : 'bg-muted hover:bg-muted/80 text-foreground'
                                }`}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
