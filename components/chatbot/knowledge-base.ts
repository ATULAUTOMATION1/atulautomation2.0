// Atul Automation Knowledge Base — 2026 Edition
// This powers the AI chatbot with comprehensive information

export interface KBEntry {
    keywords: string[];
    intent: string;
    response: string;
    followUp?: string[];
}

export const COMPANY_INFO = {
    name: "Atul Automation",
    tagline: "AI-Powered Automation for Modern Businesses",
    website: "atulautomation.in",
    email: "hello@atulautomation.com",
    founded: "2024",
    location: "India",
    description: "Atul Automation is a leading AI automation agency that helps businesses streamline operations, boost revenue, and scale faster using intelligent AI agents, chatbots, workflow automation, and data-driven marketing strategies.",
};

export const KNOWLEDGE_BASE: KBEntry[] = [
    // ── ABOUT / GENERAL ──
    {
        keywords: ["about you", "about atul", "about us", "what is atul", "tell me about atul", "company", "atul automation", "who are you", "introduce", "your company", "about your company", "what does atul do"],
        intent: "about",
        response: `**Atul Automation** is a cutting-edge AI automation agency founded in 2024. We help businesses automate their operations, marketing, sales, and customer support using AI-powered solutions.\n\n🚀 **Our Mission:** Make AI accessible to every business — from startups to enterprises.\n\n📍 **Based in:** India | 🌐 **Website:** atulautomation.in\n📧 **Email:** hello@atulautomation.com\n\nWe specialize in AI Agents, Chatbots, Workflow Automation, AI Marketing, CRM Solutions, and Real Estate Automation.`,
        followUp: ["What services do you offer?", "How can you help my business?", "Tell me about AI automation"],
    },

    // ── SERVICES OVERVIEW ──
    {
        keywords: ["services", "what do you offer", "what you do", "capabilities", "offerings", "solutions", "help my business"],
        intent: "services",
        response: `We offer **6 core services** designed to transform your business:\n\n🤖 **AI Automation** — Self-learning agents that handle tasks 24/7\n💬 **Intelligent Chatbots** — WhatsApp, website & social media bots\n⚡ **Workflow Automation** — Connect apps into seamless pipelines\n📊 **AI Marketing** — Data-driven campaigns on Meta & Google\n🏠 **Real Estate Services** — AI lead capture & virtual tours\n🗂️ **CRM Solutions** — Centralize data & automate follow-ups\n\nEach solution is custom-built for your business needs. Which one interests you?`,
        followUp: ["Tell me about AI Automation", "Tell me about chatbots", "What about marketing?", "Pricing?"],
    },

    // ── AI AUTOMATION ──
    {
        keywords: ["ai automation", "ai agents", "artificial intelligence", "automate", "intelligent agent", "ai-powered", "machine learning"],
        intent: "ai-automation",
        response: `**AI Automation** is our flagship service! Here's what we offer:\n\n🧠 **Self-Learning AI Agents** that adapt to your business processes\n📋 **Task Automation** — Data entry, email sorting, report generation\n🔄 **Process Optimization** — Identify bottlenecks and auto-fix them\n📊 **Predictive Analytics** — Forecast trends, demand & revenue\n🔗 **Integration** — Connect with 1000+ apps via APIs\n\n**How It Works:**\n1️⃣ We analyze your current workflows\n2️⃣ Identify repetitive, time-consuming tasks\n3️⃣ Deploy AI agents to handle them automatically\n4️⃣ Monitor, learn, and improve continuously\n\n⏱️ **Average time saved:** 10-20 hours/week\n💰 **ROI:** Most clients see 3-5x returns within 90 days`,
        followUp: ["How much does it cost?", "Can you show me examples?", "How long does setup take?"],
    },

    // ── CHATBOTS ──
    {
        keywords: ["chatbot", "chat bot", "whatsapp bot", "website bot", "conversational", "bot", "messaging", "live chat", "customer support bot"],
        intent: "chatbots",
        response: `**Intelligent Chatbots** — Your 24/7 Digital Employee!\n\n💬 **WhatsApp Business Bots** — Handle inquiries, bookings & sales on WhatsApp\n🌐 **Website Chat Widgets** — Engage visitors the moment they land on your site\n📱 **Social Media Bots** — Auto-reply on Instagram, Facebook & Telegram\n🛒 **E-Commerce Bots** — Product recommendations, order tracking & support\n\n**Key Features:**\n• Natural language processing (understands Hindi, English & more)\n• Multi-language support\n• Smart escalation to human agents\n• Lead capture & CRM integration\n• Payment collection via chat\n• Appointment scheduling\n\n**Results we deliver:**\n• ⚡ < 3 second response time (vs. 2+ hours manual)\n• 📈 40% more leads captured\n• 💰 30% reduction in support costs\n• 🕐 24/7/365 availability`,
        followUp: ["WhatsApp bot details", "How much does a chatbot cost?", "Can it handle payments?"],
    },

    // ── WORKFLOW AUTOMATION ──
    {
        keywords: ["workflow", "automation workflow", "zapier", "make.com", "n8n", "pipeline", "integrate", "connect apps", "no-code", "app integration"],
        intent: "workflow",
        response: `**Workflow Automation** — Connect Everything, Automate Everything!\n\n⚡ **What We Automate:**\n• Lead capture → CRM → Email sequence → Follow-up\n• Order received → Invoice generated → Inventory updated → Shipping triggered\n• Social media post → Auto-schedule → Analytics → Report\n• Customer inquiry → Ticket created → Assigned → Resolved → Feedback\n\n**Tools We Work With:**\n🔧 Zapier, Make (Integromat), n8n, Power Automate\n📊 Google Sheets, Airtable, Notion\n💬 WhatsApp, Slack, Discord, Telegram\n📧 Gmail, Outlook, Mailchimp, SendGrid\n🛒 Shopify, WooCommerce, Stripe, Razorpay\n\n**Benefits:**\n• Zero manual data entry\n• 10-30 hours saved per week\n• Zero human errors\n• Scales without hiring\n\nWe can connect 1000+ apps into a single seamless pipeline!`,
        followUp: ["Can you automate my specific workflow?", "What tools do you use?", "Show me examples"],
    },

    // ── AI MARKETING ──
    {
        keywords: ["marketing", "ai marketing", "digital marketing", "meta ads", "google ads", "facebook ads", "instagram ads", "social media marketing", "seo", "advertising", "campaign", "ppc", "paid ads"],
        intent: "marketing",
        response: `**AI-Powered Marketing** — Maximum ROI, Minimum Effort!\n\n📊 **What We Offer:**\n\n🎯 **Meta Ads (Facebook + Instagram)**\n• AI-optimized audience targeting\n• Dynamic creative testing (100s of ad variations)\n• Automated budget allocation based on performance\n• Retargeting funnels for warm audiences\n\n🔍 **Google Ads (Search + Display + YouTube)**\n• Smart bidding with AI predictions\n• Keyword research & negative keyword optimization\n• Landing page optimization for Quality Score\n• Performance Max campaigns\n\n📱 **Social Media Marketing**\n• AI-generated content calendars\n• Automated posting & scheduling\n• Engagement analytics & sentiment analysis\n• Influencer outreach automation\n\n📈 **SEO & Content Marketing**\n• AI-driven keyword research\n• Automated blog writing & publishing\n• Technical SEO audits\n• Backlink monitoring\n\n**Results:**\n• 🎯 45% lower cost per lead\n• 📈 3-5x ROAS (Return on Ad Spend)\n• ⚡ 70% faster campaign launches`,
        followUp: ["How much do you charge for marketing?", "Can you manage my Meta Ads?", "Tell me about SEO"],
    },

    // ── REAL ESTATE ──
    {
        keywords: ["real estate", "property", "listing", "virtual tour", "lead capture real estate", "property sales", "broker", "builder", "housing"],
        intent: "real-estate",
        response: `**Real Estate Automation** — Sell Properties 3x Faster!\n\n🏠 **Solutions for Real Estate:**\n\n🔍 **AI Lead Capture**\n• Auto-capture leads from Facebook/Instagram property ads\n• Instant WhatsApp engagement within 30 seconds\n• AI qualifies leads by budget, location & timeline\n\n🏗️ **360° Virtual Tours**\n• Interactive property walkthroughs\n• AI-generated property descriptions\n• Automated tour scheduling with agents\n\n📊 **Market Analytics**\n• AI-powered price prediction\n• Competitor analysis\n• Demand forecasting by location\n\n🤖 **Automated Follow-ups**\n• Drip campaigns with new listings\n• Price drop alerts\n• Document collection automation\n• CRM & MLS integration\n\n**Results from our clients:**\n• 🏠 3x faster property sales\n• 📈 40% more qualified leads\n• ⏱️ 70% less time on manual follow-ups\n• 💰 4.5x ROI on ad spend`,
        followUp: ["How does the lead qualifier work?", "What about pricing?", "Can you handle my Facebook Ads?"],
    },

    // ── CRM ──
    {
        keywords: ["crm", "customer relationship", "hubspot", "salesforce", "lead management", "customer data", "follow up", "retention", "pipeline"],
        intent: "crm",
        response: `**CRM Solutions** — Never Lose a Lead Again!\n\n🗂️ **CRM Integration & Automation:**\n\n📊 **Centralized Dashboard**\n• All leads, deals & contacts in one place\n• Multi-channel data sync (WhatsApp, Email, Social, Website)\n• Real-time pipeline visualization\n\n🤖 **AI-Powered Features:**\n• Automatic lead scoring (Hot/Warm/Cold)\n• Smart follow-up reminders\n• Deal probability predictions\n• Customer churn predictions\n\n⚡ **Automations We Build:**\n• New lead → Auto-assign to sales rep\n• No response in 24h → Auto follow-up email\n• Deal won → Invoice + Onboarding triggered\n• Customer inactive → Re-engagement campaign\n\n**CRM Platforms We Work With:**\n• HubSpot, Salesforce, Zoho CRM\n• Google Sheets (lightweight CRM)\n• Custom CRM dashboards\n• Freshsales, Pipedrive\n\n**Impact:**\n• 📈 45% faster lead response\n• 🎯 Zero missed follow-ups\n• 💰 30% higher customer retention`,
        followUp: ["Which CRM do you recommend?", "Can you set up HubSpot?", "How much does it cost?"],
    },

    // ── LEAD NURTURING ──
    {
        keywords: ["lead nurturing", "nurture", "email sequence", "drip campaign", "email marketing", "lead funnel", "sales funnel", "conversion funnel"],
        intent: "lead-nurturing",
        response: `**Lead Nurturing & Sales Funnels** — Convert More, Lose Less!\n\n🔄 **Our Lead Nurturing Process:**\n\n1️⃣ **Capture** — Multi-channel lead capture (Ads, Website, WhatsApp, Social)\n2️⃣ **Qualify** — AI scores each lead based on engagement & intent\n3️⃣ **Nurture** — Automated email/WhatsApp sequences with personalized content\n4️⃣ **Convert** — Hot leads get instant call-back or meeting scheduling\n5️⃣ **Retain** — Post-sale nurturing for upselling & referrals\n\n📧 **Email Sequences We Build:**\n• Welcome series (5-7 emails)\n• Product education drips\n• Abandoned cart recovery\n• Re-engagement campaigns\n• Post-purchase follow-ups\n\n💬 **WhatsApp Nurturing:**\n• Scheduled check-ins\n• New offer broadcasts\n• Personalized recommendations\n• Review & testimonial requests\n\n**Results:**\n• 📈 67% higher conversion rates\n• ⏱️ 80% less manual follow-up work\n• 💰 3x customer lifetime value`,
        followUp: ["Set up a funnel for me", "Tell me about email automation", "What tools do you use?"],
    },

    // ── SALES AUTOMATION ──
    {
        keywords: ["sales", "sales automation", "close deals", "revenue", "growth", "scale", "sales team", "outreach", "cold email"],
        intent: "sales",
        response: `**Sales Automation** — Close More Deals on Autopilot!\n\n💰 **What We Automate in Your Sales Process:**\n\n🎯 **Outbound Sales:**\n• AI-powered cold email sequences\n• LinkedIn outreach automation\n• Prospect research & enrichment\n• Auto-scheduling of demos\n\n📊 **Sales Pipeline:**\n• Automated deal stage tracking\n• AI lead scoring & prioritization\n• Revenue forecasting\n• Win/loss analysis & insights\n\n🤖 **AI Sales Assistant:**\n• Auto-generates proposals & quotes\n• Follow-up reminders & escalations\n• Meeting prep sheets with lead insights\n• Competitive intelligence gathering\n\n📈 **Performance Tracking:**\n• Real-time sales dashboards\n• Individual & team performance metrics\n• Conversion rate analytics\n• ROI tracking per channel\n\n**Impact on Sales Teams:**\n• 💰 2-3x more deals closed\n• ⏱️ 60% less time on admin tasks\n• 📊 100% pipeline visibility\n• 🎯 40% higher win rates`,
        followUp: ["Help me automate my sales", "What CRM do you recommend?", "How fast can you set this up?"],
    },

    // ── PRICING ──
    {
        keywords: ["price", "pricing", "cost", "how much", "charge", "budget", "package", "plan", "quote", "estimate", "affordable", "expensive", "cheap"],
        intent: "pricing",
        response: `**Pricing & Packages** 💰\n\nOur pricing depends on the complexity and scope of your project. Here's a general guide:\n\n🟢 **Starter Projects** — ₹15,000 - ₹50,000\n• Simple chatbots, basic workflow automations\n• Single-channel integrations\n• 1-2 week delivery\n\n🔵 **Growth Projects** — ₹50,000 - ₹2,00,000\n• Multi-channel chatbots with AI\n• Full CRM + marketing automation setup\n• Custom dashboards & analytics\n• 3-6 week delivery\n\n🟣 **Enterprise Projects** — ₹2,00,000+\n• Full-stack AI automation\n• Custom AI agents & integrations\n• Dedicated support & maintenance\n• 6-12 week delivery\n\n💡 **We also offer:**\n• Monthly retainers for ongoing management\n• Performance-based pricing for marketing\n• Free consultation calls\n\n📞 **Get a custom quote:** Contact us at hello@atulautomation.com or fill out the contact form on our website!`,
        followUp: ["Book a consultation", "Contact you", "Tell me more about enterprise"],
    },

    // ── CONTACT ──
    {
        keywords: ["contact", "reach", "call", "email", "phone", "get in touch", "book", "consultation", "meeting", "talk", "connect", "hire"],
        intent: "contact",
        response: `**Get in Touch with Us!** 📞\n\n📧 **Email:** hello@atulautomation.com\n🌐 **Website:** atulautomation.in\n\n**How to Reach Us:**\n1️⃣ Fill out the **Contact Form** on our website (scroll to the contact section)\n2️⃣ Email us directly at hello@atulautomation.com\n3️⃣ Send us a message on WhatsApp\n\n🕐 **Response Time:** We typically respond within 2-4 hours during business hours.\n\n📋 **What to Include:**\n• Your business / industry\n• What you want to automate\n• Your approximate budget\n• Timeline expectations\n\nWe offer a **free 30-minute consultation** to understand your needs and propose the best solution!`,
        followUp: ["What services do you offer?", "Tell me about pricing", "Where are you located?"],
    },

    // ── PROCESS / HOW IT WORKS ──
    {
        keywords: ["how it works", "process", "how do you work", "steps", "onboarding", "timeline", "delivery", "how long", "start", "get started"],
        intent: "process",
        response: `**Our Process — From Idea to Automation** 🚀\n\n**Step 1: Discovery Call (Free)**\n📞 30-minute call to understand your business, goals, and pain points\n\n**Step 2: Strategy & Proposal**\n📋 We create a detailed automation roadmap with timeline, tools, and pricing\n\n**Step 3: Development & Build**\n🔧 Our team builds your custom automation solution with regular check-ins\n\n**Step 4: Testing & QA**\n✅ Thorough testing across all channels and edge cases\n\n**Step 5: Launch & Training**\n🚀 Go live! We train your team on how to use and manage the system\n\n**Step 6: Ongoing Support**\n🛠️ Monthly maintenance, optimization, and performance reports\n\n⏱️ **Typical Timelines:**\n• Simple automations: 1-2 weeks\n• Chatbots & integrations: 2-4 weeks\n• Full-stack AI solutions: 4-8 weeks\n\nReady to start? Contact us for a free discovery call!`,
        followUp: ["Book a discovery call", "How much does it cost?", "Tell me about your team"],
    },

    // ── TOOLS & TECH STACK ──
    {
        keywords: ["tools", "technology", "tech stack", "platforms", "software", "what tools", "api", "integration"],
        intent: "tools",
        response: `**Our Tech Stack & Tools** 🔧\n\n🤖 **AI & LLMs:**\n• OpenAI GPT-4o, Claude (Anthropic), Google Gemini\n• Custom fine-tuned models for specific use cases\n\n⚡ **Automation Platforms:**\n• Zapier, Make (Integromat), n8n\n• Microsoft Power Automate\n• Custom Node.js/Python scripts\n\n💬 **Messaging & Chat:**\n• WhatsApp Business API (Meta Cloud API)\n• Telegram Bot API, Discord bots\n• Intercom, Drift, Tidio\n\n📊 **CRM & Data:**\n• HubSpot, Salesforce, Zoho\n• Google Sheets, Airtable, Notion\n• MongoDB, Supabase, Firebase\n\n📱 **Marketing:**\n• Meta Ads Manager, Google Ads\n• Buffer, Hootsuite, Later\n• Mailchimp, SendGrid, Brevo\n\n🌐 **Web & Development:**\n• Next.js, React, Node.js\n• WordPress, Shopify, Webflow\n• Vercel, AWS, Google Cloud\n\nWe can integrate with virtually any platform via APIs!`,
        followUp: ["Can you work with my existing tools?", "Do you use no-code?", "What about custom development?"],
    },

    // ── INDUSTRIES ──
    {
        keywords: ["industry", "industries", "who do you work with", "clients", "sectors", "niche", "business type", "e-commerce", "healthcare", "education"],
        intent: "industries",
        response: `**Industries We Serve** 🏢\n\nWe work across multiple industries:\n\n🛒 **E-Commerce & Retail** — Cart recovery, product bots, inventory automation\n🏠 **Real Estate** — Lead qualification, virtual tours, property matching\n🏥 **Healthcare** — Appointment scheduling, patient engagement, follow-ups\n📚 **Education** — Course automation, student engagement, enrollment bots\n💼 **B2B / SaaS** — CRM automation, sales pipelines, onboarding flows\n🏦 **Finance & Insurance** — Lead gen, claim processing, customer support\n🍽️ **Hospitality** — Booking automation, review management, guest engagement\n📱 **Agencies** — White-label solutions, client management, reporting\n\nNo matter your industry, if it involves repetitive tasks — we can automate it!\n\n**50+ businesses** across India and globally trust Atul Automation.`,
        followUp: ["Show me case studies", "Can you help my specific industry?", "What services fit my business?"],
    },

    // ── WHY CHOOSE US ──
    {
        keywords: ["why choose", "why atul", "different", "unique", "better", "advantage", "compete", "vs", "comparison"],
        intent: "why-us",
        response: `**Why Choose Atul Automation?** 🏆\n\n🎯 **1. End-to-End Solutions**\nWe don't just build bots — we design entire automation ecosystems from strategy to deployment.\n\n🧠 **2. AI-First Approach**\nEvery solution is powered by the latest AI models (GPT-4o, Claude, Gemini) for maximum intelligence.\n\n⚡ **3. Fast Delivery**\nMost projects go live in 2-4 weeks, not months.\n\n📊 **4. Data-Driven**\nWe track every metric and optimize continuously for maximum ROI.\n\n🤝 **5. Dedicated Support**\nYou get a dedicated automation specialist, not a ticket queue.\n\n💰 **6. Transparent Pricing**\nNo hidden fees. Fixed-price projects or monthly retainers — your choice.\n\n🔧 **7. Custom, Not Template**\nEvery solution is built from scratch for YOUR business, not copy-pasted.\n\n🌐 **8. Multi-Channel**\nWe automate across WhatsApp, Email, Social Media, CRM, and more — all connected.`,
        followUp: ["Show me case studies", "What's your pricing?", "Book a consultation"],
    },

    // ── GREETINGS ──
    {
        keywords: ["hello", "hey there", "good morning", "good evening", "good afternoon", "namaste", "hola", "greetings", "howdy"],
        intent: "greeting",
        response: `Hey there! 👋 Welcome to **Atul Automation**!\n\nI'm your AI assistant and I can help you learn about:\n\n🤖 Our AI automation services\n💬 Chatbot solutions\n📊 AI marketing strategies\n💰 Pricing & packages\n📞 How to get in touch\n\nWhat would you like to know? Ask me anything!`,
        followUp: ["What services do you offer?", "How can you help my business?", "Tell me about pricing"],
    },

    // ── THANKS ──
    {
        keywords: ["thanks", "thank you", "thx", "appreciate", "great", "awesome", "helpful", "perfect", "nice"],
        intent: "thanks",
        response: `You're very welcome! 😊 Happy I could help!\n\nIf you have any more questions, feel free to ask. I'm here 24/7!\n\n💡 **Quick tip:** You can also:\n• 📞 Email us at hello@atulautomation.com\n• 📝 Fill out the contact form on this page\n• 🗓️ Book a free 30-minute consultation\n\nLet's automate your success! 🚀`,
        followUp: ["Contact you", "Book a consultation", "Tell me more about services"],
    },

    // ── FALLBACK / UNKNOWN ──
    {
        keywords: [],
        intent: "fallback",
        response: `I appreciate your question! While I might not have the exact answer right now, I'd love to help.\n\nHere are some things I can definitely help with:\n\n🤖 AI Automation & Agents\n💬 Chatbot Development\n📊 AI Marketing & Ads\n⚡ Workflow Automation\n🏠 Real Estate Automation\n🗂️ CRM Solutions\n💰 Pricing & Packages\n📞 Contact Information\n\nOr, for detailed queries, you can reach us directly at **hello@atulautomation.com** — we respond within 2-4 hours!\n\nWhat topic would you like to explore?`,
        followUp: ["What services do you offer?", "Tell me about pricing", "How to contact you?"],
    },
];

