"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ROICalculator() {
    const [hours, setHours] = useState(10);
    const [rate, setRate] = useState(25);
    const [employees, setEmployees] = useState(2);

    const weeklyCost = hours * rate * employees;
    const annualCost = weeklyCost * 52;
    const automatedSavings = annualCost * 0.8; // Assuming 80% automation

    return (
        <section id="tools" className="section-padding bg-background">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Calculate Your <span className="text-gradient">Imbalance</span></h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            See exactly how much manual tasks are costing your business every year.
                            By automating these tasks, you could reinvest this capital into growth.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-medium mb-2">Hours Spent Per Week (Manual Tasks)</label>
                                <input
                                    type="range"
                                    min="1" max="100"
                                    value={hours}
                                    onChange={(e) => setHours(Number(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="text-right font-bold text-primary mt-1">{hours} hours</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Hourly Rate ($)</label>
                                <input
                                    type="range"
                                    min="10" max="200"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="text-right font-bold text-primary mt-1">${rate}/hr</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Number of Employees</label>
                                <input
                                    type="range"
                                    min="1" max="50"
                                    value={employees}
                                    onChange={(e) => setEmployees(Number(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="text-right font-bold text-primary mt-1">{employees} people</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="text-9xl font-bold text-primary">$</span>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Current Annual Cost</p>
                                <motion.div
                                    key={annualCost}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-4xl font-bold text-foreground"
                                >
                                    ${annualCost.toLocaleString()}
                                </motion.div>
                            </div>

                            <div className="h-px bg-border my-6" />

                            <div>
                                <p className="text-sm text-primary uppercase tracking-wider mb-1 font-bold">Potential Annual Savings</p>
                                <motion.div
                                    key={automatedSavings}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl font-bold text-primary"
                                >
                                    ${automatedSavings.toLocaleString()}
                                </motion.div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    *Based on 80% automation efficiency
                                </p>
                            </div>

                            <div className="pt-6">
                                <button className="w-full py-4 rounded-xl bg-foreground text-background font-bold hover:opacity-90 transition-opacity">
                                    Get Your Personal Audit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
