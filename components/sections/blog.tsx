"use client";

import { ArrowRight, BookOpen, Clock, Calendar, Bot, Zap, DollarSign, Users, Wrench, Brain, Megaphone, BarChart3 } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-data";

const CATEGORY_STYLES: Record<string, { icon: React.ElementType; gradient: string }> = {
    'AI Chatbots': { icon: Bot, gradient: 'from-blue-600 via-cyan-500 to-teal-400' },
    'Workflow Automation': { icon: Zap, gradient: 'from-amber-500 via-orange-500 to-red-500' },
    'AI Marketing': { icon: Megaphone, gradient: 'from-pink-500 via-rose-500 to-red-500' },
    'WhatsApp': { icon: Bot, gradient: 'from-green-500 via-emerald-500 to-teal-500' },
    'CRM': { icon: Users, gradient: 'from-indigo-500 via-purple-500 to-pink-500' },
    'Tools & Reviews': { icon: Wrench, gradient: 'from-violet-500 via-fuchsia-500 to-pink-500' },
    'Business Strategy': { icon: DollarSign, gradient: 'from-emerald-500 via-green-500 to-lime-500' },
    'Sales Automation': { icon: BarChart3, gradient: 'from-sky-500 via-blue-500 to-indigo-500' },
    'AI Technology': { icon: Brain, gradient: 'from-purple-600 via-violet-500 to-indigo-500' },
};

const DEFAULT_STYLE = { icon: Zap, gradient: 'from-primary via-orange-500 to-amber-500' };

export function Blog() {
    const posts = getAllPosts().slice(0, 3);

    return (
        <section id="blog" className="section-padding bg-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />

            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
                    <p className="section-badge mb-4">
                        <BookOpen className="h-3.5 w-3.5" /> Blog
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Latest <span className="text-primary">Insights</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Stay ahead with expert takes on AI, automation, and digital growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post, i) => {
                        const style = CATEGORY_STYLES[post.category] || DEFAULT_STYLE;
                        const IconComponent = style.icon;

                        return (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                                <article
                                    className={`h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer relative opacity-0 animate-fade-in-up`}
                                    style={{ animationDelay: `${(i + 1) * 100}ms` }}
                                >
                                    {/* Cover */}
                                    <div className={`relative h-44 bg-gradient-to-br ${style.gradient} overflow-hidden`}>
                                        {/* Decorative shapes */}
                                        <div className="absolute top-3 right-3 w-16 h-16 border border-white/10 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                                        <div className="absolute bottom-4 left-4 w-10 h-10 border border-white/10 rounded-full group-hover:scale-125 transition-transform duration-700" />

                                        {/* Center Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <IconComponent className="h-8 w-8 text-white" strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                            <span className="text-muted-foreground/30">·</span>
                                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {post.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">{post.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                            <span className="text-xs text-muted-foreground">{post.author}</span>
                                            <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read <ArrowRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                        View All Articles <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
