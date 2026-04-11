import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Interview an AI Employee - Test Before You Hire',
    description: 'Interview AI employees before hiring them. Chat with Alex (AI Sales Rep), Maya (AI Support Agent), or Priya (AI Marketing Strategist). No signup, no sales pitch — just a raw conversation.',
    keywords: ['interview AI', 'AI employee', 'AI sales rep', 'AI support agent', 'AI marketing strategist', 'hire AI agent'],
    alternates: { canonical: 'https://atulautomation.com/tools/interview-ai' },
    openGraph: {
        title: 'Interview Your AI Employee - Test Drive Before Hiring',
        description: 'Pick an AI candidate, ask them anything, and decide if they\'re worth hiring. No signup required.',
        url: 'https://atulautomation.com/tools/interview-ai',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Interview an AI Employee - Atul Automation' }],
    },
};

export default function InterviewAILayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
