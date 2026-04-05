'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Mic, MicOff, Send, Bot, User, ArrowRight,
  Sparkles, Star, ThumbsUp, ThumbsDown, RefreshCw,
  MessageSquare, Phone, Video, MoreHorizontal, Briefcase
} from 'lucide-react';

/* ─── AI Candidate Profiles ─── */
const AI_CANDIDATES = [
  {
    id: 'sales-rep',
    name: 'Alex (AI Sales Rep)',
    role: 'Outbound Sales Representative',
    avatar: 'AS',
    color: 'from-orange-500 to-red-500',
    personality: 'Confident, data-driven, persistent but respectful',
    skills: ['Cold outreach', 'Lead qualification', 'Objection handling', 'CRM management', 'Follow-up cadences'],
    experience: '2,400+ conversations handled | 34% meeting booking rate',
    sampleResponses: [
      { q: 'Tell me about yourself', a: 'I\'m Alex, an AI-powered sales representative trained on 50,000+ successful cold outreach interactions. I specialize in B2B SaaS and professional services. My current meeting booking rate is 34%, which is 4x the industry average for SDRs. I work 24/7, never miss a follow-up, and I improve my messaging every single week based on reply data.' },
      { q: 'How do you handle objections?', a: 'Great question. I handle objections using a 3-step framework: Acknowledge → Reframe → Pivot. For example, if a prospect says "We don\'t have the budget," I\'ll respond: "Totally understand — budget alignment is important. Just curious, what\'s the cost of NOT solving [their pain point] for another quarter? Our clients typically see ROI within 30 days." I never argue — I redirect with data.' },
      { q: 'What if someone gets angry?', a: 'I\'m trained on sentiment analysis. The moment I detect frustration or hostility, I immediately de-escalate with empathy: "I completely understand, and I appreciate your honesty." If the sentiment score drops below 30%, I gracefully exit the conversation and flag the interaction for human review. I never make things worse.' },
      { q: 'Why should I hire you instead of a human SDR?', a: 'You shouldn\'t replace your team — you should augment it. I handle the first 200 touchpoints per day that a human SDR physically can\'t. I work nights, weekends, and holidays. Your human reps close the warm leads I generate. It\'s not AI vs. Human — it\'s AI + Human = Unfair Advantage.' },
    ],
  },
  {
    id: 'support-agent',
    name: 'Maya (AI Support Agent)',
    role: 'Customer Support Specialist',
    avatar: 'MS',
    color: 'from-blue-500 to-cyan-500',
    personality: 'Empathetic, patient, solution-oriented',
    skills: ['Ticket resolution', 'Knowledge base search', 'Escalation routing', 'Sentiment detection', 'Multi-language'],
    experience: '18,000+ tickets resolved | 4.8★ avg satisfaction | 45s avg response',
    sampleResponses: [
      { q: 'Tell me about yourself', a: 'Hi! I\'m Maya, your AI support specialist. I\'ve been trained on your entire knowledge base, product documentation, and 18,000+ historical support tickets. My average first-response time is 45 seconds, and I maintain a 4.8/5.0 customer satisfaction score. I can handle 150+ concurrent conversations without breaking a sweat.' },
      { q: 'Can you handle complex technical issues?', a: 'Absolutely. For Level 1 and Level 2 issues, I resolve them independently — password resets, billing inquiries, feature walkthroughs, and troubleshooting. For Level 3 issues (bugs, infrastructure), I don\'t guess. I immediately escalate to your engineering team with a pre-formatted ticket containing reproduction steps, user context, and severity classification. I\'m not here to pretend — I\'m here to be efficient.' },
      { q: 'How do you handle irate customers?', a: 'With radical empathy. My training includes 5,000+ interactions with frustrated users. I always lead with acknowledgment: "I completely understand your frustration, and I\'m sorry you\'re dealing with this." Then I focus on resolution speed. If I can\'t resolve it within 3 exchanges, I automatically warm-transfer to a human agent with full context — the customer never has to repeat themselves.' },
      { q: 'What languages do you speak?', a: 'I\'m fluent in English, Hindi, Spanish, French, German, Portuguese, Arabic, Japanese, and Mandarin. I auto-detect the customer\'s language from their first message and respond accordingly. No configuration needed. I can also handle code-switching — if a customer mixes Hindi and English, I match their style naturally.' },
    ],
  },
  {
    id: 'marketing-strategist',
    name: 'Priya (AI Marketing Strategist)',
    role: 'Content & Campaign Manager',
    avatar: 'PM',
    color: 'from-emerald-500 to-green-500',
    personality: 'Creative, analytical, trend-aware',
    skills: ['Content strategy', 'SEO optimization', 'Ad copy generation', 'A/B testing', 'Social scheduling'],
    experience: '1,200+ campaigns optimized | 22% avg CTR improvement',
    sampleResponses: [
      { q: 'Tell me about yourself', a: 'Hey! I\'m Priya, an AI marketing strategist. I analyze your industry, competitors, and audience behavior to create high-converting content strategies. I\'ve optimized 1,200+ campaigns across email, social, and paid ads — delivering an average 22% improvement in click-through rates. I think in funnels, not just posts.' },
      { q: 'How do you create content that converts?', a: 'I follow a data-first approach. First, I analyze your top-performing content and your competitors\' content using engagement metrics and SEO data. Then I identify content gaps — topics your audience searches for but you haven\'t covered. Every piece I create follows the AIDA framework (Attention → Interest → Desire → Action) and is optimized for featured snippets.' },
      { q: 'Can you manage our social media?', a: 'Yes! I can create a 30-day content calendar in under 5 minutes. I analyze peak engagement times for your specific audience, generate posts with hooks optimized for each platform (LinkedIn tone ≠ Twitter tone ≠ Instagram tone), and schedule them automatically. I also monitor comments and DMs for lead-generation opportunities.' },
      { q: 'What makes you better than a marketing agency?', a: 'Speed and cost. A marketing agency takes 2 weeks to deliver a content strategy. I deliver it in 2 minutes. I\'m not replacing creative directors — I\'m eliminating the 80% of marketing work that\'s repetitive: writing meta descriptions, resizing images, scheduling posts, A/B testing subject lines. Your team focuses on big-picture strategy while I handle execution at scale.' },
    ],
  },
];

