'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-context';
import { Brain, Sparkles, ArrowRight, Rocket, ShieldAlert, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [whyInterested, setWhyInterested] = useState('');
  const [automationIdea, setAutomationIdea] = useState('');
  const [thoughtProcess, setThoughtProcess] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [aiResult, setAiResult] = useState<{ channel: string; mindsetAnalysis: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/onboarding/');
    } else if (!loading && user?.onboardingCompleted) {
      router.push('/dashboard/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <Brain className="h-12 w-12 text-primary animate-bounce" />
          <p className="text-muted-foreground tracking-widest text-sm uppercase">Syncing Node...</p>
        </div>
      </div>
    );
  }

  const handleProfileAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/onboarding/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whyInterested,
          automationIdea,
          thoughtProcess
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setAiResult({
        channel: data.channel,
        mindsetAnalysis: data.mindsetAnalysis
      });
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'Failed to perform analysis.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="h-3.5 w-3.5" /> AI Strategy Matching
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">
            Map Your <span className="text-primary">AI Potential</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Analyze your strategic mindset to tailor access to Atul Automation modules.
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10">
          
          <div className="flex items-center justify-between mb-10 max-w-xs mx-auto">
            <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className="w-4" />
            <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className="w-4" />
            <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm mb-6">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" /> Strategic Blueprint
                </h2>
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Question 1 of 2</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">
                  Why are you currently interested in implementing Artificial Intelligence?
                </label>
                <textarea
                  placeholder="e.g. Scaling customer support operations, creating internal workflows, standard self-learning..."
                  value={whyInterested}
                  onChange={(e) => setWhyInterested(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-xl border border-border bg-muted/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!whyInterested.trim()}
                className="btn-primary w-full justify-center py-3 text-sm font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                Next Track <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleProfileAnalysis} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" /> Automation Target
                </h2>
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Question 2 of 2</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">
                  Describe the core business workflow or capability you wish to automate:
                </label>
                <textarea
                  placeholder="e.g. Lead generation funnels, scheduled data synchronization..."
                  value={automationIdea}
                  onChange={(e) => setAutomationIdea(e.target.value)}
                  rows={3}
                  className="w-full p-4 rounded-xl border border-border bg-muted/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">
                  What is your operational thought process? (e.g. Prioritize maximum ROI, rapid deployment, or tailored innovation)
                </label>
                <textarea
                  placeholder="e.g. I focus heavily on immediate scalable conversion..."
                  value={thoughtProcess}
                  onChange={(e) => setThoughtProcess(e.target.value)}
                  rows={3}
                  className="w-full p-4 rounded-xl border border-border bg-muted/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-border hover:bg-muted/30 text-sm py-3 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting || !automationIdea.trim() || !thoughtProcess.trim()}
                  className="btn-primary w-2/3 justify-center py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing Mindset...
                    </span>
                  ) : (
                    <>Submit Analysis <Sparkles className="ml-2 h-4 w-4" /></>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && aiResult && (
            <div className="text-center space-y-6">
              <div className="mx-auto bg-green-500/10 text-green-500 p-3 rounded-full w-fit">
                <CheckCircle className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Mindset Categorized</h2>
                <p className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">
                  Assigned Track: <span className="text-primary font-bold">{aiResult.channel}</span>
                </p>
              </div>

              <div className="p-4 md:p-6 bg-muted/30 rounded-2xl border border-border text-sm text-foreground text-left leading-relaxed">
                {aiResult.mindsetAnalysis}
              </div>

              <button
                onClick={() => {
                  router.push('/dashboard/');
                  setTimeout(() => window.location.reload(), 500);
                }}
                className="btn-primary w-full justify-center py-3 text-sm rounded-xl"
              >
                Access Your Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
