'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Eye, Zap, Mail, Target, ArrowRight, Brain, Radar,
  Building2, Users, TrendingUp, CheckCircle2, Clock,
  Globe, Search, Sparkles, ChevronRight, Send
} from 'lucide-react';

/* ─── Simulated Pipeline Data ─── */
const DEMO_COMPANIES = [
  {
    name: 'TechNova Solutions',
    logo: 'TN',
    industry: 'SaaS',
    signal: 'Just posted: "Hiring 3 Customer Support Representatives" on LinkedIn',
    intent: 'Struggling with support ticket volume',
    action: 'AI-generated outreach email pitched AI Support Automation',
    status: 'Email Sent',
    confidence: 94,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'GreenPath Realty',
    logo: 'GP',
    industry: 'Real Estate',
    signal: 'CEO tweeted: "Our lead response time needs to get back under 5 minutes"',
    intent: 'Lead response bottleneck detected',
    action: 'Auto-drafted case study email + ROI projection for AI Lead Router',
    status: 'Opened',
    confidence: 88,
    color: 'from-emerald-500 to-green-500',
  },
  {
    name: 'CloudBridge Inc.',
    logo: 'CB',
    industry: 'FinTech',
    signal: 'Series B funding announced ($12M) on Crunchbase — scaling ops',
    intent: 'Post-funding operational scaling',
    action: 'Sent personalized "Scale Without Hiring" automation blueprint',
    status: 'Meeting Booked',
    confidence: 97,
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: 'MedCore Health',
    logo: 'MC',
    industry: 'Healthcare',
    signal: 'Google review complaint: "Waited 20 min on hold for appointment"',
    intent: 'Patient scheduling friction',
    action: 'Outreach with AI Appointment Booking voice agent demo + HIPAA brief',
    status: 'Reply Received',
    confidence: 91,
    color: 'from-rose-500 to-pink-500',
  },
];

const PIPELINE_STEPS = [
  { icon: Radar, label: 'Signal Detection', desc: 'AI monitors LinkedIn, Twitter, Crunchbase, Google Reviews, and job boards 24/7' },
  { icon: Brain, label: 'Intent Analysis', desc: 'GPT-4o classifies signals into pain-point categories with confidence scores' },
  { icon: Mail, label: 'Hyper-Personalized Outreach', desc: 'Auto-generates emails referencing the exact signal, with tailored ROI projections' },
  { icon: Target, label: 'Smart Follow-up', desc: 'Adaptive cadence engine optimizes timing, channel, and messaging based on engagement' },
];

/* ─── Animated Counter ─── */
function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count}</span>;
}

