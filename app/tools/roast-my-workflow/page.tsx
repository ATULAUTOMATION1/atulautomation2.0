'use client';

import { useState } from 'react';
import { Bot, Flame, ArrowRight, Loader2, Sparkles, TrendingDown, Clock, MessageSquareX, RotateCcw } from 'lucide-react';
import { SocialShare } from '@/components/ui/social-share';

export default function RoastMyWorkflow() {
    const [workflow, setWorkflow] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ roast: string, score: number, timeWasted?: string, moneyWasted?: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (workflow.length < 10) {
            setError('Please describe your workflow in a bit more detail! You have more manual steps than 10 characters.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/roast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workflow }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze workflow.');
            }

            setResult({
                roast: data.roast,
                score: data.score || 15,
                timeWasted: data.timeWasted || "Way too much",
                moneyWasted: data.moneyWasted || "Unquantifiable"
            });
        } catch (err: any) {
            setError(err.message || 'The AI got a headache analyzing how manual this is. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setWorkflow('');
    };

    return (
        <main className="min-h-screen pt-24 md:pt-32 pb-24 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />

            <section className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12 relative z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-6">
                        <Flame className="w-4 h-4" />
                        AI Workflow Roaster🔥
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Let Our AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Roast</span> Your
                        <br /> Manual Processes.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Are you STILL copying data from emails to spreadsheets? Tell us what you do manually every day, and our AI will ruthlessly analyze how much time and money you are wasting.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                    {/* Input Area */}
                    {!result && (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="workflow" className="block text-sm font-semibold mb-3">
                                            Describe your most repetitive daily task honestly:
                                        </label>
                                        <textarea
                                            id="workflow"
                                            rows={5}
                                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 resize-none transition-shadow"
                                            placeholder="Example: Every morning an email comes in from an angry client. I copy their details, open Google Sheets, paste the name, search their history in our CRM, write a draft reply, send it to my boss for review, then manually reply on Gmail..."
                                            value={workflow}
                                            onChange={(e) => setWorkflow(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg text-sm">
                                            <MessageSquareX className="w-4 h-4" />
                                            <p>{error}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex justify-center items-center py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-lg hover:shadow-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2 w-5 h-5" />
                                                Analyzing your analog life...
                                            </>
                                        ) : (
                                            <>
                                                <Bot className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                                                Roast My Workflow 🔥
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Results Area */}
                    {result && (
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="relative bg-card border border-red-500/20 rounded-2xl overflow-hidden shadow-2xl">
                                {/* Top stats strip */}
                                <div className="grid grid-cols-3 border-b border-border bg-muted/30">
                                    <div className="p-4 text-center border-r border-border">
                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Automation Score</div>
                                        <div className="text-3xl font-black text-red-500">{result.score}/100</div>
                                    </div>
                                    <div className="p-4 text-center border-r border-border">
                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center justify-center gap-1"><Clock className="w-3 h-3" /> Estimated Time Wasted</div>
                                        <div className="text-lg font-bold">{result.timeWasted}</div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center justify-center gap-1"><TrendingDown className="w-3 h-3" /> Money Burned</div>
                                        <div className="text-lg font-bold text-red-400">{result.moneyWasted}</div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-10 space-y-8">
                                    {/* The Roast */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                                <Flame className="w-5 h-5 text-red-500" />
                                            </div>
                                            <h3 className="text-xl font-bold">The AI Verdict:</h3>
                                        </div>
                                        <div className="prose prose-zinc dark:prose-invert max-w-none">
                                            <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                                {result.roast}
                                            </p>
                                        </div>
                                    </div>

                                    {/* The Pitch */}
                                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-8 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Sparkles className="w-24 h-24 text-primary" />
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                                                <Sparkles className="w-5 h-5" />
                                                Stop suffering. Start scaling.
                                            </h4>
                                            <p className="text-muted-foreground mb-6">
                                                Every minute you spend on this is a minute you aren't growing your business. At Atul Automation, we build intelligent AI agents that handle this exact BS while you sleep.
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <a href="/#contact" className="flex-1 inline-flex justify-center items-center py-3 px-6 rounded-lg font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                                                    Get Free Automation Assessment <ArrowRight className="ml-2 w-4 h-4" />
                                                </a>
                                                <button onClick={handleReset} className="inline-flex justify-center items-center py-3 px-6 rounded-lg font-semibold text-foreground bg-secondary hover:bg-secondary/80 transition-colors">
                                                    <RotateCcw className="mr-2 w-4 h-4" /> Try Another
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <SocialShare
                                    title={`My manual workflow just got roasted by an AI and scored ${result.score}/100 😭 Validate how much time you're wasting at:`}
                                    description="Get your manual processes roasted by this aggressive AI workflow analyzer."
                                    url="https://atulautomation.com/tools/roast-my-workflow"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
