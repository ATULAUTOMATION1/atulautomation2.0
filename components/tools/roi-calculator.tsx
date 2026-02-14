"use client";

import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Clock, Users, ArrowRight } from "lucide-react";

export function ROICalculator() {
    const [hours, setHours] = useState(10);
    const [rate, setRate] = useState(25);
    const [employees, setEmployees] = useState(2);

    const weeklyCost = hours * rate * employees;
    const annualCost = weeklyCost * 52;
    const automatedSavings = annualCost * 0.8;
    const hoursSaved = hours * employees * 0.8 * 52;

    return (
        <section id="tools" className="section-padding bg-transparent">
            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <Calculator className="h-3.5 w-3.5" /> ROI Calculator
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Calculate Your <span className="text-primary">Savings</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        See exactly how much manual tasks are costing your business.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto opacity-0 animate-fade-in-up delay-100">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-8">
                            <h3 className="font-bold text-lg mb-8 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" /> Configure Data
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" /> Hours/Week (Manual)
                                        </label>
                                        <span className="text-sm font-bold bg-muted px-2 py-1 rounded-md min-w-[3rem] text-center">{hours}h</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="100" value={hours} onChange={(e) => setHours(Number(e.target.value))}
                                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" /> Hourly Rate
                                        </label>
                                        <span className="text-sm font-bold bg-muted px-2 py-1 rounded-md min-w-[3rem] text-center">${rate}</span>
                                    </div>
                                    <input
                                        type="range" min="10" max="200" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" /> Employees
                                        </label>
                                        <span className="text-sm font-bold bg-muted px-2 py-1 rounded-md min-w-[3rem] text-center">{employees}</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="50" value={employees} onChange={(e) => setEmployees(Number(e.target.value))}
                                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl relative overflow-hidden transition-transform hover:scale-[1.01] duration-500">
                        {/* Abstract blobs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-lg font-medium mb-6 opacity-90">Estimated Annual Impact</h3>

                            <div className="grid gap-6 mb-8">
                                <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                                    <p className="text-xs uppercase tracking-wider font-bold opacity-70 mb-1">Potential Savings</p>
                                    <p className="text-4xl md:text-5xl font-bold tracking-tight mb-1 animate-fade-in" key={automatedSavings}>
                                        ${Math.round(automatedSavings).toLocaleString()}
                                    </p>
                                    <p className="text-sm opacity-80">Per year with automation</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <p className="text-2xl font-bold animate-fade-in" key={hoursSaved}>{Math.round(hoursSaved / 52)}h</p>
                                        <p className="text-xs opacity-70">Hours Saved / Week</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <p className="text-2xl font-bold animate-fade-in" key={annualCost}>${Math.round(annualCost).toLocaleString()}</p>
                                        <p className="text-xs opacity-70">Current Annual Cost</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95">
                                Get Full Audit <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
