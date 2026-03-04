"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export function HoliPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user already dismissed this session
        const dismissed = sessionStorage.getItem("holi-popup-dismissed");
        if (!dismissed) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem("holi-popup-dismissed", "true");
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

            {/* Popup Content */}
            <div
                className="relative z-10 max-w-lg w-full animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    aria-label="Close Holi popup"
                    className="absolute -top-3 -right-3 z-20 bg-white text-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all"
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
                        className="w-full h-auto"
                        priority
                    />

                    {/* Bottom Overlay with CTA */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                        <div className="text-center">
                            <p className="text-white/90 text-sm mb-3">
                                Wishing you a colorful & joyful Holi! 🎉
                            </p>
                            <button
                                onClick={handleClose}
                                className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white font-bold px-8 py-2.5 rounded-full text-sm hover:shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all"
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

            <style jsx>{`
                @keyframes scale-in {
                    0% { transform: scale(0.7); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
