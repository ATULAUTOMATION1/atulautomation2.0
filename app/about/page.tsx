import { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Trophy, Zap, Globe, Target, Cpu } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/sections/testimonials").then(mod => mod.Testimonials));
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export const metadata: Metadata = {
  title: "About Us | Atul Automation",
  description: "Learn about Atul Automation, a leading global AI agency specializing in AI agents, workflow automation, and custom chatbot development.",
  alternates: {
    canonical: "https://atulautomation.com/about",
  },
};

const STATS = [
  { label: "Hours Saved Globally", value: "500k+", icon: <Zap className="h-6 w-6 text-orange-500" /> },
  { label: "Active AI Deployments", value: "200+", icon: <Cpu className="h-6 w-6 text-blue-500" /> },
  { label: "Client ROI Avg", value: "315%", icon: <Trophy className="h-6 w-6 text-green-500" /> },
  { label: "Global Partners", value: "50+", icon: <Globe className="h-6 w-6 text-violet-500" /> },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Atul Automation",
    "description": "Atul Automation is a premier AI automation agency helping businesses scale through intelligent workflows, AI agents, and customized CRM integrations.",
    "publisher": {
      "@type": "Organization",
      "name": "Atul Automation",
      "logo": {
        "@type": "ImageObject",
        "url": "https://atulautomation.com/og-image.png"
      }
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-fade-in-up">
            <Target className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Our Mission</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in-up delay-100">
            Automating the unscalable.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-primary to-orange-600">
              Empowering Human Potential.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            We don&apos;t just build chatbots; we engineer intelligent ecosystems. Atul Automation exists to eliminate mundane tasks so your high-value talent can focus on actual growth.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-custom py-12 border-y border-border/50 bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center group">
              <div className="bg-background border border-border p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Story / E-E-A-T Content */}
      <section className="container-custom py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000"
              alt="Atul Automation Team designing architecture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-background/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <blockquote className="text-lg font-medium italic mb-4">
                  &quot;AI replacing humans is a myth. Humans using AI will replace the businesses that don&apos;t.&quot;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    AA
                  </div>
                  <div>
                    <p className="text-sm font-bold">Atul Automation</p>
                    <p className="text-xs text-muted-foreground">Founding Board</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Born from the need for speed.</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                For years, businesses have been held hostage by clunky software, bloated human resource requirements for mundane tasks, and disconnected CRMs. We realized that Artificial Intelligence wasn&apos;t just a party trick—it was the industrial revolution of the knowledge worker.
              </p>
            </div>
            
            <div className="grid gap-6">
              {[
                { title: "Engineering Excellence", desc: "No fluff. We build robust systems using modern stacks (Next.js, Python, GPT-4)." },
                { title: "Measurable ROI", desc: "If our automation doesn&apos;t save you hours or increase revenue, we don&apos;t deploy it." },
                { title: "Security First", desc: "Enterprise-grade encryption and strict privacy protocols for all internal LLM data." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/capabilities" className="btn-primary inline-flex gap-2">
                View Our Capabilities <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <Testimonials />

      {/* CTA Layer */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale without the extra headcount?</h2>
              <p className="text-zinc-400 text-lg mb-8">
                Join the innovators who are automating hours of manual labor every single day. Let&apos;s design your AI roadmap.
              </p>
              <Link href="/#contact" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25">
                Book a Free Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Include the global contact form module just in case */}
      <Contact />
    </main>
  );
}
