import { Metadata } from "next";
import Link from "next/link";
import { Calculator, Brain, Mic, Flame, Target, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Tools for Business | ROI Calculator & More",
  description: "Free AI tools for businesses — ROI calculator, AI readiness quiz, workflow roaster, voice AI demo and more. Built by Atul Automation for business owners evaluating AI.",
  alternates: {
    canonical: "https://atulautomation.com/tools",
  },
};

const TOOLS = [
  {
    icon: <Calculator className="h-8 w-8 text-orange-400" />,
    title: "AI ROI Calculator",
    description: "Calculate exactly how much time and money AI automation could save your business. Get a personalized ROI estimate in 2 minutes.",
    href: "/tools/roi-calculator",
    cta: "Calculate My ROI",
    badge: "Most Popular",
  },
  {
    icon: <Brain className="h-8 w-8 text-blue-400" />,
    title: "AI Readiness Quiz",
    description: "Not sure if your business is ready for AI? Take our 5-minute quiz to discover your automation score and get tailored recommendations.",
    href: "/tools/ai-readiness-quiz",
    cta: "Take the Quiz",
    badge: null,
  },
  {
    icon: <Flame className="h-8 w-8 text-red-400" />,
    title: "Roast My Workflow",
    description: "Describe your current business workflow and our AI will identify the biggest time-wasters and suggest specific automation fixes.",
    href: "/tools/roast-my-workflow",
    cta: "Roast My Process",
    badge: "Fan Favourite",
  },
  {
    icon: <Mic className="h-8 w-8 text-purple-400" />,
    title: "Voice AI Demo",
    description: "Hear what an AI voice agent sounds like on a real customer call. See how voice AI can handle bookings, support, and sales calls.",
    href: "/tools/voice-ai-demo",
    cta: "Hear the Demo",
    badge: null,
  },
  {
    icon: <Target className="h-8 w-8 text-green-400" />,
    title: "Predictive Intent Engine",
    description: "See how AI analyses visitor behaviour to predict purchase intent in real time — and triggers personalised outreach automatically.",
    href: "/tools/predictive-intent",
    cta: "See It in Action",
    badge: "Enterprise",
  },
  {
    icon: <Users className="h-8 w-8 text-cyan-400" />,
    title: "AI Agent Swarm Demo",
    description: "Watch multiple AI agents collaborate in real time to handle complex multi-step business tasks autonomously.",
    href: "/tools/swarm",
    cta: "Watch the Swarm",
    badge: "New",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative px-4 py-16 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="container-custom relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Free AI Tools</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Free AI Tools for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-primary to-orange-600">
              Your Business
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Explore, calculate and experiment — no signups or credit cards needed. Our free tools help you understand exactly what AI can do for your business.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((tool) => (
            <div key={tool.href} className="bg-card border border-border hover:border-primary/50 rounded-3xl p-8 flex flex-col gap-5 transition-all hover:shadow-lg hover:-translate-y-1 relative group">
              {tool.badge && (
                <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  {tool.badge}
                </div>
              )}
              <div className="p-3 bg-background border border-border rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-3">{tool.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
              </div>
              <Link
                href={tool.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group-hover:text-orange-500"
              >
                {tool.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom py-12">
        <div className="bg-muted/50 border border-border rounded-3xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to implement AI in your business?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            These tools give you a taste. A free strategy call gives you the full roadmap — tailored to your specific business and industry.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
            Book Free Strategy Call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
