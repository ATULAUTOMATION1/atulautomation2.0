'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Brain, Zap, X } from 'lucide-react';
import Link from 'next/link';

export default function AprilFoolsPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenPrank = localStorage.getItem('april_fools_2026_seen');
        if (!hasSeenPrank) {
            // Show after a short delay for maximum impact
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const closePrank = () => {
        setIsOpen(false);
        localStorage.setItem('april_fools_2026_seen', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-500">
            <div className="relative w-full max-w-lg bg-card border-2 border-primary/30 rounded-3xl p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-[60px] -ml-16 -mb-16" />

                <button 
                    onClick={closePrank}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-widest">
                        <Sparkles className="h-4 w-4" />
                        Breaking News
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading leading-tight">
                         Introducing <span className="text-primary italic">Pre-Think AI™</span>
                    </h2>

                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        Atul Automation has cracked the final frontier. Our new neural-uplink core predicts your business needs <span className="text-foreground font-bold font-mono underline decoration-primary/50">0.5 seconds before you think them</span>. 
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                            <Brain className="h-6 w-6 text-violet-500 mx-auto mb-2" />
                            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Status</p>
                            <p className="text-xs font-bold font-mono text-emerald-500">Mind-Link Active</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-2xl border border-border/50">
                            <Zap className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Latency</p>
                            <p className="text-xs font-bold font-mono text-amber-500">-500ms (Negative)</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={closePrank}
                            className="btn-primary w-full py-4 text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Claim Your Neurons Now
                        </button>
                        <p className="text-[10px] text-muted-foreground/60 italic">
                             *Disclaimer: April Fools! We haven&apos;t mastered mind-reading yet... but we have mastered AI Automation.
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/50">
                        <p className="text-xs font-medium text-foreground mb-4">Want AI that&apos;s actually real and fast?</p>
                        <Link 
                            href="/#contact" 
                            onClick={closePrank}
                            className="text-primary font-bold text-sm hover:underline"
                        >
                            Book a Real Strategy Call →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
