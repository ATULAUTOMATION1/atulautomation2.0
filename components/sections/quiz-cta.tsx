
import Link from "next/link";
import { Brain, ArrowRight, Sparkles } from "lucide-react";

export function QuizCTA() {
    return (
        <section className="py-12 bg-transparent">
            <div className="container-custom">
                <div className="relative group overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-orange-500/10 p-8 md:p-12 shadow-2xl">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Brain className="w-32 h-32 text-primary" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                <span className="text-xs font-bold text-primary tracking-wide uppercase">Free Assessment</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                                Is Your Business <span className="text-gradient">Ready for AI?</span>
                            </h2>

                            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                                Stop guessing. Take our 2-minute &quot;AI Readiness Assessment&quot; to discover your automation potential and get a personalized roadmap instantly.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/tools/ai-readiness-quiz" className="btn-primary group">
                                    Take Free Quiz
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                                    <span>✨ Takes only 2 minutes</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            {[
                                { label: "Checklist", desc: "50+ automation points" },
                                { label: "AI Score", desc: "Instant percentage" },
                                { label: "Roadmap", desc: "Actionable steps" },
                                { label: "ROI Prep", desc: "Estimated savings" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                                    <p className="font-bold text-primary mb-1">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