/* ─── Chat Message Component ─── */
function ChatBubble({ isAI, message, name }: { isAI: boolean; message: string; name: string }) {
  return (
    <div className={cn("flex gap-3 animate-in slide-in-from-bottom-2 duration-300", !isAI && "flex-row-reverse")}>
      <div className={cn(
        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
        isAI ? "bg-primary/10 text-primary" : "bg-zinc-200 dark:bg-zinc-800 text-foreground"
      )}>
        {isAI ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div className={cn("max-w-[80%]", !isAI && "text-right")}>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{name}</p>
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isAI
            ? "bg-card border border-border rounded-tl-none"
            : "bg-primary text-white rounded-tr-none"
        )}>
          {message}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function InterviewAIPage() {
  const [selectedCandidate, setSelectedCandidate] = useState(AI_CANDIDATES[0]);
  const [messages, setMessages] = useState<{ isAI: boolean; message: string; name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startInterview = () => {
    setInterviewStarted(true);
    setMessages([]);
    setRating(null);
    // AI introduces itself
    setIsTyping(true);
    setTimeout(() => {
      const intro = selectedCandidate.sampleResponses.find(r => r.q === 'Tell me about yourself');
      setMessages([{
        isAI: true,
        message: `Hello! Thanks for taking the time to interview me today. ${intro?.a || 'I\'m ready to answer your questions.'}`,
        name: selectedCandidate.name,
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { isAI: false, message: userMessage, name: 'You (Interviewer)' }]);

    setIsTyping(true);
    setTimeout(() => {
      // Find best matching response
      const lower = userMessage.toLowerCase();
      let response = '';

      const matched = selectedCandidate.sampleResponses.find(r => {
        const keywords = r.q.toLowerCase().split(' ');
        return keywords.some(kw => kw.length > 3 && lower.includes(kw));
      });

      if (matched) {
        response = matched.a;
      } else {
        // Generic intelligent fallback
        const fallbacks = [
          `That\'s a fantastic question. In my experience handling ${selectedCandidate.experience.split('|')[0].trim()}, I\'ve found that the key is combining speed with precision. I\'d love to demonstrate this capability in a live pilot with your team.`,
          `Great question! My approach is always data-driven. I analyze patterns from historical interactions, identify the optimal strategy, and execute with measurable KPIs. Would you like me to walk through a specific scenario?`,
          `I appreciate you asking that. Transparency is core to how I operate. Every action I take is logged, auditable, and reversible. Your team always has full visibility and override control.`,
        ];
        response = fallbacks[messages.length % fallbacks.length];
      }

      setMessages(prev => [...prev, { isAI: true, message: response, name: selectedCandidate.name }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 1000);
  };

  const suggestedQuestions = selectedCandidate.sampleResponses
    .filter(r => r.q !== 'Tell me about yourself')
    .map(r => r.q);

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-24">
      {/* Hero */}
      <section className="container-custom max-w-5xl mb-16 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="text-center relative z-10">
          <span className="section-badge mb-4">
            <Mic className="h-3.5 w-3.5" />
            Revolutionary
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            Interview Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-primary to-orange-500">
              AI Employee
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            Every agency sells AI employees. <strong className="text-foreground">Nobody lets you interview them first.</strong> Pick a candidate below, ask them anything, and decide if they&apos;re worth hiring.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-10">
            No signup. No sales pitch. Just a raw, unscripted AI conversation.
          </p>
        </div>
      </section>

      {/* Candidate Selection */}
      <section className="container-custom max-w-5xl mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Select a Candidate</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AI_CANDIDATES.map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => {
                setSelectedCandidate(candidate);
                setInterviewStarted(false);
                setMessages([]);
                setRating(null);
              }}
              className={cn(
                "text-left rounded-2xl border p-5 transition-all duration-300",
                selectedCandidate.id === candidate.id
                  ? "border-primary/40 bg-card shadow-lg shadow-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-card/60 hover:border-primary/20"
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-xs", candidate.color)}>
                  {candidate.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{candidate.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{candidate.role}</p>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mb-3">{candidate.experience}</p>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.slice(0, 3).map(s => (
                  <span key={s} className="text-[9px] font-semibold bg-muted px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Interview Room */}
      <section className="container-custom max-w-4xl mb-20">
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
          {/* Video Call Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-muted/50 border-b border-border">
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold", selectedCandidate.color)}>
                {selectedCandidate.avatar}
              </div>
              <div>
                <h3 className="font-bold text-sm">{selectedCandidate.name}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-[10px] text-green-500 font-medium">Online — Ready for Interview</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Video className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-[450px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-muted/10">
            {!interviewStarted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className={cn("w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-xl", selectedCandidate.color)}>
                  {selectedCandidate.avatar}
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to interview {selectedCandidate.name}?</h3>
                <p className="text-sm text-muted-foreground mb-2 max-w-md">
                  {selectedCandidate.personality}
                </p>
                <p className="text-xs text-muted-foreground/60 mb-6">Skills: {selectedCandidate.skills.join(' • ')}</p>
                <button
                  onClick={startInterview}
                  className="btn-primary px-8 py-3"
                >
                  Start Interview <MessageSquare className="ml-2 h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <ChatBubble key={i} {...msg} />
                ))}
                {isTyping && (
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </>
            )}
          </div>

          {/* Input / Suggested Questions */}
          {interviewStarted && (
            <div className="border-t border-border p-4 space-y-3">
              {/* Suggested Questions */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setInputValue(q); }}
                    className="shrink-0 text-[11px] font-semibold bg-muted hover:bg-primary/10 hover:text-primary px-3 py-1.5 rounded-full border border-border transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
              {/* Text Input */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your candidate anything..."
                  className="flex-1 bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-4 py-3 text-sm transition-all"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !inputValue.trim()}
                  className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Rating Footer */}
          {interviewStarted && messages.length >= 4 && (
            <div className="border-t border-border px-6 py-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Rate this candidate:</p>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-125"
                      >
                        <Star className={cn(
                          "h-5 w-5 transition-colors",
                          star <= (rating || 0) ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"
                        )} />
                      </button>
                    ))}
                  </div>
                  <div className="h-5 w-px bg-border" />
                  <button
                    onClick={() => { setInterviewStarted(false); setMessages([]); setRating(null); }}
                    className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" /> Restart
                  </button>
                </div>
              </div>
              {rating && rating >= 4 && (
                <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">Great fit! Ready to hire {selectedCandidate.name}?</span>
                  </div>
                  <Link href="/#contact" className="text-xs font-bold bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Hire Now
                  </Link>
                </div>
              )}
              {rating && rating <= 2 && (
                <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-amber-600 dark:text-amber-400">Not the right fit? Try another candidate or tell us what you need.</span>
                  </div>
                  <Link href="/#contact" className="text-xs font-bold bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
                    Custom Request
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom max-w-4xl">
        <div className="rounded-[2rem] bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-t from-emerald-500/15 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-white">
            <Bot className="h-10 w-10 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Impressed? Deploy them today.</h2>
            <p className="text-zinc-400 text-lg mb-8">
              These AI employees are ready to join your team. No training period. No HR headaches. Just results from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25">
                Hire an AI Employee <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/tools/predictive-intent" className="inline-flex items-center justify-center border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-bold px-8 py-4 rounded-xl transition-all">
                See the Intent Engine <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
