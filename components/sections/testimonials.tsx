"use client";

import { Star } from "lucide-react";

const REVIEWS = [
    {
        quote: "Atul Automation completely rebuilt our customer service stack. We went from 2 hour response times to instant replies.",
        author: "Sarah J.",
        role: "CEO, TechFlow",
        rating: 5
    },
    {
        quote: "The dropshipping module alone saved us 20 hours a week. It's like having a full-time employee that never sleeps.",
        author: "Mike T.",
        role: "Founder, E-Com Pro",
        rating: 5
    },
    {
        quote: "Incredible attention to detail. The custom JSON config loader allowed our devs to integrate seamlessly.",
        author: "Elena R.",
        role: "CTO, DataSystems",
        rating: 5
    }
];

export function Testimonials() {
    return (
        <section className="section-padding bg-muted/20">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Trusted by <span className="text-primary">Innovators</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, i) => (
                        <div key={i} className="bg-background border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex space-x-1 mb-4">
                                {[...Array(review.rating)].map((_, j) => (
                                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-lg mb-6 leading-relaxed">"{review.quote}"</p>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary mr-3">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{review.author}</div>
                                    <div className="text-xs text-muted-foreground">{review.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
