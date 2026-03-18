export interface CourseModule {
    title: string;
    lessons: string[];
}

export interface CourseDetail {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    type: string;
    category: 'courses' | 'guides' | 'videos' | 'prompts';
    duration: string;
    rating: number;
    difficulty: 1 | 2 | 3 | 4 | 5;
    featured?: boolean;
    topics: string[];
    prerequisites: string[];
    whatYouWillLearn: string[];
    modules: CourseModule[];
    whoIsThisFor: string[];
    faqs: { question: string; answer: string }[];
    lastUpdated: string;
}

export const ALL_COURSES: CourseDetail[] = [
    // ──────────── COURSES ────────────
    {
        slug: 'ai-automation-fundamentals',
        title: 'AI Automation Fundamentals',
        description: 'Learn the basics of building intelligent workflows from scratch. Covers chatbot design, workflow logic, and connecting APIs without code.',
        longDescription: 'This beginner-friendly course is your gateway to the world of AI automation. You will learn how to design intelligent workflows that eliminate repetitive tasks, build conversational chatbots that serve customers 24/7, and connect different apps together using no-code platforms like Zapier and Make.com. By the end, you will have built 3 real-world automations that you can deploy immediately in any business.',
        type: 'Beginner',
        category: 'courses',
        duration: '2H 15M',
        rating: 4.8,
        difficulty: 1,
        featured: true,
        topics: ['No-Code', 'Zapier', 'Chatbot Basics'],
        prerequisites: ['Basic computer literacy', 'A free Zapier account', 'Curiosity about AI and automation'],
        whatYouWillLearn: [
            'Understand the core concepts of AI, machine learning, and automation and how they apply to real business problems',
            'Build automated workflows using Zapier, Make.com, and n8n without writing a single line of code',
            'Design and deploy a customer support chatbot that handles FAQs, collects leads, and routes to human agents',
            'Connect popular apps like Google Sheets, Slack, Gmail, Notion, and Airtable into seamless data pipelines',
            'Master prompt engineering basics to get the best responses from GPT-4, Claude, and Gemini for your workflows',
            'Implement conditional logic, multi-step triggers, and error-handling patterns in your automations',
            'Calculate the ROI of automation for any business process using our proprietary framework',
        ],
        modules: [
            {
                title: 'Module 1: What is AI Automation?',
                lessons: [
                    'The Automation Revolution — Why now, and why it matters for every business',
                    'AI vs Traditional Automation — Understanding the difference between rule-based and intelligent systems',
                    'The No-Code Movement — How platforms like Zapier and Make are democratizing technology',
                    'Identifying Automation Opportunities — A framework for finding the 80/20 of repetitive tasks',
                ],
            },
            {
                title: 'Module 2: Your First Automation with Zapier',
                lessons: [
                    'Setting up your Zapier account and understanding Triggers, Actions, and Zaps',
                    'Building your first Zap: Auto-saving email attachments to Google Drive',
                    'Multi-step Zaps: Creating a lead-to-CRM-to-notification pipeline',
                    'Using Formatter, Paths, and Filters for advanced workflow logic',
                    'Connecting AI: Adding a GPT step to summarize or categorize incoming data',
                ],
            },
            {
                title: 'Module 3: Building Your First Chatbot',
                lessons: [
                    'Choosing a chatbot platform — Tidio, Intercom, Botpress, and ChatGPT-powered widgets compared',
                    'Designing conversation flows with decision trees and fallback responses',
                    'Adding personality: Making your bot sound human with prompt engineering',
                    'Lead capture: Qualifying visitors and pushing data to your CRM automatically',
                    'Deploying on your website, WhatsApp, and Facebook Messenger',
                ],
            },
            {
                title: 'Module 4: Real-World Automation Projects',
                lessons: [
                    'Project 1: Automated client onboarding — from form submission to welcome email to task creation',
                    'Project 2: Social media scheduling bot — auto-generate and post content across platforms',
                    'Project 3: Invoice processing — extract data from PDFs using AI and push to accounting software',
                    'Troubleshooting and debugging your automations',
                    'Calculating ROI and presenting results to stakeholders',
                ],
            },
        ],
        whoIsThisFor: [
            'Entrepreneurs and small business owners who want to save 10+ hours per week on repetitive tasks',
            'Marketing and operations professionals looking to streamline workflows without IT support',
            'Freelancers who want to offer automation as a service to clients',
            'Students and career-changers exploring the booming AI automation industry',
        ],
        faqs: [
            { question: 'Do I need coding experience?', answer: 'Absolutely not. This course is 100% no-code. Every tool we use has a visual, drag-and-drop interface. If you can use a smartphone, you can build automations.' },
            { question: 'What tools will I need?', answer: 'You will need free accounts on Zapier, Make.com, and a chatbot platform (we recommend Tidio\'s free plan). All tools used in this course have free tiers that are more than sufficient.' },
            { question: 'How long do I have access?', answer: 'This is a free, self-paced guide. You can access it anytime, from any device. We update the content monthly to reflect the latest platform changes.' },
            { question: 'Will this help me get a job?', answer: 'Yes! AI automation specialists are in high demand. This course gives you portfolio-ready projects and the foundational skills that employers and clients are actively seeking.' },
        ],
        lastUpdated: '2026-03-15',
    },
    {
        slug: 'whatsapp-bot-masterclass',
        title: 'WhatsApp Bot Masterclass',
        description: 'Build & deploy a customer support bot on WhatsApp with 24/7 automation. Integrate with CRM, handle payments, and qualify leads automatically.',
        longDescription: 'WhatsApp has over 2 billion active users globally — and your customers are already on it. This intermediate-level masterclass teaches you how to build a production-ready WhatsApp bot that handles customer support inquiries, qualifies leads using the BANT framework, processes payments, and syncs everything with your CRM. You will use the official WhatsApp Business API through platforms like WATI and Twilio to build enterprise-grade solutions.',
        type: 'Intermediate',
        category: 'courses',
        duration: '4H 30M',
        rating: 4.9,
        difficulty: 3,
        topics: ['WhatsApp API', 'WATI', 'Lead Qualification'],
        prerequisites: ['Basic understanding of chatbot concepts (Module 3 of AI Fundamentals)', 'A WATI or Twilio account (free trial available)', 'A WhatsApp Business account'],
        whatYouWillLearn: [
            'Set up and configure the WhatsApp Business API using WATI, Twilio, or official Cloud API',
            'Build a no-code chatbot with automated conversation flows for customer support, FAQs, and order tracking',
            'Implement the BANT (Budget, Authority, Need, Timeline) lead qualification framework inside your bot',
            'Integrate WhatsApp conversations with CRM platforms like HubSpot, Zoho CRM, and GoHighLevel',
            'Handle payments natively within WhatsApp using Razorpay and Stripe integrations',
            'Set up broadcast campaigns and drip sequences for re-engagement and upselling',
            'Monitor analytics — response times, resolution rates, lead quality scores, and conversion metrics',
        ],
        modules: [
            {
                title: 'Module 1: WhatsApp Business API Essentials',
                lessons: [
                    'WhatsApp Business App vs Business API — understanding the difference and choosing the right one',
                    'Setting up your Business Profile for maximum trust and discoverability',
                    'Getting API access — step-by-step walkthrough with WATI, Twilio, and Meta Cloud API',
                    'Understanding message types: Session messages, Template messages, and Interactive messages',
                    'Compliance and policies — what WhatsApp allows and what gets you banned',
                ],
            },
            {
                title: 'Module 2: Building Your Support Bot',
                lessons: [
                    'Designing conversation flows for common support scenarios (returns, tracking, complaints)',
                    'Building interactive menus with Quick Reply buttons and List messages',
                    'Creating a knowledge base and FAQ handler using AI-powered responses',
                    'Smart routing: Escalating complex queries to human agents with full conversation context',
                    'Multi-language support: Serving customers in Hindi, English, Spanish, and Arabic',
                ],
            },
            {
                title: 'Module 3: Lead Qualification & CRM Integration',
                lessons: [
                    'The BANT framework: Teaching your bot to qualify leads through natural conversation',
                    'Lead scoring: Automatically categorizing prospects as Hot, Warm, or Cold based on responses',
                    'Connecting WATI to HubSpot — auto-creating contacts and updating deal stages',
                    'Connecting WATI to Zoho CRM — custom field mapping and webhook configuration',
                    'Automated follow-up sequences triggered by lead score changes',
                ],
            },
            {
                title: 'Module 4: Payments & Advanced Automation',
                lessons: [
                    'Integrating Razorpay and Stripe payment links inside WhatsApp conversations',
                    'Building product catalogs with in-chat browsing and ordering',
                    'Broadcast campaigns: Sending personalized messages to segmented lists',
                    'Abandoned cart recovery: Re-engaging drop-off customers automatically',
                    'Analytics dashboard: Tracking bot performance, lead quality, and revenue attribution',
                ],
            },
        ],
        whoIsThisFor: [
            'E-commerce businesses looking to provide instant customer support and recover abandoned carts',
            'Real estate agencies that need to qualify and nurture leads at scale on WhatsApp',
            'Service businesses (clinics, salons, consultancies) that rely on appointment scheduling',
            'Marketing agencies offering WhatsApp automation as a service to their clients',
        ],
        faqs: [
            { question: 'Do I need the WhatsApp Business API or is the regular app enough?', answer: 'For automation, you need the WhatsApp Business API (accessed through providers like WATI or Twilio). The regular WhatsApp Business App does not support chatbot automation or API integrations.' },
            { question: 'How much does the WhatsApp Business API cost?', answer: 'WATI plans start at around $49/month. Twilio charges per-conversation (approximately $0.005–$0.08 depending on region). Both offer free trials that are perfect for learning.' },
            { question: 'Can I use this for multiple businesses?', answer: 'Yes! Once you learn the framework, you can replicate it for any business. Many of our students build WhatsApp bots as a freelance service charging $500–$2,000 per setup.' },
        ],
        lastUpdated: '2026-03-10',
    },
    {
        slug: 'advanced-agent-pipelines',
        title: 'Advanced Agent Pipelines',
        description: 'Complex multi-step AI agents using LangChain and AutoGen for deep tasks. Build autonomous systems that think, plan, and execute.',
        longDescription: 'This advanced course takes you deep into the world of autonomous AI agents — systems that can reason, plan, use tools, and collaborate with other agents to accomplish complex goals. You will learn to build multi-agent pipelines using LangChain, LangGraph, and Microsoft AutoGen, integrating real-world tools like web search, code execution, database queries, and file manipulation. By the end, you will have built a fully autonomous research agent and a multi-agent customer service system.',
        type: 'Advanced',
        category: 'courses',
        duration: '6H 00M',
        rating: 5.0,
        difficulty: 5,
        featured: true,
        topics: ['LangChain', 'AutoGen', 'GPT-4', 'Multi-Agent'],
        prerequisites: ['Python programming fundamentals', 'Basic understanding of LLMs and prompt engineering', 'Experience with APIs (REST)', 'Completion of AI Automation Fundamentals (recommended)'],
        whatYouWillLearn: [
            'Design and implement multi-agent architectures where specialized agents collaborate on complex tasks',
            'Build reasoning chains using LangChain — connecting LLMs with tools, memory, and retrieval systems',
            'Create stateful, multi-actor applications with LangGraph that feature cyclical agent interactions',
            'Implement Microsoft AutoGen\'s conversational agent framework for code generation and execution',
            'Add Retrieval-Augmented Generation (RAG) to give your agents access to private knowledge bases',
            'Integrate real-world tools: web search, SQL databases, code interpreters, and file systems',
            'Deploy production-ready agent systems with error handling, rate limiting, and cost monitoring',
        ],
        modules: [
            {
                title: 'Module 1: Foundations of AI Agents',
                lessons: [
                    'What makes an AI agent "autonomous" — the ReAct pattern, tool use, and planning',
                    'LLMs as reasoning engines: How models decide which actions to take',
                    'Agent architectures compared: Single agent vs Multi-agent vs Hierarchical',
                    'Memory systems: Short-term (conversation), long-term (vector stores), and episodic memory',
                    'Setting up your development environment — Python, LangChain, and API keys',
                ],
            },
            {
                title: 'Module 2: LangChain Deep Dive',
                lessons: [
                    'Chains and Agents: Building sequential and dynamic LLM-powered workflows',
                    'Tool integration: Connecting your agent to Google Search, Wikipedia, calculators, and custom APIs',
                    'RAG pipelines: Loading documents, chunking, embedding, and querying with vector databases',
                    'LangGraph: Building stateful agents with cycles, conditions, and human-in-the-loop workflows',
                    'Output parsers and structured data: Getting reliable JSON from LLM responses',
                ],
            },
            {
                title: 'Module 3: Microsoft AutoGen',
                lessons: [
                    'AutoGen fundamentals: AssistantAgent, UserProxyAgent, and GroupChat',
                    'Building a code-writing agent that generates, tests, and iterates on Python scripts',
                    'Multi-agent debates: Creating systems where agents challenge and refine each other\'s outputs',
                    'Custom agent roles: Planner, Researcher, Coder, Reviewer — orchestrating a software team',
                    'Integrating AutoGen with LangChain tools for the best of both worlds',
                ],
            },
            {
                title: 'Module 4: Production Projects',
                lessons: [
                    'Project 1: Autonomous Research Agent — takes a topic, searches the web, synthesizes findings, and produces a report',
                    'Project 2: Multi-Agent Customer Service — a triage agent routes tickets to specialized agents for billing, tech support, and sales',
                    'Project 3: Data Analyst Agent — connects to SQL databases, writes queries, creates visualizations, and explains insights',
                    'Production deployment: Error handling, retry logic, rate limiting, and cost tracking',
                    'Evaluating agent performance: Building test suites and measuring accuracy, latency, and cost',
                ],
            },
        ],
        whoIsThisFor: [
            'Software developers who want to build cutting-edge AI applications',
            'AI/ML engineers looking to specialize in autonomous agent systems',
            'Tech leads evaluating agent architectures for enterprise deployment',
            'Advanced no-code builders who want to understand the technology behind AI agents',
        ],
        faqs: [
            { question: 'Do I need to know Python?', answer: 'Yes, Python fundamentals are required. You should be comfortable with functions, classes, pip packages, and basic API calls. We do not teach Python basics in this course.' },
            { question: 'Which LLM provider should I use?', answer: 'We primarily use OpenAI GPT-4 and Google Gemini. The code is provider-agnostic, so you can swap in Claude, Mistral, or any other model. Budget $10–20 for API costs during the course.' },
            { question: 'How is this different from just using ChatGPT?', answer: 'ChatGPT is a single agent in a chat window. This course teaches you to build systems where multiple specialized agents collaborate, use tools, access databases, and execute code — all autonomously without human prompting.' },
        ],
        lastUpdated: '2026-03-12',
    },
    {
        slug: 'ai-for-real-estate-agents',
        title: 'AI for Real Estate Agents',
        description: 'Specific workflows for lead qualification, automated follow-ups, property matching, and virtual showing scheduling.',
        longDescription: 'The real estate industry is ripe for AI transformation. This industry-focused course teaches real estate professionals how to automate lead qualification, property matching, follow-up sequences, and even virtual showing scheduling using AI-powered tools. Whether you are a solo agent or part of a brokerage, you will learn to build systems that capture leads 24/7, instantly match them with relevant properties, and nurture them until they are ready to transact — all on autopilot.',
        type: 'Industry',
        category: 'courses',
        duration: '3H 45M',
        rating: 4.7,
        difficulty: 2,
        topics: ['Real Estate', 'Lead Gen', 'CRM'],
        prerequisites: ['Active real estate license or involvement in real estate', 'Basic computer skills', 'A CRM account (HubSpot free, GoHighLevel, or Zoho)'],
        whatYouWillLearn: [
            'Deploy AI chatbots on your website and WhatsApp that capture and qualify real estate leads 24/7',
            'Build an automated property matching engine that recommends listings based on buyer preferences',
            'Create drip email and SMS sequences that nurture leads from first inquiry to showing appointment',
            'Set up automated virtual showing scheduling with calendar integration and reminder systems',
            'Implement lead scoring based on engagement, budget, timeline, and property preferences',
            'Connect everything to your CRM — automatically creating contacts, updating pipelines, and tracking conversions',
            'Generate property descriptions, social media posts, and listing content using AI',
        ],
        modules: [
            {
                title: 'Module 1: The AI-Powered Real Estate Office',
                lessons: [
                    'Where AI fits in real estate — mapping the buyer/seller journey for automation opportunities',
                    'Tool stack overview: CRM, chatbot, scheduling, and content generation tools for real estate',
                    'Setting up your GoHighLevel or HubSpot CRM with real estate-specific pipelines and custom fields',
                    'Data privacy and compliance: MLS rules, fair housing laws, and data protection best practices',
                ],
            },
            {
                title: 'Module 2: 24/7 Lead Capture & Qualification',
                lessons: [
                    'Building a website chatbot that asks the right qualifying questions (budget, location, timeline, property type)',
                    'WhatsApp bot for real estate: Handling inquiries from listings, ads, and referrals',
                    'Lead scoring model: Assigning Hot/Warm/Cold scores based on behavioral and demographic signals',
                    'Automatic lead routing: Sending qualified leads to the right agent based on specialization and availability',
                ],
            },
            {
                title: 'Module 3: Automated Nurturing & Showing',
                lessons: [
                    'Building email and SMS drip sequences for different buyer personas (first-time, investor, luxury)',
                    'AI-powered property recommendations: Matching buyer preferences to available listings',
                    'Automated showing scheduler: Calendar integration with Calendly or native CRM booking',
                    'Virtual tour integration: Setting up AI-guided 360° property walkthroughs with Matterport',
                    'Follow-up automation after showings: Feedback collection, next steps, and re-engagement',
                ],
            },
            {
                title: 'Module 4: Content & Marketing Automation',
                lessons: [
                    'Using AI to write compelling property descriptions that sell',
                    'Automated social media posting: Property listings across Instagram, Facebook, and LinkedIn',
                    'Market update newsletters: Auto-generated weekly/monthly market reports for your database',
                    'Review and testimonial automation: Requesting and publishing reviews post-transaction',
                ],
            },
        ],
        whoIsThisFor: [
            'Real estate agents and brokers who want to scale without hiring more staff',
            'Real estate teams looking to implement systematic lead management',
            'Property management companies automating tenant communication and showings',
            'Real estate marketing professionals seeking AI-powered content and campaign tools',
        ],
        faqs: [
            { question: 'Do I need technical skills?', answer: 'No! This course uses no-code and low-code tools designed for business professionals. If you can use a CRM and email, you have all the skills you need.' },
            { question: 'Which CRM do you recommend?', answer: 'We teach using GoHighLevel (most popular with real estate agents) and HubSpot (great free tier). Both work excellently, and the principles transfer to any CRM.' },
            { question: 'Can I use this with my MLS?', answer: 'Yes. We cover how to connect your automation tools with MLS feeds and popular real estate platforms like Zillow, Redfin, and local MLS systems.' },
        ],
        lastUpdated: '2026-03-08',
    },
    {
        slug: 'saas-sales-automation',
        title: 'SaaS Sales Automation',
        description: 'Automate your entire cold outreach pipeline — from prospecting to demo booking. AI-powered personalization at scale.',
        longDescription: 'In today\'s competitive SaaS landscape, manual outreach simply cannot scale. This mastery-level course teaches you how to build a fully automated sales pipeline that finds prospects, enriches their data, crafts personalized multi-channel outreach sequences, books demos automatically, and hands qualified opportunities to your sales team. Using tools like Apollo.io, Clay, and AI-powered personalization, you will learn the exact playbooks used by top-performing SaaS sales teams.',
        type: 'Mastery',
        category: 'courses',
        duration: '5H 20M',
        rating: 4.9,
        difficulty: 4,
        topics: ['Sales', 'Outreach', 'Apollo.io'],
        prerequisites: ['Basic understanding of B2B sales concepts', 'An Apollo.io account (free tier available)', 'Familiarity with email marketing tools'],
        whatYouWillLearn: [
            'Build a target account list using Apollo.io\'s database of 250M+ contacts with 65+ filtering attributes',
            'Implement intent data signals to prioritize prospects who are actively looking for solutions like yours',
            'Create hyper-personalized cold email sequences using AI that achieve 40%+ open rates',
            'Set up multi-channel outreach cadences across email, LinkedIn, and phone with automated sequencing',
            'Deploy an AI-powered demo booking system that lets prospects self-schedule and auto-qualifies them',
            'Build an automated pipeline tracking system with real-time conversion analytics and forecasting',
            'Implement A/B testing frameworks for subject lines, email copy, and send timing to continuously optimize',
        ],
        modules: [
            {
                title: 'Module 1: The Modern SaaS Sales Stack',
                lessons: [
                    'Anatomy of a high-performing SaaS outbound pipeline — from ICP definition to closed deal',
                    'Tool stack deep dive: Apollo.io, Clay, Lemlist, Calendly, and HubSpot/Salesforce CRM',
                    'Defining your Ideal Customer Profile (ICP) and building target account lists',
                    'Intent data and buying signals: How to find prospects who are ready to buy right now',
                ],
            },
            {
                title: 'Module 2: AI-Powered Prospecting',
                lessons: [
                    'Apollo.io mastery: Advanced search, saved lists, intent signals, and data enrichment',
                    'Clay workflows: Enriching prospect data with company info, tech stack, funding rounds, and news',
                    'AI research: Auto-generating personalized icebreakers and value propositions for each prospect',
                    'Data hygiene: Validating emails, removing duplicates, and maintaining list quality',
                ],
            },
            {
                title: 'Module 3: Multi-Channel Outreach Sequences',
                lessons: [
                    'Cold email that converts: Formulas, frameworks (PAS, AIDA, BAB), and AI personalization',
                    'LinkedIn outreach: Connection requests, InMails, and engagement sequences',
                    'Phone integration: AI-generated call scripts and warm-up sequences before cold calls',
                    'Timing optimization: When to send, how often to follow up, and when to pause',
                    'A/B testing: Subject lines, CTAs, and send times for continuous improvement',
                ],
            },
            {
                title: 'Module 4: Demo Booking & Pipeline Management',
                lessons: [
                    'Building a self-service demo booking flow with Calendly and automatic CRM updates',
                    'Demo qualification: Pre-call questionnaires and automated research dossiers for your sales team',
                    'Pipeline analytics: Conversion rates by stage, cycle time, and revenue forecasting',
                    'Scaling: From 50 to 500 outbound touches per day while maintaining personalization quality',
                    'Compliance: CAN-SPAM, GDPR, and best practices for ethical cold outreach',
                ],
            },
        ],
        whoIsThisFor: [
            'SaaS founders and sales leaders responsible for pipeline generation',
            'SDRs and BDRs who want to multiply their output with automation',
            'Growth marketers implementing outbound as a complement to inbound',
            'Agency owners offering outbound sales services to SaaS clients',
        ],
        faqs: [
            { question: 'Is cold outreach still effective?', answer: 'Absolutely. Cold email and LinkedIn outreach remain among the most cost-effective B2B sales channels when done correctly. The key is personalization and targeting — which is exactly what this course teaches using AI.' },
            { question: 'How much does the tool stack cost?', answer: 'Apollo.io offers a generous free tier (50 emails/month). For serious outreach, budget $100–300/month across Apollo, a sending tool (Lemlist or Instantly), and Calendly. This is far cheaper than paid advertising.' },
            { question: 'Will this work for non-SaaS businesses?', answer: 'The core principles of prospecting, personalization, and pipeline management apply to any B2B business. We use SaaS examples, but the frameworks work for agencies, consulting, and professional services too.' },
        ],
        lastUpdated: '2026-03-14',
    },
    {
        slug: 'no-code-crm-mastery',
        title: 'No-Code CRM Mastery',
        description: 'Master GoHighLevel and HubSpot integrations with AI modules. Build a CRM that automates follow-ups and predicts conversions.',
        longDescription: 'Your CRM should not be a digital rolodex — it should be an intelligent system that automatically captures leads, nurtures them with personalized sequences, predicts which deals will close, and alerts your team to take action at exactly the right moment. This course teaches you how to transform GoHighLevel and HubSpot into AI-powered revenue machines using built-in automations, custom integrations, and AI modules like HubSpot\'s Breeze AI and GoHighLevel\'s AI Agents.',
        type: 'Intermediate',
        category: 'courses',
        duration: '3H 10M',
        rating: 4.6,
        difficulty: 3,
        topics: ['HubSpot', 'GoHighLevel', 'CRM'],
        prerequisites: ['An active GoHighLevel or HubSpot account', 'Basic understanding of sales pipelines and lead management', 'No coding skills required'],
        whatYouWillLearn: [
            'Configure GoHighLevel and HubSpot from scratch with sales-optimized pipelines, custom fields, and automation triggers',
            'Build automated lead follow-up sequences across email, SMS, and WhatsApp that respond in under 60 seconds',
            'Implement AI-powered lead scoring using HubSpot\'s Breeze Intelligence and GoHighLevel\'s Prospect Conversion Rate',
            'Create conditional automation workflows with if-then logic for personalized nurturing paths',
            'Set up AI chatbots (GoHighLevel Conversation AI) that handle two-way conversations and qualify leads on autopilot',
            'Build real-time sales dashboards and revenue forecasting reports',
            'Integrate third-party tools like Zapier, calendars, payment systems, and analytics platforms',
        ],
        modules: [
            {
                title: 'Module 1: CRM Architecture & Setup',
                lessons: [
                    'CRM philosophy: Why most CRMs fail and how to set yours up for success from day one',
                    'GoHighLevel setup: Subaccounts, pipelines, opportunity stages, and custom fields',
                    'HubSpot setup: Contact properties, deal pipelines, lifecycle stages, and integrations',
                    'Data migration: Moving contacts from spreadsheets, other CRMs, and manual systems',
                ],
            },
            {
                title: 'Module 2: Automated Follow-Up Systems',
                lessons: [
                    'Speed-to-lead: Setting up instant response automations (under 60 seconds) for new inquiries',
                    'HubSpot Sequences vs Workflows — when to use each and how they differ',
                    'GoHighLevel automation workflows: Triggers, conditions, wait steps, and multi-channel actions',
                    'Drip campaigns: Building 30-day nurture sequences for different lead segments',
                    'Re-engagement campaigns: Automatically reaching out to cold leads with fresh value propositions',
                ],
            },
            {
                title: 'Module 3: AI-Powered Intelligence',
                lessons: [
                    'HubSpot Breeze AI: Copilot, Agents, and Intelligence — practical business applications',
                    'GoHighLevel AI Agents: Setting up Conversation AI bots for lead qualification and support',
                    'Predictive lead scoring: Using AI to identify which leads are most likely to convert',
                    'AI content generation: Auto-writing emails, follow-ups, and nurture content within your CRM',
                    'Voice AI integration: Using GoHighLevel Voice AI for automated phone calls',
                ],
            },
            {
                title: 'Module 4: Reporting & Optimization',
                lessons: [
                    'Building custom dashboards: Pipeline value, conversion rates, and team performance',
                    'Revenue forecasting: Using deal stage probabilities and historical data for accurate predictions',
                    'Attribution tracking: Understanding which channels and campaigns generate the best leads',
                    'Continuous optimization: Weekly CRM hygiene routines and data quality checks',
                ],
            },
        ],
        whoIsThisFor: [
            'Sales managers who want their CRM to work for them, not just store data',
            'Marketing teams needing better lead handoff and nurture automation',
            'Agency owners using GoHighLevel who want to maximize the platform\'s potential',
            'Small business owners managing sales solo who need systematic follow-up',
        ],
        faqs: [
            { question: 'GoHighLevel or HubSpot — which should I choose?', answer: 'GoHighLevel is better for agencies and businesses that want an all-in-one platform (CRM + funnels + scheduling + SMS). HubSpot is better for teams that need robust reporting and enterprise-level integrations. We cover both in this course.' },
            { question: 'Do I need the paid plans?', answer: 'HubSpot\'s free CRM is surprisingly powerful and works for most of the course. GoHighLevel starts at $97/month. Both offer trials. We focus on features available across different pricing tiers.' },
            { question: 'How long until I see results?', answer: 'Most students see measurable improvements within 2 weeks — faster response times, more consistent follow-up, and better lead tracking. Revenue impact typically follows within 30–60 days.' },
        ],
        lastUpdated: '2026-03-05',
    },
    {
        slug: 'marketing-automation-with-ai',
        title: 'Marketing Automation with AI',
        description: 'Deploy AI-driven campaigns across email, social media, and paid ads. Generate content, A/B test, and optimize automatically.',
        longDescription: 'Marketing in 2026 is about systems, not hustle. This course teaches you how to deploy AI-driven marketing automation across every channel — email campaigns that write themselves, social media content generated and scheduled automatically, and paid ad campaigns that optimize their own targeting and creative. You will build a complete marketing engine that generates, distributes, and optimizes content at scale, freeing you to focus on strategy while AI handles execution.',
        type: 'Intermediate',
        category: 'courses',
        duration: '4H 00M',
        rating: 4.8,
        difficulty: 3,
        topics: ['Email', 'Social Media', 'Ad Campaigns'],
        prerequisites: ['Basic marketing knowledge', 'Social media accounts for your business', 'An email marketing platform (Mailchimp, ConvertKit, or similar)'],
        whatYouWillLearn: [
            'Build automated email marketing funnels with AI-generated content, A/B testing, and behavior-based triggers',
            'Create 30+ days of social media content in under an hour using AI content generation workflows',
            'Set up automated posting schedules across Instagram, LinkedIn, Twitter, and Facebook',
            'Deploy AI-powered ad campaigns on Meta and Google with automated creative generation and optimization',
            'Build lead magnets and landing pages that convert visitors into subscribers and customers',
            'Implement UTM tracking and attribution models to measure true marketing ROI',
            'Create automated reporting dashboards that give you weekly performance summaries',
        ],
        modules: [
            {
                title: 'Module 1: The AI Marketing Framework',
                lessons: [
                    'The Content Flywheel: How AI changes the economics of content creation',
                    'Mapping your marketing funnel: TOFU, MOFU, BOFU content strategy with AI',
                    'Tool stack: ChatGPT, Canva AI, Buffer, Mailchimp, and analytics platforms',
                    'Brand voice calibration: Training AI to write in your unique tone and style',
                ],
            },
            {
                title: 'Module 2: AI Content Generation',
                lessons: [
                    'Email campaigns: AI-written welcome sequences, newsletters, and promotional series',
                    'Social media content: Generating posts, carousels, and video scripts with AI',
                    'Blog content: From keyword research to outline to first draft in minutes',
                    'Visual content: Using Canva AI, Midjourney, and DALL-E for marketing graphics',
                    'Landing pages: AI-generated copy that converts — headlines, CTAs, and social proof',
                ],
            },
            {
                title: 'Module 3: Automated Distribution',
                lessons: [
                    'Email automation: Behavior-triggered sequences, segmentation, and personalization at scale',
                    'Social media scheduling: Automated posting with Buffer, Hootsuite, or native tools',
                    'Content repurposing: Turning one blog post into 10 social posts, an email, and a video script',
                    'Cross-channel coordination: Ensuring consistent messaging across all touchpoints',
                ],
            },
            {
                title: 'Module 4: Optimization & Analytics',
                lessons: [
                    'A/B testing: Subject lines, CTAs, send times, and creative variants',
                    'AI-powered optimization: Tools that automatically adjust campaigns based on performance',
                    'Analytics setup: UTM parameters, conversion tracking, and attribution modeling',
                    'Weekly reporting: Building automated dashboards with key marketing metrics',
                ],
            },
        ],
        whoIsThisFor: [
            'Marketing managers who need to do more with less budget and fewer resources',
            'Small business owners handling their own marketing',
            'Content creators looking to scale their output without burning out',
            'Digital marketing agencies seeking to increase margins through automation',
        ],
        faqs: [
            { question: 'Will AI-generated content hurt my SEO?', answer: 'Not if done correctly. Google rewards helpful, original content regardless of how it was created. We teach you how to use AI as a starting point and add human expertise, originality, and real-world examples to make your content stand out.' },
            { question: 'Which AI tool is best for content?', answer: 'We use ChatGPT and Claude for text, Canva AI for visuals, and specialized tools like Jasper for marketing-specific copy. The course covers the strengths of each so you can choose based on your needs.' },
            { question: 'How much content can I realistically produce?', answer: 'With the systems taught in this course, most students produce 4x–10x more content than before, while spending less time. A typical workflow produces a week\'s worth of social content in about 30 minutes.' },
        ],
        lastUpdated: '2026-03-11',
    },
    {
        slug: 'voice-ai-phone-agents',
        title: 'Voice AI & Phone Agents',
        description: 'Build AI agents that handle phone calls — appointment booking, support, and outbound sales calls powered by Vapi and ElevenLabs.',
        longDescription: 'Voice AI is the next frontier of business automation. This advanced course teaches you how to build AI-powered phone agents that sound natural, handle inbound and outbound calls, book appointments, provide customer support, and even conduct sales calls. Using cutting-edge platforms like Vapi, ElevenLabs, and Retell, you will create voice agents that are indistinguishable from human operators — available 24/7 at a fraction of the cost.',
        type: 'Advanced',
        category: 'courses',
        duration: '5H 00M',
        rating: 4.9,
        difficulty: 4,
        featured: true,
        topics: ['Vapi', 'ElevenLabs', 'Voice AI'],
        prerequisites: ['Basic understanding of AI and automation concepts', 'A Vapi account (free tier available)', 'Familiarity with webhooks and API basics (recommended)'],
        whatYouWillLearn: [
            'Set up production-ready voice AI agents using Vapi, ElevenLabs, and Retell',
            'Design natural-sounding conversation flows for inbound support, appointment booking, and outbound calls',
            'Clone custom voices or select from premium voice libraries for brand-consistent experiences',
            'Build inbound call handlers: IVR replacement, appointment scheduling, and support ticket creation',
            'Create outbound calling campaigns: Appointment confirmations, reminders, surveys, and sales follow-ups',
            'Integrate voice agents with CRM, calendar, and ticketing systems for end-to-end automation',
            'Monitor call quality, resolution rates, and customer satisfaction with analytics dashboards',
        ],
        modules: [
            {
                title: 'Module 1: Voice AI Fundamentals',
                lessons: [
                    'How Voice AI works: Speech-to-text, LLM processing, and text-to-speech pipeline',
                    'Voice AI platforms compared: Vapi vs Retell vs Bland.ai vs custom solutions',
                    'ElevenLabs deep dive: Voice cloning, voice library, and quality optimization',
                    'Designing for voice: How conversation design differs from text-based chatbots',
                    'Ethics and disclosure: Legal requirements for AI-powered phone calls',
                ],
            },
            {
                title: 'Module 2: Building Inbound Voice Agents',
                lessons: [
                    'IVR killer: Replacing "press 1 for sales" with intelligent AI conversation routing',
                    'Appointment booking agent: Calendar checking, conflict resolution, and confirmation',
                    'Support agent: Handling common inquiries with knowledge base integration',
                    'Payment collection: Secure over-the-phone payment processing with voice AI',
                    'Escalation handling: Smoothly transferring to human agents with full conversation context',
                ],
            },
            {
                title: 'Module 3: Outbound Voice Campaigns',
                lessons: [
                    'Appointment reminders and confirmation calls with smart rescheduling',
                    'Customer satisfaction surveys: Post-interaction feedback collection',
                    'Outbound sales: AI-powered cold calls with personalized scripts and objection handling',
                    'Re-engagement calls: Reaching out to inactive customers with targeted offers',
                    'Campaign management: Scheduling, throttling, and compliance for large-scale calling',
                ],
            },
            {
                title: 'Module 4: Integration & Deployment',
                lessons: [
                    'CRM integration: Syncing call outcomes, notes, and recordings to HubSpot/GoHighLevel',
                    'Calendar integration: Real-time availability checking and booking through Calendly and Google Calendar',
                    'Webhook mastery: Triggering actions based on call events (answered, voicemail, completed)',
                    'Quality assurance: Call recording review, transcription analysis, and continuous improvement',
                    'Cost optimization: Managing API costs and choosing the right pricing tier for your call volume',
                ],
            },
        ],
        whoIsThisFor: [
            'Businesses drowning in phone calls who need 24/7 call handling without hiring',
            'Healthcare clinics and service businesses that rely on appointment scheduling',
            'Sales teams wanting to automate appointment confirmations and follow-up calls',
            'AI automation agencies offering voice AI as a premium service to clients',
        ],
        faqs: [
            { question: 'How natural do these voice agents sound?', answer: 'Extremely natural. ElevenLabs and Vapi produce voices that are often indistinguishable from human operators. Most callers do not realize they are speaking with AI until told.' },
            { question: 'What about regulations?', answer: 'We cover all compliance requirements including FTC rules, TCPA for outbound calls, and disclosure best practices. Voice AI calls must follow the same regulations as human-operated calls plus additional AI-specific requirements.' },
            { question: 'What\'s the cost per call?', answer: 'Typically $0.05–$0.15 per minute depending on the platform and voice model. A 3-minute support call costs roughly $0.15–$0.45, compared to $3–$5 for a human agent. Many businesses see 10x cost reduction.' },
        ],
        lastUpdated: '2026-03-13',
    },
    {
        slug: 'ecommerce-ai-blueprint',
        title: 'E-Commerce AI Blueprint',
        description: 'Automate your Shopify/WooCommerce store with chatbots, abandoned cart recovery, personalized upsells, and inventory alerts.',
        longDescription: 'E-commerce success in 2026 depends on automation at every stage of the customer journey. This industry-focused course teaches you how to implement AI across your online store — from chatbots that convert browsers to buyers, abandoned cart sequences that recover lost revenue, personalized product recommendations that increase average order value, and inventory management alerts that prevent stockouts. Built specifically for Shopify and WooCommerce store owners.',
        type: 'Industry',
        category: 'courses',
        duration: '3H 30M',
        rating: 4.7,
        difficulty: 2,
        topics: ['Shopify', 'E-Commerce', 'Cart Recovery'],
        prerequisites: ['An active Shopify or WooCommerce store', 'Basic understanding of e-commerce operations', 'Admin access to your store'],
        whatYouWillLearn: [
            'Deploy AI-powered chatbots on your store that guide shoppers, answer product questions, and upsell',
            'Build abandoned cart recovery sequences across email, SMS, and WhatsApp that recover 15–25% of lost sales',
            'Implement personalized product recommendation engines based on browsing behavior and purchase history',
            'Set up automated inventory alerts, reorder triggers, and supplier communication workflows',
            'Create post-purchase automation: Review requests, cross-sell sequences, and loyalty programs',
            'Build automated customer support for order tracking, returns, and exchanges',
            'Implement dynamic pricing and promotional automation based on inventory levels and competitor pricing',
        ],
        modules: [
            {
                title: 'Module 1: The Automated Store Foundation',
                lessons: [
                    'E-commerce automation map: Identifying the highest-ROI automation opportunities in your store',
                    'Tool stack: Shopify Flow, Klaviyo, Tidio/Gorgias, and notification platforms',
                    'Customer journey mapping: Where automation adds the most value from browse to post-purchase',
                    'Setting up tracking: UTMs, conversion pixels, and customer behavior analytics',
                ],
            },
            {
                title: 'Module 2: Conversion Optimization',
                lessons: [
                    'AI chatbot for e-commerce: Product finder, size guide, and instant support on your store',
                    'Exit-intent popups and welcome flows for first-time visitors',
                    'Personalized product recommendations: Collaborative filtering and AI-based suggestions',
                    'Social proof automation: Displaying real-time purchases, reviews, and user-generated content',
                ],
            },
            {
                title: 'Module 3: Revenue Recovery & Growth',
                lessons: [
                    'Abandoned cart recovery: Multi-channel sequences (email → SMS → WhatsApp) with dynamic discount laddering',
                    'Browse abandonment: Re-engaging visitors who viewed products but did not add to cart',
                    'Win-back campaigns: Automated sequences for customers who have not purchased in 60+ days',
                    'Upsell and cross-sell automation: Post-purchase recommendations and bundle offers',
                ],
            },
            {
                title: 'Module 4: Operations Automation',
                lessons: [
                    'Inventory management: Low-stock alerts, automatic reorder points, and supplier notifications',
                    'Order fulfillment: Automated shipping notifications, tracking updates, and delivery confirmation',
                    'Returns and exchanges: Self-service return portal with automated processing and refunds',
                    'Customer support: AI-powered ticket routing, macro responses, and SLA tracking',
                ],
            },
        ],
        whoIsThisFor: [
            'Shopify and WooCommerce store owners looking to increase revenue without increasing workload',
            'E-commerce marketers responsible for conversion optimization and customer retention',
            'DTC (Direct-to-Consumer) brands scaling operations beyond manual management',
            'E-commerce agencies offering automation services to their online store clients',
        ],
        faqs: [
            { question: 'Does this work for both Shopify and WooCommerce?', answer: 'Yes. While the specific app integrations differ, the automation strategies and frameworks apply to both platforms. We provide separate tool recommendations and setup guides for each.' },
            { question: 'What\'s the typical ROI?', answer: 'Abandoned cart recovery alone typically generates a 15–25% increase in revenue. Combined with upsell automation and improved support, most stores see a 20–40% overall revenue increase within 90 days of implementation.' },
            { question: 'Do I need technical skills?', answer: 'No. Everything is built using no-code tools and native platform features (like Shopify Flow). If you can manage your store\'s admin panel, you can implement these automations.' },
        ],
        lastUpdated: '2026-03-09',
    },
];

// Helper functions
export function getAllCourses(): CourseDetail[] {
    return ALL_COURSES;
}

export function getCourseBySlug(slug: string): CourseDetail | undefined {
    return ALL_COURSES.find(c => c.slug === slug);
}

export function getCoursesByCategory(category: string): CourseDetail[] {
    return ALL_COURSES.filter(c => c.category === category);
}

export function getAllCourseSlugs(): string[] {
    return ALL_COURSES.map(c => c.slug);
}

// Generate URL-safe slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
