export interface IndustryPage {
    slug: string;
    industry: string;
    title: string;
    metaDescription: string;
    heroSubtitle: string;
    painPoints: string[];
    solutions: { title: string; description: string }[];
    stats: { label: string; value: string }[];
    useCases: string[];
    testimonialQuote: string;
    testimonialAuthor: string;
    testimonialRole: string;
}

export const industryPages: IndustryPage[] = [
    {
        slug: 'ai-automation-for-real-estate',
        industry: 'Real Estate',
        title: 'AI Automation for Real Estate Agencies',
        metaDescription: 'Automate lead capture, property matching, follow-ups & client communication for your real estate business. AI chatbots that qualify buyers 24/7.',
        heroSubtitle: 'Capture more leads, qualify buyers instantly, and close deals 2x faster with AI-powered automation built for real estate.',
        painPoints: [
            'Missing leads because you can\'t respond fast enough',
            'Spending hours on property matching manually',
            'Losing buyers to faster-responding competitors',
            'Manual follow-ups that fall through the cracks',
            'No system to track lead quality and conversion',
        ],
        solutions: [
            { title: 'AI Property Matching', description: 'Chatbot asks buyers about budget, location, BHK preferences and instantly matches them with available properties from your inventory.' },
            { title: '24/7 Lead Qualification', description: 'AI chatbot on your website and WhatsApp qualifies every inquiry — budget, timeline, location — before alerting your sales team.' },
            { title: 'Automated Follow-Up Sequences', description: 'Never miss a follow-up. Automated drip campaigns via WhatsApp and email nurture leads until they\'re ready to visit.' },
            { title: 'Virtual Tour Scheduling', description: 'Buyers can book site visits directly through the chatbot. Calendar syncs with your team automatically.' },
        ],
        stats: [
            { label: 'Faster Lead Response', value: '60x' },
            { label: 'More Qualified Leads', value: '3x' },
            { label: 'Reduction in Manual Follow-ups', value: '80%' },
            { label: 'Increase in Site Visits Booked', value: '45%' },
        ],
        useCases: [
            'Property listing chatbot on website',
            'WhatsApp bot for buyer inquiries',
            'Automated lead scoring and routing',
            'Follow-up sequences for site visit no-shows',
            'CRM integration for pipeline tracking',
            'Monthly market report auto-generation',
        ],
        testimonialQuote: 'Since implementing AI automation, our lead response time went from 6 hours to under 60 seconds. We\'re booking 3x more site visits.',
        testimonialAuthor: 'Real Estate Agency',
        testimonialRole: 'Mumbai-based Property Firm',
    },
    {
        slug: 'ai-automation-for-ecommerce',
        industry: 'E-Commerce',
        title: 'AI Automation for E-Commerce Businesses',
        metaDescription: 'Automate customer support, order tracking, product recommendations & abandoned cart recovery with AI. Boost sales and reduce support costs by 40%.',
        heroSubtitle: 'Reduce support tickets by 60%, recover abandoned carts automatically, and deliver personalized shopping experiences with AI.',
        painPoints: [
            'High volume of repetitive "where is my order" queries',
            'Cart abandonment rate above 70%',
            'Unable to personalize at scale',
            'Customer support costs eating into margins',
            'Manual inventory and order management',
        ],
        solutions: [
            { title: 'AI Customer Support Bot', description: 'Handle order tracking, returns, size guides, and FAQs automatically. Resolves 80% of queries without human agents.' },
            { title: 'Abandoned Cart Recovery', description: 'AI sends personalized WhatsApp messages with product reminders and smart discounts to recover abandoned carts.' },
            { title: 'Product Recommendations', description: 'AI analyzes browsing patterns and purchase history to suggest relevant products, increasing average order value by 25%.' },
            { title: 'Inventory Alerts & Reorder', description: 'Automated alerts when stock runs low. AI predicts demand patterns and suggests optimal reorder quantities.' },
        ],
        stats: [
            { label: 'Reduction in Support Tickets', value: '60%' },
            { label: 'Cart Recovery Rate', value: '15%' },
            { label: 'Increase in Average Order Value', value: '25%' },
            { label: 'Support Cost Savings', value: '40%' },
        ],
        useCases: [
            'Order tracking chatbot',
            'WhatsApp abandoned cart recovery',
            'AI product recommendations',
            'Automated review request emails',
            'Return/exchange process automation',
            'Dynamic pricing optimization',
        ],
        testimonialQuote: 'Our support team went from handling 500 tickets a day to 200. The AI handles the rest instantly. Cart recovery alone pays for the entire system.',
        testimonialAuthor: 'E-Commerce Brand',
        testimonialRole: 'D2C Fashion Brand, Delhi',
    },
    {
        slug: 'ai-automation-for-healthcare',
        industry: 'Healthcare',
        title: 'AI Automation for Healthcare & Clinics',
        metaDescription: 'Automate patient appointment booking, follow-ups, prescription reminders & clinic operations with AI. HIPAA-aware chatbots for healthcare.',
        heroSubtitle: 'Streamline patient appointment booking, automate follow-ups, and reduce no-shows by 40% with healthcare-specific AI automation.',
        painPoints: [
            'Phone lines jammed with appointment requests',
            'High patient no-show rates (20-30%)',
            'Staff overwhelmed with administrative tasks',
            'Manual prescription and follow-up reminders',
            'No after-hours patient communication',
        ],
        solutions: [
            { title: 'AI Appointment Booking', description: 'Patients book appointments via website or WhatsApp chatbot. AI suggests optimal times based on doctor availability.' },
            { title: 'Automated Reminders', description: 'Reduce no-shows by 40% with automated appointment reminders via WhatsApp and SMS 24 hours and 1 hour before visits.' },
            { title: 'Post-Visit Follow-Up', description: 'AI sends personalized follow-up messages with care instructions, medication reminders, and feedback requests.' },
            { title: 'Symptom Pre-Screening', description: 'Chatbot collects symptoms and medical history before the visit, saving doctors 5-10 minutes per consultation.' },
        ],
        stats: [
            { label: 'Reduction in No-Shows', value: '40%' },
            { label: 'Time Saved per Patient', value: '8 min' },
            { label: 'After-Hours Queries Handled', value: '100%' },
            { label: 'Patient Satisfaction Increase', value: '+30%' },
        ],
        useCases: [
            'Online appointment booking chatbot',
            'WhatsApp appointment reminders',
            'Post-consultation care instructions',
            'Medication refill reminders',
            'Patient feedback collection',
            'Lab report delivery automation',
        ],
        testimonialQuote: 'Our no-show rate dropped from 25% to 15% within the first month. The WhatsApp reminders and easy rescheduling made all the difference.',
        testimonialAuthor: 'Multi-Specialty Clinic',
        testimonialRole: 'Bangalore Healthcare Network',
    },
    {
        slug: 'ai-automation-for-education',
        industry: 'Education',
        title: 'AI Automation for EdTech & Coaching Institutes',
        metaDescription: 'Automate student enrollment, doubt resolution, attendance tracking & parent communication with AI. Smart chatbots for educational institutions.',
        heroSubtitle: 'Automate admissions, resolve student doubts 24/7, and keep parents informed — all with AI built for education.',
        painPoints: [
            'Inquiry-to-enrollment conversion is low',
            'Students need help outside class hours',
            'Manual attendance and progress tracking',
            'Parent communication is time-consuming',
            'Fee reminders sent manually',
        ],
        solutions: [
            { title: 'Enrollment Chatbot', description: 'AI chatbot handles course inquiries, fee details, and enrollment — converting website visitors into students 24/7.' },
            { title: 'AI Doubt Resolution', description: 'Students ask questions anytime and get instant AI-powered answers based on course material and past Q&A.' },
            { title: 'Parent Communication Bot', description: 'Automated progress reports, attendance alerts, and fee reminders sent to parents via WhatsApp.' },
            { title: 'Automated Fee Collection', description: 'Scheduled fee reminders with payment links. Track payments and send receipts automatically.' },
        ],
        stats: [
            { label: 'Inquiry-to-Enrollment Increase', value: '35%' },
            { label: 'Doubt Resolution Time', value: '<30 sec' },
            { label: 'Fee Collection Rate Increase', value: '25%' },
            { label: 'Admin Hours Saved Weekly', value: '15 hrs' },
        ],
        useCases: [
            'Course inquiry and enrollment chatbot',
            'AI-powered doubt resolution',
            'Automated attendance tracking',
            'Parent WhatsApp updates',
            'Fee reminder automation',
            'Student progress reports',
        ],
        testimonialQuote: 'Our enrollment rate jumped 35% after adding the AI chatbot. Students love getting their doubts resolved instantly, even at midnight.',
        testimonialAuthor: 'Coaching Institute',
        testimonialRole: 'JEE/NEET Prep Center, Jaipur',
    },
    {
        slug: 'ai-automation-for-restaurants',
        industry: 'Restaurants',
        title: 'AI Automation for Restaurants & Cloud Kitchens',
        metaDescription: 'Automate table reservations, order taking, customer feedback & loyalty programs with AI chatbots. WhatsApp ordering for restaurants.',
        heroSubtitle: 'Take orders via WhatsApp, manage reservations automatically, and boost repeat customers with AI-powered restaurant automation.',
        painPoints: [
            'Missed phone orders during peak hours',
            'No system for table reservations',
            'Customer feedback not collected consistently',
            'Loyalty programs managed manually',
            'Marketing limited to walk-in customers',
        ],
        solutions: [
            { title: 'WhatsApp Ordering', description: 'Customers browse your menu and place orders via WhatsApp. AI confirms the order and sends updates on preparation status.' },
            { title: 'Smart Table Reservations', description: 'AI chatbot handles reservation requests, suggests available times, and sends confirmation with directions.' },
            { title: 'Automated Feedback Collection', description: 'After every order, AI sends a quick feedback request. Negative feedback triggers instant manager alert.' },
            { title: 'Loyalty & Re-engagement', description: 'Track customer orders and automatically send personalized offers to bring back inactive customers.' },
        ],
        stats: [
            { label: 'Increase in Online Orders', value: '50%' },
            { label: 'Reduction in Missed Orders', value: '90%' },
            { label: 'Repeat Customer Rate', value: '+30%' },
            { label: 'Feedback Collection Rate', value: '4x' },
        ],
        useCases: [
            'WhatsApp menu and ordering bot',
            'Table reservation automation',
            'Post-order feedback collection',
            'Customer loyalty program',
            'Special occasion reminders',
            'Delivery tracking updates',
        ],
        testimonialQuote: 'WhatsApp ordering increased our takeaway revenue by 50%. Customers love the convenience and we never miss an order anymore.',
        testimonialAuthor: 'Restaurant Chain',
        testimonialRole: 'Multi-outlet Restaurant, Pune',
    },
    {
        slug: 'ai-automation-for-law-firms',
        industry: 'Law Firms',
        title: 'AI Automation for Law Firms & Legal Services',
        metaDescription: 'Automate client intake, appointment scheduling, document drafting & case status updates with AI. Smart chatbots for legal practices.',
        heroSubtitle: 'Automate client intake, manage appointments, and keep clients updated on case progress — freeing your team for high-value legal work.',
        painPoints: [
            'Client intake process is slow and manual',
            'Missed calls from potential clients',
            'Clients constantly asking for case status updates',
            'Document drafting takes excessive time',
            'Follow-up on consultations falls behind',
        ],
        solutions: [
            { title: 'AI Client Intake', description: 'Chatbot collects case details, documents, and contact info from potential clients 24/7. Pre-qualifies cases before attorney review.' },
            { title: 'Consultation Scheduling', description: 'Clients book consultations through your website or WhatsApp. Calendar syncs automatically with available attorneys.' },
            { title: 'Case Status Updates', description: 'AI sends automated case progress updates to clients via WhatsApp, reducing "what\'s the status?" calls by 70%.' },
            { title: 'Document Drafting Assistance', description: 'AI helps draft standard legal documents — NDAs, contracts, notices — from templates, saving hours per document.' },
        ],
        stats: [
            { label: 'Faster Client Intake', value: '5x' },
            { label: 'Reduction in Status Inquiry Calls', value: '70%' },
            { label: 'More Consultations Booked', value: '2x' },
            { label: 'Document Drafting Time Saved', value: '60%' },
        ],
        useCases: [
            'Website client intake chatbot',
            'Consultation booking automation',
            'Automated case status notifications',
            'Document template generation',
            'Client onboarding sequences',
            'Payment and invoice automation',
        ],
        testimonialQuote: 'The intake bot pre-qualifies 90% of inquiries before they reach our desk. We focus on cases, not admin work.',
        testimonialAuthor: 'Legal Practice',
        testimonialRole: 'Corporate Law Firm, Hyderabad',
    },
    {
        slug: 'ai-automation-for-fitness',
        industry: 'Fitness & Gyms',
        title: 'AI Automation for Gyms, Fitness Studios & Personal Trainers',
        metaDescription: 'Automate membership management, class bookings, client communications & fitness tracking with AI. WhatsApp bots for gyms and trainers.',
        heroSubtitle: 'Automate membership renewals, class bookings, and client engagement to grow your fitness business without growing your admin team.',
        painPoints: [
            'Membership renewals tracked manually',
            'Class scheduling conflicts and no-shows',
            'Hard to maintain personal touch at scale',
            'Inactive members just disappear',
            'Manual diet and workout plan distribution',
        ],
        solutions: [
            { title: 'AI Membership Manager', description: 'Automated renewal reminders, payment collection, and re-engagement campaigns for lapsed members.' },
            { title: 'Class Booking Bot', description: 'Members book classes via WhatsApp or website. Waitlist management and auto-notifications for openings.' },
            { title: 'Personalized Workout Plans', description: 'AI generates customized workout and diet plans based on member goals, fitness level, and preferences.' },
            { title: 'Progress Tracking & Motivation', description: 'Automated check-ins, progress milestone celebrations, and motivational messages to keep members engaged.' },
        ],
        stats: [
            { label: 'Membership Retention Increase', value: '25%' },
            { label: 'Reduction in Class No-Shows', value: '35%' },
            { label: 'Lapsed Member Re-activation', value: '20%' },
            { label: 'Admin Time Saved Weekly', value: '12 hrs' },
        ],
        useCases: [
            'Membership renewal automation',
            'Class booking and waitlist management',
            'AI diet and workout plan generation',
            'WhatsApp progress check-ins',
            'Payment reminder automation',
            'New member onboarding sequences',
        ],
        testimonialQuote: 'Member retention jumped 25% in 3 months. The automated check-ins make every member feel personally cared for.',
        testimonialAuthor: 'Fitness Studio',
        testimonialRole: 'CrossFit Gym, Chennai',
    },
    {
        slug: 'ai-automation-for-travel',
        industry: 'Travel & Tourism',
        title: 'AI Automation for Travel Agencies & Tour Operators',
        metaDescription: 'Automate itinerary planning, booking confirmations, customer support & travel recommendations with AI. WhatsApp travel bots.',
        heroSubtitle: 'Create personalized itineraries instantly, automate bookings, and provide 24/7 travel support with AI built for the travel industry.',
        painPoints: [
            'Creating custom itineraries takes hours',
            'Customers need support in different time zones',
            'Booking confirmations sent manually',
            'Post-trip feedback rarely collected',
            'Seasonal demand spikes overwhelm staff',
        ],
        solutions: [
            { title: 'AI Itinerary Planner', description: 'Chatbot asks travelers about preferences, budget, and dates — then generates a personalized itinerary in seconds.' },
            { title: '24/7 Travel Support', description: 'AI handles common queries — visa info, packing lists, weather updates, local tips — anytime, anywhere.' },
            { title: 'Automated Booking Flow', description: 'From inquiry to booking confirmation to payment — the entire flow automated via WhatsApp and email.' },
            { title: 'Post-Trip Engagement', description: 'Automated feedback collection, photo sharing, and referral programs to turn travelers into repeat customers.' },
        ],
        stats: [
            { label: 'Itinerary Creation Time', value: '95% faster' },
            { label: 'Customer Inquiry Response', value: '<1 min' },
            { label: 'Booking Conversion Increase', value: '35%' },
            { label: 'Repeat Booking Rate', value: '+40%' },
        ],
        useCases: [
            'AI itinerary generation chatbot',
            'WhatsApp booking and support bot',
            'Automated travel document checklist',
            'Pre-trip preparation reminders',
            'Post-trip feedback and reviews',
            'Referral program automation',
        ],
        testimonialQuote: 'We used to spend 2 hours per custom itinerary. Now the AI does it in 2 minutes. Our booking rate tripled.',
        testimonialAuthor: 'Travel Agency',
        testimonialRole: 'Adventure Tours Operator, Goa',
    },
];

export function getIndustryBySlug(slug: string): IndustryPage | undefined {
    return industryPages.find(page => page.slug === slug);
}

export function getAllIndustries(): IndustryPage[] {
    return industryPages;
}
