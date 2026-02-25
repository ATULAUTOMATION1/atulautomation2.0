import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { LazyChat } from '@/components/chatbot/lazy-chat';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://atulautomation.com'),
  title: {
    default: 'Atul Automation | AI Agents & Workflow Automation Agency',
    template: '%s | Atul Automation',
  },
  description: 'India\'s leading AI automation agency. We build intelligent AI agents, chatbots, workflow automation, and data-driven marketing solutions. Deploy GPT-4, Claude & custom LLMs to automate your business operations 24/7.',
  keywords: [
    'AI Automation', 'Workflow Automation', 'ChatGPT Agents', 'Business Automation',
    'No-code AI', 'AI Chatbot Development', 'Marketing Automation', 'CRM Automation',
    'AI Agency India', 'Atul Automation', 'GPT-4 Integration', 'Claude AI',
    'Lead Generation AI', 'Sales Automation', 'WhatsApp Bot', 'Customer Support AI',
    'Real Estate Automation', 'E-commerce Automation', 'Digital Marketing AI',
  ],
  authors: [{ name: 'Atul Automation', url: 'https://atulautomation.com' }],
  creator: 'Atul Automation',
  publisher: 'Atul Automation',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Atul Automation | AI Agents & Workflow Automation Agency',
    description: 'Deploy intelligent AI agents that automate your marketing, sales & support 24/7. Transform your business with the power of AI.',
    url: 'https://atulautomation.com',
    siteName: 'Atul Automation',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Atul Automation - AI Agents & Workflow Automation',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atul Automation | AI Automation Agency',
    description: 'AI Agents, Chatbots & Workflow Automation for businesses. Automate everything.',
    creator: '@atulautomation',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://atulautomation.com',
  },
  // verification: { google: 'add-your-code-from-search-console' },
  category: 'Technology',
};

// Structured Data (JSON-LD) for rich search results
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Atul Automation',
  url: 'https://atulautomation.com',
  logo: 'https://atulautomation.com/og-image.svg',
  description: 'AI Automation Agency specializing in AI agents, chatbots, workflow automation, and data-driven marketing.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@atulautomation.com',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://twitter.com/atulautomation',
    'https://linkedin.com/company/atulautomation',
    'https://instagram.com/atulautomation',
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '4999',
    highPrice: '49999',
    offerCount: '6',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Automation & Chatbot Development',
  provider: {
    '@type': 'Organization',
    name: 'Atul Automation',
    url: 'https://atulautomation.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Automation Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agents' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chatbot Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow Automation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM Integration' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate Automation' } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {/* Monetumo Integration */}
        <link rel="stylesheet" href="https://b-cdn.monetumo.com/cls-css/atulautomation-com.css" />
        <script src="https://b-cdn.monetumo.com/cmp/atulautomation-com.js" data-cfasync="false"></script>
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
        <script defer src="https://b-cdn.monetumo.com/bundles/atulautomation-com.js" data-cfasync="false"></script>

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5677457553651550"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-foreground bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedBackground />
          <Navbar />
          {children}
          <Footer />
          <LazyChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
