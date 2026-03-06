import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'FAQ - AI Automation Questions Answered',
    description: 'Frequently asked questions about AI automation, chatbots, workflow automation, pricing, and implementation. Get clear answers about ROI, costs, and how AI agents can transform your business.',
    alternates: { canonical: 'https://atulautomation.com/faq' },
    keywords: ['AI automation FAQ', 'chatbot pricing', 'workflow automation cost', 'AI agent questions', 'business automation guide'],
};

const faqs = [
    {
        category: 'General',
        questions: [
            { q: 'What is AI automation?', a: 'AI automation uses artificial intelligence to perform repetitive tasks without human intervention. This includes chatbots that answer customer queries 24/7, workflows that process data automatically, and AI agents that make intelligent decisions. At Atul Automation, we build custom AI solutions tailored to your business — whether you\'re in the US, India, or anywhere globally.' },
            { q: 'What services does Atul Automation offer?', a: 'We offer: AI Chatbots (WhatsApp, website, Instagram), Workflow Automation (using n8n, Make, Zapier), Autonomous AI Agents for complex tasks, CRM Automation, Marketing Automation, Website Development, and custom AI solutions. We serve businesses of all sizes — from startups to enterprises.' },
            { q: 'Which industries do you serve?', a: 'We serve all industries including Real Estate, E-Commerce, Healthcare, Education, SaaS, Financial Services, Restaurants, Law Firms, Fitness, Travel, Manufacturing, Marketing Agencies, and more. Check our industry pages for specific solutions tailored to your sector.' },
            { q: 'Do you work with businesses outside India?', a: 'Absolutely! We serve clients across the United States, United Kingdom, Canada, Australia, and globally. Our remote-first approach with async communication means timezone differences are never an issue. Many of our clients are US-based startups and enterprises.' },
            { q: 'What makes Atul Automation different from other agencies?', a: 'We combine cutting-edge AI models (GPT-4, Claude, Gemini) with deep business understanding. Unlike template-based solutions, we build custom AI systems tailored to your specific workflows. Our average client sees ROI within 30-60 days, and we offer transparent pricing with no long-term contracts.' },
        ],
    },
    {
        category: 'Pricing & Process',
        questions: [
            { q: 'How much does AI automation cost?', a: 'Our solutions range from $500/month for basic chatbots to $5,000+/month for complete enterprise automation suites. Basic chatbot: $500-$2,000. Growth automation (CRM + chatbot + workflows): $2,500-$10,000. Enterprise suite: $10,000-$50,000+. Each solution is custom-built, so pricing depends on your specific needs. We offer a free consultation to provide an accurate quote.' },
            { q: 'How long does it take to set up?', a: 'Simple chatbots: 3-5 business days. Workflow automation: 1-2 weeks. Complex AI agent systems: 2-6 weeks. We follow an agile approach and you\'ll see incremental results from week one. Most clients are fully operational within 30 days.' },
            { q: 'Do I need technical knowledge?', a: 'Absolutely not! We handle all the technical work — from architecture to deployment. Once set up, your AI tools run automatically. We provide comprehensive training, documentation, and ongoing support to ensure everything works perfectly.' },
            { q: 'Do you offer a free trial or demo?', a: 'We offer a free consultation where we analyze your business and show you exactly what automation can do, including projected ROI. For chatbots, we can set up a working demo within 48 hours so you can experience the results before committing. No credit card required.' },
            { q: 'What is the typical ROI timeline?', a: 'Most businesses see positive ROI within 30-60 days. For chatbots, savings are immediate — you reduce support costs from day one. Workflow automations typically save 15-20 hours per week. Our average client achieves 3-10x ROI within the first 3 months. Use our free ROI calculator for a personalized estimate.' },
        ],
    },
    {
        category: 'Technical',
        questions: [
            { q: 'What AI models do you use?', a: 'We use the best models for each task — GPT-4 and GPT-4o for conversational AI, Claude 3.5 for analytical tasks, Gemini for multimodal applications, and custom fine-tuned models for specialized use cases. The choice depends on your use case, budget, and performance requirements. We always recommend the most cost-effective option.' },
            { q: 'Can AI chatbots handle multiple languages?', a: 'Yes! Our chatbots support 95+ languages including English, Spanish, French, German, Hindi, Mandarin, Arabic, Portuguese, and many more. They can automatically detect the user\'s language and respond accordingly — perfect for businesses serving diverse markets.' },
            { q: 'How do you integrate with existing tools?', a: 'We integrate with 500+ tools including Slack, HubSpot, Salesforce, Zoho, Google Workspace, Microsoft 365, Shopify, WordPress, Stripe, QuickBooks, WhatsApp, Instagram, and more. If your tool has an API, we can integrate it. We also build custom API connectors when needed.' },
            { q: 'Is my data secure?', a: 'Absolutely. We follow enterprise-grade security practices — AES-256 data encryption, SOC 2 compliant hosting, GDPR/CCPA compliance, and data stored in ISO-certified data centers. Your data is never shared with third parties, and we sign NDAs as standard practice.' },
            { q: 'What is the difference between a chatbot and an AI agent?', a: 'A chatbot responds to user messages with pre-defined or AI-generated answers — it\'s reactive. An AI agent goes further: it can autonomously plan multi-step tasks, use external tools, make decisions, and execute complex workflows without human input. Think of chatbots as customer-facing, while AI agents handle back-office operations autonomously.' },
        ],
    },
    {
        category: 'ROI & Results',
        questions: [
            { q: 'What ROI can I expect from AI automation?', a: 'Most clients see 3-10x ROI within the first 3 months. Specifically: AI chatbots reduce support costs by 40-60%, workflow automation saves 15-20+ hours/week, AI CRM increases conversion rates by 2-3x, and AI marketing generates 3x more qualified leads. Results vary by industry and implementation scope.' },
            { q: 'How do you measure success?', a: 'We track key metrics tailored to your goals: response time reduction, customer satisfaction (CSAT) scores, leads generated, conversion rate improvement, time saved per week, cost per interaction reduction, and overall revenue impact. You receive monthly performance reports with actionable insights.' },
            { q: 'What if the AI makes mistakes?', a: 'We build in human-in-the-loop safeguards at every level. Complex or sensitive queries are automatically escalated to your human team with full context. The AI learns from corrections and improves over time. You have full control over what the AI can and cannot do, with configurable guardrails and approval workflows.' },
            { q: 'Can I cancel anytime?', a: 'Yes — no long-term contracts required. We believe in earning your business every month through measurable results. That said, our client retention rate is over 95% because the ROI speaks for itself. We also offer month-to-month and quarterly billing options.' },
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
