export type TemplateCategory = 'Real Estate' | 'Healthcare' | 'E-Commerce' | 'Agency' | 'Automotive' | 'General Business';
export type ComplexityLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Template {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: TemplateCategory;
    complexity: ComplexityLevel;
    estimatedSavings: string;
    integrations: string[];
    icon: string; // Lucide icon name stored as string
}

export const ATUL_TEMPLATES: Template[] = [
    {
        id: "tpl-001",
        slug: "reputation-management-auto-responder",
        title: "Intelligent Reputation Manager",
        description: "Automatically intercepts Google/Yelp reviews. Uses OpenClaw AI to thank 5-star reviews and instantly escalating 1-star complaints to a manager via SMS before they spiral.",
        category: "General Business",
        complexity: "Beginner",
        estimatedSavings: "5 hrs/wk",
        integrations: ["Google My Business", "Yelp", "Twilio", "Slack"],
        icon: "Star"
    },
    {
        id: "tpl-002",
        slug: "real-estate-lead-nurture",
        title: "Real Estate Buyer Pre-Qualification Flow",
        description: "An AI SMS & WhatsApp agent that instantly texts inbound Zillow/Facebook leads, asks budget & timeline questions, and automatically books qualified buyers into the agent's calendar.",
        category: "Real Estate",
        complexity: "Intermediate",
        estimatedSavings: "18 hrs/wk",
        integrations: ["WhatsApp", "GoHighLevel", "Calendly", "Zapier"],
        icon: "Home"
    },
    {
        id: "tpl-003",
        slug: "ecommerce-cart-recovery-gpt",
        title: "GPT-Powered Cart Abandonment Hero",
        description: "Unlike static emails, this flow texts cart abandoners with a customized discount based on the exact item they left behind, handled entirely by a conversational AI agent.",
        category: "E-Commerce",
        complexity: "Intermediate",
        estimatedSavings: "+12% Revenue",
        integrations: ["Shopify", "Klaviyo", "OpenAI", "Twilio"],
        icon: "ShoppingCart"
    },
    {
        id: "tpl-004",
        slug: "dental-patient-reactivation",
        title: "Dental Patient Reactivation Runbook",
        description: "Mining your EHR database for patients who haven't visited in 12+ months and launching a smart voice AI calling campaign to book checkups.",
        category: "Healthcare",
        complexity: "Advanced",
        estimatedSavings: "$5k+/mo New Revenue",
        integrations: ["EHR System", "Vapi Voice AI", "Stripe", "Make.com"],
        icon: "HeartPulse"
    },
    {
        id: "tpl-005",
        slug: "agency-unified-inbox-routing",
        title: "Agency Unified Inbox Router",
        description: "Consolidate DMs from Instagram, Facebook, and Email into a single Slack channel. Our LLM drafts the perfect reply and waits for human approval before sending.",
        category: "Agency",
        complexity: "Intermediate",
        estimatedSavings: "10 hrs/wk",
        integrations: ["Instagram", "Facebook Messenger", "Slack", "OpenAI"],
        icon: "Inbox"
    },
    {
        id: "tpl-006",
        slug: "auto-shop-service-reminder",
        title: "Auto-Shop Smart Service Reminder",
        description: "Predictive AI calculates the exact week a customer's car needs an oil change based on past mileage trends and sends a personalized 1-click booking link via SMS.",
        category: "Automotive",
        complexity: "Advanced",
        estimatedSavings: "$2k+/mo Retained Rev",
        integrations: ["CRM", "Twilio", "Calendly"],
        icon: "Wrench"
    }
];
