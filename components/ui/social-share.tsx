'use client';

import { useState } from 'react';
import { Share2, MessageCircle, Twitter, Linkedin, Link2, Check } from 'lucide-react';

interface SocialShareProps {
    url?: string;
    title?: string;
    description?: string;
    variant?: 'floating' | 'inline';
}

export function SocialShare({ url, title, description, variant = 'inline' }: SocialShareProps) {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://atulautomation.com');
    const shareTitle = title || 'Atul Automation - AI Agents & Workflow Automation';
    const shareDesc = description || 'Automate your business with AI chatbots, workflow automation & marketing.';

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedDesc = encodeURIComponent(shareDesc);

    const shareLinks = [
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodedTitle}%20-%20${encodedDesc}%0A${encodedUrl}`,
            color: 'hover:bg-green-500/10 hover:text-green-500',
            bg: 'bg-green-500',
        },
        {
            name: 'Twitter',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: 'hover:bg-sky-500/10 hover:text-sky-500',
            bg: 'bg-sky-500',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:bg-blue-600/10 hover:text-blue-600',
            bg: 'bg-blue-600',
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const input = document.createElement('input');
            input.value = shareUrl;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (variant === 'floating') {
        return (
            <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
                {isOpen && (
                    <div className="flex flex-col gap-2 animate-fade-in-up">
                        {shareLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-lg text-sm font-medium transition-all ${link.color}`}
                                title={`Share on ${link.name}`}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-lg text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3.5 rounded-full bg-primary text-white shadow-lg hover:bg-orange-600 transition-all hover:scale-105"
                    aria-label="Share"
                >
                    <Share2 className="h-5 w-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground mr-1">Share:</span>
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium transition-all ${link.color}`}
                    title={`Share on ${link.name}`}
                >
                    <link.icon className="h-3.5 w-3.5" />
                    {link.name}
                </a>
            ))}
            <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium transition-all hover:bg-primary/10 hover:text-primary"
            >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
}
