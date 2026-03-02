'use client';

import { useState, useEffect } from 'react';
import { X, Zap, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export function LeadCapturePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // Check if user already dismissed or subscribed
        const dismissed = localStorage.getItem('leadPopupDismissed');
        if (dismissed) return;

        // Show after 45 seconds on page
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 45000);

        // Also show on scroll (60% of page)
        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 60 && !localStorage.getItem('leadPopupDismissed')) {
                setIsOpen(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const dismiss = () => {
        setIsOpen(false);
        localStorage.setItem('leadPopupDismissed', Date.now().toString());
    };

    const validateForm = () => {
        if (!name.trim()) {
            setErrorMsg('Please enter your name');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMsg('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!validateForm()) return;

        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                localStorage.setItem('leadPopupDismissed', 'subscribed');
                setTimeout(() => setIsOpen(false), 3000);
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Network error. Please check your connection.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Close button */}
                <button
                    onClick={dismiss}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors z-10"
                    aria-label="Close"
                >
                    <X className="h-5 w-5 text-muted-foreground" />
                </button>

                {/* Gradient header */}
                <div className="bg-gradient-to-r from-primary to-orange-500 px-6 py-8 text-white text-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                        Free AI Automation Guide
                    </h3>
                    <p className="text-white/80 text-sm">
                        Get our exclusive guide: &quot;10 Ways to Automate Your Business & Save 20+ Hours/Week&quot;
                    </p>
                </div>

                {/* Form */}
                <div className="p-6">
                    {status === 'success' ? (
                        <div className="text-center py-4">
                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                            <h4 className="text-lg font-bold mb-1">You&apos;re In! 🎉</h4>
                            <p className="text-sm text-muted-foreground">
                                Check your email for the guide. Welcome to the Atul Automation community!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <input
                                    aria-label="Your Name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <input
                                    aria-label="Your Email Address"
                                    type="email"
                                    placeholder="Your Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="btn-primary w-full disabled:opacity-50"
                            >
                                {status === 'loading' ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Get Free Guide <ArrowRight className="ml-1.5 h-4 w-4" />
                                    </>
                                )}
                            </button>

                            {status === 'error' && (
                                <p className="text-red-500 text-xs text-center font-medium">{errorMsg || 'Something went wrong. Please try again.'}</p>
                            )}

                            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500" /> No spam ever</span>
                                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500" /> Unsubscribe anytime</span>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
