import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog-data';
import { SocialShare } from '@/components/ui/social-share';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
        alternates: {
            canonical: `https://atulautomation.com/blog/${slug}`,
        },
    };
}

// Simple markdown-like renderer
function renderContent(content: string) {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (!line) {
            if (inTable) {
                elements.push(
                    <div key={`table-${i}`} className="my-6 overflow-x-auto">
                        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-muted">
                                    {tableHeaders.map((h, j) => (
                                        <th key={j} className="px-4 py-3 text-left font-semibold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row, j) => (
                                    <tr key={j} className="border-t border-border">
                                        {row.map((cell, k) => (
                                            <td key={k} className="px-4 py-3">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                inTable = false;
                tableRows = [];
                tableHeaders = [];
            }
            continue;
        }

        // Table rows
        if (line.startsWith('|') && line.endsWith('|')) {
            const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
            if (cells.every(c => c.match(/^[-:]+$/))) continue; // separator
            if (!inTable) {
                inTable = true;
                tableHeaders = cells;
            } else {
                tableRows.push(cells);
            }
            continue;
        }

        // Headers
        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={i} className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-foreground">
                    {line.replace('## ', '')}
                </h2>
            );
            continue;
        }
        if (line.startsWith('### ')) {
            elements.push(
                <h3 key={i} className="text-xl md:text-2xl font-bold mt-8 mb-3 text-foreground">
                    {line.replace('### ', '')}
                </h3>
            );
            continue;
        }

        // List items
        if (line.startsWith('- **')) {
            const match = line.match(/^- \*\*(.*?)\*\*(.*)/);
            if (match) {
                elements.push(
                    <li key={i} className="flex gap-2 mb-2 text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1.5 shrink-0">•</span>
                        <span><strong className="text-foreground">{match[1]}</strong>{match[2]}</span>
                    </li>
                );
                continue;
            }
        }
        if (line.startsWith('- ')) {
            elements.push(
                <li key={i} className="flex gap-2 mb-2 text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>{line.replace('- ', '')}</span>
                </li>
            );
            continue;
        }

        // Bold text in paragraphs
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
        const linkFormatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');

        elements.push(
            <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: linkFormatted }} />
        );
    }

    return elements;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = getAllPosts().filter(p => p.slug !== slug).slice(0, 2);

    // JSON-LD for blog post
    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
            '@type': 'Organization',
            name: post.author,
            url: 'https://atulautomation.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Atul Automation',
            url: 'https://atulautomation.com',
        },
        mainEntityOfPage: `https://atulautomation.com/blog/${slug}`,
        keywords: post.tags.join(', '),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <main className="min-h-screen pt-24 md:pt-32 pb-24">
                {/* Back link */}
                <div className="container-custom mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>
                </div>

                {/* Article Header */}
                <header className="container-custom max-w-4xl mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <Tag className="h-3 w-3" />
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                        {post.title}
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-border">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">AA</div>
                                {post.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Article Body */}
                <article className="container-custom max-w-4xl">
                    <div className="prose-custom">
                        {renderContent(post.content)}
                    </div>
                </article>

                {/* Tags */}
                <div className="container-custom max-w-4xl mt-12 pt-8 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="mt-6">
                        <SocialShare
                            title={post.title}
                            description={post.excerpt}
                            url={`https://atulautomation.com/blog/${slug}`}
                        />
                    </div>
                </div>

                {/* CTA */}
                <div className="container-custom max-w-4xl mt-16">
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Ready to Automate Your Business?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                            Get a free consultation with our AI automation experts. We&apos;ll analyze your workflow and show you exactly how to save time and money.
                        </p>
                        <Link href="/#contact" className="btn-primary">
                            Get Free Consultation
                        </Link>
                    </div>
                </div>

                {/* Related Posts */}
                {allPosts.length > 0 && (
                    <section className="container-custom max-w-4xl mt-16">
                        <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {allPosts.map(relatedPost => (
                                <Link
                                    key={relatedPost.slug}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all"
                                >
                                    <span className="text-xs font-semibold text-primary">{relatedPost.category}</span>
                                    <h4 className="text-lg font-bold mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {relatedPost.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
