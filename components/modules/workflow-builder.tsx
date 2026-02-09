"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Play, CheckCircle, ArrowRight, Trash2 } from "lucide-react";

type Node = {
    id: string;
    type: "trigger" | "action" | "condition";
    label: string;
    icon: string;
};

const AVAILABLE_NODES: Node[] = [
    { id: "email", type: "trigger", label: "New Email", icon: "📧" },
    { id: "form", type: "trigger", label: "Form Submit", icon: "📝" },
    { id: "ai", type: "action", label: "AI Analysis", icon: "🤖" },
    { id: "db", type: "action", label: "Save to DB", icon: "💾" },
    { id: "sms", type: "action", label: "Send SMS", icon: "📱" },
    { id: "slack", type: "action", label: "Slack Notify", icon: "💬" },
];

export function WorkflowBuilder() {
    const [workflow, setWorkflow] = useState<Node[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const addToWorkflow = (node: Node) => {
        setWorkflow([...workflow, { ...node, id: `${node.id}-${Date.now()}` }]);
    };

    const removeFromWorkflow = (index: number) => {
        const newWorkflow = [...workflow];
        newWorkflow.splice(index, 1);
        setWorkflow(newWorkflow);
    };

    const runSimulation = async () => {
        if (workflow.length === 0) return;
        setIsRunning(true);
        setActiveStep(null);

        for (let i = 0; i < workflow.length; i++) {
            setActiveStep(i);
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        setIsRunning(false);
        setActiveStep(null);
    };

    return (
        <section id="modules" className="section-padding bg-muted/30">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">Build Your <span className="text-primary">Workflow</span></h2>
                    <p className="text-muted-foreground">Drag and drop intelligent modules to create your perfect automation pipeline.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    {/* Sidebar */}
                    <div className="bg-background border border-border rounded-xl p-6 shadow-sm overflow-y-auto">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Available Modules</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {AVAILABLE_NODES.map((node) => (
                                <button
                                    key={node.id}
                                    onClick={() => addToWorkflow(node)}
                                    className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
                                >
                                    <span className="text-2xl mb-2">{node.icon}</span>
                                    {node.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="lg:col-span-2 bg-background border border-border rounded-xl p-8 shadow-sm flex flex-col relative overflow-hidden">
                        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

                        <div className="flex-1 overflow-y-auto space-y-4">
                            {workflow.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 border-2 border-dashed border-border rounded-lg">
                                    <Plus className="h-12 w-12 mb-4" />
                                    <p>Add modules to start building</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-4 py-8">
                                    <AnimatePresence>
                                        {workflow.map((node, index) => (
                                            <motion.div
                                                key={node.id}
                                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: activeStep === index ? 1.05 : 1,
                                                    borderColor: activeStep === index ? "var(--primary)" : "var(--border)"
                                                }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className={`relative w-full max-w-md bg-card p-4 rounded-lg border-2 shadow-sm flex items-center justify-between group ${activeStep === index ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xl">
                                                        {node.icon}
                                                    </div>
                                                    <span className="font-medium">{node.label}</span>
                                                </div>

                                                {activeStep === index && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute -right-3 -top-3 bg-primary text-white rounded-full p-1"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </motion.div>
                                                )}

                                                <button
                                                    onClick={() => removeFromWorkflow(index)}
                                                    className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>

                                                {index < workflow.length - 1 && (
                                                    <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 text-muted-foreground">
                                                        <ArrowRight className="h-4 w-4 rotate-90" />
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-border flex justify-end">
                            <button
                                onClick={runSimulation}
                                disabled={isRunning || workflow.length === 0}
                                className="btn-nature-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isRunning ? (
                                    <>Running...</>
                                ) : (
                                    <>
                                        <Play className="h-4 w-4" />
                                        <span>Run Workflow</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
