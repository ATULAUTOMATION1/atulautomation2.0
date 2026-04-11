import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Swarm Visualizer - Multi-Agent AI Workforce',
    description: 'See how 4 specialized AI agents collaborate autonomously: The Hunter, The Analyst, The Closer & The Manager. Watch them detect signals, qualify leads, and send outreach in real-time.',
    keywords: ['AI swarm', 'multi-agent AI', 'AI workforce', 'autonomous agents', 'AI team', 'agent-to-agent communication'],
    alternates: { canonical: 'https://atulautomation.com/tools/swarm' },
    openGraph: {
        title: 'AI Swarm Visualizer - Your Autonomous AI Workforce',
        description: 'Watch 4 AI agents collaborate in real-time: detect signals, qualify leads, draft outreach, and QA — fully autonomously.',
        url: 'https://atulautomation.com/tools/swarm',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI Swarm Visualizer - Atul Automation' }],
    },
};

export default function SwarmLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
