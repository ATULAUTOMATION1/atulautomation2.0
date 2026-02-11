"use client";

import { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";

export function CaptionGenerator() {
    const [topic, setTopic] = useState("");
    const [platform, setPlatform] = useState("instagram");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        setLoading(true);
        setTimeout(() => {
            setResult(`🚀 Transform your business with AI today! \n\nWe just launched a new tool that handles customer support 24/7. \n\n👉 Link in bio to try it out! \n\n#AI #Automation #GrowthHack #${platform}`);
            setLoading(false);
        }, 1500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-[400px] border border-border rounded-xl  bg-background flex flex-col p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center">
                <Sparkles className="h-5 w-5 text-accent mr-2" />
                Social Media Caption AI
            </h3>

            <div className="space-y-4 flex-1">
                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Topic / Image Desc</label>
                    <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. New AI product launch"
                        className="w-full p-2 rounded-lg bg-muted border border-border text-sm focus:border-primary outline-none"
                    />
                </div>

                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Platform</label>
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full p-2 rounded-lg bg-muted border border-border text-sm focus:border-primary outline-none"
                    >
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter / X</option>
                        <option value="linkedin">LinkedIn</option>
                    </select>
                </div>

                <button
                    onClick={generate}
                    disabled={loading || !topic}
                    className="w-full btn-primary py-2 text-sm disabled:opacity-50"
                >
                    {loading ? "Generating..." : "Generate Output"}
                </button>
            </div>

            {result && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border relative group">
                    <p className="text-sm whitespace-pre-wrap">{result}</p>
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-background border border-border hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                    >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                </div>
            )}
        </div>
    );
}
