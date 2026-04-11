'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdSenseAdProps {
    /** Ad slot ID from your AdSense account */
    slot: string;
    /** Ad format — 'auto' for responsive, 'fluid' for in-feed, 'rectangle' etc */
    format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
    /** Responsive sizing */
    responsive?: boolean;
    /** Optional className for the wrapper div */
    className?: string;
}

/**
 * Reusable Google AdSense ad unit component.
 * 
 * Usage:
 *   <AdSenseAd slot="1234567890" />
 *   <AdSenseAd slot="1234567890" format="fluid" />
 */
export function AdSenseAd({ slot, format = 'auto', responsive = true, className = '' }: AdSenseAdProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const isAdLoaded = useRef(false);

    useEffect(() => {
        // Only push once per component instance
        if (isAdLoaded.current) return;

        try {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                window.adsbygoogle.push({});
                isAdLoaded.current = true;
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`ad-container my-8 ${className}`} ref={adRef}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5677457553651550"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? 'true' : 'false'}
            />
        </div>
    );
}

/**
 * In-article ad unit — optimized placement between content sections.
 * 
 * Usage:
 *   <InArticleAd />
 */
export function InArticleAd() {
    const adRef = useRef<HTMLDivElement>(null);
    const isAdLoaded = useRef(false);

    useEffect(() => {
        if (isAdLoaded.current) return;
        try {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                window.adsbygoogle.push({});
                isAdLoaded.current = true;
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className="ad-container my-8 flex justify-center">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-5677457553651550"
                data-ad-slot=""
            />
        </div>
    );
}
