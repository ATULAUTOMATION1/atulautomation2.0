"use client";

import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";

export function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-r from-primary via-orange-600 to-primary text-primary-foreground relative z-50 overflow-hidden animate-fade-in">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />

            <div className="container-custom py-2.5 flex items-center justify-center text-xs md:text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5 mr-2 animate-pulse" />
                <span>
                    <span className="font-bold">🚀 BETA LAUNCH:</span> Atul Automation v2.0 is live! Early adopters get 30% off.
                </span>
                <a href="#pricing" className="ml-3 font-bold hidden md:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-0.5 rounded-full transition-colors text-xs">
                    Claim Offer <ArrowRight className="h-3 w-3" />
                </a>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close banner"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}
