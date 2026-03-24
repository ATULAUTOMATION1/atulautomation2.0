"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            // Show after a slight delay to not overwhelm the user immediately
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent", "true");
        // Here you could initialize additional tracking if conditionally blocked
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookie_consent", "false");
        // Handle logic for declining tracking
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom-5 duration-500">
            <div className="container-custom max-w-5xl">
                <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

                    <div className="flex items-start gap-4 relative z-10 w-full md:w-auto flex-1">
                        <div className="mt-1 bg-primary/10 p-2.5 rounded-full shrink-0">
                            <Cookie className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground mb-1 text-lg">We use cookies</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed balance">
                                We use cookies, including Google AdSense advertising cookies, to personalize content, ads, and analyze traffic. By clicking "Accept", you consent to our use of cookies per our <Link href="/privacy" className="underline text-primary hover:text-orange-500 transition-colors">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0 relative z-10">
                        <button
                            onClick={declineCookies}
                            className="flex-1 md:flex-none px-4 py-2.5 text-sm font-semibold text-foreground bg-muted hover:bg-muted/80 border border-border rounded-xl transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-orange-600 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                        >
                            Accept All
                        </button>
                    </div>

                    {/* Close Icon for top right on mobile */}
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground md:hidden"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
