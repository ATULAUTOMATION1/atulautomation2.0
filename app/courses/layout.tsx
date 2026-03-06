import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Courses - The Automation Knowledge Hub',
    description: 'Free AI automation courses, guides, video tutorials, and prompt libraries. Learn chatbot development, workflow automation, AI agents, CRM setup, and more — from beginner to advanced.',
    keywords: ['AI automation courses', 'chatbot tutorial', 'workflow automation guide', 'AI agent course', 'free automation training', 'business automation learning'],
    alternates: { canonical: 'https://atulautomation.com/courses' },
    openGraph: {
        title: 'The Automation Knowledge Hub | Atul Automation',
        description: 'Master AI automation with 30+ free courses, guides, videos, and prompt libraries.',
        url: 'https://atulautomation.com/courses',
    },
};

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
