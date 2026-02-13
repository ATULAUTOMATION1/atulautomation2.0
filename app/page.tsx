import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/sections/services";
import { AIModules } from "@/components/sections/ai-modules";
import { InteractiveDemos } from "@/components/sections/interactive-demos";
import { WorkflowBuilder } from "@/components/modules/workflow-builder";
import { ROICalculator } from "@/components/tools/roi-calculator";
import { DocsHub } from "@/components/sections/docs-hub";
import { Community } from "@/components/sections/community";
import { Branding } from "@/components/sections/branding";
// import { Pricing } from "@/components/sections/pricing"; // DISABLED — re-enable when ready

import { Blog } from "@/components/sections/blog";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Hero />
      <Services />
      <FeaturedProjects />
      <AIModules />
      <InteractiveDemos />
      <WorkflowBuilder />
      <ROICalculator />
      <DocsHub />
      {/* <Pricing /> */}{/* DISABLED — re-enable when ready */}

      <Branding />
      <Blog />
      <Contact />
      <Community />
    </main>
  );
}
