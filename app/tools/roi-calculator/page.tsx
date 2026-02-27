'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight, RotateCcw } from 'lucide-react';
import { SocialShare } from '@/components/ui/social-share';

interface Results {
    monthlySaved: number;
    yearlySaved: number;
    hoursSaved: number;
    roi: number;
}

export default function ROICalculator() {
    const [employees, setEmployees] = useState(5);
    const [hoursOnRepetitive, setHoursOnRepetitive] = useState(15);
    const [avgSalary, setAvgSalary] = useState(30000);
    const [results, setResults] = useState<Results | null>(null);

    const calculate = () => {
        const hourlyRate = avgSalary / (22 * 8); // 22 working days, 8 hours
        const automationEfficiency = 0.7; // AI automates 70% of repetitive tasks
        const hoursAutomated = hoursOnRepetitive * automationEfficiency * employees;
        const monthlySaved = hoursAutomated * hourlyRate * 4; // 4 weeks
        const automationCost = 15000; // Avg monthly cost of automation
        const netSaved = monthlySaved - automationCost;
        const roi = netSaved > 0 ? ((netSaved / automationCost) * 100) : 0;

        setResults({
            monthlySaved: Math.round(netSaved),
            yearlySaved: Math.round(netSaved * 12),
            hoursSaved: Math.round(hoursAutomated * 4),
            roi: Math.round(roi),
        });
    };

    const reset = () => {
        setEmployees(5);
        setHoursOnRepetitive(15);
        setAvgSalary(30000);
        setResults(null);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <main className="min-h-screen pt-24 md:pt-32 pb-24">
            <section className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="section-badge mb-4">
                        <Calculator className="h-3 w-3" />
                        Free Tool
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        AI Automation{' '}
                        <span className="text-gradient">ROI Calculator</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find out exactly how much time and money your business can save with AI automation. Takes 30 seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Card */}
                    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                        <h2 className="text-xl font-bold mb-6">Your Business Details</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Number of Employees
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={employees}
                                    onChange={(e) => setEmployees(Number(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="text-muted-foreground">1</span>
                                    <span className="font-bold text-primary text-lg">{employees}</span>
                                    <span className="text-muted-foreground">100</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Hours/Week on Repetitive Tasks (per employee)
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="40"
                                    value={hoursOnRepetitive}
                                    onChange={(e) => setHoursOnRepetitive(Number(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="text-muted-foreground">1 hr</span>
                                    <span className="font-bold text-primary text-lg">{hoursOnRepetitive} hrs</span>
                                    <span className="text-muted-foreground">40 hrs</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Average Monthly Salary (₹)
                                </label>
                                <input
                                    type="range"
                                    min="10000"
                                    max="200000"
                                    step="5000"
                                    value={avgSalary}
                                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="text-muted-foreground">₹10K</span>
                                    <span className="font-bold text-primary text-lg">{formatCurrency(avgSalary)}</span>
                                    <span className="text-muted-foreground">₹2L</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={calculate}
                                    className="btn-primary flex-1"
                                >
                                    Calculate ROI <ArrowRight className="ml-1.5 h-4 w-4" />
                                </button>
                                <button
                                    onClick={reset}
                                    className="btn-secondary px-4"
                                    title="Reset"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Card */}
                    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                        <h2 className="text-xl font-bold mb-6">Your Savings</h2>

                        {results ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                                        <DollarSign className="h-5 w-5 text-primary mb-2" />
                                        <div className="text-2xl font-bold text-primary">{formatCurrency(results.monthlySaved)}</div>
                                        <div className="text-xs text-muted-foreground">Monthly Savings</div>
                                    </div>
                                    <div className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 p-4">
                                        <TrendingUp className="h-5 w-5 text-accent mb-2" />
                                        <div className="text-2xl font-bold text-accent">{formatCurrency(results.yearlySaved)}</div>
                                        <div className="text-xs text-muted-foreground">Yearly Savings</div>
                                    </div>
                                    <div className="rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 p-4">
                                        <Clock className="h-5 w-5 text-secondary mb-2" />
                                        <div className="text-2xl font-bold text-secondary">{results.hoursSaved} hrs</div>
                                        <div className="text-xs text-muted-foreground">Hours Saved/Month</div>
                                    </div>
                                    <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 p-4">
                                        <Calculator className="h-5 w-5 text-green-500 mb-2" />
                                        <div className="text-2xl font-bold text-green-500">{results.roi}%</div>
                                        <div className="text-xs text-muted-foreground">ROI</div>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-muted/50 p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong className="text-foreground">Summary:</strong> By automating 70% of repetitive tasks for your team of {employees}, you could save <strong className="text-primary">{formatCurrency(results.yearlySaved)}/year</strong> and free up <strong className="text-primary">{results.hoursSaved} hours</strong> every month for high-value work.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between gap-4">
                                    <div className="text-xs text-muted-foreground mr-2">
                                        <strong className="text-primary">Next Step:</strong> Want to see if your business is actually ready?
                                    </div>
                                    <Link href="/tools/ai-readiness-quiz" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline whitespace-nowrap">
                                        Take Readiness Quiz <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href="/#contact"
                                        className="btn-primary w-full text-center"
                                    >
                                        Get Free Automation Consultation
                                    </Link>
                                    <a
                                        href={`https://wa.me/918518824480?text=Hi! I used the ROI calculator and my potential savings are ${formatCurrency(results.yearlySaved)}/year. I'd like to learn more about AI automation.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary w-full text-center"
                                    >
                                        Discuss on WhatsApp
                                    </a>
                                </div>

                                <SocialShare
                                    title={`I could save ${formatCurrency(results.yearlySaved)}/year with AI automation! Check your savings:`}
                                    description="Free ROI Calculator by Atul Automation"
                                    url="https://atulautomation.com/tools/roi-calculator"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Calculator className="h-8 w-8 text-primary/40" />
                                </div>
                                <p className="text-muted-foreground">
                                    Adjust the sliders and click <br /><strong>&quot;Calculate ROI&quot;</strong> to see your savings
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* FAQ for SEO */}
                <div className="mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {[
                            {
                                q: 'How accurate is this ROI calculator?',
                                a: 'This calculator provides an estimate based on industry averages. AI automation typically automates 60-80% of repetitive tasks. Your actual savings may vary based on your specific workflows and processes.',
                            },
                            {
                                q: 'What types of tasks can AI automate?',
                                a: 'AI can automate customer support (chatbots), lead qualification, email follow-ups, data entry, invoice processing, social media posting, report generation, appointment scheduling, and much more.',
                            },
                            {
                                q: 'How long does it take to set up AI automation?',
                                a: 'Most automation setups take 1-2 weeks. Simple chatbots can be live in 2-3 days. Complex workflow automation with multiple integrations typically takes 2-4 weeks.',
                            },
                            {
                                q: 'Do I need technical knowledge to use AI automation?',
                                a: 'No! We handle all the technical setup. Once configured, your AI tools work automatically. We also provide training and ongoing support to ensure everything runs smoothly.',
                            },
                        ].map((faq, i) => (
                            <div key={i} className="rounded-xl border border-border bg-card p-5">
                                <h3 className="font-semibold mb-2">{faq.q}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
