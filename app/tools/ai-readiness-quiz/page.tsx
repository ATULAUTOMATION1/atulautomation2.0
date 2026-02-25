'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, ArrowRight, ArrowLeft, CheckCircle, RotateCcw } from 'lucide-react';
import { SocialShare } from '@/components/ui/social-share';

const questions = [
    {
        question: 'How many customer inquiries does your business receive daily?',
        options: [
            { text: 'Less than 10', score: 1 },
            { text: '10-50', score: 2 },
            { text: '50-200', score: 3 },
            { text: '200+', score: 4 },
        ],
    },
    {
        question: 'How much time does your team spend on repetitive tasks weekly?',
        options: [
            { text: 'Less than 5 hours', score: 1 },
            { text: '5-15 hours', score: 2 },
            { text: '15-30 hours', score: 3 },
            { text: '30+ hours', score: 4 },
        ],
    },
    {
        question: 'How do you currently handle customer support?',
        options: [
            { text: 'I answer everything myself', score: 3 },
            { text: 'Small team (1-3 people)', score: 2 },
            { text: 'Large support team (4+)', score: 3 },
            { text: 'We already use some chatbots', score: 1 },
        ],
    },
    {
        question: 'What\'s your biggest operational pain point?',
        options: [
            { text: 'Slow response times to leads', score: 3 },
            { text: 'Too much manual data entry', score: 3 },
            { text: 'Inconsistent follow-ups', score: 3 },
            { text: 'Scaling without hiring', score: 4 },
        ],
    },
    {
        question: 'Which tools does your business currently use?',
        options: [
            { text: 'Just WhatsApp and Excel', score: 4 },
            { text: 'Basic CRM (Google Sheets, etc.)', score: 3 },
            { text: 'Advanced CRM (HubSpot, Zoho)', score: 2 },
            { text: 'Full tech stack with integrations', score: 1 },
        ],
    },
    {
        question: 'How many employees does your business have?',
        options: [
            { text: 'Solo / 1-2 people', score: 2 },
            { text: '3-10 people', score: 3 },
            { text: '10-50 people', score: 4 },
            { text: '50+ people', score: 4 },
        ],
    },
    {
        question: 'What\'s your monthly revenue range?',
        options: [
            { text: 'Under ₹1 lakh', score: 1 },
            { text: '₹1-5 lakhs', score: 2 },
            { text: '₹5-25 lakhs', score: 3 },
            { text: '₹25 lakhs+', score: 4 },
        ],
    },
];

interface Result {
    score: number;
    level: string;
    color: string;
    title: string;
    description: string;
    recommendations: string[];
}

function getResult(score: number): Result {
    if (score <= 10) {
        return {
            score,
            level: 'Starter',
            color: 'text-blue-500',
            title: '🌱 Getting Started',
            description: 'Your business is at the early stages. Basic automation can give you a competitive edge right away.',
            recommendations: [
                'Start with a WhatsApp auto-responder',
                'Set up Google Sheets as a basic CRM',
                'Automate email follow-ups',
            ],
        };
    }
    if (score <= 17) {
        return {
            score,
            level: 'Growing',
            color: 'text-orange-500',
            title: '🚀 Ready to Automate',
            description: 'Your business has significant automation potential. You\'re losing time and money on tasks AI can handle.',
            recommendations: [
                'Deploy an AI chatbot for customer support',
                'Automate your lead capture & CRM pipeline',
                'Set up workflow automation for repetitive tasks',
                'Integrate WhatsApp with your business tools',
            ],
        };
    }
    return {
        score,
        level: 'Scale',
        color: 'text-green-500',
        title: '⚡ Maximum Impact',
        description: 'Your business will see massive ROI from AI automation. Every day without automation is costing you significant revenue.',
        recommendations: [
            'Full AI agent deployment (chatbot + workflow + CRM)',
            'Custom AI models trained on your data',
            'Multi-channel automation (WhatsApp, Email, Web)',
            'Predictive analytics and AI-driven decisions',
            'Complete digital transformation roadmap',
        ],
    };
}

export default function AIReadinessQuiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [result, setResult] = useState<Result | null>(null);

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);

        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            const total = newAnswers.reduce((a, b) => a + b, 0);
            setResult(getResult(total));
        }
    };

    const goBack = () => {
        if (currentQ > 0) {
            setCurrentQ(currentQ - 1);
            setAnswers(answers.slice(0, -1));
        }
    };

    const restart = () => {
        setCurrentQ(0);
        setAnswers([]);
        setResult(null);
    };

    const progress = ((currentQ) / questions.length) * 100;

    return (
        <main className="min-h-screen pt-24 md:pt-32 pb-24">
            <section className="container-custom max-w-2xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="section-badge mb-4">
                        <Brain className="h-3 w-3" />
                        Free Assessment
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        AI Readiness{' '}
                        <span className="text-gradient">Quiz</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Find out how much AI automation can help your business. Takes 2 minutes.
                    </p>
                </div>

                {result ? (
                    /* Results */
                    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">{result.title.split(' ')[0]}</div>
                            <h2 className="text-2xl font-bold mb-1">{result.title.slice(2)}</h2>
                            <p className={`text-lg font-bold ${result.color}`}>
                                Score: {result.score}/28 — {result.level} Level
                            </p>
                        </div>

                        <div className="rounded-xl bg-muted/50 p-4 mb-6">
                            <p className="text-muted-foreground leading-relaxed">{result.description}</p>
                        </div>

                        <h3 className="font-bold mb-4">Our Recommendations:</h3>
                        <div className="space-y-2 mb-8">
                            {result.recommendations.map((rec, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm">{rec}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 mb-6">
                            <Link href="/#contact" className="btn-primary w-full text-center">
                                Get Free Automation Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Link>
                            <a
                                href={`https://wa.me/918518824480?text=Hi! I took the AI Readiness Quiz and scored ${result.score}/28 (${result.level} level). I'd like to discuss AI automation for my business.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary w-full text-center"
                            >
                                Discuss on WhatsApp
                            </a>
                            <button onClick={restart} className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                                <RotateCcw className="h-4 w-4" /> Take Quiz Again
                            </button>
                        </div>

                        <SocialShare
                            title={`I scored ${result.score}/28 on the AI Readiness Quiz! How ready is YOUR business for AI automation?`}
                            description="Free AI Readiness Assessment by Atul Automation"
                            url="https://atulautomation.com/tools/ai-readiness-quiz"
                        />
                    </div>
                ) : (
                    /* Quiz */
                    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                <span>Question {currentQ + 1} of {questions.length}</span>
                                <span>{Math.round(progress)}% complete</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <h2 className="text-xl md:text-2xl font-bold mb-6">
                            {questions[currentQ].question}
                        </h2>

                        {/* Options */}
                        <div className="space-y-3 mb-6">
                            {questions[currentQ].options.map((option, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(option.score)}
                                    className="w-full text-left p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium"
                                >
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold mr-3">
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    {option.text}
                                </button>
                            ))}
                        </div>

                        {currentQ > 0 && (
                            <button onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="h-4 w-4" /> Previous
                            </button>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}
