import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Zap, BarChart3, MessageSquare, Building2, Database, CheckCircle, Star } from "lucide-react";
import dynamic from "next/dynamic";

const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export const metadata: Metadata = {
  title: "AI Automation Services | Chatbots, Workflow & AI Agents",
  description: "Explore Atul Automation's full range of AI services: AI agents, intelligent chatbots, workflow automation, AI marketing, CRM integration & real estate AI. Serving USA, UK, Canada, Australia & India.",
  alternates: {
    canonical: "https://atulautomation.com/services",
  },
  openGraph: {
    title: "AI Automation Services | Atul Automation",
    description: "Custom AI agents, chatbots, workflow automation & marketing AI for businesses in the USA, UK, Canada, Australia & India.",
    url: "https://atulautomation.com/services",
  },
};

const SERVICES = [
  {
    icon: <Bot className="h-8 w-8 text-orange-400" />,
    title: "AI Agents & Automation",
    slug: "ai-agents",
    tagline: "Deploy self-learning AI that works 24/7",
    description: "We build custom AI agents that autonomously handle support tickets, qualify leads, process invoices, generate reports, and manage data — without human intervention. Integrated with 1,000+ apps via APIs.",
    features: ["Task automation (data entry, email sorting, reporting)", "Predictive analytics & demand forecasting", "Process bottleneck identification & auto-resolution", "Integration with your existing tools"],
    results: "10–20 hours saved per week. 3–5x ROI within 90 days.",
    color: "orange",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-400" />,
    title: "Intelligent Chatbots",
    slug: "chatbots",
    tagline: "24/7 customer engagement on every channel",
    description: "From WhatsApp Business bots to website chat widgets and social media auto-responders — we build multilingual chatbots that capture leads, book appointments, process payments, and handle support autonomously.",
    features: ["WhatsApp, Instagram, Facebook & Telegram bots", "Multilingual NLP (English, Hindi, Spanish & more)", "Smart escalation to human agents when needed", "CRM integration & lead capture pipelines"],
    results: "Under 3-second response time. 40% more leads captured.",
    color: "blue",
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-400" />,
    title: "Workflow Automation",
    slug: "workflow",
    tagline: "Connect your apps into seamless pipelines",
    description: "We eliminate manual work by connecting your business tools — Google Sheets, Airtable, Slack, Shopify, Stripe, HubSpot and more — into automated workflows using Zapier, Make, n8n, and custom Node.js scripts.",
    features: ["Lead → CRM → Email → Follow-up pipelines", "Order → Invoice → Inventory → Shipping flows", "Automated reporting & dashboard updates", "Zero-error data sync across all platforms"],
    results: "10–30 hours saved weekly. Zero manual errors.",
    color: "yellow",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-green-400" />,
    title: "AI Marketing",
    slug: "marketing",
    tagline: "Data-driven campaigns on Meta, Google & beyond",
    description: "Our AI-powered marketing service runs smarter ad campaigns, builds content calendars, automates social posting, and optimises your SEO. We use machine learning to find your best-converting customer segments automatically.",
    features: ["Meta & Google Ads with AI-optimised targeting", "AI-generated content & automated blog publishing", "Social media scheduling & engagement analytics", "SEO audits, keyword research & technical fixes"],
    results: "45% lower cost-per-lead. 3–5x return on ad spend.",
    color: "green",
  },
  {
    icon: <Building2 className="h-8 w-8 text-purple-400" />,
    title: "Real Estate AI",
    slug: "real-estate",
    tagline: "Turn cold leads into qualified buyers, automatically",
    description: "Purpose-built for real estate agencies — we build AI systems that capture leads from Facebook and Instagram ads, engage them via WhatsApp within 30 seconds, qualify them by budget and timeline, and schedule site visits automatically.",
    features: ["AI lead capture from social media ads", "Instant WhatsApp engagement (<30 seconds)", "Budget, location & timeline qualification scoring", "360° virtual tour automation & AI property descriptions"],
    results: "3x faster deal closure. 4.5x ROI on ad spend.",
    color: "purple",
  },
  {
    icon: <Database className="h-8 w-8 text-cyan-400" />,
    title: "CRM Solutions",
    slug: "crm",
    tagline: "Never miss a follow-up. Automate every touchpoint.",
    description: "We implement and automate your CRM — whether HubSpot, Salesforce, Zoho, or a custom system — with AI lead scoring, smart follow-up sequences, churn prediction, and automated reporting. Full setup to deployment.",
    features: ["AI lead scoring (Hot / Warm / Cold)", "Automated follow-up sequences & drip campaigns", "Churn prediction & re-engagement flows", "Custom dashboards & automated weekly reports"],
    results: "45% faster lead response. 30% higher client retention.",
    color: "cyan",
  },
];

const PROCESS = [
  { step: "01", title: "Free Discovery Call", desc: "30-minute strategy session. We learn your business, pain points, and goals — no sales pitch." },
  { step: "02", title: "Custom Proposal", desc: "We deliver a tailored automation roadmap with timeline, tools, and transparent pricing within 48 hours." },
  { step: "03", title: "Build & Deploy", desc: "Our engineers build your solution with regular check-ins. Typical projects launch in 2–6 weeks." },
  { step: "04", title: "Train & Support", desc: "We train your team, monitor performance, and provide ongoing support & optimisation." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "AI Automation Services by Atul Automation",
  "description": "Full-stack AI automation services including AI agents, chatbots, workflow automation, marketing AI and CRM solutions.",
  "url": "https://atulautomation.com/services",
  "itemListElement": SERVICES.map((s, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "item": {
      "@type": "Service",
      "name": s.title,
      "description": s.description,
      "provider": { "@type": "Organization", "name": "Atul Automation" },
      "url": `https://atulautomation.com/capabilities/${s.slug}`,
    }
  }))
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">AI Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            AI Automation Services<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-primary to-orange-600">
              Built for Real Business Results
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
            From intelligent chatbots to full-stack AI agents — we build custom automation systems that save time, reduce costs, and generate more revenue. Trusted by businesses across the USA, UK, Canada, Australia, and India.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
              Book Free Strategy Call <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/templates" className="inline-flex items-center gap-2 border border-border hover:border-primary px-8 py-4 rounded-xl transition-all font-semibold">
              Browse AI Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container-custom py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything AI. One Agency.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We cover the entire automation stack — from strategy to deployment to ongoing support.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/capabilities/${service.slug}`}
              className="group bg-card border border-border hover:border-primary/50 rounded-3xl p-8 flex flex-col gap-5 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-3 bg-background border border-border rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                <p className="text-sm text-primary font-medium mb-3">{service.tagline}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
              <ul className="space-y-2 mt-auto">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-border/50 text-xs font-medium text-green-600 dark:text-green-400">
                📈 {service.results}
              </div>
              <div className="flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-muted/30 border-y border-border/50 py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Simple, transparent, results-focused. Most projects are live within 2–6 weeks.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS.map((p) => (
              <div key={p.step} className="text-center">
                <div className="text-5xl font-black text-primary/20 mb-4">{p.step}</div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Not sure which service you need?</h2>
              <p className="text-zinc-400 text-lg mb-8">
                Book a free 30-minute strategy call. We&apos;ll analyze your business, identify your biggest automation opportunity, and give you a no-obligation roadmap.
              </p>
              <Link href="/#contact" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                Book Your Free Call — It&apos;s Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
