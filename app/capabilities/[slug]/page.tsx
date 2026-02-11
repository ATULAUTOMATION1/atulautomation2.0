"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Download, ExternalLink, Play, Mail, Brain, Database, UserCheck, MessageSquare, BarChart, Zap, Globe, Cog, MousePointer } from "lucide-react";
import { motion } from "framer-motion";
import { WorkflowBuilder } from "@/components/modules/workflow-builder";
import { WorkflowVisualizer } from "@/components/modules/workflow-visualizer";

// Custom component placeholders for specific demos
function ChatbotDemo() {
    return (
        <div className="bg-card border border-border rounded-xl p-6 h-[400px] flex flex-col items-center justify-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Live Chat Demo</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
                Interact with our AI agent to see how it handles natural language queries and qualifies leads.
            </p>
            <button className="btn-primary flex items-center">
                Start Chat <Play className="h-4 w-4 ml-2" />
            </button>
        </div>
    );
}

function WebDevPortfolio() {
    const projects = [
        { name: "EcoStore", type: "E-Commerce", image: "bg-green-100" },
        { name: "FinTech App", type: "SaaS Dashboard", image: "bg-blue-100" },
        { name: "Dr. Clinic", type: "Healthcare", image: "bg-pink-100" },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
                <div key={i} className="group relative aspect-video bg-muted rounded-xl overflow-hidden border border-border">
                    <div className={`absolute inset-0 ${p.image} opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur px-4 py-2 rounded-lg text-center shadow-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                            <h4 className="font-bold text-sm">{p.name}</h4>
                            <p className="text-xs text-muted-foreground">{p.type}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Data Mapping
const SERVICE_DATA: Record<string, any> = {
    "ai-agents": {
        title: "AI Automation Agents",
        subtitle: "24/7 Operations Without Fatigue",
        description: "Deploy intelligent autonomous agents that can navigate complex workflows, make decisions, and execute tasks across your digital ecosystem.",
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
        demoComponent: null
    },
    "chatbots": {
        title: "Intelligent Chatbots",
        subtitle: "Conversational AI that Converts",
        description: "Go beyond simple FAQs. Our chatbots understand intent, sentiment, and context to provide human-like support and sales assistance.",
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
        demoComponent: <ChatbotDemo />
    },
    "marketing": {
        title: "Data-Driven Marketing",
        subtitle: "Predictive Analytics for ROI",
        description: "Stop guessing. Use AI to analyze market trends, competitor strategies, and customer behavior to launch campaigns that actually work.",
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
        demoComponent: null
    },
    "workflow": {
        title: "Workflow Automation",
        subtitle: "Connect Your Entire Stack",
        description: "Seamlessly integrate your favorite tools. From simple triggers to complex multi-branch logic, automate the busywork so you can focus on strategy.",
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
        demoComponent: <WorkflowBuilder />
    },
    "web-dev": {
        title: "Web Development",
        subtitle: "High-Performance Digital Experiences",
        description: "We build websites that look beautiful and load instantly. Optimized for SEO, accessibility, and conversion.",
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
        demoComponent: <WebDevPortfolio />
    },
    "crm": {
        title: "CRM Integration",
        subtitle: "Centralized Customer Intelligence",
        description: "Unify your customer data. Automatically log interactions, update deal stages, and trigger follow-ups based on behavior.",
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
        demoComponent: null
    }
};

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const data = SERVICE_DATA[slug];

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
                <Link href="/capabilities" className="text-primary hover:underline">
                    Return to Capabilities
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-transparent pt-24 pb-16">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/capabilities" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Services
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
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
                            <a href="/#pricing" className="px-8 py-3 rounded-md font-medium border border-border hover:bg-muted transition-colors">
                                View Pricing
                            </a>
                        </div>
                    </motion.div>
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
                                {data.benefits.map((benefit: any, i: number) => (
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
                        {data.demoComponent ? (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold mb-4">Interactive Demo</h3>
                                {data.demoComponent}
                            </div>
                        ) : (
                            // Default Generic Visual if no specific component
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold mb-4">Interactive Demo</h3>
                                <div className="bg-muted rounded-xl h-[400px] flex items-center justify-center border border-border border-dashed">
                                    <div className="text-center p-8">
                                        <div className="mb-4 text-4xl">🚀</div>
                                        <h3 className="font-bold text-lg mb-2">Simulator Coming Soon</h3>
                                        <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-4">
                                            We are actively building the interactive simulator for {data.title}.
                                            Check out our generic Workflow Builder below.
                                        </p>
                                        <Link href="/capabilities/workflow" className="text-primary hover:underline font-medium">
                                            Try Workflow Builder &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

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
    );
}
