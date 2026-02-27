
import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/sections/services";
import { QuizCTA } from "@/components/sections/quiz-cta";
import { AdSlot } from "@/components/ui/ad-slot";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { AIModules } from "@/components/sections/ai-modules";
import { InteractiveDemos } from "@/components/sections/interactive-demos";
import { WorkflowBuilder } from "@/components/modules/workflow-builder";
import { ROICalculator } from "@/components/tools/roi-calculator";
import { DocsHub } from "@/components/sections/docs-hub";
import { Branding } from "@/components/sections/branding";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Community } from "@/components/sections/community";

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

