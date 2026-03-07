"use client";

import { useState } from "react";
import { Sparkles, Terminal, Wand2, Layout, Loader2, Code, Monitor, ExternalLink, Mail } from "lucide-react";

export function PrototypeBuilder() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedHtml(null);

    try {
      const res = await fetch("/api/generate-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setGeneratedHtml(data.html);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during UI generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const openFullscreen = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLeadCaptured(true);
    // Real implementation would POST to /api/subscribe
  };

  return (
    <section id="prototype-builder" className="py-16 md:py-24 bg-transparent text-foreground relative overflow-hidden border-t border-border/20">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 hidden md:block">
        
        {/* Fully unified Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-10 items-stretch opacity-0 animate-fade-in-up">
          
          {/* LEFT PANEL: Text + Form + Lead Capture */}
          <div className="flex flex-col justify-center">
            
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" /> AI App Builder
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Design your app.<br/>
                <span className="text-primary">We build it live.</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Describe the web app, CRM, or dashboard you need. Our AI engine will program a working UI right before your eyes.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors mb-6">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-foreground">
                   <Terminal className="h-4 w-4 text-primary" />
                   Generate UI
                </h3>
                <form onSubmit={handleGenerate}>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. A modern real estate dashboard with a property sidebar, map view, and stats."
                    className="w-full h-24 bg-muted/40 border border-border rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground mb-3 transition-colors"
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={isGenerating}
                    className="w-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-shadow"
                  >
                    {isGenerating ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Synthesizing...</>
                    ) : (
                      <><Wand2 className="h-4 w-4" /> Build Prototype</>
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-xs">
                    {error}
                  </div>
                )}
                
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>Try:</span>
                  <button onClick={() => setPrompt("A modern analytics dashboard for e-commerce with a sidebar")} className="hover:text-primary transition-colors underline decoration-border underline-offset-4">E-commerce</button>
                  <button onClick={() => setPrompt("A patient management system for clinics with list views")} className="hover:text-primary transition-colors underline decoration-border underline-offset-4">Health CRM</button>
                </div>
             </div>

             {/* Lead Capture Module docked at the bottom of left column */}
             <div className="bg-primary/5 rounded-xl border border-primary/20 p-5 mt-auto">
                {leadCaptured ? (
                  <div className="text-center py-2 animate-fade-in text-foreground rounded-lg p-2">
                    <Sparkles className="h-4 w-4 text-primary mx-auto mb-1" />
                    <p className="font-semibold text-sm">Success!</p>
                  </div>
                ) : (
                  <>
                    <h4 className="font-bold text-sm mb-1 flex items-center gap-2 text-foreground">
                      <Code className="h-4 w-4 text-primary" /> Want to deploy this?
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Enter your email to claim a free automation strategy call to turn this UI into a real app.
                    </p>
                    <form onSubmit={handleLeadCapture} className="flex gap-2">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com" 
                        className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 min-w-0"
                        required
                      />
                      <button type="submit" className="bg-primary text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-orange-600 transition-colors flex items-center justify-center whitespace-nowrap">
                        <Mail className="h-3.5 w-3.5 mr-1.5" /> Book Call
                      </button>
                    </form>
                  </>
                )}
             </div>

          </div>

          {/* RIGHT PANEL: The App Preview iframe */}
          <div className="h-[550px] w-full bg-muted/20 border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col relative group">
            
            <div className="h-[42px] bg-card border-b border-border flex items-center px-4 justify-between shrink-0 relative z-10">
               <div className="flex items-center gap-4">
                 <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                 </div>
                 <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs font-mono bg-muted px-2 py-0.5 rounded border border-border">
                   <Monitor className="h-3 w-3" /> Live Sandbox
                 </div>
               </div>
               {generatedHtml && (
                 <button onClick={openFullscreen} className="text-xs text-muted-foreground hover:text-foreground font-medium flex items-center gap-1 transition-colors">
                   Open full <ExternalLink className="h-3 w-3" />
                 </button>
               )}
            </div>
            
            <div className="flex-1 bg-white relative">
               {!generatedHtml && !isGenerating && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-muted/30">
                   <Layout className="h-12 w-12 mb-3 opacity-20" />
                   <p className="font-mono text-sm max-w-[200px] text-center opacity-60">Waiting for prompt generation...</p>
                 </div>
               )}

               {isGenerating && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-primary bg-background/80 z-10 font-mono text-sm backdrop-blur-md">
                   <div className="relative w-12 h-12 mb-4">
                      <div className="absolute inset-0 border-[3px] border-primary/20 rounded-full"></div>
                      <div className="absolute inset-0 border-[3px] border-primary rounded-full border-t-transparent animate-spin"></div>
                   </div>
                   Synthesizing Code...
                 </div>
               )}

               {generatedHtml && (
                 <iframe 
                   title="Generated UI Prototype"
                   srcDoc={generatedHtml}
                   className="w-full h-full border-none bg-white animate-[fade-in_0.5s_ease-out]"
                   sandbox="allow-scripts allow-same-origin"
                 />
               )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Mobile warning */}
      <div className="container-custom md:hidden text-center text-muted-foreground opacity-0 animate-fade-in-up">
         <Monitor className="h-10 w-10 mx-auto mb-3 opacity-50" />
         <h3 className="font-bold text-lg text-foreground mb-2">App Builder Sandbox</h3>
         <p className="text-sm">The realtime AI prototype builder requires a larger screen to display the interactive sandbox workspace. Please view on a desktop.</p>
      </div>
    </section>
  );
}
