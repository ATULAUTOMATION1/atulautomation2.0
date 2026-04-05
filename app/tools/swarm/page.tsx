'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Bot, Brain, Shield, Mail, Search, CheckCircle2,
  ArrowRight, Zap, Users, Sparkles, MessageSquare,
  BarChart3, Eye, Clock, ChevronDown
} from 'lucide-react';

/* ─── Agent Definitions ─── */
const AGENTS = [
  {
    id: 'hunter',
    name: 'The Hunter',
    role: 'Data Acquisition Agent',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    capabilities: ['Web scraping', 'LinkedIn monitoring', 'Job board analysis', 'News aggregation'],
    desc: 'Continuously scouts the internet for buyer signals, company data, and market intelligence.',
  },
  {
    id: 'analyst',
    name: 'The Analyst',
    role: 'Intelligence Processing Agent',
    icon: Brain,
    color: 'from-violet-500 to-purple-500',
    textColor: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    capabilities: ['Intent classification', 'Sentiment analysis', 'ICP scoring', 'Competitive intel'],
    desc: 'Processes raw signals through GPT-4o, classifying intent and scoring leads with 94% accuracy.',
  },
  {
    id: 'closer',
    name: 'The Closer',
    role: 'Outreach Execution Agent',
    icon: Mail,
    color: 'from-orange-500 to-red-500',
    textColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    capabilities: ['Email copywriting', 'A/B testing', 'Multi-channel sequences', 'CRM sync'],
    desc: 'Writes and sends hyper-personalized emails, DMs, and follow-ups referencing exact buyer signals.',
  },
  {
    id: 'manager',
    name: 'The Manager',
    role: 'Quality Assurance Agent',
    icon: Shield,
    color: 'from-emerald-500 to-green-500',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    capabilities: ['Tone review', 'Compliance check', 'Brand alignment', 'Performance audit'],
    desc: 'Reviews every output before it reaches a human. Ensures compliance, brand voice, and quality standards.',
  },
];

/* ─── Simulated Inter-Agent Conversation ─── */
const CONVERSATION: { agent: string; message: string; type: 'action' | 'analysis' | 'output' | 'approval' }[] = [
  { agent: 'hunter', message: '🔍 Signal detected: TechNova Solutions just posted 3 "Customer Support Rep" roles on LinkedIn. Scraping company data...', type: 'action' },
  { agent: 'hunter', message: '📊 Data compiled: TechNova | SaaS | Series A ($8M) | 45 employees | HQ: Austin, TX | CEO: Sarah Mitchell', type: 'output' },
  { agent: 'analyst', message: '🧠 Analyzing intent... Signal type: HIRING_SUPPORT_VOLUME. Confidence: 94%. Pain: ticket overflow. Budget likelihood: HIGH.', type: 'analysis' },
  { agent: 'analyst', message: '✅ Lead qualified. ICP score: 9.2/10. Recommended play: AI Support Automation case study + ROI projection.', type: 'output' },
  { agent: 'closer', message: '✍️ Drafting email... Subject: "Sarah, what if you didn\'t need to hire those 3 support reps?"', type: 'action' },
  { agent: 'closer', message: '📧 Email draft ready. Personalization tokens: [CEO name], [job post URL], [company size], [estimated savings].', type: 'output' },
  { agent: 'manager', message: '🛡️ Reviewing draft... Tone: Professional ✓ | Compliance: CAN-SPAM ✓ | Brand alignment: 98% ✓', type: 'analysis' },
  { agent: 'manager', message: '✅ APPROVED. Sending email to sarah@technova.io at optimal time: Tuesday 9:14 AM CST.', type: 'approval' },
];

