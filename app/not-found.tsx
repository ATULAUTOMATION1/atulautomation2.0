import Link from 'next/link';
import { Home, Search, Zap } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <div className="text-[10rem] md:text-[14rem] font-black text-muted/20 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center animate-bounce">
                            <Zap className="h-10 w-10 text-white" />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Page Not Found
                </h1>
                <p className="text-muted-foreground mb-8">
                    Looks like this page took a vacation. But don&apos;t worry — our AI never takes breaks! Let us help you find what you&apos;re looking for.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <Link href="/" className="btn-primary">
                        <Home className="mr-1.5 h-4 w-4" />
                        Go Home
                    </Link>
                    <Link href="/blog" className="btn-secondary">
                        <Search className="mr-1.5 h-4 w-4" />
                        Read Blog
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="border-t border-border pt-8">
                    <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { label: 'AI Chatbots', href: '/capabilities/chatbots' },
                            { label: 'Industries', href: '/industries' },
                            { label: 'ROI Calculator', href: '/tools/roi-calculator' },
                            { label: 'Locations', href: '/locations' },
                            { label: 'FAQ', href: '/faq' },
                            { label: 'Contact', href: '/#contact' },
                        ].map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm px-3 py-1.5 rounded-full border border-border hover:border-primary/30 hover:text-primary transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
