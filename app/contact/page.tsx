import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MessageSquare, Clock, Globe, CheckCircle, Calendar } from "lucide-react";
import dynamic from "next/dynamic";

const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export const metadata: Metadata = {
  title: "Contact Us | Book a Free AI Strategy Call",
  description: "Get in touch with Atul Automation. Book a free 30-minute AI strategy call, email us at hello@atulautomation.com, or chat with our AI assistant. We serve clients in the USA, UK, Canada, Australia & India.",
  alternates: {
    canonical: "https://atulautomation.com/contact",
  },
  openGraph: {
    title: "Contact Atul Automation | Book a Free Strategy Call",
    description: "Ready to automate your business? Book a free 30-minute strategy call or email hello@atulautomation.com. We respond within 2–4 hours.",
    url: "https://atulautomation.com/contact",
  },
};

const CONTACT_METHODS = [
  {
    icon: <Mail className="h-6 w-6 text-orange-400" />,
    title: "Email Us",
    detail: "hello@atulautomation.com",
    sub: "We respond within 2–4 hours during business hours",
    href: "mailto:hello@atulautomation.com",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
    title: "Live Chat",
    detail: "Chat with our AI assistant",
    sub: "Available 24/7 — click the chat bubble in the corner",
    href: "#",
  },
  {
    icon: <Globe className="h-6 w-6 text-green-400" />,
    title: "Global Coverage",
    detail: "USA · UK · Canada · Australia · India · UAE",
    sub: "Remote-first agency — we work across all time zones",
    href: "/locations",
  },
];

const FAQS = [
  {
    q: "How quickly can you start on my project?",
    a: "After our discovery call, we typically deliver a proposal within 48 hours. Most projects kick off within one week of agreement.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes — the majority of our clients are in the USA, UK, Canada, and Australia. We work fully remote across all time zones.",
  },
  {
    q: "What is the minimum project size?",
    a: "Our starter projects begin at $500 USD (approx. ₹40,000). We also offer monthly retainer plans for ongoing AI support.",
  },
  {
    q: "Do I need technical knowledge to work with you?",
    a: "Not at all. We handle everything from strategy to deployment. You just need to know your business goals.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Atul Automation",
  "url": "https://atulautomation.com/contact",
  "description": "Contact Atul Automation for AI automation services. Book a free strategy call or email hello@atulautomation.com.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Atul Automation",
    "email": "hello@atulautomation.com",
    "url": "https://atulautomation.com",
    "areaServed": ["United States", "United Kingdom", "Canada", "Australia", "India", "UAE"],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@atulautomation.com",
      "availableLanguage": ["English", "Hindi"],
      "hoursAvailable": "Mo-Fr 09:00-18:00"
    }
  },
  "FAQPage": {
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative px-4 py-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="container-custom relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Free Consultation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Let&apos;s Build Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-primary to-orange-600">
              AI Automation System
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Book a free 30-minute strategy call. We&apos;ll identify your biggest automation opportunity and deliver a no-obligation roadmap — no charge, no pressure.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CONTACT_METHODS.map((m, i) => (
            <Link
              key={i}
              href={m.href}
              className="group bg-card border border-border hover:border-primary/50 rounded-3xl p-8 flex flex-col gap-4 transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="p-3 bg-background border border-border rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {m.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{m.title}</h3>
                <p className="text-primary font-medium text-sm mb-1">{m.detail}</p>
                <p className="text-muted-foreground text-sm">{m.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 border-y border-border/50 mb-16">
          {[
            { icon: <Clock className="h-5 w-5 text-orange-400" />, label: "2–4 Hour Response" },
            { icon: <CheckCircle className="h-5 w-5 text-green-400" />, label: "50+ Businesses Served" },
            { icon: <Globe className="h-5 w-5 text-blue-400" />, label: "6 Countries Covered" },
            { icon: <Calendar className="h-5 w-5 text-purple-400" />, label: "Free Strategy Call" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 justify-center">
              {b.icon}
              <span className="text-sm font-semibold">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <Contact />

      {/* FAQs */}
      <section className="container-custom py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Common Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
