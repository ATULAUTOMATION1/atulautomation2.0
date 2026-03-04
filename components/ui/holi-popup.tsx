"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export function HoliPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Check if user already dismissed this session
        try {
            const dismissed = sessionStorage.getItem("holi-2026-dismissed");
            if (dismissed) return;
        } catch {
            // sessionStorage not available, show anyway
        }

        const timer = setTimeout(() => {
            setIsVisible(true);
            // Trigger animation after mount
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsVisible(false);
            try {
                sessionStorage.setItem("holi-2026-dismissed", "true");
            } catch {
                // ignore
            }
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 99999 }}
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: isAnimating ? 1 : 0 }}
            />

            {/* Popup Content */}
            <div
                className="relative max-w-lg w-full transition-all duration-400 ease-out"
                style={{
                    zIndex: 10,
                    transform: isAnimating ? "scale(1)" : "scale(0.7)",
                    opacity: isAnimating ? 1 : 0,
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    aria-label="Close Holi popup"
                    className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all"
                    style={{ zIndex: 20 }}
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Poster Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                    <Image
                        src="/holi-poster.png"
                        alt="Happy Holi from Atul Automation"
                        width={800}
                        height={800}
                        className="w-full h-auto block"
                        priority
                        unoptimized
                    />

                    {/* Bottom Overlay with CTA */}
                    <div
                        className="absolute bottom-0 left-0 right-0 p-6 pt-16"
                        style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)"
                        }}
                    >
                        <div className="text-center">
                            <p className="text-white/90 text-sm mb-3">
                                Wishing you a colorful &amp; joyful Holi! 🎉
                            </p>
                            <button
                                onClick={handleClose}
                                className="text-white font-bold px-8 py-2.5 rounded-full text-sm hover:shadow-lg hover:scale-105 transition-all"
                                style={{
                                    background: "linear-gradient(to right, #ec4899, #a855f7, #eab308)"
                                }}
                            >
                                🌈 Let&apos;s Celebrate!
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating Color Particles */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="absolute -top-2 -right-6 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0.3s" }} />
                <div className="absolute -bottom-3 -left-5 w-7 h-7 bg-green-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0.6s" }} />
                <div className="absolute -bottom-4 -right-3 w-5 h-5 bg-purple-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0.9s" }} />
                <div className="absolute top-1/2 -left-6 w-4 h-4 bg-blue-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: "0.4s" }} />
                <div className="absolute top-1/3 -right-5 w-5 h-5 bg-orange-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: "0.7s" }} />
            </div>
        </div>
    );
}
