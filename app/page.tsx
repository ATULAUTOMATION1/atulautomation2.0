import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/sections/services";
import { AIModules } from "@/components/sections/ai-modules";
import { InteractiveDemos } from "@/components/sections/interactive-demos";
import { WorkflowBuilder } from "@/components/modules/workflow-builder";
import { ROICalculator } from "@/components/tools/roi-calculator";
import { DocsHub } from "@/components/sections/docs-hub";
import { Community } from "@/components/sections/community";
import { Branding } from "@/components/sections/branding";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { FeaturedProjects } from "@/components/sections/featured-projects"; // Import
import { FadeIn } from "@/components/ui/fade-in";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />

      <FadeIn>
        <Services />
      </FadeIn>

      <FadeIn delay={0.1}>
        <FeaturedProjects />
      </FadeIn>

      <FadeIn delay={0.1}>
        <AIModules />
      </FadeIn>

      <FadeIn delay={0.1}>
        <InteractiveDemos />
      </FadeIn>

      <FadeIn delay={0.1}>
        <WorkflowBuilder />
      </FadeIn>

      <FadeIn delay={0.1}>
        <ROICalculator />
      </FadeIn>

      <FadeIn delay={0.1}>
        <DocsHub />
      </FadeIn>

      <FadeIn delay={0.1}>
        <Pricing />
      </FadeIn>

      <FadeIn delay={0.1}>
        <Testimonials />
      </FadeIn>

      <FadeIn delay={0.1}>
        <Branding />
      </FadeIn>

      <FadeIn delay={0.1}>
        <Blog />
      </FadeIn>

      <FadeIn delay={0.1}>
        <Community />
      </FadeIn>
    </main>
  );
}
