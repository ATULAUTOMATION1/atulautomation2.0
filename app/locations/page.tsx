import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCities } from '@/lib/city-data';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: "India's Best AI Automation Agency | All Locations | Atul Automation",
    description: "Atul Automation serves businesses across India — Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur & Surat. Built to Automate, Designed to Scale.",
    alternates: { canonical: 'https://atulautomation.com/locations' },
};

const cityEmojis: Record<string, string> = {
    'Mumbai': '🏙️', 'Delhi NCR': '🏛️', 'Bangalore': '💻', 'Hyderabad': '🧬',
    'Pune': '🏭', 'Chennai': '🚗', 'Kolkata': '🌉', 'Ahmedabad': '💎',
    'Jaipur': '🏰', 'Surat': '💠',
};

export default function LocationsPage() {
    const cities = getAllCities();

    return (
        <main className="min-h-screen pt-24 md:pt-32 pb-24">
            <section className="container-custom mb-16">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="section-badge mb-4">
                        <MapPin className="h-3 w-3" />
                        All India
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        India&apos;s Best{' '}
                        <span className="text-gradient">AI Automation Agency</span>
                    </h1>
                    <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-4">
                        Built to Automate • Designed to Scale
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We serve businesses across 10 major Indian cities with custom AI chatbots, workflow automation, and intelligent agents. Made to Automate.
                    </p>
                </div>
            </section>

            {/* Map-like Grid */}
            <section className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/locations/${city.slug}`}
                            className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl">{cityEmojis[city.city] || '🏢'}</div>
                                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                    {city.state}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                {city.city}
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {city.heroSubtitle}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{city.population} people</span>
                                <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{city.businesses} businesses</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {city.industries.slice(0, 3).map((ind, i) => (
                                    <span key={i} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{ind}</span>
                                ))}
                            </div>
                            <div className="flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                                View Solutions
                                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="container-custom max-w-4xl mt-20">
                <div className="rounded-2xl bg-gradient-to-r from-primary to-orange-500 p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Don&apos;t See Your City?
                    </h2>
                    <p className="text-white/80 mb-6">
                        We work remotely with businesses across India. No matter where you are, we can automate your business.
                    </p>
                    <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-white text-primary px-7 py-3 text-sm font-semibold shadow-sm hover:bg-white/90 transition-all">
                        Contact Us <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
