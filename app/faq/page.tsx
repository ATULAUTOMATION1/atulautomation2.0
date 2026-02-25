import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'FAQ - AI Automation Questions Answered | Atul Automation',
    description: 'Frequently asked questions about AI automation, chatbots, workflow automation, pricing, and how Atul Automation can help your business grow. Built to Automate, Designed to Scale.',
    alternates: { canonical: 'https://atulautomation.com/faq' },
};

const faqs = [
    {
        category: 'General',
        questions: [
            { q: 'What is AI automation?', a: 'AI automation uses artificial intelligence to perform repetitive tasks without human intervention. This includes chatbots that answer customer queries, workflows that process data automatically, and AI agents that make intelligent decisions. At Atul Automation, we build custom AI solutions tailored to your business.' },
            { q: 'What services does Atul Automation offer?', a: 'We offer: AI Chatbots (WhatsApp, website, Instagram), Workflow Automation (using n8n, Make, Zapier), AI Agents for complex tasks, CRM Automation, Marketing Automation, Web Development, and custom AI solutions. Built to Automate, Designed to Scale.' },
            { q: 'Which industries do you serve?', a: 'We serve all industries including Real Estate, E-Commerce, Healthcare, Education, Restaurants, Law Firms, Fitness, Travel, Manufacturing, IT, and more. Check our industry pages for specific solutions.' },
            { q: 'Do you work with businesses outside India?', a: 'Yes! While we\'re India\'s best AI automation agency, we work with businesses globally. Our remote-first approach means we can serve clients anywhere.' },
        ],
    },
    {
        category: 'Pricing & Process',
        questions: [
            { q: 'How much does AI automation cost?', a: 'Our solutions start from ₹10,000/month for basic chatbots to ₹50,000+/month for complete automation suites. Each solution is custom-built, so pricing depends on your specific needs. We offer a free consultation to provide an accurate quote.' },
            { q: 'How long does it take to set up?', a: 'Simple chatbots: 2-3 days. Workflow automation: 1-2 weeks. Complex AI agent systems: 2-4 weeks. We follow an agile approach and you\'ll see results from day one.' },
            { q: 'Do I need technical knowledge?', a: 'Absolutely not! We handle all the technical work. Once set up, your AI tools run automatically. We provide training and ongoing support to ensure everything works perfectly.' },
            { q: 'Do you offer a free trial?', a: 'We offer a free consultation where we analyze your business and show you exactly what automation can do. For chatbots, we can set up a demo within 48 hours so you can see the results before committing.' },
        ],
    },
    {
        category: 'Technical',
        questions: [
            { q: 'What AI models do you use?', a: 'We use the best models for each task — GPT-4, Claude, Gemini, and custom fine-tuned models. The choice depends on your use case, budget, and performance requirements.' },
            { q: 'Can AI chatbots handle multiple languages?', a: 'Yes! Our chatbots support Hindi, English, Tamil, Telugu, Gujarati, Marathi, Bengali, and many more Indian languages. We can also add any global language.' },
            { q: 'How do you integrate with existing tools?', a: 'We integrate with 500+ tools including WhatsApp, Google Sheets, Tally, Razorpay, UPI, Shopify, WordPress, Slack, HubSpot, Zoho, and more. If your tool has an API, we can integrate it.' },
            { q: 'Is my data secure?', a: 'Absolutely. We follow industry-standard security practices — data encryption, secure APIs, GDPR compliance, and data stored in ISO-certified data centers. Your data is never shared with third parties.' },
        ],
    },
    {
        category: 'ROI & Results',
        questions: [
            { q: 'What ROI can I expect?', a: 'Most clients see 3-10x ROI within the first 3 months. Chatbots reduce support costs by 40%, workflow automation saves 15-20 hours/week, and AI CRM increases conversion rates by 3x. Use our free ROI calculator for a personalized estimate.' },
            { q: 'How do you measure success?', a: 'We track key metrics: response time, customer satisfaction, leads generated, time saved, cost reduced, and revenue impact. Monthly reports keep you informed of your automation\'s performance.' },
            { q: 'What if the AI makes mistakes?', a: 'We build in human-in-the-loop safeguards. Complex queries are automatically escalated to your human team. The AI learns from corrections and improves over time. You have full control over what the AI can and cannot do.' },
            { q: 'Can I cancel anytime?', a: 'Yes, we believe in earning your business every month. No long-term contracts required. However, most clients stay because the ROI speaks for itself.' },
        ],
    },
];

export default function FAQPage() {
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.flatMap(cat =>
            cat.questions.map(faq => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
            }))
        ),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <main className="min-h-screen pt-24 md:pt-32 pb-24">
                <section className="container-custom max-w-4xl mb-16">
                    <div className="text-center">
                        <span className="section-badge mb-4">
                            <HelpCircle className="h-3 w-3" />
                            FAQ
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Frequently Asked{' '}
                            <span className="text-gradient">Questions</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Everything you need to know about AI automation for your business.
                        </p>
                    </div>
                </section>

                <section className="container-custom max-w-4xl">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                                    {catIndex + 1}
                                </span>
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, faqIndex) => (
                                    <div key={faqIndex} className="rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-colors">
                                        <h3 className="font-semibold mb-2">{faq.q}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* CTA */}
                <section className="container-custom max-w-4xl mt-8">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            We&apos;re here to help. Get a free consultation and ask us anything.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/#contact" className="btn-primary">
                                Get Free Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Link>
                            <Link href="/tools/roi-calculator" className="btn-secondary">
                                Try ROI Calculator
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
