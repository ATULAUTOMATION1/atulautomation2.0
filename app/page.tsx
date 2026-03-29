import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/sections/services";
import { TrustedBy } from "@/components/sections/trusted-by";

// Dynamic imports for performance on heavy/interactive components
const ROICalculator = dynamic(() => import("@/components/tools/roi-calculator").then(mod => mod.ROICalculator));
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export default function Home() {
  return (
    <main className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* 1. The Hook */}
      <Hero />

      {/* 2. Immediate Social Proof */}
      <TrustedBy />

      {/* 3. The Solution (What we actually do) */}
      <Services />

      {/* 4. Interactive Proof (Show, don't just tell) */}
      <div className="bg-muted/20 border-y border-border/50">
          <ROICalculator />
      </div>

      {/* 5. The Close (Lead Generation) */}
      <div className="py-24 bg-card">
          <Contact />
      </div>
    </main>
  );
}

