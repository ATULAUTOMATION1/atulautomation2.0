"use client";

import { MessageSquare, Users, Globe } from "lucide-react";
import Link from "next/link";

export function Community() {
    return (
        <section id="community" className="section-padding bg-background relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-background to-muted/50 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the <span className="text-primary">Hive Mind</span></h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Connect with 5,000+ automators, developers, and business owners. Share workflows, get help, and stay ahead of the curve.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="#" className="btn-nature-primary flex items-center justify-center space-x-2">
                                    <MessageSquare className="h-5 w-5" />
                                    <span>Join Discord Server</span>
                                </Link>
                                <Link href="#" className="flex items-center justify-center space-x-2 px-8 py-3 rounded-full border border-border hover:bg-muted transition-colors font-semibold">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span>Visit Forum</span>
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                                <Users className="h-8 w-8 text-primary mb-4" />
                                <div className="text-2xl font-bold">5.2k+</div>
                                <div className="text-sm text-muted-foreground">Active Members</div>
                            </div>
                            <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300 translate-y-4">
                                <MessageSquare className="h-8 w-8 text-secondary mb-4" />
                                <div className="text-2xl font-bold">120+</div>
                                <div className="text-sm text-muted-foreground">Daily Topics</div>
                            </div>
                            <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                                <Globe className="h-8 w-8 text-accent mb-4" />
                                <div className="text-2xl font-bold">15+</div>
                                <div className="text-sm text-muted-foreground">Countries</div>
                            </div>
                            <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300 translate-y-4">
                                <div className="h-8 w-8 mb-4 font-bold text-2xl text-primary">#</div>
                                <div className="text-2xl font-bold">Top 1%</div>
                                <div className="text-sm text-muted-foreground">Automation Community</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
