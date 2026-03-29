
import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/sections/services";

const QuizCTA = dynamic(() => import("@/components/sections/quiz-cta").then(mod => mod.QuizCTA));
const AdSlot = dynamic(() => import("@/components/ui/ad-slot").then(mod => mod.AdSlot));
const FeaturedProjects = dynamic(() => import("@/components/sections/featured-projects").then(mod => mod.FeaturedProjects));
const AIModules = dynamic(() => import("@/components/sections/ai-modules").then(mod => mod.AIModules));
const InteractiveDemos = dynamic(() => import("@/components/sections/interactive-demos").then(mod => mod.InteractiveDemos));
const ROICalculator = dynamic(() => import("@/components/tools/roi-calculator").then(mod => mod.ROICalculator));
const Branding = dynamic(() => import("@/components/sections/branding").then(mod => mod.Branding));
const Blog = dynamic(() => import("@/components/sections/blog").then(mod => mod.Blog));
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));
// const Community = dynamic(() => import("@/components/sections/community").then(mod => mod.Community));

export default function Home() {
  return (
    <main className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* 1. Hero - Immediate Value & Impact */}
      <Hero />

      {/* 2. Solutions - What we do (Grouped for clarity) */}
      <div id="solutions" className="py-24 space-y-32">
        <Services />
        <AIModules />
      </div>

      {/* 3. Proof & Authority - Why us? */}
      <div className="bg-muted/30 py-24 border-y border-border/50">
        <div className="container-custom space-y-32">
          <Branding />
          <FeaturedProjects />
        </div>
      </div>

      {/* 4. The Experience - Try AI yourself (Consolidated Tools) */}
      <section id="tools" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="container-custom mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">AI Productivity Suite</h2>
          <p className="text-muted-foreground">Try our interactive tools to measure the impact of AI on your specific business operations.</p>
        </div>
        
        <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
                <ROICalculator />
                <QuizCTA />
            </div>
            
            <div className="mt-16 pt-16 border-t border-border/40">
                 <InteractiveDemos />
            </div>
        </div>
      </section>

      {/* 5. Final Step - Lead Capture */}
      <div className="py-24 bg-card border-t border-border">
          <Contact />
      </div>

      {/* Ad slot at the very bottom for monetization without ruining UX */}
      <div className="container-custom py-12 border-t border-border/50">
        <AdSlot />
      </div>
    </main>
  );
}

