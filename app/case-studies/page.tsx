import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, Target, Building2, ShoppingBag, Briefcase, ChevronRight, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export const metadata: Metadata = {
  title: "Case Studies & Client Success Stories | Atul Automation",
  description: "Read how Atul Automation helps global businesses scale with AI. Discover real-world case studies on chatbots, workflow automation, and AI agent deployments.",
  alternates: {
    canonical: "https://atulautomation.com/case-studies",
  },
  openGraph: {
    title: "AI Automation Case Studies | Atul Automation",
    description: "Real businesses. Real ROI. See how our AI solutions save thousands of hours and multiply revenue.",
    url: "https://atulautomation.com/case-studies",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Atul Automation Case Studies" }],
  },
};

const CASE_STUDIES = [
  {
    id: "apex-realty",
    client: "Apex Realty Group",
    industry: "Real Estate",
    icon: <Building2 className="h-6 w-6" />,
    title: "How Apex Realty 3x'd Property Viewings with an AI WhatsApp Agent",
    challenge: "Sales agents were spending 60% of their day answering basic WhatsApp inquiries. Hot leads were going cold because agents couldn't reply instantly during off-hours.",
    solution: "Deployed a custom WhatsApp AI Agent integrated with their CRM. The agent instantly answers property queries, shares brochures, qualifies leads by budget, and automatically schedules viewings.",
    results: [
      { metric: "+315%", label: "Qualified Leads" },
      { metric: "<30s", label: "Response Time" },
      { metric: "40 hrs", label: "Saved per Week" },
    ],
    color: "from-blue-500/20 to-cyan-500/5",
    accent: "text-blue-500",
    border: "hover:border-blue-500/30",
  },
  {
    id: "luna-brands",
    client: "Luna DTC",
    industry: "E-Commerce",
    icon: <ShoppingBag className="h-6 w-6" />,
    title: "Automating 80% of Support Tickets for a $5M DTC Brand",
    challenge: "During peak holiday seasons, the customer support team was overwhelmed with \"Where is my order?\" and return policy questions, leading to a backlog and dropping CSAT scores.",
    solution: "Integrated a GPT-4 powered support agent connected to Shopify and their logistics partner. The AI resolves WISMO (Where Is My Order) tickets autonomously and handles returns processing.",
    results: [
      { metric: "-80%", label: "Ticket Volume" },
      { metric: "24/7", label: "Global Coverage" },
      { metric: "+22%", label: "CSAT Score" },
    ],
    color: "from-orange-500/20 to-amber-500/5",
    accent: "text-orange-500",
    border: "hover:border-orange-500/30",
  },
  {
    id: "nexa-consulting",
    client: "Nexa Consulting",
    industry: "B2B Services",
    icon: <Briefcase className="h-6 w-6" />,
    title: "Scaling Operations: 120 Hours Saved Monthly with n8n Pipelines",
    challenge: "The operations team was drowning in manual data entry—copying lead data from Facebook Ads to Google Sheets, sending welcome emails, and creating Slack notifications.",
    solution: "Engineered an end-to-end workflow automation pipeline using n8n and Zapier. The system captures leads, enriches data via Clearbit, updates the CRM, and sends personalized onboarding sequences.",
    results: [
      { metric: "120 hrs", label: "Saved Monthly" },
      { metric: "Zero", label: "Manual Errors" },
      { metric: "$45k", label: "Payroll Saved/Yr" },
    ],
    color: "from-green-500/20 to-emerald-500/5",
    accent: "text-green-500",
    border: "hover:border-green-500/30",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-fade-in-up">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Client Success</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in-up delay-100">
            Real Results.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-primary to-orange-600">
              Automated.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Don&apos;t just take our word for it. See how ambitious businesses use our AI agents and workflow automations to slash costs, save time, and multiply revenue.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 gap-12">
          {CASE_STUDIES.map((study, idx) => (
            <div 
              key={study.id} 
              className={`flex flex-col lg:flex-row gap-8 lg:gap-12 bg-card border border-border rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 ${study.border} animate-fade-in-up`}
              style={{ animationDelay: `${(idx + 1) * 150}ms` }}
            >
              {/* Left Column: Story */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${study.color} border border-white/5`}>
                    {study.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{study.client}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{study.industry}</p>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  {study.title}
                </h2>
                
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className={`h-4 w-4 ${study.accent}`} />
                      <h4 className="font-semibold text-foreground">The Challenge</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2 mt-6">
                      <Zap className={`h-4 w-4 ${study.accent}`} />
                      <h4 className="font-semibold text-foreground">The Solution</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Metrics */}
              <div className="lg:w-[380px] shrink-0">
                <div className={`h-full rounded-3xl bg-gradient-to-br ${study.color} border border-border/50 p-8 flex flex-col justify-center gap-6`}>
                  <h4 className="font-bold text-lg mb-2">The Impact</h4>
                  {study.results.map((result, i) => (
                    <div key={i} className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
                      <div className={`text-3xl md:text-4xl font-black tracking-tight mb-1 ${study.accent}`}>
                        {result.metric}
                      </div>
                      <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {result.label}
                      </div>
                    </div>
                  ))}
                  
                  <Link href="/#contact" className={`mt-4 flex items-center justify-between px-6 py-4 rounded-xl bg-background border border-border hover:border-foreground transition-colors group cursor-pointer`}>
                    <span className="font-semibold text-sm">Want similar results?</span>
                    <ArrowRight className={`h-4 w-4 ${study.accent} group-hover:translate-x-1 transition-transform`} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Layer */}
      <section className="py-20 mt-12">
        <div className="container-custom">
          <div className="bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to be our next success story?</h2>
              <p className="text-zinc-400 text-lg mb-8">
                Stop losing hours to manual tasks. Book a free discovery call and let&apos;s map out your automation roadmap.
              </p>
              <Link href="/#contact" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25">
                Book a Free Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Contact />
    </main>
  );
}
