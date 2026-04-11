import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Play, MessageSquare } from "lucide-react";
import { WorkflowVisualizer } from "@/components/modules/workflow-visualizer";
import { CapabilityDemoSection } from "./demo-section";

// Service data — fully available at build time for SSR
const SERVICE_DATA: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    metaDescription: string;
    features: string[];
    workflowSteps: { step: number; title: string; desc: string; icon: string }[];
    benefits: { title: string; desc: string }[];
    demoType: 'chatbot' | 'workflow' | 'webdev' | 'none';
}> = {
    "ai-agents": {
        title: "AI Automation Agents",
        subtitle: "24/7 Operations Without Fatigue",
        description: "Deploy intelligent autonomous agents that can navigate complex workflows, make decisions, and execute tasks across your digital ecosystem.",
        metaDescription: "Deploy intelligent AI automation agents that handle support, sales & operations 24/7. Multi-step reasoning, tool use, autonomous error recovery. Get started today.",
        features: ["Multi-Step Reasoning", "Tool Use capabilities", "Autonomous Error Recovery", "Long-term Memory"],
        workflowSteps: [
            { step: 1, title: "Trigger", desc: "Customer email received", icon: "Mail" },
            { step: 2, title: "Analysis", desc: "AI analyzes sentiment & intent", icon: "Brain" },
            { step: 3, title: "Action", desc: "Draft response & update CRM", icon: "Database" },
            { step: 4, title: "Review", desc: "Human approval (optional)", icon: "UserCheck" }
        ],
        benefits: [
            { title: "Cost Efficiency", desc: "Reduce operational overhead by 60%." },
            { title: "Scalability", desc: "Spin up 100+ agents in minutes." },
        ],
        demoType: 'none',
    },
    "chatbots": {
        title: "Intelligent Chatbots",
        subtitle: "Conversational AI that Converts",
        description: "Go beyond simple FAQs. Our chatbots understand intent, sentiment, and context to provide human-like support and sales assistance.",
        metaDescription: "Build intelligent AI chatbots with sentiment analysis, CRM integration & lead qualification. 24/7 conversational bots that convert visitors into customers.",
        features: ["Sentiment Analysis", "CRM Integration", "Lead Qualification", "Meeting Scheduling"],
        workflowSteps: [
            { step: 1, title: "Visitor", desc: "User lands on website", icon: "MousePointer" },
            { step: 2, title: "Engage", desc: "Bot initiates conversation", icon: "MessageSquare" },
            { step: 3, title: "Qualify", desc: "Collects needs & contact info", icon: "CheckCircle" },
            { step: 4, title: "Handoff", desc: "Books meeting or live agent", icon: "UserCheck" }
        ],
        benefits: [
            { title: "Instant Response", desc: "0 second wait times for customers." },
            { title: "Higher Conversion", desc: "3x more leads captured." },
        ],
        demoType: 'chatbot',
    },
    "marketing": {
        title: "Data-Driven Marketing",
        subtitle: "Predictive Analytics for ROI",
        description: "Stop guessing. Use AI to analyze market trends, competitor strategies, and customer behavior to launch campaigns that actually work.",
        metaDescription: "AI-powered marketing automation with content generation, ad performance prediction, audience segmentation & automated A/B testing. Lower CAC by 40%.",
        features: ["Content Generation", "Ad Performance Prediction", "Audience Segmentation", "Automated A/B Testing"],
        workflowSteps: [
            { step: 1, title: "Ingest", desc: "Pull data from ad platforms", icon: "Database" },
            { step: 2, title: "Analyze", desc: "Identify top performing cohorts", icon: "BarChart" },
            { step: 3, title: "Generate", desc: "Create new ad copy variants", icon: "Brain" },
            { step: 4, title: "Deploy", desc: "Push updates to live campaigns", icon: "Zap" }
        ],
        benefits: [
            { title: "Optimized Spend", desc: "Lower CAC by 40%." },
            { title: "Viral Reach", desc: "Content calibrated for engagement." },
        ],
        demoType: 'none',
    },
    "workflow": {
        title: "Workflow Automation",
        subtitle: "Connect Your Entire Stack",
        description: "Seamlessly integrate your favorite tools. From simple triggers to complex multi-branch logic, automate the busywork so you can focus on strategy.",
        metaDescription: "Connect your apps & data into seamless automated pipelines. Visual builder, custom webhooks, API connectors & error handling. Save 20+ hours per week.",
        features: ["Visual Builder", "Custom Webhooks", "API Connectors", "Error Handling"],
        workflowSteps: [
            { step: 1, title: "Trigger", desc: "Event occurs in App A", icon: "Zap" },
            { step: 2, title: "Filter", desc: "Check specific conditions", icon: "Cog" },
            { step: 3, title: "Transform", desc: "Format data structure", icon: "Database" },
            { step: 4, title: "Action", desc: "Execute function in App B", icon: "Globe" }
        ],
        benefits: [
            { title: "Time Saved", desc: "Save 20+ hours per week per employee." },
            { title: "Error Reduction", desc: "Eliminate manual data entry mistakes." },
        ],
        demoType: 'workflow',
    },
    "web-development": {
        title: "Web Development",
        subtitle: "High-Performance Digital Experiences",
        description: "We build websites that look beautiful and load instantly. Optimized for SEO, accessibility, and conversion.",
        metaDescription: "Custom high-performance web development with Next.js & React. Server-side rendering, headless CMS, global CDN. 99/100 PageSpeed scores guaranteed.",
        features: ["Next.js & React", "Server-Side Rendering", "Headless CMS", "Global CDN"],
        workflowSteps: [
            { step: 1, title: "Design", desc: "UI/UX wireframes & mockups", icon: "MousePointer" },
            { step: 2, title: "Build", desc: "React component development", icon: "Cog" },
            { step: 3, title: "Content", desc: "Integrate CMS & assets", icon: "Database" },
            { step: 4, title: "Launch", desc: "Deploy to edge network", icon: "Globe" }
        ],
        benefits: [
            { title: "Performance", desc: "99/100 Google PageSpeed scores." },
            { title: "SEO Ready", desc: "Rank higher with semantic HTML." },
        ],
        demoType: 'webdev',
    },
    "real-estate": {
        title: "Real Estate Services",
        subtitle: "Sell Properties 3x Faster",
        description: "Revolutionize your real estate business with AI-powered lead capture, automated virtual tours, intelligent property matching, and predictive market analytics that close deals faster.",
        metaDescription: "AI automation for real estate: 360° virtual tours, AI lead scoring, automated follow-ups, market price prediction & property matching. Sell properties 3x faster.",
        features: ["360° Virtual Tours", "AI Lead Scoring", "Automated Follow-ups", "Market Price Prediction", "Property Matching Engine", "CRM & MLS Integration"],
        workflowSteps: [
            { step: 1, title: "Capture", desc: "Visitor browses listings", icon: "Search" },
            { step: 2, title: "Engage", desc: "AI bot qualifies interest", icon: "MessageSquare" },
            { step: 3, title: "Tour", desc: "Virtual tour scheduled", icon: "Eye" },
            { step: 4, title: "Close", desc: "Automated deal pipeline", icon: "TrendingUp" }
        ],
        benefits: [
            { title: "3x Faster Sales", desc: "Close deals in half the time with AI-driven insights." },
            { title: "40% More Leads", desc: "Capture and qualify leads 24/7 with automated funnels." },
        ],
        demoType: 'none',
    },
    "crm": {
        title: "CRM Integration",
        subtitle: "Centralized Customer Intelligence",
        description: "Unify your customer data. Automatically log interactions, update deal stages, and trigger follow-ups based on behavior.",
        metaDescription: "AI-powered CRM integration with two-way sync, behavioral triggers, data enrichment & de-duplication. Single source of truth for your entire sales pipeline.",
        features: ["Two-way Sync", "Behavioral Triggers", "De-duplication", "Enrichment"],
        workflowSteps: [
            { step: 1, title: "Capture", desc: "Lead submits form", icon: "UserCheck" },
            { step: 2, title: "Enrich", desc: "Add LinkedIn/Company data", icon: "Database" },
            { step: 3, title: "Route", desc: "Assign to sales rep", icon: "Cog" },
            { step: 4, title: "Nurture", desc: "Start email sequence", icon: "Mail" }
        ],
        benefits: [
            { title: "Data Integrity", desc: "Single source of truth for sales." },
            { title: "Retention", desc: "Timely follow-ups increase LTV." },
        ],
        demoType: 'none',
    }
};

