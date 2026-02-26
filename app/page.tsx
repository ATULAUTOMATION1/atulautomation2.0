"use client";

import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/sections/services";
import { QuizCTA } from "@/components/sections/quiz-cta";
import { AdSlot } from "@/components/ui/ad-slot";
import dynamic from "next/dynamic";

// ── Lazy-load all below-fold sections ──
// These components are 150KB+ of JS that users don't need until they scroll down.
// next/dynamic with ssr:false ensures they only load when the chunk is needed.

const FeaturedProjects = dynamic(
  () => import("@/components/sections/featured-projects").then(mod => ({ default: mod.FeaturedProjects })),
  { loading: () => <SectionSkeleton /> }
);

const AIModules = dynamic(
  () => import("@/components/sections/ai-modules").then(mod => ({ default: mod.AIModules })),
  { loading: () => <SectionSkeleton /> }
);

const InteractiveDemos = dynamic(
  () => import("@/components/sections/interactive-demos").then(mod => ({ default: mod.InteractiveDemos })),
  { loading: () => <SectionSkeleton /> }
);

const WorkflowBuilder = dynamic(
  () => import("@/components/modules/workflow-builder").then(mod => ({ default: mod.WorkflowBuilder })),
  { loading: () => <SectionSkeleton /> }
);

const ROICalculator = dynamic(
  () => import("@/components/tools/roi-calculator").then(mod => ({ default: mod.ROICalculator })),
  { loading: () => <SectionSkeleton /> }
);

const DocsHub = dynamic(
  () => import("@/components/sections/docs-hub").then(mod => ({ default: mod.DocsHub })),
  { loading: () => <SectionSkeleton /> }
);

const Branding = dynamic(
  () => import("@/components/sections/branding").then(mod => ({ default: mod.Branding })),
  { loading: () => <SectionSkeleton /> }
);

const Blog = dynamic(
  () => import("@/components/sections/blog").then(mod => ({ default: mod.Blog })),
  { loading: () => <SectionSkeleton /> }
);

const Contact = dynamic(
  () => import("@/components/sections/contact").then(mod => ({ default: mod.Contact })),
  { loading: () => <SectionSkeleton /> }
);

const Community = dynamic(
  () => import("@/components/sections/community").then(mod => ({ default: mod.Community })),
  { loading: () => <SectionSkeleton /> }
);

// ── Lightweight skeleton for loading states ──
function SectionSkeleton() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-8 max-w-7xl">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="h-4 w-32 bg-muted rounded-full" />
          <div className="h-10 w-80 bg-muted rounded-xl" />
          <div className="h-5 w-64 bg-muted/60 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-muted/40 rounded-2xl border border-border" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Hero />
      <Services />
      <QuizCTA />
      <div className="container-custom">
        <AdSlot />
      </div>
      <FeaturedProjects />
      <AIModules />
      <InteractiveDemos />
      <WorkflowBuilder />
      <ROICalculator />
      <DocsHub />
      {/* <Pricing /> */}{/* DISABLED — re-enable when ready */}

      <Branding />
      <div className="container-custom">
        <AdSlot />
      </div>
      <Blog />
      <div className="container-custom">
        <AdSlot />
      </div>
      <Contact />
      <Community />
    </main>
  );
}

