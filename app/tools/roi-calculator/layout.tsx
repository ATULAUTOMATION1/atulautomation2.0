import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Automation ROI Calculator - Free Tool | Atul Automation',
    description: 'Calculate how much time and money your business can save with AI automation. Free ROI calculator — see your potential savings in 30 seconds.',
    keywords: ['ROI calculator', 'AI automation savings', 'automation cost calculator', 'business automation ROI', 'AI chatbot ROI'],
    alternates: {
        canonical: 'https://atulautomation.com/tools/roi-calculator',
    },
    openGraph: {
        title: 'AI Automation ROI Calculator - How Much Can You Save?',
        description: 'Free tool: Calculate your potential savings from AI automation in 30 seconds.',
        type: 'website',
    },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
