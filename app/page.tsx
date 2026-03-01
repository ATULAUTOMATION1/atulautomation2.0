
import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/sections/services";

const QuizCTA = dynamic(() => import("@/components/sections/quiz-cta").then(mod => mod.QuizCTA));
const AdSlot = dynamic(() => import("@/components/ui/ad-slot").then(mod => mod.AdSlot));
const FeaturedProjects = dynamic(() => import("@/components/sections/featured-projects").then(mod => mod.FeaturedProjects));
const AIModules = dynamic(() => import("@/components/sections/ai-modules").then(mod => mod.AIModules));
const InteractiveDemos = dynamic(() => import("@/components/sections/interactive-demos").then(mod => mod.InteractiveDemos));
const WorkflowBuilder = dynamic(() => import("@/components/modules/workflow-builder").then(mod => mod.WorkflowBuilder));
const ROICalculator = dynamic(() => import("@/components/tools/roi-calculator").then(mod => mod.ROICalculator));
const DocsHub = dynamic(() => import("@/components/sections/docs-hub").then(mod => mod.DocsHub));
const Branding = dynamic(() => import("@/components/sections/branding").then(mod => mod.Branding));
const Blog = dynamic(() => import("@/components/sections/blog").then(mod => mod.Blog));
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));
const Community = dynamic(() => import("@/components/sections/community").then(mod => mod.Community));

export default function Home() {
  return (
    <main className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Hero />
      <Services />
      <QuizCTA />
      {/* <div className="container-custom">
        <AdSlot />
      </div> */}
      <FeaturedProjects />
      <AIModules />
      <InteractiveDemos />
      <WorkflowBuilder />
      <ROICalculator />
      <DocsHub />
      {/* <Pricing /> */}{/* DISABLED — re-enable when ready */}

      <Branding />
      {/* <div className="container-custom">
        <AdSlot />
      </div> */}
      <Blog />
      {/* <div className="container-custom">
        <AdSlot />
      </div> */}
      <Contact />
      <Community />
    </main>
  );
}

