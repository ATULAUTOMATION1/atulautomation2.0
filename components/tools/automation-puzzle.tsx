"use client";

import { useState, useEffect } from "react";
import { Check, X, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

type LogicGate = {
    id: number;
    input: boolean;
    type: "AND" | "OR" | "NOT";
    output: boolean | null;
};

export function AutomationPuzzle() {
    const [inputs, setInputs] = useState([false, false]);
    const [solved, setSolved] = useState(false);

    // Simple AND Gate Pattern
    // Trigger A + Trigger B = Action
    const isCorrect = inputs[0] && inputs[1];

    useEffect(() => {
        if (isCorrect) {
            setSolved(true);
        } else {
            setSolved(false);
        }
    }, [inputs, isCorrect]);

    const toggleInput = (idx: number) => {
        const newInputs = [...inputs];
        newInputs[idx] = !newInputs[idx];
        setInputs(newInputs);
    };

    return (
        <div className="h-[400px] border border-border rounded-xl bg-background p-6 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <RefreshCw className="h-32 w-32" />
            </div>

            <h3 className="font-bold text-lg mb-8">Logic Gate: THE "AND" PUZZLE</h3>
            <p className="text-xs text-muted-foreground text-center mb-8 max-w-xs">
                Activate both triggers to fire the automation action.
            </p>

            <div className="flex items-center space-x-8">
                {/* Inputs */}
                <div className="flex flex-col space-y-8">
                    {inputs.map((val, i) => (
                        <button
                            key={i}
                            onClick={() => toggleInput(i)}
                            className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all ${val
                                    ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                    : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                                }`}
                        >
                            {val ? "ON" : "OFF"}
                        </button>
                    ))}
                </div>

                {/* Connecting Lines */}
                <div className="flex flex-col space-y-8 relative">
                    <div className={`w-8 h-1 transition-colors ${inputs[0] ? "bg-primary" : "bg-border"}`} />
                    <div className={`w-8 h-1 transition-colors ${inputs[1] ? "bg-primary" : "bg-border"}`} />
                    {/* Vertical Joiner */}
                    <div className={`absolute top-0 bottom-0 left-8 w-1 transition-colors ${solved ? "bg-primary" : "bg-border"}`} />
                    <div className={`absolute top-1/2 left-8 w-8 h-1 transform -translate-y-1/2 transition-colors ${solved ? "bg-primary" : "bg-border"}`} />
                </div>

                {/* Gate / Processor */}
                <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all ${solved ? "bg-secondary text-white border-secondary shadow-lg scale-110" : "bg-card border-border"
                    }`}>
                    AND
                </div>

                {/* Final Output Line */}
                <div className={`w-8 h-1 transition-colors ${solved ? "bg-secondary" : "bg-border"}`} />

                {/* Output */}
                <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all ${solved
                        ? "bg-green-500 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-pulse"
                        : "bg-muted border-border text-muted-foreground"
                    }`}>
                    {solved ? <Check className="h-8 w-8" /> : <X className="h-8 w-8" />}
                </div>
            </div>

            {solved && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-green-500 font-bold flex items-center"
                >
                    <Check className="mr-2 h-5 w-5" /> Automation Fired Successfully!
                </motion.div>
            )}
        </div>
    );
}
