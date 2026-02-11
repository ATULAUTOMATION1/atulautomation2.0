"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-background pointer-events-none">
            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] text-foreground"
                style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                }}
            />

            {/* Floating Orbs - Primary (Orange) */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20"
            />

            {/* Floating Orbs - Secondary (Indigo) */}
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-secondary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20"
            />

            {/* Floating Orbs - Accent (Emerald) */}
            <motion.div
                animate={{
                    x: [-50, 50, -50],
                    y: [50, -50, 50],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-30 dark:opacity-10"
            />
        </div>
    );
}
