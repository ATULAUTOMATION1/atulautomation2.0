'use client';

import { motion } from "framer-motion";

const LOGOS = [
    { name: "TechCorp", icon: "🚀" },
    { name: "GlobalFinance", icon: "🏦" },
    { name: "MediHealth AI", icon: "⚡" },
    { name: "Quantum Retail", icon: "🛍️" },
    { name: "Nexus Logistics", icon: "🚢" },
    { name: "Stellar Edu", icon: "🎓" },
];

export function TrustedBy() {
    return (
        <section className="py-10 border-b border-border/50 bg-muted/10 overflow-hidden">
            <div className="container-custom">
                <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
                    Trusted by innovative teams worldwide
                </p>
                
                <div className="relative flex overflow-hidden group">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-background to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-background to-transparent" />

                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                        className="flex items-center space-x-16 md:space-x-24 whitespace-nowrap pl-8 md:pl-12"
                    >
                        {/* Double the list for seamless loop */}
                        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                            <div key={i} className="flex items-center gap-3 text-muted-foreground/60 hover:text-foreground grayscale hover:grayscale-0 transition-all duration-300">
                                <span className="text-2xl">{logo.icon}</span>
                                <span className="text-xl font-bold font-heading">{logo.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
