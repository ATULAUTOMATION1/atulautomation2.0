"use client";

import { Eye, Lightbulb, Link2, Globe, GraduationCap, Leaf, Rocket } from "lucide-react";

const CORE_ELEMENTS = [
    {
        icon: Lightbulb,
        title: "Innovation at the Core",
        desc: "Constantly pushing boundaries with AI, cloud, and automation to design solutions that feel futuristic yet practical.",
        color: "text-primary",
        bg: "bg-primary/8",
    },
    {
        icon: Link2,
        title: "Seamless Integration",
        desc: "Creating ecosystems where social media, e-commerce, customer engagement, and education flow together effortlessly.",
        color: "text-blue-500",
        bg: "bg-blue-500/8",
    },
    {
        icon: Globe,
        title: "Global Appeal",
        desc: "Building polished, branded experiences that resonate with startups, enterprises, and learners worldwide.",
        color: "text-violet-500",
        bg: "bg-violet-500/8",
    },
    {
        icon: GraduationCap,
        title: "Empowerment Through Education",
        desc: "Sharing knowledge via courses, demos, and interactive tools so that anyone can harness automation for growth.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/8",
    },
    {
        icon: Leaf,
        title: "Sustainability & Responsibility",
        desc: "Designing technology that is mindful of people, communities, and the environment.",
        color: "text-amber-600",
        bg: "bg-amber-500/8",
    },
];

export function Branding() {
    return (
        <section className="section-padding bg-transparent">
            <div className="container-custom">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <Eye className="h-3.5 w-3.5" /> Our Vision
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Vision of <span className="text-primary">Atul Automation</span>
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Atul Automation envisions a world where technology and creativity converge to empower businesses and individuals.
                        We strive to be the leading force in AI-powered automation, building platforms that are not only efficient but also inspiring, interactive, and globally accessible.
                    </p>
                </div>

                {/* Core Elements */}
                <div className="max-w-2xl mx-auto text-center mb-10 opacity-0 animate-fade-in-up delay-100">
                    <h3 className="text-2xl md:text-3xl font-bold">
                        Core Elements of Our <span className="text-primary">Vision</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
                    {CORE_ELEMENTS.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={i}
                                className={`group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 opacity-0 animate-fade-in-up delay-${(i + 1) * 100}`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    <Icon className={`h-6 w-6 ${item.color}`} />
                                </div>
                                <h4 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Aspiration */}
                <div className="max-w-4xl mx-auto opacity-0 animate-fade-in-up delay-300">
                    <div className="relative bg-gradient-to-br from-primary/5 via-card to-secondary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                                <Rocket className="h-4 w-4 text-primary" />
                                <span className="text-sm font-semibold text-primary">Our Aspiration</span>
                            </div>
                            <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium max-w-3xl mx-auto">
                                To transform Atul Automation into a <span className="text-primary font-bold">global hub</span> of intelligent workflows, creative branding, and interactive learning — inspiring the next generation of innovators to <span className="text-primary font-bold">dream bigger</span> and <span className="text-primary font-bold">build smarter</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
