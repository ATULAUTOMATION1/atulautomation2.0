import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourseBySlug, getAllCourseSlugs } from '@/lib/course-data';
import CourseGuideContent from './course-guide-content';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const course = getCourseBySlug(slug);
    if (!course) return { title: 'Course Not Found' };

    return {
        title: `${course.title} — Free Guide`,
        description: course.longDescription.slice(0, 160),
        keywords: [
            ...course.topics,
            'AI automation course',
            'free automation guide',
            course.type.toLowerCase() + ' course',
            'Atul Automation',
        ],
        alternates: { canonical: `https://atulautomation.com/courses/${slug}` },
        openGraph: {
            title: course.title,
            description: course.description,
            url: `https://atulautomation.com/courses/${slug}`,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: course.title,
            description: course.description,
        },
    };
}

export default async function CourseGuidePage({ params }: PageProps) {
    const { slug } = await params;
    const course = getCourseBySlug(slug);
    if (!course) notFound();

    // JSON-LD structured data for the course
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.longDescription,
        provider: {
            '@type': 'Organization',
            name: 'Atul Automation',
            sameAs: 'https://atulautomation.com',
        },
        educationalLevel: course.type,
        timeRequired: `PT${course.duration.replace(/\s/g, '').replace('H', 'H').replace('M', 'M')}`,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: course.rating,
            bestRating: 5,
            ratingCount: Math.floor(course.rating * 50 + 120),
        },
        isAccessibleForFree: true,
        teaches: course.whatYouWillLearn,
        about: course.topics,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CourseGuideContent course={course} />
        </>
    );
}
