import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

import SchemaMarkup from "@/components/SEO/SchemaMarkup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live IPO Tracker India 2025 | Real-time GMP Analysis & SME IPO Updates",
  description: "Track 185+ live Indian IPOs with real-time GMP, subscription status & AI analysis. Get SME IPO updates, grey market premiums & investment verdicts instantly.",
  keywords: "IPO tracker India, live GMP tracker, IPO subscription, Indian IPO analysis, SME IPO, Mainboard IPO, GMP live, IPO allotment status, NSE IPO, BSE IPO",
  authors: [{ name: "GMP AI IPO Team" }],
  metadataBase: new URL('https://ipo-ai-ui.netlify.app'),
  alternates: {
    canonical: '/',
  },
  other: {
    "author": "GMP AI IPO Team",
    "publish_date": "2025-12-11",
    "article:published_time": "2025-12-11T20:00:00Z",
    "article:author": "IPO Analysis Team",
    "google-site-verification": "G-HLS540NE6V", // Keeping existing GA ID if needed for verification
  },
  openGraph: {
    type: "website",
    title: "Live IPO Tracker India 2025 | Real-time GMP",
    description: "Track 185+ live Indian IPOs with real-time GMP, subscription status & AI analysis. Get SME IPO updates, grey market premiums & investment verdicts instantly.",
    url: 'https://ipo-ai-ui.netlify.app',
    siteName: 'GMP AI IPO',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Live IPO Tracker India 2025 Preview',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: "summary_large_image",
    title: "Live IPO Tracker India 2025 | Real-time GMP",
    description: "Track 185+ live Indian IPOs with real-time GMP, subscription status & AI analysis.",
    images: ["/og-image.png"],
    creator: "@ipo_watch",
  },
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
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SchemaMarkup />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HLS540NE6V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HLS540NE6V');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
