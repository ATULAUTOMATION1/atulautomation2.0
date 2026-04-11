import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Voice AI Demo - Talk to an AI Agent in Your Browser',
    description: 'Experience our interactive Voice AI Agent demo. Have a live phone conversation with Sarah, our AI receptionist, right in your browser. Powered by speech recognition & synthesis.',
    keywords: ['voice AI demo', 'AI phone agent', 'voice chatbot', 'AI receptionist', 'speech AI', 'Vapi alternative'],
    alternates: { canonical: 'https://atulautomation.com/tools/voice-ai-demo' },
    openGraph: {
        title: 'Voice AI Demo - Talk to Sarah, Our AI Agent',
        description: 'Have a live conversation with an AI receptionist in your browser. See what voice AI can do for your business.',
        url: 'https://atulautomation.com/tools/voice-ai-demo',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Voice AI Demo - Atul Automation' }],
    },
};

export default function VoiceAIDemoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
