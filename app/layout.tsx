import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { LazyChat } from '@/components/chatbot/lazy-chat';
import { SocialShare } from '@/components/ui/social-share';
import { LeadCapturePopup } from '@/components/ui/lead-capture-popup';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['700', '800'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atulautomation.com'),
  title: {
    default: 'Atul Automation | AI Agents & Workflow Automation Agency',
    template: '%s | Atul Automation',
  },
  description: 'India\'s best AI automation agency. Built to Automate, Designed to Scale. We build intelligent AI agents, chatbots, workflow automation, and data-driven marketing solutions. Deploy GPT-4, Claude & custom LLMs to automate your business operations 24/7.',
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
  verification: { google: 'OzGDDmxxpz4DBXk7QIfsoPuTfDutnLDBu1byXYH32KA' },
  manifest: '/manifest.json',
  category: 'Technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Atul Automation',
  url: 'https://atulautomation.com',
  logo: 'https://atulautomation.com/og-image.svg',
  description: 'India\'s Best AI Automation Agency. Specializing in AI agents, chatbots, workflow automation, and data-driven marketing. Built to Automate, Designed to Scale.',
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
  slogan: 'Built to Automate, Designed to Scale',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  knowsAbout: ['AI Automation', 'Chatbots', 'Workflow Automation', 'AI Agents', 'CRM Automation', 'Digital Marketing'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />

        {/* AdSense (Lazy) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5677457553651550"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Monetumo Integration (Optimized) */}
        <link rel="stylesheet" href="https://b-cdn.monetumo.com/cls-css/atulautomation-com.css" />
        <Script src="https://b-cdn.monetumo.com/cmp/atulautomation-com.js" strategy="afterInteractive" data-cfasync="false" />
        <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" strategy="afterInteractive" />
        <Script src="https://b-cdn.monetumo.com/bundles/atulautomation-com.js" strategy="lazyOnload" data-cfasync="false" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-foreground bg-background`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6KB8876KLQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6KB8876KLQ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
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
          <SocialShare variant="floating" />
          <LeadCapturePopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
