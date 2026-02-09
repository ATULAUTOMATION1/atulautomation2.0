"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { ParticleBackground } from "./particle-background";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <ParticleBackground />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-background/80 dark:bg-background/90 z-0 pointer-events-none" />

            <div className="container-custom relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    AI Automation Agency 2.0
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter mb-6"
                >
                    Build to <span className="text-gradient">Automate</span>,
                    <br className="hidden md:block" /> Design to <span className="text-primary">Scale</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
                >
                    We combine nature's adaptability with machine precision to build systems that grow with you. Deploy intelligent agents and scale effortlessly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <Link href="#contact" className="btn-nature-primary w-full sm:w-auto hover:scale-105 transition-transform">
                        Start Automating
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link href="#demo" className="inline-flex items-center justify-center px-8 py-3 font-sans font-semibold rounded-full border border-border hover:bg-muted w-full sm:w-auto transition-all">
                        <Play className="mr-2 h-4 w-4 fill-current" />
                        Watch Demo
                    </Link>
                </motion.div>

                {/* Stats / Trust */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-border pt-10"
                >
                    <div>
                        <h4 className="text-3xl font-bold">300%</h4>
                        <p className="text-sm text-muted-foreground">More Leads</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold">150%</h4>
                        <p className="text-sm text-muted-foreground">Conversion</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold">24/7</h4>
                        <p className="text-sm text-muted-foreground">Support</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold">50+</h4>
                        <p className="text-sm text-muted-foreground">Modules</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
