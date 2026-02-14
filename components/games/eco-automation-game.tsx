"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
    Zap, Bot, Mail, Database, GitBranch, ArrowRight,
    Star, Trophy, Sparkles, ChevronRight, RotateCcw,
    MessageSquare, BarChart, Shield, Clock, CheckCircle2,
    XCircle, Lightbulb, Cpu, Workflow, Send, Users,
    FileText, Bell, Filter, Play, Timer, Award,
    ChevronDown, Flame, TrendingUp, Lock
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────
type GamePhase = "menu" | "lesson" | "challenge" | "executing" | "result" | "victory";

interface AutomationBlock {
    id: string;
    type: "trigger" | "condition" | "action" | "ai";
    label: string;
    emoji: string;
    icon: typeof Zap;
    color: string;
    bgColor: string;
    glowColor: string;
    description: string;
    executionText: string;
}

interface Level {
    id: number;
    title: string;
    concept: string;
    description: string;
    emoji: string;
    scenario: string;
    lesson: string[];
    challenge: {
        prompt: string;
        blocks: AutomationBlock[];
        correctOrder: string[];
        hint: string;
    };
    xpReward: number;
}

interface Achievement {
    id: string;
    title: string;
    emoji: string;
    description: string;
    unlocked: boolean;
}

// ─── Type Visual Config ─────────────────────────────────────
const typeConfig: Record<string, { label: string; color: string; bg: string; border: string; glow: string }> = {
    trigger: { label: "TRIGGER", color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/40", glow: "shadow-blue-500/20" },
    condition: { label: "CONDITION", color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/40", glow: "shadow-amber-500/20" },
    action: { label: "ACTION", color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/40", glow: "shadow-emerald-500/20" },
    ai: { label: "AI AGENT", color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-500/40", glow: "shadow-purple-500/20" },
};

// ─── Levels ─────────────────────────────────────────────────
const levels: Level[] = [
    {
        id: 1, title: "Triggers & Actions", concept: "Every automation starts with a TRIGGER and ends with an ACTION",
        description: "The basics of automation", emoji: "⚡",
        scenario: "A local bakery wants to automatically send a thank-you email whenever a customer places an order online.",
        lesson: [
            "A TRIGGER is the event that kicks off your automation — like a button press.",
            "An ACTION is what happens next — the automated response.",
            "Together, they form the simplest automation: Event → Response."
        ],
        challenge: {
            prompt: "When a customer places an order, send them a thank-you email",
            blocks: [
                { id: "t1", type: "trigger", label: "Order Placed", emoji: "🛒", icon: FileText, color: "text-blue-500", bgColor: "bg-blue-500/15", glowColor: "shadow-blue-500/30", description: "Customer completes checkout", executionText: "New order #1042 received..." },
                { id: "a1", type: "action", label: "Send Email", emoji: "📧", icon: Send, color: "text-emerald-500", bgColor: "bg-emerald-500/15", glowColor: "shadow-emerald-500/30", description: "Sends email automatically", executionText: "Sending thank-you email... ✉️" },
                { id: "x1", type: "action", label: "Delete Data", emoji: "🗑️", icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/15", glowColor: "shadow-red-500/30", description: "Removes a database record", executionText: "Deleting records..." },
            ],
            correctOrder: ["t1", "a1"],
            hint: "Start with the event (trigger), then the response (action)!"
        },
        xpReward: 100,
    },
    {
        id: 2, title: "Smart Conditions", concept: "Use IF/ELSE logic to make your automations intelligent",
        description: "Add decision-making", emoji: "🧠",
        scenario: "A support team gets flooded with emails. They want to auto-flag urgent ones so managers see them first.",
        lesson: [
            "CONDITIONS act like a traffic light — they decide which path to take.",
            "IF something is true → do this. ELSE → do that.",
            "This makes your automation smart, not just fast."
        ],
        challenge: {
            prompt: "When an email arrives, check if it's urgent, then alert the manager",
            blocks: [
                { id: "t2", type: "trigger", label: "Email Received", emoji: "📩", icon: Mail, color: "text-blue-500", bgColor: "bg-blue-500/15", glowColor: "shadow-blue-500/30", description: "New email enters inbox", executionText: "📨 Email from client received..." },
                { id: "c2", type: "condition", label: "Is Urgent?", emoji: "⚡", icon: Filter, color: "text-amber-500", bgColor: "bg-amber-500/15", glowColor: "shadow-amber-500/30", description: "Checks priority level", executionText: "Checking priority... ⚡ URGENT detected!" },
                { id: "a2", type: "action", label: "Alert Manager", emoji: "🔔", icon: Bell, color: "text-emerald-500", bgColor: "bg-emerald-500/15", glowColor: "shadow-emerald-500/30", description: "Sends instant notification", executionText: "🔔 Manager notified instantly!" },
                { id: "x2", type: "trigger", label: "Cron Schedule", emoji: "⏰", icon: Clock, color: "text-purple-500", bgColor: "bg-purple-500/15", glowColor: "shadow-purple-500/30", description: "Runs on a timer", executionText: "Starting scheduled task..." },
            ],
            correctOrder: ["t2", "c2", "a2"],
            hint: "Pattern: Trigger → Check condition → Take action!"
        },
        xpReward: 150,
    },
    {
        id: 3, title: "Multi-Step Pipelines", concept: "Chain multiple steps to build powerful workflows",
        description: "Build complex flows", emoji: "🔗",
        scenario: "A SaaS startup wants to automatically capture leads, enrich their data, score them, and assign them to sales reps.",
        lesson: [
            "Real automations chain MULTIPLE steps together like an assembly line.",
            "Each step's output feeds into the next step's input.",
            "This is how businesses automate entire processes end-to-end."
        ],
        challenge: {
            prompt: "New lead arrives → Save to CRM → Score the lead → Assign to a sales rep",
            blocks: [
                { id: "t3", type: "trigger", label: "New Lead", emoji: "👤", icon: Users, color: "text-blue-500", bgColor: "bg-blue-500/15", glowColor: "shadow-blue-500/30", description: "Lead enters the funnel", executionText: "👤 New lead: John from Acme Corp..." },
                { id: "a3a", type: "action", label: "Save to CRM", emoji: "💾", icon: Database, color: "text-cyan-500", bgColor: "bg-cyan-500/15", glowColor: "shadow-cyan-500/30", description: "Stores in CRM database", executionText: "💾 Saved to HubSpot CRM..." },
                { id: "a3b", type: "action", label: "Score Lead", emoji: "📊", icon: BarChart, color: "text-amber-500", bgColor: "bg-amber-500/15", glowColor: "shadow-amber-500/30", description: "Calculates quality score", executionText: "📊 Lead score: 87/100 — Hot lead!" },
                { id: "a3c", type: "action", label: "Assign Rep", emoji: "🤝", icon: Users, color: "text-emerald-500", bgColor: "bg-emerald-500/15", glowColor: "shadow-emerald-500/30", description: "Routes to sales rep", executionText: "🤝 Assigned to Sarah (Top closer)" },
                { id: "x3", type: "action", label: "Post Tweet", emoji: "🐦", icon: MessageSquare, color: "text-sky-500", bgColor: "bg-sky-500/15", glowColor: "shadow-sky-500/30", description: "Posts on social media", executionText: "Posting to Twitter..." },
            ],
            correctOrder: ["t3", "a3a", "a3b", "a3c"],
            hint: "Think logically: capture → store → analyze → route"
        },
        xpReward: 200,
    },
    {
        id: 4, title: "AI-Powered Agents", concept: "AI agents can understand, decide, and act autonomously",
        description: "Unleash AI intelligence", emoji: "🤖",
        scenario: "An e-commerce company wants their chatbot to understand customer questions and route them to the right department automatically.",
        lesson: [
            "AI AGENTS use language models (like GPT) to understand intent.",
            "They can classify messages, extract data, and make decisions.",
            "This turns simple automation into intelligent automation."
        ],
        challenge: {
            prompt: "Customer sends message → AI understands intent → Route to correct department",
            blocks: [
                { id: "t4", type: "trigger", label: "Chat Message", emoji: "💬", icon: MessageSquare, color: "text-blue-500", bgColor: "bg-blue-500/15", glowColor: "shadow-blue-500/30", description: "Customer starts a chat", executionText: "💬 'I need help with my refund...'" },
                { id: "ai4", type: "ai", label: "AI Classifier", emoji: "🧠", icon: Cpu, color: "text-purple-500", bgColor: "bg-purple-500/15", glowColor: "shadow-purple-500/30", description: "AI reads & classifies intent", executionText: "🧠 AI: Intent = 'refund_request' (98%)" },
                { id: "a4", type: "action", label: "Route to Dept", emoji: "🏢", icon: GitBranch, color: "text-emerald-500", bgColor: "bg-emerald-500/15", glowColor: "shadow-emerald-500/30", description: "Sends to right department", executionText: "🏢 Routed to Billing Department ✓" },
                { id: "x4", type: "ai", label: "Image Gen", emoji: "🎨", icon: Sparkles, color: "text-pink-500", bgColor: "bg-pink-500/15", glowColor: "shadow-pink-500/30", description: "Generates images", executionText: "Generating image..." },
            ],
            correctOrder: ["t4", "ai4", "a4"],
            hint: "Message → AI understands → Routes correctly"
        },
        xpReward: 250,
    },
    {
        id: 5, title: "Master Pipeline", concept: "Combine triggers, AI, conditions & actions into one flow!",
        description: "The ultimate challenge", emoji: "🚀",
        scenario: "A company wants to auto-analyze support tickets with AI, detect unhappy customers, escalate to managers, and log everything — all in one flow.",
        lesson: [
            "Master automations combine ALL concepts into one pipeline.",
            "Trigger → AI Processing → Smart Conditions → Multiple Actions.",
            "This is how top companies automate 80% of repetitive work!"
        ],
        challenge: {
            prompt: "Support ticket → AI analyzes sentiment → If negative → Escalate + Log to CRM",
            blocks: [
                { id: "t5", type: "trigger", label: "New Ticket", emoji: "🎫", icon: FileText, color: "text-blue-500", bgColor: "bg-blue-500/15", glowColor: "shadow-blue-500/30", description: "Support ticket created", executionText: "🎫 Ticket #5891 from angry customer..." },
                { id: "ai5", type: "ai", label: "AI Sentiment", emoji: "🧠", icon: Bot, color: "text-purple-500", bgColor: "bg-purple-500/15", glowColor: "shadow-purple-500/30", description: "AI reads customer mood", executionText: "🧠 Sentiment: NEGATIVE (92% conf)" },
                { id: "c5", type: "condition", label: "Is Negative?", emoji: "😤", icon: Filter, color: "text-amber-500", bgColor: "bg-amber-500/15", glowColor: "shadow-amber-500/30", description: "Checks sentiment result", executionText: "⚠️ Condition TRUE → Escalating..." },
                { id: "a5a", type: "action", label: "Escalate", emoji: "🚨", icon: Shield, color: "text-red-500", bgColor: "bg-red-500/15", glowColor: "shadow-red-500/30", description: "Alerts manager immediately", executionText: "🚨 Manager @dave alerted!" },
                { id: "a5b", type: "action", label: "Log to CRM", emoji: "💾", icon: Database, color: "text-emerald-500", bgColor: "bg-emerald-500/15", glowColor: "shadow-emerald-500/30", description: "Records in CRM", executionText: "💾 Logged to Salesforce CRM ✓" },
                { id: "x5", type: "action", label: "Send Invoice", emoji: "💰", icon: FileText, color: "text-yellow-500", bgColor: "bg-yellow-500/15", glowColor: "shadow-yellow-500/30", description: "Sends billing invoice", executionText: "Sending invoice..." },
            ],
            correctOrder: ["t5", "ai5", "c5", "a5a", "a5b"],
            hint: "Ticket → AI analyzes → Check mood → Escalate + Log"
        },
        xpReward: 400,
    }
];

// ─── Achievements ───────────────────────────────────────────
const defaultAchievements: Achievement[] = [
    { id: "first", title: "First Workflow", emoji: "🎯", description: "Complete your first automation", unlocked: false },
    { id: "perfect", title: "Perfect Score", emoji: "💎", description: "Get 3 stars on any level", unlocked: false },
    { id: "fast", title: "Speed Demon", emoji: "⚡", description: "Complete a level in under 15 seconds", unlocked: false },
    { id: "streak", title: "On Fire", emoji: "🔥", description: "Complete 3 levels in a row without mistakes", unlocked: false },
    { id: "master", title: "Automation Master", emoji: "🏆", description: "Complete all 5 levels", unlocked: false },
];

// ─── Main Component ─────────────────────────────────────────
export function EcoAutomationGame() {
    const [phase, setPhase] = useState<GamePhase>("menu");
    const [currentLevel, setCurrentLevel] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const [completedLevels, setCompletedLevels] = useState<number[]>([]);
    const [levelStars, setLevelStars] = useState<Record<number, number>>({});
    const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [executingStep, setExecutingStep] = useState(-1);
    const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
    const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
    const [streak, setStreak] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const level = levels[currentLevel];

    // Timer
    useEffect(() => {
        if (timerActive) {
            timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [timerActive]);

    // Unlock achievement
    const unlockAchievement = useCallback((id: string) => {
        setAchievements(prev => {
            const updated = prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
            const ach = updated.find(a => a.id === id);
            if (ach && !prev.find(a => a.id === id)?.unlocked) {
                setNewAchievement(ach);
                setTimeout(() => setNewAchievement(null), 3000);
            }
            return updated;
        });
    }, []);

    const startLevel = useCallback((idx: number) => {
        setCurrentLevel(idx);
        setPhase("lesson");
        setSelectedBlocks([]);
        setShowResult(false);
        setIsCorrect(false);
        setAttempts(0);
        setShowHint(false);
        setExecutingStep(-1);
        setTimer(0);
        setTimerActive(false);
    }, []);

    const goToChallenge = useCallback(() => {
        setPhase("challenge");
        setSelectedBlocks([]);
        setShowResult(false);
        setShowHint(false);
        setTimer(0);
        setTimerActive(true);
    }, []);

    const toggleBlock = useCallback((blockId: string) => {
        if (showResult) return;
        setSelectedBlocks(prev =>
            prev.includes(blockId) ? prev.filter(b => b !== blockId) : [...prev, blockId]
        );
    }, [showResult]);

    // Animated execution
    const runExecution = useCallback((blocks: string[]) => {
        setPhase("executing");
        setTimerActive(false);
        let step = 0;
        const interval = setInterval(() => {
            setExecutingStep(step);
            step++;
            if (step > blocks.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setPhase("result");
                    setShowResult(true);
                }, 600);
            }
        }, 900);
    }, []);

    const checkAnswer = useCallback(() => {
        const correct = JSON.stringify(selectedBlocks) === JSON.stringify(level.challenge.correctOrder);
        setIsCorrect(correct);
        setAttempts(prev => prev + 1);

        if (correct) {
            const earnedStars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
            setLevelStars(prev => ({ ...prev, [currentLevel]: Math.max(prev[currentLevel] || 0, earnedStars) }));
            setTotalXp(prev => prev + level.xpReward);
            setCompletedLevels(prev => [...new Set([...prev, currentLevel])]);
            setStreak(prev => prev + 1);

            // Achievements
            unlockAchievement("first");
            if (earnedStars === 3) unlockAchievement("perfect");
            if (timer <= 15) unlockAchievement("fast");
            if (streak + 1 >= 3) unlockAchievement("streak");
            if (currentLevel === levels.length - 1) unlockAchievement("master");

            runExecution(selectedBlocks);
        } else {
            setShowResult(true);
            setStreak(0);
        }
    }, [selectedBlocks, level, attempts, currentLevel, timer, streak, unlockAchievement, runExecution]);

    const retry = useCallback(() => {
        setSelectedBlocks([]);
        setShowResult(false);
        setShowHint(true);
        setPhase("challenge");
        setTimerActive(true);
    }, []);

    const advance = useCallback(() => {
        if (currentLevel >= levels.length - 1) {
            setPhase("victory");
        } else {
            startLevel(currentLevel + 1);
        }
    }, [currentLevel, startLevel]);

    const reset = useCallback(() => {
        setPhase("menu");
        setCurrentLevel(0);
        setTotalXp(0);
        setCompletedLevels([]);
        setSelectedBlocks([]);
        setShowResult(false);
        setAttempts(0);
        setShowHint(false);
        setExecutingStep(-1);
        setAchievements(defaultAchievements);
        setStreak(0);
        setTimer(0);
        setTimerActive(false);
        setLevelStars({});
        setShowAchievements(false);
    }, []);

    const xpForRank = (xp: number) => {
        if (xp >= 800) return { rank: "🏆 Automation Master", next: null, pct: 100 };
        if (xp >= 500) return { rank: "🤖 AI Engineer", next: 800, pct: ((xp - 500) / 300) * 100 };
        if (xp >= 250) return { rank: "🔗 Pipeline Builder", next: 500, pct: ((xp - 250) / 250) * 100 };
        if (xp >= 100) return { rank: "🧠 Logic Learner", next: 250, pct: ((xp - 100) / 150) * 100 };
        return { rank: "⚡ Beginner", next: 100, pct: (xp / 100) * 100 };
    };

    const rankInfo = xpForRank(totalXp);

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden relative">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
                <div className="relative p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Bot className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-tight">Automation Academy</h3>
                                <p className="text-white/60 text-xs">{rankInfo.rank}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {phase !== "menu" && (
                                <>
                                    <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                                        <Flame className="h-3.5 w-3.5 text-orange-300" />
                                        <span className="text-white font-bold text-xs">{totalXp} XP</span>
                                    </div>
                                    {timerActive && (
                                        <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                                            <Timer className="h-3.5 w-3.5 text-cyan-300" />
                                            <span className="text-white font-mono text-xs">{timer}s</span>
                                        </div>
                                    )}
                                </>
                            )}
                            <button onClick={() => setShowAchievements(v => !v)} className="p-1.5 bg-white/15 backdrop-blur-sm rounded-full hover:bg-white/25 transition-colors" title="Achievements">
                                <Award className="h-4 w-4 text-white" />
                            </button>
                            <button onClick={reset} className="p-1.5 bg-white/15 backdrop-blur-sm rounded-full hover:bg-white/25 transition-colors" title="Restart">
                                <RotateCcw className="h-4 w-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* XP Progress Bar */}
                    {phase !== "menu" && rankInfo.next && (
                        <div className="mt-3">
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full transition-all duration-700" style={{ width: `${rankInfo.pct}%` }} />
                            </div>
                            <p className="text-[10px] text-white/40 mt-1 text-right">Next rank: {rankInfo.next} XP</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Achievement Toast */}
            {newAchievement && (
                <div
                    className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-bounce"
                >
                    <span className="text-xl">{newAchievement.emoji}</span>
                    <div>
                        <p className="text-xs font-bold">Achievement Unlocked!</p>
                        <p className="text-[10px]">{newAchievement.title}</p>
                    </div>
                </div>
            )}

            {/* Achievements Panel */}
            {showAchievements && (
                <div className="overflow-hidden border-b border-border animate-fade-in-up">
                    <div className="p-4 bg-muted/30 space-y-2">
                        <p className="text-xs font-bold text-muted-foreground uppercase">🏅 Achievements ({achievements.filter(a => a.unlocked).length}/{achievements.length})</p>
                        <div className="grid grid-cols-5 gap-1.5">
                            {achievements.map(ach => (
                                <div key={ach.id} className={`text-center p-2 rounded-lg transition-all ${ach.unlocked ? "bg-amber-500/10 border border-amber-500/30" : "bg-muted/50 opacity-40"}`} title={ach.description}>
                                    <span className="text-lg">{ach.unlocked ? ach.emoji : "🔒"}</span>
                                    <p className="text-[8px] font-bold text-muted-foreground mt-0.5 leading-tight">{ach.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Game Area */}
            <div className="p-5 min-h-[420px]">
                {/* ─── MENU ─── */}
                {phase === "menu" && (
                    <div key="menu" className="space-y-4 animate-fade-in">
                        <div className="text-center mb-2">
                            <h4 className="text-xl font-bold text-foreground">🎯 Select Mission</h4>
                            <p className="text-xs text-muted-foreground mt-1">Build real AI workflows step by step</p>
                        </div>
                        <div className="space-y-2">
                            {levels.map((lv, idx) => {
                                const done = completedLevels.includes(idx);
                                const locked = idx > 0 && !completedLevels.includes(idx - 1);
                                const stars = levelStars[idx] || 0;
                                return (
                                    <button key={lv.id} onClick={() => !locked && startLevel(idx)} disabled={locked}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group animate-fade-in-up ${locked ? "border-border opacity-40 cursor-not-allowed" : done ? "border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10" : "border-border hover:border-violet-500/40 hover:bg-violet-500/5"}`}
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${done ? "bg-emerald-500/20" : locked ? "bg-muted" : "bg-violet-500/15"}`}>
                                            {locked ? <Lock className="h-4 w-4 text-muted-foreground" /> : done ? "✅" : lv.emoji}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-sm text-foreground">{lv.title}</p>
                                                <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">+{lv.xpReward}XP</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">{lv.description}</p>
                                        </div>
                                        {done && (
                                            <div className="flex gap-0.5 shrink-0">{[1, 2, 3].map(s => (<Star key={s} className={`h-3.5 w-3.5 ${s <= stars ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`} />))}</div>
                                        )}
                                        {!locked && !done && <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-violet-500 transition-colors shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                        {completedLevels.length > 0 && (
                            <div className="text-center pt-1">
                                <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-4 py-1.5">
                                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-xs text-muted-foreground">{completedLevels.length}/{levels.length} complete · {totalXp} XP earned</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ─── LESSON ─── */}
                {phase === "lesson" && (
                    <div key="lesson" className="space-y-4 animate-fade-in-up">
                        <div className="text-center">
                            <span className="text-4xl">{level.emoji}</span>
                            <h4 className="text-lg font-bold text-foreground mt-2">Level {level.id}: {level.title}</h4>
                            <div className="mt-2 inline-block bg-violet-500/10 border border-violet-500/20 rounded-lg px-3 py-1.5">
                                <p className="text-xs font-medium text-violet-400">{level.concept}</p>
                            </div>
                        </div>

                        {/* Real-world scenario */}
                        <div className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-3">
                            <div className="flex items-start gap-2">
                                <span className="text-sm mt-0.5">🏢</span>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-blue-400 mb-1">Real-World Scenario</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{level.scenario}</p>
                                </div>
                            </div>
                        </div>

                        {/* Lesson points */}
                        <div className="bg-muted/40 rounded-xl p-3 space-y-2">
                            <div className="flex items-center gap-1.5">
                                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                                <p className="text-xs font-bold text-foreground">Key Concepts</p>
                            </div>
                            {level.lesson.map((line, i) => (
                                <div key={i} className="flex items-start gap-2 pl-1 animate-fade-in-up"
                                    style={{ animationDelay: `${200 + i * 150}ms` }}
                                >
                                    <div className="w-5 h-5 rounded-md bg-violet-500/15 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[10px] font-bold text-violet-400">{i + 1}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{line}</p>
                                </div>
                            ))}
                        </div>

                        {/* Block legend */}
                        <div className="grid grid-cols-4 gap-1.5">
                            {Object.entries(typeConfig).map(([key, val]) => (
                                <div key={key} className={`${val.bg} border ${val.border} rounded-lg p-1.5 text-center`}>
                                    <p className={`text-[9px] font-bold ${val.color}`}>{val.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button onClick={goToChallenge}
                                className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-bold py-2.5 px-6 rounded-full shadow-lg hover:shadow-violet-500/25 transition-all flex items-center gap-2 mx-auto text-sm hover:scale-105 active:scale-95 transform"
                            >
                                Start Challenge <Play className="h-4 w-4 fill-white" />
                            </button>
                        </div>
                    </div>
                )}

                {/* ─── CHALLENGE ─── */}
                {phase === "challenge" && (
                    <div key="challenge" className="space-y-3 animate-fade-in">
                        {/* Prompt */}
                        <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl p-3">
                            <div className="flex items-start gap-2">
                                <Workflow className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-bold text-violet-400 uppercase">Build This Automation:</p>
                                    <p className="text-sm font-medium text-foreground mt-0.5">{level.challenge.prompt}</p>
                                </div>
                            </div>
                        </div>

                        {/* Pipeline */}
                        <div className="bg-muted/20 border border-border rounded-xl p-3 min-h-[52px]">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase mb-2">Your Pipeline:</p>
                            {selectedBlocks.length === 0 ? (
                                <p className="text-xs text-muted-foreground text-center py-2 italic opacity-60">👇 Tap blocks to build your automation flow</p>
                            ) : (
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {selectedBlocks.map((blockId, i) => {
                                        const block = level.challenge.blocks.find(b => b.id === blockId)!;
                                        const tc = typeConfig[block.type];
                                        return (
                                            <div key={blockId} className="flex items-center gap-1 animate-fade-in-up">
                                                {i > 0 && (
                                                    <div className="animate-pulse">
                                                        <ArrowRight className="h-3 w-3 text-violet-400" />
                                                    </div>
                                                )}
                                                <button onClick={() => toggleBlock(blockId)} className={`${tc.bg} border ${tc.border} rounded-lg px-2 py-1 flex items-center gap-1 hover:opacity-70 transition-opacity shadow-sm`}>
                                                    <span className="text-xs">{block.emoji}</span>
                                                    <span className={`text-[10px] font-bold ${tc.color}`}>{block.label}</span>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Available blocks */}
                        <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase mb-2">Available Blocks:</p>
                            <div className="grid grid-cols-2 gap-2">
                                {level.challenge.blocks.map((block) => {
                                    const selected = selectedBlocks.includes(block.id);
                                    const tc = typeConfig[block.type];
                                    const Icon = block.icon;
                                    return (
                                        <button key={block.id} onClick={() => toggleBlock(block.id)}
                                            className={`p-2.5 rounded-xl border-2 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${selected ? `${tc.border} ${tc.bg} opacity-50 scale-95` : `border-border hover:${tc.border} bg-card hover:${tc.bg}`}`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className={`w-7 h-7 rounded-lg ${block.bgColor} flex items-center justify-center shadow-sm`}>
                                                    <Icon className={`h-3.5 w-3.5 ${block.color}`} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-foreground truncate">{block.label}</p>
                                                    <p className={`text-[8px] font-bold uppercase ${tc.color}`}>{tc.label}</p>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground leading-tight">{block.description}</p>
                                            {selected && <p className="text-[9px] text-violet-400 font-bold mt-1">✓ In pipeline</p>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Hint */}
                        {showHint && (
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-start gap-2 animate-fade-in-up">
                                <Lightbulb className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-amber-600 dark:text-amber-400">{level.challenge.hint}</p>
                            </div>
                        )}

                        {/* Wrong answer feedback */}
                        {showResult && !isCorrect && (
                            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-3 text-center animate-fade-in-up">
                                <XCircle className="h-6 w-6 text-red-500 mx-auto mb-1" />
                                <p className="font-bold text-sm text-red-600 dark:text-red-400">Not quite right!</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">Check the order and remove wrong blocks</p>
                                <button onClick={retry}
                                    className="mt-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold py-1.5 px-5 rounded-full text-xs hover:scale-105 active:scale-95 transition-transform"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* Check button */}
                        {!showResult && selectedBlocks.length > 0 && (
                            <div className="text-center pt-1">
                                <button onClick={checkAnswer}
                                    className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-bold py-2.5 px-8 rounded-full shadow-lg hover:shadow-violet-500/25 transition-all text-sm hover:scale-105 active:scale-95 transform"
                                >
                                    ▶ Run Workflow
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ─── EXECUTING ─── */}
                {phase === "executing" && (
                    <div key="executing" className="space-y-4 animate-fade-in">
                        <div className="text-center mb-2">
                            <h4 className="text-lg font-bold text-foreground">⚙️ Running Workflow...</h4>
                            <p className="text-xs text-muted-foreground">Watch your automation execute in real-time</p>
                        </div>

                        <div className="space-y-1">
                            {selectedBlocks.map((blockId, i) => {
                                const block = level.challenge.blocks.find(b => b.id === blockId)!;
                                const tc = typeConfig[block.type];
                                const isActive = executingStep === i;
                                const isDone = executingStep > i;

                                return (
                                    <div key={blockId} className={`transition-all duration-300 ${isDone || isActive ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-2"}`}>
                                        {i > 0 && (
                                            <div className="flex justify-center py-1">
                                                <div className={`w-0.5 h-4 bg-violet-500 rounded-full origin-top transition-all duration-300 ${isDone ? "opacity-100 scale-y-100" : "opacity-30 scale-y-50"}`} />
                                            </div>
                                        )}
                                        <div className={`rounded-xl p-3 border-2 transition-all duration-500 ${isActive ? `${tc.border} ${tc.bg} shadow-lg ${tc.glow}` : isDone ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-muted/20"}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? block.bgColor : isDone ? "bg-emerald-500/20" : "bg-muted"}`}>
                                                    {isDone ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <span className="text-lg">{block.emoji}</span>}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className={`text-xs font-bold ${isDone ? "text-emerald-500" : isActive ? tc.color : "text-muted-foreground"}`}>{block.label}</p>
                                                        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${tc.bg} ${tc.color}`}>{tc.label}</span>
                                                    </div>
                                                    {(isActive || isDone) && (
                                                        <p className={`text-[11px] mt-0.5 font-mono animate-fade-in ${isDone ? "text-emerald-400" : "text-muted-foreground"}`}>
                                                            {block.executionText}
                                                        </p>
                                                    )}
                                                </div>
                                                {isActive && (
                                                    <div className="animate-spin">
                                                        <Cpu className="h-4 w-4 text-violet-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ─── RESULT (SUCCESS) ─── */}
                {phase === "result" && isCorrect && (
                    <div key="result" className="flex flex-col items-center justify-center min-h-[380px] text-center space-y-3 animate-fade-in-up">
                        <div className="text-5xl animate-bounce">🎉</div>
                        <h4 className="text-xl font-bold text-foreground">Workflow Complete!</h4>
                        <p className="text-sm text-muted-foreground">Level {level.id} automation running perfectly</p>

                        {/* Stars */}
                        <div className="flex items-center gap-2 py-2">
                            {[1, 2, 3].map(s => {
                                const earned = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
                                return (
                                    <div key={s} className="transform transition-all" style={{ transitionDelay: `${s * 200}ms` }}>
                                        <Star className={`h-8 w-8 ${s <= earned ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]" : "text-muted-foreground/20"}`} />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-muted/30 rounded-xl p-3 w-full max-w-xs space-y-1.5">
                            <div className="flex justify-between text-xs"><span className="text-muted-foreground">XP Earned</span><span className="font-bold text-violet-400">+{level.xpReward}</span></div>
                            <div className="flex justify-between text-xs"><span className="text-muted-foreground">Time</span><span className="font-bold">{timer}s</span></div>
                            <div className="flex justify-between text-xs"><span className="text-muted-foreground">Attempts</span><span className="font-bold">{attempts}</span></div>
                            {streak > 1 && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Streak</span><span className="font-bold text-orange-400">🔥 {streak}</span></div>}
                        </div>

                        <button onClick={advance}
                            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-2.5 px-6 rounded-full text-sm flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-transform"
                        >
                            {currentLevel >= levels.length - 1 ? "🏆 See Results" : "Next Mission"} <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {/* ─── VICTORY ─── */}
                {phase === "victory" && (
                    <div key="victory" className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 animate-fade-in-up">
                        <div className="text-6xl animate-bounce">🏆</div>
                        <h4 className="text-2xl font-bold text-foreground">Automation Master!</h4>
                        <p className="text-sm text-muted-foreground max-w-xs">You&apos;ve mastered all 5 levels of AI workflow automation!</p>

                        <div className="bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl p-4 w-full max-w-xs">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Flame className="h-5 w-5 text-orange-400" />
                                <span className="text-2xl font-bold text-foreground">{totalXp} XP</span>
                            </div>
                            <div className="grid grid-cols-5 gap-1 mb-3">
                                {levels.map((_, i) => (
                                    <div key={i} className="flex justify-center gap-0.5">
                                        {[1, 2, 3].map(s => (<Star key={s} className={`h-2.5 w-2.5 ${s <= (levelStars[i] || 0) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"}`} />))}
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-0.5 text-[11px] text-muted-foreground">
                                <p>✅ Triggers & Actions</p>
                                <p>✅ Smart Conditions</p>
                                <p>✅ Multi-Step Pipelines</p>
                                <p>✅ AI-Powered Agents</p>
                                <p>✅ Master Pipeline</p>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground max-w-xs">Now you understand how <span className="font-bold text-primary">Atul Automation</span> builds real-world AI workflows!</p>

                        <div className="flex gap-2">
                            <button onClick={reset}
                                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold py-2 px-5 rounded-full flex items-center gap-1.5 text-sm hover:scale-105 active:scale-95 transition-transform"
                            >
                                <RotateCcw className="h-3.5 w-3.5" /> Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
