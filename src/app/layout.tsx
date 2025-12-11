import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPO Bazar - Live Indian IPO Tracker 2025 | Real-time GMP & Allotment Status",
  description: "Track 185+ live Indian IPOs on IPO Bazar. Get real-time GMP, subscription status, AI analysis & allotment updates for Mainboard & SME IPOs.",
  keywords: "IPO Bazar, IPO tracker, live GMP, IPO allotment status, Indian stock market, SME IPO, Mainboard IPO, IPO news",
  authors: [{ name: "IPO Bazar Team" }],
  metadataBase: new URL('https://ipo-ai-ui.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    title: "IPO Bazar - Live Indian IPO Tracker 2025",
    description: "Your #1 Market Hub for IPOs. Track real-time GMP, subscription status & AI analysis for all Indian IPOs.",
    url: 'https://ipo-ai-ui.netlify.app',
    siteName: 'IPO Bazar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IPO Bazar Preview',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: "summary_large_image",
    title: "IPO Bazar - Live Indian IPO Tracker 2025",
    description: "Your #1 Market Hub for IPOs. Track real-time GMP, subscription status & AI analysis for all Indian IPOs.",
    images: ["/og-image.png"],
    creator: "@ipo_bazar",
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
  other: {
    "author": "IPO Bazar Team",
    "publish_date": "2025-12-11",
    "article:published_time": "2025-12-11T20:00:00Z",
    "article:author": "IPO Bazar Analysis Team",
  }
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
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
