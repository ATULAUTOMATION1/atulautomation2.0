"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Play, Trash2, ArrowRight, CheckCircle, Database, Mail, Zap, MessageSquare } from "lucide-react";

type Node = {
    id: string;
    type: string;
    label: string;
    icon: React.ReactNode;
    x: number;
    y: number;
};

const INITIAL_NODES: Node[] = [
    { id: "start", type: "trigger", label: "New Lead", icon: <Mail className="h-5 w-5" />, x: 50, y: 150 },
    { id: "process", type: "action", label: "AI Qualify", icon: <Zap className="h-5 w-5" />, x: 250, y: 150 },
    { id: "end", type: "end", label: "Add to CRM", icon: <Database className="h-5 w-5" />, x: 450, y: 150 },
];

export function WorkflowSimulator() {
    const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
    const [isRunning, setIsRunning] = useState(false);
    const [draggedNode, setDraggedNode] = useState<string | null>(null);

    const handleDragEnd = (id: string, info: any) => {
        setNodes((prev) =>
            prev.map((node) =>
                node.id === id ? { ...node, x: node.x + info.offset.x, y: node.y + info.offset.y } : node
            )
        );
        setDraggedNode(null);
    };

    const runSimulation = async () => {
        setIsRunning(true);
        // Simulate steps highlighting one by one
        // In a real app, this would check connections
        setTimeout(() => setIsRunning(false), 3000);
    };

    return (
        <div className="h-[500px] border border-border rounded-xl bg-muted/10 relative overflow-hidden select-none">
            <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur border border-border px-4 py-2 rounded-lg text-sm font-medium">
                <span className="text-primary font-bold">Simulator Mode:</span> Drag nodes to arrange workflow
            </div>

            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-10 pointer-events-none">
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-border" />
                ))}
            </div>

            {/* Nodes */}
            {nodes.map((node, index) => (
                <motion.div
                    key={node.id}
                    drag
                    dragMomentum={false}
                    onDragStart={() => setDraggedNode(node.id)}
                    dragConstraints={{ left: 0, right: 600, top: 0, bottom: 400 }}
                    style={{ x: node.x, y: node.y, position: 'absolute' }}
                    className={`flex flex-col items-center justify-center w-24 h-24 bg-card border-2 ${isRunning && index === 1 ? "border-primary shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-110" : "border-border"
                        } rounded-xl shadow-sm cursor-grab active:cursor-grabbing hover:border-primary transition-colors z-20`}
                >
                    <div className={`mb-2 p-2 rounded-full ${isRunning && index === 1 ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                        {node.icon}
                    </div>
                    <span className="text-xs font-bold text-center">{node.label}</span>

                    {/* Connector Dot */}
                    {index < nodes.length - 1 && (
                        <div className="absolute -right-3 top-1/2 w-6 h-0.5 bg-border -z-10" />
                    )}
                </motion.div>
            ))}

            {/* Connection Lines (Visual only for demo) */}
            <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                {nodes.map((node, i) => {
                    if (i === nodes.length - 1) return null;
                    const nextNode = nodes[i + 1];
                    return (
                        <line
                            key={`line-${i}`}
                            x1={node.x + 48} // Center of node (approx)
                            y1={node.y + 48}
                            x2={nextNode.x + 48}
                            y2={nextNode.y + 48}
                            stroke="currentColor"
                            strokeOpacity="0.2"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        />
                    )
                })}
            </svg>

            <div className="absolute bottom-4 right-4 z-10">
                <button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className="btn-nature-primary flex items-center space-x-2"
                >
                    {isRunning ? (
                        <>Running Logic...</>
                    ) : (
                        <>
                            <Play className="h-4 w-4" />
                            <span>Test Flow</span>
                        </>
                    )}
                </button>
            </div>

            {isRunning && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/90 backdrop-blur px-6 py-4 rounded-xl border border-primary text-primary font-bold shadow-2xl animate-in zoom-in duration-300 pointer-events-none z-30">
                    Processing Automation...
                </div>
            )}
        </div>
    );
}
