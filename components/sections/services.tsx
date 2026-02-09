"use client";

import Link from "next/link";
import { ArrowRight, Cpu, MessageSquare, Zap, BookOpen, Building, Users, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const services = [
    {
        icon: <Cpu className="h-8 w-8 text-orange-500" />,
        title: "AI Automation",
        description: "Streamline complex processes with intelligent, self-learning algorithms.",
        href: "/capabilities/ai-agents", // Direct detail page
        color: "bg-orange-50",
        btnColor: "text-orange-600"
    },
    {
        icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
        title: "Intelligent Chatbots",
        description: "Engage your audience with natural language processing bots.",
        href: "/capabilities/chatbots", // Direct detail page
        color: "bg-blue-50",
        btnColor: "text-blue-600"
    },
    {
        icon: <Zap className="h-8 w-8 text-green-500" />,
        title: "Automation Workflow",
        description: "Connect disparate apps and data sources into a seamless symphony.",
        href: "/capabilities/workflow", // Direct detail page
        color: "bg-green-50",
        btnColor: "text-green-600"
    },
    {
        icon: <BarChart className="h-8 w-8 text-purple-500" />,
        title: "AI Marketing",
        description: "Data-driven campaigns across Meta & Google optimized for maximum ROI.",
        href: "/capabilities/marketing", // Direct detail page
        color: "bg-purple-50",
        btnColor: "text-purple-600"
    },
    {
        icon: <Building className="h-8 w-8 text-stone-500" />,
        title: "Real Estate Services",
        description: "Automated lead capture and virtual tours to sell properties faster.",
        href: "/capabilities/ai-agents", // Assuming specific RE agent content or fallback
        color: "bg-stone-100",
        btnColor: "text-stone-600"
    },
    {
        icon: <Users className="h-8 w-8 text-red-500" />,
        title: "CRM Solutions",
        description: "Centralize customer data and automate follow-ups for higher retention.",
        href: "/capabilities/crm", // Direct detail page
        color: "bg-red-50",
        btnColor: "text-red-600"
    }
];

export function Services() {
    return (
        <section id="services" className="section-padding bg-background">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-4"
                    >
                        Our <span className="text-primary">Capabilities</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        A full suite of digital transformation tools designed to help you scale faster.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={service.href} className="flex flex-col h-full bg-card border border-border rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                                {/* Top Half: Color & Icon */}
                                <div className={`h-40 ${service.color} flex items-center justify-center relative`}>
                                    {/* Subtle Circle Decoration */}
                                    <div className="absolute w-24 h-24 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Bottom Half: Content */}
                                <div className="p-8 flex flex-col flex-1 bg-card">
                                    <h3 className="font-serif text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                                        {service.description}
                                    </p>

                                    <div className={`text-sm font-bold ${service.btnColor} flex items-center group-hover:translate-x-1 transition-transform`}>
                                        Learn more <ArrowRight className="h-4 w-4 ml-2" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
