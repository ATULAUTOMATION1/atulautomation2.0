import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Readiness Quiz - Is Your Business Ready for AI? | Atul Automation',
    description: 'Take our free 2-minute AI readiness quiz and discover how much AI automation can help your business. Get personalized recommendations instantly.',
    keywords: ['AI readiness quiz', 'automation assessment', 'business automation test', 'AI quiz', 'automation readiness'],
    alternates: { canonical: 'https://atulautomation.com/tools/ai-readiness-quiz' },
    openGraph: {
        title: 'AI Readiness Quiz - How Ready is Your Business for AI?',
        description: 'Free 2-minute assessment. Discover your AI automation potential and get personalized recommendations.',
    },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
