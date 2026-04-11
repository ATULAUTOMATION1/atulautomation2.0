"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Play } from "lucide-react";
import { WorkflowBuilder } from "@/components/modules/workflow-builder";

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
        {
            name: "EcoStore",
            type: "High-Converting E-Commerce",
            image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800"
        },
        {
            name: "FinTech Pro",
            type: "SaaS Dashboard",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
        },
        {
            name: "Dr. Clinic",
            type: "Medical Portal",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
                <div key={i} className="group relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-500 cursor-pointer">
                    {/* Browser Chrome Wrapper */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-card/80 backdrop-blur-sm border-b border-border z-20 flex items-center px-3 gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    {/* Image Layer */}
                    <div className="absolute top-[32px] inset-x-0 bottom-0 bg-muted overflow-hidden">
                        <Image
                            src={p.image}
                            alt={p.name}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    {/* Hover Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col justify-end p-5">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                            <h4 className="font-bold text-lg text-foreground">{p.name}</h4>
                            <p className="text-sm text-primary font-medium">{p.type}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function CapabilityDemoSection({ demoType, title }: { demoType: string; title: string }) {
    if (demoType === 'chatbot') {
        return (
            <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Interactive Demo</h3>
                <ChatbotDemo />
            </div>
        );
    }

    if (demoType === 'workflow') {
        return (
            <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Interactive Demo</h3>
                <WorkflowBuilder />
            </div>
        );
    }

    if (demoType === 'webdev') {
        return (
            <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Interactive Demo</h3>
                <WebDevPortfolio />
            </div>
        );
    }

    // Default - no specific demo
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Interactive Demo</h3>
            <div className="bg-muted rounded-xl h-[400px] flex items-center justify-center border border-border border-dashed">
                <div className="text-center p-8">
                    <div className="mb-4 text-4xl">🚀</div>
                    <h3 className="font-bold text-lg mb-2">Simulator Coming Soon</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-4">
                        We are actively building the interactive simulator for {title}.
                        Check out our generic Workflow Builder below.
                    </p>
                    <Link href="/capabilities/workflow" className="text-primary hover:underline font-medium">
                        Try Workflow Builder &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
