import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ATUL_TEMPLATES, TemplateCategory } from "@/lib/templates-data";
import { ArrowRight, Star, Home, ShoppingCart, HeartPulse, Inbox, Wrench, CheckCircle2, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Templates & Runbooks",
    description: "Browse our marketplace of ready-to-deploy AI automations. Pick a template for your industry and launch exactly what you need in seconds.",
};

const IconMap = {
    Star: Star,
    Home: Home,
    ShoppingCart: ShoppingCart,
    HeartPulse: HeartPulse,
    Inbox: Inbox,
    Wrench: Wrench
};

export default function TemplatesPage() {
    // We can group them or list them. Let's group by category.
    const categories: TemplateCategory[] = ["General Business", "Real Estate", "E-Commerce", "Healthcare", "Agency", "Automotive"];

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-70 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] opacity-50 -translate-x-1/3 translate-y-1/3"></div>

            <div className="container-custom">
                {/* Header Section */}
                <div className="max-w-3xl mb-16 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                        <Zap className="w-4 h-4" />
                        <span>Ready-to-Deploy Templates</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6">
                        The AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Runbook</span> Marketplace
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed balance">
                        Stop reinventing the wheel. Browse our curated library of pre-built AI workflows engineered by the OpenClaw team. Select your industry, view the architecture, and deploy.
                    </p>
                </div>

                {/* Templates Grid directly mapped */}
                <div className="space-y-16">
                    {categories.map((cat) => {
                        const templatesInCategory = ATUL_TEMPLATES.filter(t => t.category === cat);
                        if (templatesInCategory.length === 0) return null;

                        return (
                            <section key={cat} className="space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700 fill-mode-both" style={{ animationDelay: '100ms' }}>
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl font-bold font-heading tracking-tight">{cat}</h2>
                                    <div className="h-px bg-border flex-1 ml-4 hidden sm:block"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                    {templatesInCategory.map((template) => {
                                        const BaseIcon = IconMap[template.icon as keyof typeof IconMap] || Zap;
                                        
                                        return (
                                            <div 
                                                key={template.id}
                                                className="group relative flex flex-col justify-between bg-card text-card-foreground border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden"
                                            >
                                                {/* Hover Glow Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                                <div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className="bg-primary/15 text-primary p-3 rounded-xl">
                                                            <BaseIcon className="w-6 h-6" />
                                                        </div>
                                                        <div className={`text-xs font-bold px-2.5 py-1 rounded-full border ${template.complexity === 'Beginner' ? 'bg-green-500/10 text-green-500 border-green-500/20' : template.complexity === 'Intermediate' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'}`}>
                                                            {template.complexity}
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{template.title}</h3>
                                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                                                        {template.description}
                                                    </p>
                                                    
                                                    <div className="mb-6 space-y-2">
                                                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Integrations</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {template.integrations.map(integ => (
                                                                <span key={integ} className="text-xs bg-muted px-2 py-1 rounded-md text-foreground">{integ}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t border-border mt-auto flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-sm font-medium">
                                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                                        <span>Est. {template.estimatedSavings}</span>
                                                    </div>
                                                    <Link 
                                                        href="#contact" 
                                                        className="flex items-center gap-1 text-sm font-bold text-primary group/btn"
                                                    >
                                                        Deploy
                                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
                
                {/* CTA */}
                <div className="mt-24 bg-gradient-to-br from-primary/10 via-background to-background border border-border rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 font-heading">Don't see your Runbook?</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Need a highly specific workflow for a unique piece of software? Our OpenClaw engineering team builds custom Runbooks in less than 72 hours.
                    </p>
                    <Link href="#contact" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                        Request Custom Workflow
                    </Link>
                </div>
            </div>
        </main>
    );
}
