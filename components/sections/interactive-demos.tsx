"use client";

import { WorkflowSimulator } from "../tools/workflow-simulator";
import { AutomationPuzzle } from "../tools/automation-puzzle";
import { TrendFeed } from "../tools/trend-feed";

export function InteractiveDemos() {
    return (
        <section id="interactive-demos" className="section-padding bg-background">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">Interactive <span className="text-gradient">Playground</span></h2>
                    <p className="text-muted-foreground text-lg">
                        Test your automation skills, simulate workflows, and stay updated with the latest trends.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Simulator - Spans 8 columns on large screens */}
                    <div className="lg:col-span-8">
                        <WorkflowSimulator />
                    </div>

                    {/* Sidebar Tools - Spans 4 columns */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <AutomationPuzzle />
                        <TrendFeed />
                    </div>
                </div>
            </div>
        </section>
    );
}
