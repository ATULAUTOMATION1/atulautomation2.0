"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-primary text-primary-foreground relative z-50 overflow-hidden"
            >
                <div className="container-custom py-2 flex items-center justify-center text-xs md:text-sm font-medium">
                    <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                    <span>
                        <span className="font-bold">BETA LAUNCH:</span> Atul Automation v2.0 is live! Early adopters get 30% off Pro plans.
                    </span>
                    <span className="mx-2 hidden md:inline">|</span>
                    <a href="#pricing" className="underline hover:no-underline font-bold hidden md:inline">
                        Claim Offer
                    </a>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Close banner"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
