"use client";

import { Star, Quote, MessageSquare } from "lucide-react";

const REVIEWS = [
    {
        quote: "Atul Automation completely rebuilt our customer service stack. We went from 2 hour response times to instant replies.",
        author: "Sarah Johnson",
        role: "CEO, TechFlow",
        avatar: "SJ",
        color: "bg-gradient-to-br from-primary to-orange-400",
        accent: "border-t-primary",
    },
    {
        quote: "The dropshipping module alone saved us 20 hours a week. It's like having a full-time employee that never sleeps.",
        author: "Mike Turner",
        role: "Founder, E-Com Pro",
        avatar: "MT",
        color: "bg-gradient-to-br from-blue-500 to-blue-400",
        accent: "border-t-blue-500",
    },
    {
        quote: "Incredible attention to detail. The custom JSON config loader allowed our devs to integrate seamlessly within days.",
        author: "Elena Rossi",
        role: "CTO, DataSystems",
        avatar: "ER",
        color: "bg-gradient-to-br from-violet-500 to-violet-400",
        accent: "border-t-violet-500",
    }
];

export function Testimonials() {
    return (
        <section className="section-padding bg-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />

            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <MessageSquare className="h-3.5 w-3.5" /> Testimonials
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Trusted by <span className="text-primary">Innovators</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        See what our clients say about AI automation impact.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {REVIEWS.map((r, i) => (
                        <div
                            key={i}
                            className={`bg-card border border-border border-t-[3px] ${r.accent} p-7 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group opacity-0 animate-fade-in-up delay-${(i + 1) * 100}`}
                        >
                            <Quote className="absolute top-5 right-5 h-10 w-10 text-muted-foreground/5 group-hover:text-primary/10 transition-colors duration-500" />

                            <div className="flex gap-0.5 mb-5">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-foreground leading-relaxed mb-8 relative z-10">&quot;{r.quote}&quot;</p>

                            <div className="flex items-center gap-3 pt-5 border-t border-border">
                                <div className={`h-11 w-11 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                                    {r.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{r.author}</p>
                                    <p className="text-xs text-muted-foreground">{r.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
