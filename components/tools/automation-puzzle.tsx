"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, X, RefreshCw, ChevronRight, Zap, Trophy } from "lucide-react";

type GateType = "AND" | "OR" | "XOR" | "NAND";

interface Puzzle {
    id: number;
    gate: GateType;
    title: string;
    description: string;
    emoji: string;
    truthTable: string;
}

const PUZZLES: Puzzle[] = [
    { id: 1, gate: "AND", title: "The AND Gate", emoji: "🔗", description: "Both inputs must be ON", truthTable: "Only fires when ALL triggers are active" },
    { id: 2, gate: "OR", title: "The OR Gate", emoji: "⚡", description: "At least one input ON", truthTable: "Fires when ANY trigger is active" },
    { id: 3, gate: "XOR", title: "The XOR Gate", emoji: "🎯", description: "Exactly one input ON", truthTable: "Fires when ONLY ONE trigger is active" },
    { id: 4, gate: "NAND", title: "The NAND Gate", emoji: "🛡️", description: "NOT both inputs ON", truthTable: "Fires unless ALL triggers are active" },
];

function evaluateGate(gate: GateType, inputs: boolean[]): boolean {
    switch (gate) {
        case "AND": return inputs.every(Boolean);
        case "OR": return inputs.some(Boolean);
        case "XOR": return inputs.filter(Boolean).length === 1;
        case "NAND": return !inputs.every(Boolean);
    }
}

export function AutomationPuzzle() {
    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const [inputs, setInputs] = useState([false, false]);
    const [solved, setSolved] = useState(false);
    const [solvedPuzzles, setSolvedPuzzles] = useState<number[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [allDone, setAllDone] = useState(false);

    const puzzle = PUZZLES[currentPuzzle];
    const output = evaluateGate(puzzle.gate, inputs);

    useEffect(() => {
        if (output && !solved) {
            setSolved(true);
            setShowSuccess(true);
            if (!solvedPuzzles.includes(currentPuzzle)) {
                setSolvedPuzzles(prev => [...prev, currentPuzzle]);
            }
            setTimeout(() => setShowSuccess(false), 2000);
        } else if (!output) {
            setSolved(false);
        }
    }, [output, solved, currentPuzzle, solvedPuzzles]);

    const toggleInput = useCallback((idx: number) => {
        setInputs(prev => prev.map((v, i) => i === idx ? !v : v));
    }, []);

    const nextPuzzle = useCallback(() => {
        if (currentPuzzle < PUZZLES.length - 1) {
            setCurrentPuzzle(prev => prev + 1);
            setInputs([false, false]);
            setSolved(false);
        } else {
            setAllDone(true);
        }
    }, [currentPuzzle]);

    const resetAll = useCallback(() => {
        setCurrentPuzzle(0);
        setInputs([false, false]);
        setSolved(false);
        setSolvedPuzzles([]);
        setAllDone(false);
    }, []);

    if (allDone) {
        return (
            <div className="border border-border rounded-2xl bg-card p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="animate-bounce">
                    <Trophy className="h-12 w-12 text-yellow-400 mb-3" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">All Gates Mastered!</h3>
                <p className="text-xs text-muted-foreground mb-4">You understand logic gates 🎉</p>
                <button onClick={resetAll} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" /> Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="border border-border rounded-2xl bg-card overflow-hidden">
            {/* Header */}
            <div className="bg-muted/30 border-b border-border p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{puzzle.emoji}</span>
                        <div>
                            <h3 className="font-bold text-sm text-foreground">{puzzle.title}</h3>
                            <p className="text-[10px] text-muted-foreground">{puzzle.description}</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        {currentPuzzle + 1}/{PUZZLES.length}
                    </span>
                </div>
                {/* Progress dots */}
                <div className="flex gap-1 mt-2">
                    {PUZZLES.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${solvedPuzzles.includes(i) ? "bg-emerald-500" : i === currentPuzzle ? "bg-primary" : "bg-border"}`} />
                    ))}
                </div>
            </div>

            {/* Gate Visualization */}
            <div className="p-5 flex flex-col items-center">
                <div className="flex items-center gap-4">
                    {/* Inputs */}
                    <div className="flex flex-col gap-4">
                        {inputs.map((val, i) => (
                            <button
                                key={i}
                                onClick={() => toggleInput(i)}
                                className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 text-xs font-bold gap-0.5 ${val
                                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                                    : "bg-muted border-border text-muted-foreground hover:border-primary/40"
                                    }`}
                            >
                                <Zap className={`h-4 w-4 ${val ? "text-primary" : ""}`} />
                                {val ? "ON" : "OFF"}
                            </button>
                        ))}
                    </div>

                    {/* Wires to gate */}
                    <div className="flex flex-col gap-4 relative">
                        <div className={`w-8 h-0.5 rounded-full transition-colors duration-300 ${inputs[0] ? "bg-primary animate-pulse" : "bg-border"}`} />
                        <div className={`w-8 h-0.5 rounded-full transition-colors duration-300 ${inputs[1] ? "bg-primary animate-pulse" : "bg-border"}`} />
                        {/* Joiner */}
                        <div className={`absolute top-0 bottom-0 right-0 w-0.5 transition-colors duration-300 ${output ? "bg-cyan-500" : "bg-border"}`} />
                    </div>

                    {/* Gate */}
                    <div
                        className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 ${output
                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105"
                            : "bg-card border-border text-muted-foreground"
                            }`}
                    >
                        {puzzle.gate}
                    </div>

                    {/* Wire to output */}
                    <div className={`w-8 h-0.5 rounded-full transition-colors duration-300 ${output ? "bg-emerald-500 animate-pulse" : "bg-border"}`} />

                    {/* Output */}
                    <div
                        className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${output
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-105"
                            : "bg-muted border-border text-muted-foreground"
                            }`}
                    >
                        {output ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                    </div>
                </div>

                {/* Success message or hint */}
                <div className="mt-4 h-10 flex items-center justify-center w-full">
                    {showSuccess ? (
                        <p className="text-emerald-500 font-bold text-sm flex items-center gap-1 animate-fade-in-up">
                            <Check className="h-4 w-4" /> Automation Fired! 🎉
                        </p>
                    ) : (
                        <p className="text-[11px] text-muted-foreground text-center animate-fade-in">
                            💡 {puzzle.truthTable}
                        </p>
                    )}
                </div>

                {/* Next puzzle button */}
                {solved && (
                    <button
                        onClick={nextPuzzle}
                        className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xs py-2 px-5 rounded-full flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform animate-fade-in-up"
                    >
                        Next Puzzle <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
}
