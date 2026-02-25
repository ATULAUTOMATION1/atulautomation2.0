import { Metadata } from 'next';
import Link from 'next/link';
import { getAllIndustries } from '@/lib/industry-data';
import { ArrowRight, Building2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'AI Automation for Every Industry | Atul Automation',
    description: 'Discover how AI automation transforms businesses across industries — real estate, e-commerce, healthcare, education, restaurants, law firms, fitness, and travel.',
    alternates: {
        canonical: 'https://atulautomation.com/industries',
    },
};

const industryIcons: Record<string, string> = {
    'Real Estate': '🏠',
    'E-Commerce': '🛒',
    'Healthcare': '🏥',
    'Education': '🎓',
    'Restaurants': '🍽️',
    'Law Firms': '⚖️',
    'Fitness & Gyms': '💪',
    'Travel & Tourism': '✈️',
};

export default function IndustriesPage() {
    const industries = getAllIndustries();

    return (
        <main className="min-h-screen pt-24 md:pt-32 pb-24">
            <section className="container-custom mb-16">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="section-badge mb-4">
                        <Building2 className="h-3 w-3" />
                        Industries
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        AI Automation for{' '}
                        <span className="text-gradient">Every Industry</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We build custom AI solutions tailored to your industry. From chatbots to workflow automation, every solution is designed for your specific challenges.
                    </p>
                </div>
            </section>

            <section className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {industries.map((industry) => (
                        <Link
                            key={industry.slug}
                            href={`/industries/${industry.slug}`}
                            className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                        >
                            <div className="text-4xl mb-4">{industryIcons[industry.industry] || '🤖'}</div>
                            <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                {industry.industry}
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {industry.metaDescription}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                {industry.stats.slice(0, 2).map((stat, i) => (
                                    <span key={i} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                        {stat.value} {stat.label.split(' ').slice(0, 2).join(' ')}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                                Learn More
                                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
