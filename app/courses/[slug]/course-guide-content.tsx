'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, BookOpen, Clock, Star, ChevronDown, ChevronRight,
    CheckCircle2, Users, Award, Zap, GraduationCap,
    HelpCircle, Target, Layers, MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CourseDetail } from '@/lib/course-data';

const LEVEL_COLORS: Record<string, string> = {
    Beginner: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    Intermediate: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    Advanced: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    Industry: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    Mastery: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

const LEVEL_GRADIENT: Record<string, string> = {
    Beginner: 'from-green-500 to-emerald-600',
    Intermediate: 'from-blue-500 to-indigo-600',
    Advanced: 'from-purple-500 to-violet-600',
    Industry: 'from-teal-500 to-cyan-600',
    Mastery: 'from-amber-500 to-orange-600',
};

function DifficultyDots({ level }: { level: number }) {
    return (
        <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className={cn(
                        'w-2.5 h-2.5 rounded-full transition-colors',
                        i <= level ? 'bg-primary' : 'bg-muted-foreground/20'
                    )}
                />
            ))}
        </div>
    );
}

function AccordionModule({ module, index, isOpen, toggle }: {
    module: CourseDetail['modules'][0];
    index: number;
    isOpen: boolean;
    toggle: () => void;
}) {
    return (
        <div className={cn(
            'border border-border rounded-2xl overflow-hidden transition-all duration-300',
            isOpen ? 'shadow-lg ring-1 ring-primary/20' : 'hover:border-primary/30'
        )}>
            <button
                onClick={toggle}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-card hover:bg-muted/40 transition-colors"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors',
                        isOpen ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    )}>
                        {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                        <h3 className="font-bold text-base">{module.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{module.lessons.length} lessons</p>
                    </div>
                </div>
                <ChevronDown className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0',
                    isOpen && 'rotate-180 text-primary'
                )} />
            </button>

            <div className={cn(
                'transition-all duration-300 overflow-hidden',
                isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            )}>
                <div className="px-6 pb-6 pt-2 border-t border-border/50">
                    <ul className="space-y-3">
                        {module.lessons.map((lesson, li) => (
                            <li key={li} className="flex items-start gap-3 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-foreground/90 leading-relaxed">{lesson}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function CourseGuideContent({ course }: { course: CourseDetail }) {
    const [openModules, setOpenModules] = useState<Set<number>>(new Set([0]));

    const toggleModule = (index: number) => {
        setOpenModules(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    const expandAll = () => {
        setOpenModules(new Set(course.modules.map((_, i) => i)));
    };

    const collapseAll = () => {
        setOpenModules(new Set());
    };

    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const levelColor = LEVEL_COLORS[course.type] || 'bg-muted text-muted-foreground border-border';
    const gradient = LEVEL_GRADIENT[course.type] || 'from-primary to-orange-500';

    return (
        <main className="min-h-screen pb-24">
            {/* ═══════════ HERO SECTION ═══════════ */}
            <section className={cn('relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24')}>
                {/* Background gradient */}
                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-[0.06]', gradient)} />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container-custom relative z-10">
                    {/* Breadcrumb */}
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to All Courses
                    </Link>

                    <div className="max-w-4xl">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className={cn('px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border', levelColor)}>
                                {course.type}
                            </span>
                            {course.featured && (
                                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20">
                                    ⭐ Featured
                                </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                                Last updated: {new Date(course.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            {course.title}
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                            {course.longDescription}
                        </p>

                        {/* Meta Stats */}
                        <div className="flex flex-wrap items-center gap-6 md:gap-8">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                <span className="font-bold">{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                                <span className="font-bold">{course.rating}/5</span>
                                <span className="text-sm text-muted-foreground">({Math.floor(course.rating * 50 + 120)} ratings)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Layers className="h-5 w-5 text-blue-500" />
                                <span className="font-bold">{course.modules.length} Modules</span>
                                <span className="text-sm text-muted-foreground">• {totalLessons} Lessons</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-muted-foreground">Difficulty:</span>
                                <DifficultyDots level={course.difficulty} />
                            </div>
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {course.topics.map(topic => (
                                <span
                                    key={topic}
                                    className="text-xs font-semibold bg-card border border-border rounded-full px-3 py-1"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ MAIN CONTENT ═══════════ */}
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
                    {/* LEFT: Main Content */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* What You Will Learn */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Target className="h-5 w-5 text-primary" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold">What You&apos;ll Learn</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.whatYouWillLearn.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Course Modules */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <BookOpen className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold">Course Curriculum</h2>
                                        <p className="text-sm text-muted-foreground">{course.modules.length} modules • {totalLessons} lessons</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center gap-2">
                                    <button onClick={expandAll} className="text-xs font-bold text-primary hover:underline">
                                        Expand All
                                    </button>
                                    <span className="text-muted-foreground">|</span>
                                    <button onClick={collapseAll} className="text-xs font-bold text-muted-foreground hover:text-primary hover:underline">
                                        Collapse All
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {course.modules.map((module, i) => (
                                    <AccordionModule
                                        key={i}
                                        module={module}
                                        index={i}
                                        isOpen={openModules.has(i)}
                                        toggle={() => toggleModule(i)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Who Is This For */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-emerald-500" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold">Who Is This For?</h2>
                            </div>
                            <div className="space-y-3">
                                {course.whoIsThisFor.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-emerald-500/30 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <ChevronRight className="h-4 w-4 text-emerald-500" />
                                        </div>
                                        <span className="text-sm leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQs */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <HelpCircle className="h-5 w-5 text-amber-500" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
                            </div>
                            <div className="space-y-4">
                                {course.faqs.map((faq, i) => (
                                    <FAQItem key={i} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT: Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            {/* Course Card */}
                            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
                                        <Award className="h-4 w-4" />
                                        100% Free
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Start Learning Now</h3>
                                    <p className="text-sm text-muted-foreground">
                                        No signup required. Dive into the full curriculum above.
                                    </p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-bold">{course.duration}</span>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Modules</span>
                                        <span className="font-bold">{course.modules.length}</span>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Lessons</span>
                                        <span className="font-bold">{totalLessons}</span>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Level</span>
                                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border', levelColor)}>
                                            {course.type}
                                        </span>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Rating</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                            <span className="font-bold">{course.rating}/5</span>
                                        </div>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Price</span>
                                        <span className="font-bold text-emerald-500">Free Forever</span>
                                    </div>
                                </div>

                                <Link
                                    href="/#contact"
                                    className="btn-primary w-full justify-center text-center group"
                                >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Get Personalized Help
                                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>

                            {/* Prerequisites */}
                            <div className="rounded-2xl border border-border bg-card p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <h3 className="font-bold">Prerequisites</h3>
                                </div>
                                <ul className="space-y-2">
                                    {course.prerequisites.map((prereq, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <Zap className="h-3.5 w-3.5 text-primary shrink-0 mt-1" />
                                            <span>{prereq}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Need Help CTA */}
                            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                                <h4 className="font-bold mb-2">Need implementation help?</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Our team can build these automations for your business. Let&apos;s talk.
                                </p>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                                >
                                    Schedule a free consultation
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════ BOTTOM CTA ═══════════ */}
            <section className="container-custom mt-20">
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Ready to explore more?</h3>
                        <p className="text-muted-foreground">
                            Browse our full library of courses, guides, videos, and prompt packs.
                        </p>
                    </div>
                    <Link href="/courses" className="btn-primary group whitespace-nowrap">
                        View All Resources
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
        </main>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn(
            'border border-border rounded-xl overflow-hidden transition-all duration-300',
            isOpen ? 'shadow-md ring-1 ring-amber-500/10' : 'hover:border-amber-500/20'
        )}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left bg-card hover:bg-muted/30 transition-colors"
                aria-expanded={isOpen}
            >
                <span className="font-bold text-sm pr-4">{question}</span>
                <ChevronDown className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-300 shrink-0',
                    isOpen && 'rotate-180 text-amber-500'
                )} />
            </button>
            <div className={cn(
                'transition-all duration-300 overflow-hidden',
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            )}>
                <div className="px-5 pb-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-3">{answer}</p>
                </div>
            </div>
        </div>
    );
}
