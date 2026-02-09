"use client";

import { useState } from "react";
import { Code, Play } from "lucide-react";

export function PromptLoader() {
    const [json, setJson] = useState(`{
  "agent_type": "support",
  "tone": "empathetic",
  "rules": [
    "never_mention_competitors",
    "always_offer_refund_if_angry"
  ]
}`);

    const [output, setOutput] = useState("");

    const run = () => {
        setOutput("// Parsed Configuration...\n// Initializing Agent...\n>> Agent Ready: Support Bot v2.1\n>> Listening on port 8080");
    };

    return (
        <div className="h-[400px] border border-border rounded-xl bg-background flex flex-col overflow-hidden">
            <div className="bg-muted border-b border-border p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2 px-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">config.json</span>
                </div>
                <button onClick={run} className="text-xs flex items-center bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors">
                    <Play className="h-3 w-3 mr-1" /> Run
                </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                <textarea
                    value={json}
                    onChange={(e) => setJson(e.target.value)}
                    className="w-full h-full p-4 bg-background font-mono text-xs resize-none outline-none text-foreground"
                    spellCheck="false"
                />
                <div className="bg-muted/10 p-4 font-mono text-xs text-green-600 whitespace-pre-wrap">
                    {output || "// Output will appear here..."}
                </div>
            </div>
        </div>
    );
}
