import Link from "next/link";
import { ArrowLeft, Cpu, MessageSquare, BarChart, Zap, Globe, Database, Building } from "lucide-react";

const CAPABILITIES = [
    {
        id: "ai-agents",
        title: "AI Automation Agents",
        desc: "Deploy intelligent agents that handle support, sales, and operations 24/7 without fatigue.",
        icon: <Cpu className="h-12 w-12 text-primary" />,
        href: "/capabilities/ai-agents"
    },
    {
        id: "chatbots",
        title: "Intelligent Chatbots",
        desc: "Engage visitors instantly with AI-powered chat interfaces that qualify leads and book meetings.",
        icon: <MessageSquare className="h-12 w-12 text-secondary" />,
        href: "/capabilities/chatbots"
    },
    {
        id: "marketing",
        title: "Data-Driven Marketing",
        desc: "Campaigns across Meta, Google, and LinkedIn optimized for maximum ROI using predictive analytics.",
        icon: <BarChart className="h-12 w-12 text-accent" />,
        href: "/capabilities/marketing"
    },
    {
        id: "workflow",
        title: "Workflow Automation",
        desc: "Connect disparate apps and data sources into a seamless symphony of automated tasks.",
        icon: <Zap className="h-12 w-12 text-yellow-500" />,
        href: "/capabilities/workflow"
    },
    {
        id: "real-estate",
        title: "Real Estate Services",
        desc: "AI-powered lead capture, virtual tours, and market analytics to sell properties 3x faster.",
        icon: <Building className="h-12 w-12 text-amber-500" />,
        href: "/capabilities/real-estate"
    },
    {
        id: "crm",
        title: "CRM Integration",
        desc: "Centralize customer data and automate follow-ups for higher retention and lifetime value.",
        icon: <Database className="h-12 w-12 text-pink-500" />,
        href: "/capabilities/crm"
    },
    {
        id: "web-development",
        title: "Web Development",
        desc: "Custom, high-performance websites built to convert visitors into loyal customers.",
        icon: <Globe className="h-12 w-12 text-indigo-500" />,
        href: "/capabilities/web-development"
    }
];

export default function CapabilitiesPage() {
    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container-custom">
                <Link href="/#services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CAPABILITIES.map((cap) => (
                        <Link href={cap.href} key={cap.id} id={cap.id} className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className="mb-6 bg-muted/30 p-4 rounded-xl inline-flex w-fit group-hover:scale-110 transition-transform duration-300">
                                    {cap.icon}
                                </div>
                                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{cap.title}</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-6 flex-1">
                                    {cap.desc}
                                </p>
                                <span className="text-sm font-semibold text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all w-fit">
                                    Explore Service <ArrowLeft className="h-4 w-4 rotate-180" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
