import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Courses - The Automation Knowledge Hub',
    description: 'Free AI automation courses, guides, video tutorials, and prompt libraries. Learn chatbot development, workflow automation, AI agents, CRM setup, and more — from beginner to advanced.',
    keywords: ['AI automation courses', 'chatbot tutorial', 'workflow automation guide', 'AI agent course', 'free automation training', 'business automation learning'],
    alternates: { canonical: 'https://atulautomation.com/courses' },
    openGraph: {
        title: 'The Automation Knowledge Hub',
        description: 'Master AI automation with 30+ free courses, guides, videos, and prompt libraries.',
        url: 'https://atulautomation.com/courses',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Automation Knowledge Hub - Atul Automation' }],
    },
};

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
