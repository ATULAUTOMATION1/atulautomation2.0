import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Atul Automation | AI Agents & Workflow Automation',
  description: 'Deploy intelligent AI agents, automate workflows, and scale your business with Atul Automation using the power of ChatGPT, Claude, and custom LLMs.',
  keywords: ['AI Automation', 'Workflow Automation', 'ChatGPT Agents', 'Business Automation', 'No-code AI'],
  authors: [{ name: 'Atul Automation' }],
  openGraph: {
    title: 'Atul Automation | The Future of Work',
    description: 'Transform your business with autonomous AI agents.',
    url: 'https://atulautomation.com', // Placeholder URL
    siteName: 'Atul Automation',
    images: [
      {
        url: '/og-image.jpg', // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atul Automation',
    description: 'AI Agents & Workflow Automation',
    creator: '@atulautomation',
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
        {/* Placeholder for Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
            `}
        </Script>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