/* ─── Typing Animation (Message Feed) ─── */
function SwarmFeed() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (visibleMessages >= CONVERSATION.length) {
      const resetTimer = setTimeout(() => setVisibleMessages(0), 5000);
      return () => clearTimeout(resetTimer);
    }
    const timer = setTimeout(() => {
      setVisibleMessages(prev => prev + 1);
    }, 2200);
    return () => clearTimeout(timer);
  }, [visibleMessages]);

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
      {CONVERSATION.slice(0, visibleMessages).map((msg, i) => {
        const agent = AGENTS.find(a => a.id === msg.agent)!;
        const Icon = agent.icon;
        return (
          <div
            key={i}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border transition-all duration-500 animate-in slide-in-from-bottom-2",
              msg.type === 'approval'
                ? 'bg-emerald-500/5 border-emerald-500/20'
                : msg.type === 'analysis'
                  ? 'bg-violet-500/5 border-violet-500/20'
                  : 'bg-card/60 border-border'
            )}
          >
            <div className={cn("shrink-0 w-8 h-8 rounded-lg flex items-center justify-center", agent.bgColor)}>
              <Icon className={cn("h-4 w-4", agent.textColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn("text-xs font-black uppercase tracking-wider", agent.textColor)}>{agent.name}</span>
                <span className="text-[10px] text-muted-foreground">{agent.role}</span>
              </div>
              <p className="text-sm leading-relaxed">{msg.message}</p>
            </div>
          </div>
        );
      })}
      {visibleMessages < CONVERSATION.length && (
        <div className="flex items-center gap-3 p-4">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
          </div>
          <span className="text-xs text-muted-foreground">Agents collaborating...</span>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function SwarmPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-24">
      {/* Hero */}
      <section className="container-custom max-w-5xl mb-20 relative">
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-violet-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center relative z-10">
          <span className="section-badge mb-4">
            <Bot className="h-3.5 w-3.5" />
            Beyond Chatbots
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            The Synthetic{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-primary to-orange-500">
              Workforce Swarm
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            You&apos;re not buying a chatbot. You&apos;re deploying an <strong className="text-foreground">autonomous team</strong> of specialized AI agents that collaborate, validate, and execute — without human intervention.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-10">
            Multi-agent architecture. Zero hallucination. Enterprise-grade output.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary text-base px-8 py-4">
              Deploy My Swarm <Zap className="ml-2 h-4 w-4" />
            </Link>
            <a href="#live-demo" className="btn-secondary text-base px-6 py-4">
              Watch Live Demo <ChevronDown className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Agent Roster */}
      <section className="container-custom max-w-5xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Your <span className="text-gradient">AI Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each agent is a specialist. Together they form an autonomous workforce that handles end-to-end operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            const isSelected = selectedAgent === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
                className={cn(
                  "text-left rounded-2xl border p-6 transition-all duration-300 group",
                  isSelected
                    ? cn("border-primary/40 bg-card shadow-xl shadow-primary/5", agent.borderColor)
                    : "border-border bg-card/60 hover:border-primary/20 hover:shadow-lg"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white", agent.color)}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-0.5">{agent.name}</h3>
                    <p className={cn("text-xs font-bold uppercase tracking-wider mb-3", agent.textColor)}>{agent.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{agent.desc}</p>
                    
                    {isSelected && (
                      <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Core Capabilities</p>
                        <div className="flex flex-wrap gap-2">
                          {agent.capabilities.map((cap) => (
                            <span key={cap} className={cn("text-[11px] font-semibold px-2.5 py-1 rounded-full border", agent.bgColor, agent.borderColor, agent.textColor)}>
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Live AI-to-AI Conversation Demo */}
      <section id="live-demo" className="container-custom max-w-4xl mb-20 scroll-mt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">Live Agent Communication</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Watch Agents <span className="text-gradient">Talk to Each Other</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This is a real-time simulation of how four AI agents collaborate to detect a signal, qualify a lead, draft outreach, and approve it — all without a single human click.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2">swarm-agent-console — v2.4.1</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] text-green-500 font-mono">4 agents online</span>
            </div>
          </div>
          {/* Feed */}
          <div className="p-6">
            <SwarmFeed />
          </div>
        </div>
      </section>

      {/* Why Swarm > Single Bot */}
      <section className="container-custom max-w-5xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why a <span className="text-gradient">Swarm</span> Beats a Single Bot
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Eye, title: 'Zero Hallucination', desc: 'The Manager agent reviews every output. Factual errors, brand misalignment, or compliance issues are caught before any message reaches a human.', stat: '99.7%', statLabel: 'Accuracy' },
            { icon: BarChart3, title: '4x Throughput', desc: 'Parallel processing. While The Hunter scrapes, The Analyst classifies, The Closer drafts, and The Manager reviews — simultaneously.', stat: '4x', statLabel: 'Faster' },
            { icon: MessageSquare, title: 'Self-Improving', desc: 'Each agent learns from feedback loops. Open rates, reply rates, and meeting conversion data continuously refine the swarm\'s behavior.', stat: '↑12%', statLabel: 'Monthly' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-8 hover:border-primary/20 transition-all group">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-primary">{item.stat}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{item.statLabel}</div>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom max-w-4xl">
        <div className="rounded-[2rem] bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-violet-500/20 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-white">
            <Users className="h-10 w-10 text-violet-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to deploy your AI workforce?</h2>
            <p className="text-zinc-400 text-lg mb-8">
              Stop hiring for repetitive tasks. Deploy a swarm that works 24/7, never calls in sick, and improves every single day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25">
                Build My Swarm <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/tools/interview-ai" className="inline-flex items-center justify-center border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-bold px-8 py-4 rounded-xl transition-all">
                Interview an AI Agent <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
