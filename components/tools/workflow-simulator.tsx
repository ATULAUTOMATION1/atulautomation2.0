"use client";

import { useState, useCallback } from "react";
import {
    Play, RotateCcw, Mail, Zap, Database, CheckCircle2,
    MessageSquare, Filter, Bot, Bell, GitBranch, Plus,
    Trash2, Cpu, Loader2
} from "lucide-react";

type NodeType = "trigger" | "condition" | "action" | "ai";

interface WFNode {
    id: string;
    type: NodeType;
    label: string;
    emoji: string;
    icon: typeof Mail;
    color: string;
    bgColor: string;
    borderColor: string;
}

const NODE_PALETTE: WFNode[] = [
    { id: "email", type: "trigger", label: "Email Received", emoji: "📩", icon: Mail, color: "text-blue-400", bgColor: "bg-blue-500/15", borderColor: "border-blue-500/40" },
    { id: "form", type: "trigger", label: "Form Submit", emoji: "📝", icon: MessageSquare, color: "text-blue-400", bgColor: "bg-blue-500/15", borderColor: "border-blue-500/40" },
    { id: "filter", type: "condition", label: "IF Condition", emoji: "⚡", icon: Filter, color: "text-amber-400", bgColor: "bg-amber-500/15", borderColor: "border-amber-500/40" },
    { id: "ai_class", type: "ai", label: "AI Classify", emoji: "🧠", icon: Bot, color: "text-purple-400", bgColor: "bg-purple-500/15", borderColor: "border-purple-500/40" },
    { id: "ai_gen", type: "ai", label: "AI Generate", emoji: "✨", icon: Cpu, color: "text-purple-400", bgColor: "bg-purple-500/15", borderColor: "border-purple-500/40" },
    { id: "notify", type: "action", label: "Send Alert", emoji: "🔔", icon: Bell, color: "text-emerald-400", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-500/40" },
    { id: "save_db", type: "action", label: "Save to DB", emoji: "💾", icon: Database, color: "text-emerald-400", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-500/40" },
    { id: "route", type: "action", label: "Route", emoji: "🔀", icon: GitBranch, color: "text-emerald-400", bgColor: "bg-emerald-500/15", borderColor: "border-emerald-500/40" },
];

const TYPE_LABELS: Record<NodeType, { label: string; color: string; bg: string }> = {
    trigger: { label: "TRIGGER", color: "text-blue-400", bg: "bg-blue-500/15" },
    condition: { label: "CONDITION", color: "text-amber-400", bg: "bg-amber-500/15" },
    action: { label: "ACTION", color: "text-emerald-400", bg: "bg-emerald-500/15" },
    ai: { label: "AI AGENT", color: "text-purple-400", bg: "bg-purple-500/15" },
};

const EXECUTION_MESSAGES: Record<string, string[]> = {
    email: ["📨 Incoming email detected...", "📧 From: client@acme.com", "✅ Trigger fired!"],
    form: ["📝 New form submission...", "👤 Name: John Doe", "✅ Trigger fired!"],
    filter: ["🔍 Evaluating condition...", "⚡ Result: TRUE", "✅ Passing through!"],
    ai_class: ["🧠 AI analyzing content...", "🤖 Intent: support_request (94%)", "✅ Classification complete!"],
    ai_gen: ["✨ AI generating response...", "📝 Crafting personalized reply...", "✅ Response ready!"],
    notify: ["🔔 Preparing notification...", "📱 Sent to #alerts channel", "✅ Team notified!"],
    save_db: ["💾 Connecting to database...", "📊 Record #4821 created", "✅ Data saved!"],
    route: ["🔀 Routing workflow...", "🏢 → Sales Department", "✅ Routed successfully!"],
};

const PRESETS = [
    { name: "Lead Capture", nodes: ["form", "ai_class", "save_db", "notify"] },
    { name: "Email Triage", nodes: ["email", "ai_class", "filter", "route"] },
    { name: "AI Chatbot", nodes: ["form", "ai_gen", "save_db"] },
];

export function WorkflowSimulator() {
    const [pipeline, setPipeline] = useState<string[]>(["email", "ai_class", "save_db"]);
    const [isRunning, setIsRunning] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);
    const [logs, setLogs] = useState<string[]>([]);
    const [showPalette, setShowPalette] = useState(false);
    const [executionDone, setExecutionDone] = useState(false);
    const [totalRuns, setTotalRuns] = useState(0);

    const addNode = useCallback((nodeId: string) => {
        if (pipeline.length >= 6) return;
        setPipeline(prev => [...prev, nodeId]);
        setShowPalette(false);
        setExecutionDone(false);
    }, [pipeline]);

    const removeNode = useCallback((index: number) => {
        setPipeline(prev => prev.filter((_, i) => i !== index));
        setExecutionDone(false);
    }, []);

    const loadPreset = useCallback((nodes: string[]) => {
        setPipeline(nodes);
        setExecutionDone(false);
        setLogs([]);
        setActiveStep(-1);
    }, []);

    const runWorkflow = useCallback(async () => {
        if (pipeline.length === 0 || isRunning) return;
        setIsRunning(true);
        setExecutionDone(false);
        setLogs([]);
        setActiveStep(-1);

        for (let i = 0; i < pipeline.length; i++) {
            setActiveStep(i);
            const messages = EXECUTION_MESSAGES[pipeline[i]] || ["Processing..."];
            for (const msg of messages) {
                setLogs(prev => [...prev, msg]);
                await new Promise(r => setTimeout(r, 400));
            }
            await new Promise(r => setTimeout(r, 300));
        }

        setLogs(prev => [...prev, "", "🎉 Workflow completed successfully!"]);
        setActiveStep(-1);
        setIsRunning(false);
        setExecutionDone(true);
        setTotalRuns(prev => prev + 1);
    }, [pipeline, isRunning]);

    const resetAll = useCallback(() => {
        setPipeline(["email", "ai_class", "save_db"]);
        setIsRunning(false);
        setActiveStep(-1);
        setLogs([]);
        setExecutionDone(false);
    }, []);

    return (
        <div className="border border-border rounded-2xl bg-card overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-foreground">Workflow Builder</h3>
                            <p className="text-[10px] text-muted-foreground">Drag blocks to build automations</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {totalRuns > 0 && (
                            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{totalRuns} runs</span>
                        )}
                        <button onClick={resetAll} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Reset">
                            <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                    </div>
                </div>

                {/* Presets */}
                <div className="flex gap-1.5 mt-3">
                    {PRESETS.map(preset => (
                        <button
                            key={preset.name}
                            onClick={() => loadPreset(preset.nodes)}
                            className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-card border border-border hover:border-primary/40 hover:text-primary transition-all"
                        >
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pipeline Visual */}
            <div className="p-4 flex-1">
                <div className="flex flex-wrap items-center gap-2 min-h-[80px]">
                    {pipeline.map((nodeId, i) => {
                        const node = NODE_PALETTE.find(n => n.id === nodeId)!;
                        const tl = TYPE_LABELS[node.type];
                        const isActive = activeStep === i;
                        const isDone = activeStep > i || executionDone;
                        const Icon = node.icon;

                        return (
                            <div key={`${nodeId}-${i}`} className="flex items-center gap-2 animate-fade-in-up">
                                {i > 0 && (
                                    <div className="flex items-center">
                                        <div
                                            className={`h-0.5 w-6 rounded-full transition-colors duration-300 ${isDone ? "bg-emerald-500" : isActive ? "bg-primary animate-pulse" : "bg-border"}`}
                                        />
                                    </div>
                                )}

                                <div
                                    className={`relative group flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all duration-300 ${isDone
                                        ? "border-emerald-500/40 bg-emerald-500/5"
                                        : isActive
                                            ? `${node.borderColor} ${node.bgColor} shadow-lg scale-105`
                                            : `border-border bg-card hover:${node.borderColor}`
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDone ? "bg-emerald-500/20" : node.bgColor}`}>
                                        {isDone ? (
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        ) : isActive ? (
                                            <div className="animate-spin duration-1000">
                                                <Loader2 className={`h-4 w-4 ${node.color}`} />
                                            </div>
                                        ) : (
                                            <Icon className={`h-4 w-4 ${node.color}`} />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-foreground">{node.label}</p>
                                        <p className={`text-[8px] font-bold uppercase ${tl.color}`}>{tl.label}</p>
                                    </div>

                                    {/* Remove */}
                                    {!isRunning && (
                                        <button
                                            onClick={() => removeNode(i)}
                                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:scale-110"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Node Button */}
                    {pipeline.length < 6 && !isRunning && (
                        <div className="relative">
                            <button
                                onClick={() => setShowPalette(!showPalette)}
                                className="w-10 h-10 rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-90"
                            >
                                <Plus className="h-4 w-4" />
                            </button>

                            {/* Node Palette Dropdown */}
                            {showPalette && (
                                <div className="absolute top-12 left-0 z-30 w-56 bg-card border border-border rounded-xl shadow-xl p-2 space-y-1 animate-fade-in-up">
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase px-2 py-1">Add Block</p>
                                    {NODE_PALETTE.map(node => {
                                        const tl = TYPE_LABELS[node.type];
                                        const Icon = node.icon;
                                        return (
                                            <button
                                                key={node.id}
                                                onClick={() => addNode(node.id)}
                                                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                                            >
                                                <div className={`w-7 h-7 rounded-md ${node.bgColor} flex items-center justify-center`}>
                                                    <Icon className={`h-3.5 w-3.5 ${node.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-foreground">{node.label}</p>
                                                    <p className={`text-[8px] font-bold ${tl.color}`}>{tl.label}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Execution Console */}
                <div className="mt-4 bg-muted/30 border border-border rounded-xl overflow-hidden">
                    <div className="px-3 py-2 border-b border-border bg-muted/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground">console</span>
                        </div>
                        {isRunning && (
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-mono text-green-500">running</span>
                            </div>
                        )}
                    </div>
                    <div className="p-3 h-[140px] overflow-y-auto font-mono text-[11px] space-y-0.5">
                        {logs.length === 0 ? (
                            <p className="text-muted-foreground/50 italic">Click &quot;Run Workflow&quot; to execute your pipeline...</p>
                        ) : (
                            logs.map((log, i) => (
                                <p
                                    key={i}
                                    className={`animate-fade-in-up ${log.includes("✅") ? "text-emerald-400" : log.includes("🎉") ? "text-primary font-bold" : "text-muted-foreground"}`}
                                >
                                    {log || "\u00A0"}
                                </p>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground">{pipeline.length}/6 blocks</p>
                <button
                    onClick={runWorkflow}
                    disabled={isRunning || pipeline.length === 0}
                    className="btn-primary rounded-full text-xs shadow-sm h-9 hover:scale-105 active:scale-95 transition-transform"
                >
                    {isRunning ? (
                        <span className="flex items-center gap-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Running...</span>
                    ) : (
                        <span className="flex items-center gap-2"><Play className="h-3.5 w-3.5 fill-white" /> Run Workflow</span>
                    )}
                </button>
            </div>
        </div>
    );
}
