import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { LazyChat } from '@/components/chatbot/lazy-chat';
import { ClientInteractions } from '@/components/layout/client-interactions';
import { CookieBanner } from '@/components/ui/cookie-banner';
import { AuthProvider } from '@/components/auth/auth-context';
import { BirthdayPopup } from "@/components/birthday-popup";

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
  description: 'AI Automation Agency serving businesses globally. We build intelligent AI agents, chatbots, workflow automation & marketing solutions. Deploy GPT-4, Claude & custom LLMs to automate operations 24/7. Trusted by 50+ businesses worldwide.',
  keywords: [
    'AI Automation', 'Workflow Automation', 'ChatGPT Agents', 'Business Automation',
    'AI Agency USA', 'AI Automation UK', 'AI Agency Canada', 'AI Specialist Australia',
    'No-code AI', 'AI Chatbot Development', 'Marketing Automation', 'CRM Automation',
    'AI Agency India', 'Globally', 'Atul Automation', 'GPT-4 Integration', 'Claude AI',
    'Lead Generation AI', 'Sales Automation', 'WhatsApp Bot', 'Customer Support AI',
    'London AI Agency', 'New York AI Automation', 'Toronto AI Services', 'Sydney AI Agents'
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
    description: 'Deploy intelligent AI agents that automate your marketing, sales & support 24/7. Custom chatbots, workflow automation & AI solutions for businesses worldwide.',
    url: 'https://atulautomation.com',
    siteName: 'Atul Automation',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Atul Automation - AI Agents & Workflow Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atul Automation | AI Automation Agency',
    description: 'AI Agents, Chatbots & Workflow Automation for businesses. Automate everything.',
    creator: '@atulautomation',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://atulautomation.com',
    languages: {
      'en-US': 'https://atulautomation.com',
      'en-GB': 'https://atulautomation.com',
      'en-CA': 'https://atulautomation.com',
      'en-AU': 'https://atulautomation.com',
      'en-IN': 'https://atulautomation.com',
    },
  },
  verification: { google: 'OzGDDmxxpz4DBXk7QIfsoPuTfDutnLDBu1byXYH32KA' },
  manifest: '/manifest.json',
  category: 'Technology',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Atul Automation',
  url: 'https://atulautomation.com',
  logo: 'https://atulautomation.com/og-image.png',
  description: 'Leading AI Automation Agency serving businesses globally. Specializing in AI agents, chatbots, workflow automation, and data-driven marketing. Custom GPT-4 & Claude solutions for modern business.',
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
    priceCurrency: 'USD',
    lowPrice: '500',
    highPrice: '50000',
    offerCount: '6',
  },
  slogan: 'Built to Automate, Designed to Scale',
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' }
  ],
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
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' }
  ],
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
        <meta name="google-adsense-account" content="ca-pub-5677457553651550" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />

      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-foreground bg-background`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6KB8876KLQ"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6KB8876KLQ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* Google AdSense — afterInteractive for ad bidding */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5677457553651550"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* Monetumo Ad Network & CMP — lazy loaded for performance */}
        <Script
          src="https://b-cdn.monetumo.com/cmp/atulautomation-com.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://b-cdn.monetumo.com/bundles/atulautomation-com.js"
          strategy="lazyOnload"
        />
        {/* Google Identity Services for Sign-In */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AnimatedBackground />
            <Navbar />
            {children}
            <Footer />
            <LazyChat />
            <ClientInteractions />
            <CookieBanner />
            <BirthdayPopup />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
