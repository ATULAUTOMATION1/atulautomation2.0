"use client";

import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Community() {
    return (
        <section id="community" className="section-padding bg-transparent">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <Users className="h-3.5 w-3.5" /> Community
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Join the <span className="text-primary">Movement</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10">
                        Connect with automation builders, share knowledge, and grow together.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 opacity-0 animate-fade-in-up delay-100">
                        <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="btn-primary group">
                            Join Discord <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <Link href="/blog" className="btn-secondary">
                            Visit Blog
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
