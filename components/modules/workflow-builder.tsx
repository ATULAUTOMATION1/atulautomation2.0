"use client";

import { useState, useEffect } from "react";
import { Plus, Play, CheckCircle, Trash2, Workflow, RotateCcw } from "lucide-react";

type Node = {
    id: string;
    type: "trigger" | "action" | "condition";
    label: string;
    icon: string;
};

const AVAILABLE_NODES: Node[] = [
    { id: "email", type: "trigger", label: "New Email", icon: "📧" },
    { id: "form", type: "trigger", label: "Form Submit", icon: "📝" },
    { id: "webhook", type: "trigger", label: "Webhook", icon: "🔗" },
    { id: "ai", type: "action", label: "AI Analysis", icon: "🤖" },
    { id: "db", type: "action", label: "Save to DB", icon: "💾" },
    { id: "sms", type: "action", label: "Send SMS", icon: "📱" },
    { id: "slack", type: "action", label: "Slack Notify", icon: "💬" },
    { id: "filter", type: "condition", label: "Filter", icon: "🔍" },
];

const NODE_TYPE_STYLES: Record<string, string> = {
    trigger: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40",
    action: "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40",
    condition: "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40",
};

const NODE_TYPE_LABELS: Record<string, { label: string; color: string }> = {
    trigger: { label: "TRIGGER", color: "text-emerald-500 bg-emerald-500/10" },
    action: { label: "ACTION", color: "text-blue-500 bg-blue-500/10" },
    condition: { label: "CONDITION", color: "text-amber-500 bg-amber-500/10" },
};

export function WorkflowBuilder() {
    const [workflow, setWorkflow] = useState<Node[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const addToWorkflow = (node: Node) => {
        setWorkflow([...workflow, { ...node, id: `${node.id}-${Date.now()}` }]);
    };

    const removeFromWorkflow = (index: number) => {
        const newWorkflow = [...workflow];
        newWorkflow.splice(index, 1);
        setWorkflow(newWorkflow);
        setCompletedSteps(new Set());
    };

    const clearWorkflow = () => {
        setWorkflow([]);
        setCompletedSteps(new Set());
        setActiveStep(null);
    };

    const runSimulation = async () => {
        if (workflow.length === 0) return;
        setIsRunning(true);
        setActiveStep(null);
        setCompletedSteps(new Set());

        for (let i = 0; i < workflow.length; i++) {
            setActiveStep(i);
            await new Promise(resolve => setTimeout(resolve, 800));
            setCompletedSteps(prev => new Set(prev).add(i));
        }

        setActiveStep(null);
        setIsRunning(false);
    };

    return (
        <section id="modules" className="section-padding bg-transparent">
            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <Workflow className="h-3.5 w-3.5" /> Visual Builder
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Build Your <span className="text-primary">Workflow</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Assemble your perfect automation pipeline and simulate it live.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in-up delay-100">
                    {/* Sidebar */}
                    <div className="bg-card border border-border rounded-2xl p-6 h-fit">
                        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                            <Plus className="h-3.5 w-3.5" /> Available Modules
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {AVAILABLE_NODES.map((node) => (
                                <button
                                    key={node.id}
                                    onClick={() => addToWorkflow(node)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-sm font-medium hover:scale-105 active:scale-95 ${NODE_TYPE_STYLES[node.type]}`}
                                >
                                    <span className="text-2xl mb-2">{node.icon}</span>
                                    <span className="text-xs font-bold">{node.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 flex flex-col relative overflow-hidden min-h-[500px]">
                        {/* Dot pattern */}
                        <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
                                canvas.flow
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground font-medium">{workflow.length} nodes</span>
                                {workflow.length > 0 && (
                                    <button onClick={clearWorkflow} className="text-xs font-medium text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1">
                                        <RotateCcw className="h-3 w-3" /> Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar pr-2">
                            {workflow.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 border-2 border-dashed border-border rounded-xl min-h-[300px]">
                                    <Plus className="h-10 w-10 mb-3" />
                                    <p className="font-medium text-sm">Add modules to start building</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-3 pb-4">
                                    {workflow.map((node, index) => {
                                        const isActive = activeStep === index;
                                        const isCompleted = completedSteps.has(index);
                                        return (
                                            <div
                                                key={node.id}
                                                className="relative w-full max-w-sm animate-fade-in"
                                            >
                                                <div className={`
                                                    relative bg-background p-4 rounded-xl border shadow-sm flex items-center justify-between group transition-all duration-300
                                                    ${isActive ? 'border-primary ring-1 ring-primary shadow-md scale-105' :
                                                        isCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-border'}
                                                `}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg transition-colors duration-500 ${isCompleted ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-muted"}`}>
                                                            {isCompleted ? <CheckCircle className="h-5 w-5 animate-zoom-in" /> : node.icon}
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-sm block">{node.label}</span>
                                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${NODE_TYPE_LABELS[node.type].color} inline-block mt-0.5`}>
                                                                {NODE_TYPE_LABELS[node.type].label}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {isActive && (
                                                        <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                                    )}

                                                    {!isRunning && (
                                                        <button
                                                            onClick={() => removeFromWorkflow(index)}
                                                            className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-muted"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    )}
                                                </div>

                                                {index < workflow.length - 1 && (
                                                    <div className="h-6 w-0.5 bg-border mx-auto my-1" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-border flex justify-between items-center relative z-10">
                            <div>
                                {completedSteps.size > 0 && !isRunning && (
                                    <span className="text-green-600 text-xs font-bold flex items-center gap-1.5 animate-fade-in">
                                        <CheckCircle className="h-3.5 w-3.5" /> Simulation Complete
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={runSimulation}
                                disabled={isRunning || workflow.length === 0}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-xs px-5 py-2.5 h-10 transition-transform active:scale-95"
                            >
                                {isRunning ? "Running..." : <><Play className="h-3.5 w-3.5 mr-2 fill-current" /> Run Workflow</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
