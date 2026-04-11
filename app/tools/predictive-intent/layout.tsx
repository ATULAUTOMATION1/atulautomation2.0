import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Predictive Intent Engine - AI-Powered Lead Detection',
    description: 'Our AI monitors LinkedIn, Twitter, Crunchbase & job boards 24/7 to detect buying intent. Auto-generates hyper-personalized outreach before prospects know they need you.',
    keywords: ['predictive intent', 'AI lead detection', 'buying intent signals', 'AI sales automation', 'intent-based marketing', 'signal-based selling'],
    alternates: { canonical: 'https://atulautomation.com/tools/predictive-intent' },
    openGraph: {
        title: 'Predictive Intent Engine - Reach Prospects Before Competitors',
        description: 'AI-powered buying intent detection. Monitor public signals, auto-generate personalized outreach, and book meetings on autopilot.',
        url: 'https://atulautomation.com/tools/predictive-intent',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Predictive Intent Engine - Atul Automation' }],
    },
};

export default function PredictiveIntentLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