/* ─── Live Pipeline Card ─── */
function SignalCard({ company, index, activeIndex }: { company: typeof DEMO_COMPANIES[0]; index: number; activeIndex: number }) {
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;

  return (
    <div className={cn(
      "relative rounded-2xl border p-6 transition-all duration-700",
      isActive
        ? "bg-card border-primary/40 shadow-2xl shadow-primary/10 scale-[1.02]"
        : isPast
          ? "bg-card/60 border-border/50 opacity-60 scale-[0.98]"
          : "bg-card/30 border-border/30 opacity-40 scale-[0.96]"
    )}>
      {/* Status Indicator */}
      <div className="absolute -top-3 -right-3">
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-lg",
          company.status === 'Meeting Booked' ? 'bg-green-500' :
          company.status === 'Reply Received' ? 'bg-blue-500' :
          company.status === 'Opened' ? 'bg-amber-500' : 'bg-primary'
        )}>
          {company.status}
        </div>
      </div>

      <div className="flex items-start gap-4">
        {/* Company Avatar */}
        <div className={cn("shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-black text-sm", company.color)}>
          {company.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg truncate">{company.name}</h3>
            <span className="text-[10px] font-bold bg-muted px-2 py-0.5 rounded-full text-muted-foreground shrink-0">
              {company.industry}
            </span>
          </div>

          {/* Signal */}
          <div className="flex items-start gap-2 mb-3 bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
            <Radar className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-600 dark:text-amber-400 leading-snug">{company.signal}</p>
          </div>

          {/* Intent */}
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-4 w-4 text-violet-500" />
            <span className="text-sm text-muted-foreground">Intent:</span>
            <span className="text-sm font-semibold">{company.intent}</span>
            <span className="ml-auto text-xs font-black text-green-500">{company.confidence}% match</span>
          </div>

          {/* Action */}
          <div className="flex items-start gap-2 bg-primary/5 border border-primary/10 rounded-lg p-3">
            <Send className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-primary leading-snug">{company.action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function PredictiveIntentPage() {
  const [activeSignal, setActiveSignal] = useState(0);

  const cycleSignals = useCallback(() => {
    setActiveSignal((prev) => (prev + 1) % DEMO_COMPANIES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleSignals, 4000);
    return () => clearInterval(interval);
  }, [cycleSignals]);

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-24">
      {/* Hero */}
      <section className="container-custom max-w-5xl mb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="text-center relative z-10">
          <span className="section-badge mb-4">
            <Eye className="h-3.5 w-3.5" />
            Industry First
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            The Predictive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-red-500">
              Intent Engine
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            What if your sales team could reach prospects <strong className="text-foreground">before</strong> they even know they need you? Our AI monitors public signals across the internet, detects buying intent in real-time, and auto-generates hyper-personalized outreach — all autonomously.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-10">
            No cold calls. No guesswork. Just data-driven precision at scale.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary text-base px-8 py-4">
              Deploy This For My Business <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/tools/roi-calculator" className="btn-secondary text-base px-6 py-4">
              Calculate My Savings
            </Link>
          </div>
        </div>
      </section>

      {/* Live Stats Banner */}
      <section className="container-custom max-w-4xl mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: 847, label: 'Signals Scanned / Day', icon: Search, color: 'text-blue-500' },
            { value: 94, label: 'Avg Intent Accuracy %', icon: Target, color: 'text-green-500' },
            { value: 23, label: 'Meetings Auto-Booked / Week', icon: CheckCircle2, color: 'text-violet-500' },
            { value: 3, label: 'Seconds to Outreach', icon: Clock, color: 'text-amber-500' },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 text-center group hover:border-primary/30 transition-colors">
              <stat.icon className={cn("h-5 w-5 mx-auto mb-2", stat.color)} />
              <div className="text-3xl font-black tracking-tight mb-1">
                <AnimatedNumber target={stat.value} />
                {stat.label.includes('%') ? '%' : stat.label.includes('Sec') ? 's' : '+'}
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Pipeline */}
      <section className="container-custom max-w-5xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How the <span className="text-gradient">Crystal Ball</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A fully autonomous 4-stage pipeline that turns public data into booked meetings.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={i} className="relative group">
              <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Step {i + 1}</div>
                <h3 className="font-bold text-lg mb-2">{step.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ChevronRight className="h-6 w-6 text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Live Signal Feed */}
      <section className="container-custom max-w-4xl mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">Live Signal Feed</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Watch Intent Detection <span className="text-gradient">In Real-Time</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These are simulated examples of how the engine detects, analyzes, and acts on buying signals from across the internet — in under 3 seconds.
          </p>
        </div>
        <div className="space-y-4">
          {DEMO_COMPANIES.map((company, i) => (
            <SignalCard key={i} company={company} index={i} activeIndex={activeSignal} />
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="container-custom max-w-5xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who Is This <span className="text-gradient">Built For</span>?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: 'AI & SaaS Agencies', desc: 'Identify companies actively searching for automation before your competitors see the signal.' },
            { icon: Users, title: 'B2B Sales Teams', desc: 'Reduce cold outreach to zero. Every email your team sends is backed by verified buying intent.' },
            { icon: Globe, title: 'Recruitment Firms', desc: 'Detect companies scaling operations and get to hiring managers before the job post even goes public.' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-8 hover:border-primary/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom max-w-4xl">
        <div className="rounded-[2rem] bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-white">
            <Sparkles className="h-10 w-10 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to see the future?</h2>
            <p className="text-zinc-400 text-lg mb-8">
              Deploy the Predictive Intent Engine for your business and start booking meetings on autopilot.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/tools/swarm" className="inline-flex items-center justify-center border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-bold px-8 py-4 rounded-xl transition-all">
                See the AI Swarm <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
