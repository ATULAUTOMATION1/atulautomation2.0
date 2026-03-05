import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-data';
import { Calendar, Clock, ArrowRight, Tag, Bot, Zap, BarChart3, DollarSign, Users, Wrench, Brain, Megaphone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog - AI Automation Insights & Guides',
    description: 'Expert insights on AI automation, chatbots, workflow automation, and digital marketing. Learn how to automate your business and scale faster.',
    alternates: {
        canonical: 'https://atulautomation.com/blog',
    },
};

const CATEGORY_STYLES: Record<string, { icon: React.ElementType; gradient: string; pattern: string }> = {
    'AI Chatbots': {
        icon: Bot,
        gradient: 'from-blue-600 via-cyan-500 to-teal-400',
        pattern: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)',
    },
    'Workflow Automation': {
        icon: Zap,
        gradient: 'from-amber-500 via-orange-500 to-red-500',
        pattern: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 40%)',
    },
    'AI Marketing': {
        icon: Megaphone,
        gradient: 'from-pink-500 via-rose-500 to-red-500',
        pattern: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)',
    },
    'WhatsApp': {
        icon: Bot,
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        pattern: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.12) 0%, transparent 50%)',
    },
    'CRM': {
        icon: Users,
        gradient: 'from-indigo-500 via-purple-500 to-pink-500',
        pattern: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 40%)',
    },
    'Tools & Reviews': {
        icon: Wrench,
        gradient: 'from-violet-500 via-fuchsia-500 to-pink-500',
        pattern: 'radial-gradient(circle at 60% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
    },
    'Business Strategy': {
        icon: DollarSign,
        gradient: 'from-emerald-500 via-green-500 to-lime-500',
        pattern: 'radial-gradient(circle at 30% 80%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)',
    },
    'Sales Automation': {
        icon: BarChart3,
        gradient: 'from-sky-500 via-blue-500 to-indigo-500',
        pattern: 'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.12) 0%, transparent 50%)',
    },
    'AI Technology': {
        icon: Brain,
        gradient: 'from-purple-600 via-violet-500 to-indigo-500',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
    },
};

const DEFAULT_STYLE = {
    icon: Zap,
    gradient: 'from-primary via-orange-500 to-amber-500',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen pt-24 md:pt-32">
            {/* Hero */}
            <section className="container-custom mb-16">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="section-badge mb-4">
                        <Tag className="h-3 w-3" />
                        Blog
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        AI Automation{' '}
                        <span className="text-gradient">Insights</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Expert guides, case studies, and strategies to help you automate your business and grow faster with AI.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="container-custom pb-24 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => {
                        const style = CATEGORY_STYLES[post.category] || DEFAULT_STYLE;
                        const IconComponent = style.icon;

                        return (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group block"
                            >
                                <article className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                                    {/* Cover Image — Vibrant Gradient with Icon */}
                                    <div
                                        className={`relative h-52 bg-gradient-to-br ${style.gradient} overflow-hidden`}
                                    >
                                        {/* Decorative Pattern */}
                                        <div
                                            className="absolute inset-0"
                                            style={{ backgroundImage: style.pattern }}
                                        />

                                        {/* Floating geometric shapes */}
                                        <div className="absolute top-4 right-4 w-20 h-20 border border-white/10 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                                        <div className="absolute bottom-6 left-6 w-14 h-14 border border-white/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
                                        <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-white/5 rounded-lg rotate-45" />

                                        {/* Center Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                                                <IconComponent className="h-10 w-10 text-white" strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Bottom Fade */}
                                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                                            Read Article
                                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
