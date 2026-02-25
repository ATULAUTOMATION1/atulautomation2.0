import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-data';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog - AI Automation Insights & Guides',
    description: 'Expert insights on AI automation, chatbots, workflow automation, and digital marketing. Learn how to automate your business and scale faster.',
    alternates: {
        canonical: 'https://atulautomation.com/blog',
    },
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
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block"
                        >
                            <article className="h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                {/* Cover Image */}
                                <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl font-bold text-primary/20 font-heading">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(post.date).toLocaleDateString('en-IN', {
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
                    ))}
                </div>
            </section>
        </main>
    );
}