const ALL_SLUGS = Object.keys(SERVICE_DATA);

interface CapabilityPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CapabilityPageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = SERVICE_DATA[slug];
    if (!data) return { title: 'Service Not Found' };

    return {
        title: data.title,
        description: data.metaDescription,
        keywords: [`${data.title}`, 'AI automation', 'Atul Automation', `${data.title} agency`, 'workflow automation'],
        openGraph: {
            title: `${data.title} | Atul Automation`,
            description: data.metaDescription,
            type: 'website',
            url: `https://atulautomation.com/capabilities/${slug}`,
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${data.title} - Atul Automation` }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} | Atul Automation`,
            description: data.metaDescription,
        },
        alternates: {
            canonical: `https://atulautomation.com/capabilities/${slug}`,
        },
    };
}

export default async function ServiceDetailPage({ params }: CapabilityPageProps) {
    const { slug } = await params;
    const data = SERVICE_DATA[slug];

    if (!data) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.title,
        description: data.metaDescription,
        provider: {
            '@type': 'Organization',
            name: 'Atul Automation',
            url: 'https://atulautomation.com',
        },
        areaServed: [
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Country', name: 'India' },
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Country', name: 'Canada' },
            { '@type': 'Country', name: 'Australia' },
        ],
        serviceType: data.title,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen bg-transparent pt-24 pb-16">
                <div className="container-custom">
                    {/* Header */}
                    <div className="mb-12">
                        <Link href="/capabilities" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Services
                        </Link>
                        <div className="animate-fade-in-up">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
                            <p className="text-xl md:text-2xl text-primary font-medium mb-6">{data.subtitle}</p>
                            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6">
                                {data.description}
                            </p>

                            {/* Primary CTA */}
                            <div className="flex gap-4">
                                <a href="#demo" className="btn-primary text-lg px-8 py-3">
                                    Try Demo <Play className="h-4 w-4 ml-2 fill-current" />
                                </a>
                                <Link href="/#pricing" className="px-8 py-3 rounded-md font-medium border border-border hover:bg-muted transition-colors">
                                    View Pricing
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Workflow Visualization Section */}
                    <div className="mb-20 bg-muted/20 p-8 rounded-2xl border border-border">
                        <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
                        <WorkflowVisualizer steps={data.workflowSteps} />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                        {/* Features Column */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                                <h3 className="font-bold text-lg mb-6 flex items-center">
                                    <Check className="h-5 w-5 text-primary mr-2" /> Key Features
                                </h3>
                                <ul className="space-y-4">
                                    {data.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-start">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-muted/30 rounded-xl p-8">
                                <h3 className="font-bold text-lg mb-4">Impact Stats</h3>
                                <div className="space-y-6">
                                    {data.benefits.map((benefit, i: number) => (
                                        <div key={i}>
                                            <div className="text-2xl font-bold text-foreground mb-1">{benefit.title}</div>
                                            <div className="text-sm text-muted-foreground">{benefit.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Interactive / Demo Column */}
                        <div className="lg:col-span-2" id="demo">
                            <CapabilityDemoSection demoType={data.demoType} title={data.title} />

                            <div className="mt-12">
                                <h3 className="text-xl font-bold mb-6">Common Use Cases</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                                        <h4 className="font-bold mb-2">Enterprise Scale</h4>
                                        <p className="text-sm text-muted-foreground">Perfect for organizations with high-volume requirements and complex security needs.</p>
                                    </div>
                                    <div className="p-6 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                                        <h4 className="font-bold mb-2">Rapid Prototyping</h4>
                                        <p className="text-sm text-muted-foreground">Quickly validate ideas and launch MVP solutions without heavy engineering lift.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
