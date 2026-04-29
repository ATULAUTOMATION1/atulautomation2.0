'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-context';
import Link from 'next/link';
import { 
  LayoutDashboard, Brain, Rocket, Sparkles, BookOpen, 
  ArrowRight, Lightbulb, Settings, Compass 
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/dashboard/');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <LayoutDashboard className="h-12 w-12 text-primary animate-bounce" />
          <p className="text-muted-foreground tracking-widest text-sm uppercase">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const track = user.assignedChannel || 'Standard';

  return (
    <main className="min-h-screen px-6 py-24 md:px-12 lg:px-24 relative bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border pb-8 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground">
              Welcome Back, <span className="text-primary">{user.name}</span>
            </h1>
            <p className="text-muted-foreground mt-1 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> 
              Assigned Profile: <strong className="text-foreground">{track} Track</strong>
            </p>
          </div>
          <Link href="/onboarding/" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            <Settings className="h-3.5 w-3.5" /> Retake Onboarding Analysis
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div className="p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border relative overflow-hidden group shadow-xl">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/15 transition-all duration-500" />
              
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Compass className="h-5 w-5 text-primary" /> Curated Channel
              </h2>
              
              {track === 'Enterprise' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Based on your strategic ROI-driven mindset, we recommend deep-diving into custom multi-agent architectures tailored for enterprise scaling.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <Link href="/capabilities/ai-agents/" className="p-4 bg-muted/20 border border-border/50 hover:border-primary rounded-xl transition-all">
                      <h3 className="text-sm font-semibold text-foreground mb-1">AI Agent Deployment</h3>
                      <p className="text-xs text-muted-foreground">Automate custom systems seamlessly.</p>
                    </Link>
                    <Link href="/tools/roi-calculator/" className="p-4 bg-muted/20 border border-border/50 hover:border-primary rounded-xl transition-all">
                      <h3 className="text-sm font-semibold text-foreground mb-1">ROI Analyzer</h3>
                      <p className="text-xs text-muted-foreground">Forecast savings dynamically.</p>
                    </Link>
                  </div>
                </div>
              )}

              {track === 'Creator' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You align best with agile creation tracks. Deploy modern prompt flows and AI marketplace modules to boost output securely.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <Link href="/templates/" className="p-4 bg-muted/20 border border-border/50 hover:border-primary rounded-xl transition-all">
                      <h3 className="text-sm font-semibold text-foreground mb-1">Runbook Marketplace</h3>
                      <p className="text-xs text-muted-foreground">Explore automation templates.</p>
                    </Link>
                    <Link href="/courses/" className="p-4 bg-muted/20 border border-border/50 hover:border-primary rounded-xl transition-all">
                      <h3 className="text-sm font-semibold text-foreground mb-1">AI Builders Course</h3>
                      <p className="text-xs text-muted-foreground">Level up automated scripts.</p>
                    </Link>
                  </div>
                </div>
              )}

              {track === 'Standard' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Discover cutting-edge implementation steps at your own pace via general capability tools.
                  </p>
                  <Link href="/tools/" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:gap-3 transition-all">
                    Launch Free AI Tools Catalog <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" /> Global Access Modules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-card/30 backdrop-blur-sm border border-border/50 hover:border-border rounded-2xl transition-all group">
                  <BookOpen className="h-8 w-8 text-primary/70 mb-4 group-hover:text-primary transition-colors" />
                  <h4 className="text-base font-bold mb-1">Daily AI Blog Insights</h4>
                  <p className="text-xs text-muted-foreground mb-4">Stay connected with practical applications.</p>
                  <Link href="/blog/" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    Read Posts <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="p-6 bg-card/30 backdrop-blur-sm border border-border/50 hover:border-border rounded-2xl transition-all group">
                  <Brain className="h-8 w-8 text-primary/70 mb-4 group-hover:text-primary transition-colors" />
                  <h4 className="text-base font-bold mb-1">Run AI Readiness Quiz</h4>
                  <p className="text-xs text-muted-foreground mb-4">Grade core technology posture.</p>
                  <Link href="/tools/ai-readiness-quiz/" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    Start Assessment <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-1">
            <div className="p-6 rounded-3xl bg-card/80 backdrop-blur-xl border border-border shadow-lg space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{user.name}</h3>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="inline-flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase">
                  <Lightbulb className="h-3.5 w-3.5" /> Strategist Profile
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
