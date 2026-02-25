import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getAllIndustries } from '@/lib/industry-data';
import { SocialShare } from '@/components/ui/social-share';
import { ArrowRight, CheckCircle, ArrowLeft, Zap, Target, TrendingUp, Users } from 'lucide-react';

interface IndustryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllIndustries().map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = getIndustryBySlug(slug);
    if (!page) return { title: 'Not Found' };

    return {
        title: `${page.title} | Atul Automation`,
        description: page.metaDescription,
        keywords: [`AI automation ${page.industry}`, `chatbot ${page.industry}`, `${page.industry} automation`, 'AI agents', 'workflow automation', 'Atul Automation'],
        openGraph: {
            title: page.title,
            description: page.metaDescription,
            type: 'website',
        },
        alternates: {
            canonical: `https://atulautomation.com/industries/${slug}`,
        },
    };
}

const statIcons = [Zap, Target, TrendingUp, Users];

export default async function IndustryPage({ params }: IndustryPageProps) {
    const { slug } = await params;
    const page = getIndustryBySlug(slug);

    if (!page) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.title,
        description: page.metaDescription,
        provider: {
            '@type': 'Organization',
            name: 'Atul Automation',
            url: 'https://atulautomation.com',
        },
        areaServed: { '@type': 'Country', name: 'India' },
        serviceType: `AI Automation for ${page.industry}`,
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
                        <Link href="/industries" className="hover:text-primary transition-colors">Industries</Link>
                        <span>/</span>
                        <span className="text-foreground">{page.industry}</span>
                    </div>
                </div>

                {/* Hero */}
                <section className="container-custom max-w-5xl mb-20">
                    <span className="section-badge mb-4">
                        <Zap className="h-3 w-3" />
                        AI for {page.industry}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        {page.title.split('for')[0]}for{' '}
                        <span className="text-gradient">{page.industry}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                        {page.heroSubtitle}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link href="/#contact" className="btn-primary">
                            Get Free Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                        <a href={`https://wa.me/918518824480?text=Hi, I'm interested in AI automation for my ${page.industry.toLowerCase()} business`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            WhatsApp Us
                        </a>
                    </div>
                    <SocialShare title={page.title} description={page.metaDescription} url={`https://atulautomation.com/industries/${slug}`} />
                </section>

                {/* Stats */}
                <section className="container-custom max-w-5xl mb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {page.stats.map((stat, i) => {
                            const Icon = statIcons[i % statIcons.length];
                            return (
                                <div key={i} className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/30 transition-colors">
                                    <Icon className="h-5 w-5 text-primary mx-auto mb-3" />
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Pain Points */}
                <section className="container-custom max-w-5xl mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Common Challenges in <span className="text-gradient">{page.industry}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {page.painPoints.map((pain, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                                <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                                <span className="text-muted-foreground">{pain}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Solutions */}
                <section className="container-custom max-w-5xl mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our AI Solutions for {page.industry}
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl">
                        Purpose-built automation that solves real {page.industry.toLowerCase()} challenges.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {page.solutions.map((solution, i) => (
                            <div key={i} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <h3 className="text-lg font-bold">{solution.title}</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">{solution.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Use Cases */}
                <section className="container-custom max-w-5xl mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        What You Can Automate
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {page.useCases.map((useCase, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                                <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                                <span className="text-sm font-medium">{useCase}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonial */}
                <section className="container-custom max-w-5xl mb-20">
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

                {/* CTA */}
                <section className="container-custom max-w-5xl">
                    <div className="rounded-2xl bg-gradient-to-r from-primary to-orange-500 p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Automate Your {page.industry} Business?
                        </h2>
                        <p className="text-white/80 mb-8 max-w-lg mx-auto">
                            Get a free consultation and see exactly how AI can transform your {page.industry.toLowerCase()} operations.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-white text-primary px-7 py-3 text-sm font-semibold shadow-sm hover:bg-white/90 transition-all">
                                Book Free Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Link>
                            <a href={`https://wa.me/918518824480?text=Hi, I need AI automation for my ${page.industry.toLowerCase()} business`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-7 py-3 text-sm font-semibold hover:bg-white/10 transition-all">
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