/**
 * Smart intent matching engine with word-boundary detection.
 * Uses multiple strategies to find the best matching response:
 * 1. Exact phrase matching (highest weight)
 * 2. Word-boundary matching (prevents "hi" matching "this")
 * 3. Weighted scoring (longer/rarer keywords score higher)
 */
export function findBestResponse(userMessage: string): KBEntry {
    const msg = userMessage.toLowerCase().trim();
    // Tokenize into individual words (strip punctuation)
    const msgWords = msg.replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);

    // ── QUICK MATCH: Handle very short/exact messages ──
    const shortGreetings = ["hi", "hey", "sup", "yo", "hii", "hiii", "helo", "heyy", "hello", "namaste"];
    const shortThanks = ["ok", "okay", "thanks", "thx", "ty", "cool", "nice", "great", "awesome", "perfect"];

    if (msgWords.length <= 2) {
        const firstWord = msgWords[0] || "";
        if (shortGreetings.includes(firstWord)) {
            return KNOWLEDGE_BASE.find(e => e.intent === "greeting")!;
        }
        if (shortThanks.includes(firstWord)) {
            return KNOWLEDGE_BASE.find(e => e.intent === "thanks")!;
        }
    }

    let bestMatch: KBEntry | null = null;
    let bestScore = 0;

    for (const entry of KNOWLEDGE_BASE) {
        if (entry.intent === "fallback") continue;

        let score = 0;

        for (const keyword of entry.keywords) {
            const kw = keyword.toLowerCase();
            const isPhrase = kw.includes(" "); // Multi-word keyword

            if (isPhrase) {
                // PHRASE MATCH: Check if the exact phrase exists in the message
                if (msg.includes(kw)) {
                    // Phrases get high weight — they're very specific
                    score += kw.length * 3;
                }
            } else {
                // SINGLE WORD MATCH: Must match as a whole word (word boundary)
                // This prevents "hi" from matching "this", "yo" from matching "you"
                const wordBoundaryRegex = new RegExp(`\\b${escapeRegex(kw)}\\b`, "i");
                if (wordBoundaryRegex.test(msg)) {
                    // Single words get normal weight
                    // Longer single words are more valuable (more specific)
                    score += kw.length * 2;
                }
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }

    // Require a minimum confidence score to avoid weak matches
    if (!bestMatch || bestScore < 4) {
        return KNOWLEDGE_BASE[KNOWLEDGE_BASE.length - 1]; // fallback
    }

    return bestMatch;
}

/** Escape special regex characters in a string */
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
