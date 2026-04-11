import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Roast My Workflow - Free AI Workflow Analyzer',
    description: 'Let our AI ruthlessly analyze your manual business processes. Find out how much time and money you\'re wasting with an honest, no-BS automation assessment.',
    keywords: ['workflow analyzer', 'automation assessment', 'process optimization', 'AI workflow audit', 'manual process analyzer', 'free automation tool'],
    alternates: { canonical: 'https://atulautomation.com/tools/roast-my-workflow' },
    openGraph: {
        title: 'Roast My Workflow 🔥 - Free AI Workflow Analyzer',
        description: 'Describe your manual process and let our AI roast it. See exactly how much time and money you\'re burning.',
        url: 'https://atulautomation.com/tools/roast-my-workflow',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Roast My Workflow - Atul Automation' }],
    },
};

export default function RoastLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
