"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Circle, Mail, Brain, Database, UserCheck, MessageSquare, BarChart, Zap, Globe, Cog, MousePointer } from "lucide-react";

export interface WorkflowStep {
    step: number;
    title: string;
    desc: string;
    icon: any;
}

const ICONS: Record<string, any> = {
    Mail: <Mail className="h-6 w-6" />,
    Brain: <Brain className="h-6 w-6" />,
    Database: <Database className="h-6 w-6" />,
    UserCheck: <UserCheck className="h-6 w-6" />,
    MessageSquare: <MessageSquare className="h-6 w-6" />,
    BarChart: <BarChart className="h-6 w-6" />,
    Zap: <Zap className="h-6 w-6" />,
    Globe: <Globe className="h-6 w-6" />,
    Cog: <Cog className="h-6 w-6" />,
    MousePointer: <MousePointer className="h-6 w-6" />,
    CheckCircle: <CheckCircle className="h-6 w-6" />,
    Circle: <Circle className="h-6 w-6" />
};

export function WorkflowVisualizer({ steps }: { steps: any[] }) {
    return (
        <div className="py-8">
            <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-8 left-0 w-full h-1 bg-muted -z-10 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {steps.map((s, i) => {
                        const Icon = ICONS[s.icon] || ICONS.Circle;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex flex-col items-center text-center bg-background md:bg-transparent p-4 md:p-0 rounded-xl border md:border-none border-border"
                            >
                                <div className="bg-card border-2 border-primary rounded-full p-4 mb-4 shadow-sm z-10 relative">
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center">
                                        {s.step}
                                    </span>
                                    <div className="text-primary">{Icon}</div>
                                </div>
                                <h4 className="font-bold mb-1">{s.title}</h4>
                                <p className="text-xs text-muted-foreground max-w-[150px]">{s.desc}</p>

                                {i < steps.length - 1 && (
                                    <ArrowRight className="md:hidden h-6 w-6 text-muted-foreground my-2 rotate-90" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
