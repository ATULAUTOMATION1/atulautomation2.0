import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCities } from '@/lib/city-data';
import { SocialShare } from '@/components/ui/social-share';
import { ArrowRight, CheckCircle, MapPin, Building2, Users, TrendingUp, Zap, Target } from 'lucide-react';

interface CityPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllCities().map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = getCityBySlug(slug);
    if (!page) return { title: 'Not Found' };

    return {
        title: page.metaTitle,
        description: page.metaDescription,
        keywords: [`AI automation ${page.city}`, `chatbot company ${page.city}`, `automation agency ${page.city}`, `AI ${page.city}`, 'Atul Automation'],
        openGraph: {
            title: page.metaTitle,
            description: page.metaDescription,
            type: 'website',
        },
        alternates: {
            canonical: `https://atulautomation.com/locations/${slug}`,
        },
    };
}

export default async function CityPage({ params }: CityPageProps) {
    const { slug } = await params;
    const page = getCityBySlug(slug);

    if (!page) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `Atul Automation - ${page.city}`,
        description: page.metaDescription,
        url: `https://atulautomation.com/locations/${slug}`,
        areaServed: { '@type': 'City', name: page.city },
        parentOrganization: {
            '@type': 'Organization',
            name: 'Atul Automation',
            url: 'https://atulautomation.com',
            slogan: 'Built to Automate, Designed to Scale',
        },
        serviceType: 'AI Automation Services',
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main className="min-h-screen pt-24 md:pt-32 pb-24">
                {/* Breadcrumb */}
                <div className="container-custom mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/locations" className="hover:text-primary transition-colors">Locations</Link>
                        <span>/</span>
                        <span className="text-foreground">{page.city}</span>
                    </div>
                </div>

                {/* Hero */}
                <section className="container-custom max-w-5xl mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="section-badge">
                            <MapPin className="h-3 w-3" />
                            {page.city}, {page.state}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                            🇮🇳 India&apos;s Best AI Agency
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        {page.heroHeadline.replace(page.city, '').trim()}{' '}
                        <span className="text-gradient">{page.city}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-4 max-w-3xl">
                        {page.heroSubtitle}
                    </p>
                    <p className="text-sm font-semibold text-primary mb-8 tracking-wider uppercase">
                        Built to Automate • Designed to Scale
                    </p>
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link href="/#contact" className="btn-primary">
                            Get Free Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                        <a href={`https://wa.me/918518824480?text=Hi! I'm from ${page.city} and interested in AI automation for my business.`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            WhatsApp Us
                        </a>
                    </div>
                    <SocialShare title={page.metaTitle} description={page.metaDescription} url={`https://atulautomation.com/locations/${slug}`} />
                </section>

                {/* City Stats */}
                <section className="container-custom max-w-5xl mb-16">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="rounded-2xl border border-border bg-card p-6 text-center">
                            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                            <div className="text-2xl md:text-3xl font-bold text-primary">{page.population}</div>
                            <div className="text-xs text-muted-foreground">Population</div>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-6 text-center">
                            <Building2 className="h-5 w-5 text-accent mx-auto mb-2" />
                            <div className="text-2xl md:text-3xl font-bold text-accent">{page.businesses}</div>
                            <div className="text-xs text-muted-foreground">Businesses</div>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-6 text-center">
                            <TrendingUp className="h-5 w-5 text-secondary mx-auto mb-2" />
                            <div className="text-2xl md:text-3xl font-bold text-secondary">{page.techIndex}</div>
                            <div className="text-xs text-muted-foreground">Tech Index</div>
                        </div>
                    </div>
                </section>

                {/* Industries We Serve */}
                <section className="container-custom max-w-5xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Industries We Automate in <span className="text-gradient">{page.city}</span>
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {page.industries.map((industry, i) => (
                            <span key={i} className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                                {industry}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Local Challenges */}
                <section className="container-custom max-w-5xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Challenges {page.city} Businesses Face
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {page.localChallenges.map((challenge, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                                <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                                <span className="text-muted-foreground text-sm">{challenge}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Solutions */}
                <section className="container-custom max-w-5xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our AI Solutions for {page.city}
                    </h2>
                    <p className="text-sm font-semibold text-primary mb-8 tracking-wider uppercase">
                        Made to Automate — Purpose-Built for {page.city}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {page.solutions.map((solution, i) => (
                            <div key={i} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center">
                                        {i === 0 ? <Zap className="h-5 w-5 text-primary" /> :
                                            i === 1 ? <Target className="h-5 w-5 text-primary" /> :
                                                i === 2 ? <TrendingUp className="h-5 w-5 text-primary" /> :
                                                    <Building2 className="h-5 w-5 text-primary" />}
                                    </div>
                                    <h3 className="text-lg font-bold">{solution.title}</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">{solution.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Atul Automation */}
                <section className="container-custom max-w-5xl mb-16">
                    <div className="rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                            Why {page.city} Businesses Choose Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🇮🇳</span>
                                </div>
                                <h3 className="font-bold mb-2">India&apos;s Best AI Agency</h3>
                                <p className="text-sm text-muted-foreground">Purpose-built for Indian businesses. We understand your tools — WhatsApp, UPI, Tally, Razorpay.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="font-bold mb-2">Built to Automate</h3>
                                <p className="text-sm text-muted-foreground">We don&apos;t just build websites — we build systems that work while you sleep. 24/7 automation.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🚀</span>
                                </div>
                                <h3 className="font-bold mb-2">Designed to Scale</h3>
                                <p className="text-sm text-muted-foreground">From 10 customers to 10,000 — our AI systems scale with your business without breaking.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial */}
                <section className="container-custom max-w-5xl mb-16">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12">
                        <div className="text-4xl text-primary/30 mb-4">&ldquo;</div>
                        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                            {page.testimonialQuote}
                        </blockquote>
                        <div>
                            <div className="font-bold">{page.testimonialAuthor}</div>
                            <div className="text-sm text-muted-foreground">{page.testimonialRole}</div>
                        </div>
                    </div>
                </section>

                {/* Also Serving */}
                <section className="container-custom max-w-5xl mb-16">
                    <h3 className="text-lg font-bold mb-4">Also serving nearby areas:</h3>
                    <div className="flex flex-wrap gap-3">
                        {page.nearbyAreas.map((area, i) => (
                            <span key={i} className="inline-flex items-center gap-1 rounded-full bg-muted px-4 py-2 text-sm">
                                <MapPin className="h-3 w-3 text-primary" />
                                {area}
                            </span>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="container-custom max-w-5xl">
                    <div className="rounded-2xl bg-gradient-to-r from-primary to-orange-500 p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            Ready to Automate Your {page.city} Business?
                        </h2>
                        <p className="text-sm font-semibold tracking-wider uppercase mb-4 text-white/70">
                            Built to Automate • Designed to Scale
                        </p>
                        <p className="text-white/80 mb-8 max-w-lg mx-auto">
                            Get a free consultation with India&apos;s best AI automation agency. We&apos;ll show you exactly how to save time and money.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-white text-primary px-7 py-3 text-sm font-semibold shadow-sm hover:bg-white/90 transition-all">
                                Book Free Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Link>
                            <a href={`https://wa.me/918518824480?text=Hi! I'm from ${page.city}. I need AI automation for my business.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-7 py-3 text-sm font-semibold hover:bg-white/10 transition-all">
                                WhatsApp Us
                            </a>
                        </div>
                        <div className="mt-6">
                            <Link href="/tools/roi-calculator" className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors">
                                Calculate your ROI first →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
