"use client";

import { useEffect, useState } from "react";

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-background pointer-events-none">
            {/* Grid Pattern — pure CSS, no JS */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] text-foreground"
                style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                }}
            />

            {/* Floating Orbs — pure CSS animations instead of framer-motion */}
            <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-primary/8 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-15 animate-orb-1 will-change-transform" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-secondary/8 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-15 animate-orb-2 will-change-transform" />
        </div>
    );
}
