import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog-data';
import { getAllIndustries } from '@/lib/industry-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://atulautomation.com';
    const posts = getAllPosts();
    const industries = getAllIndustries();

    return [
        // Main pages
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/capabilities/ai-agents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/capabilities/chatbots`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/capabilities/workflow`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/capabilities/marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/capabilities/real-estate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/capabilities/crm`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/capabilities/web-dev`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

        // Blog
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        ...posts.map(post => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),

        // Industries (Programmatic SEO)
        { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        ...industries.map(industry => ({
            url: `${baseUrl}/industries/${industry.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),

        // Free Tools
        { url: `${baseUrl}/tools/roi-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

        // Legal
        { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];
}
