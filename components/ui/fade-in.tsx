"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string; // Corrected type
}

export function FadeIn({
    children,
    delay = 0,
    className = "",
}: FadeInProps) {
    // Map numerical delay to closest CSS class or use style
    // delay is in seconds in original framer code? original default was 0.
    // CSS classes are like delay-100 (ms).
    // If original delay=0.1 (s) -> 100ms.

    // We'll use inline style for arbitrary delays if needed, or just standard class.
    // For simplicity, we'll assume delay is small and use style.

    return (
        <div
            className={cn("opacity-0 animate-fade-in-up", className)}
            style={{ animationDelay: `${delay * 1000}ms` }}
        >
            {children}
        </div>
    );
}
