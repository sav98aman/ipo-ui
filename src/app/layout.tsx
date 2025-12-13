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
  title: "LiveGMP - Live GMP & IPO Tracker 2025 | Real-time Grey Market Premium",
  description: "Track 185+ live IPOs on LiveGMP.com. Get real-time GMP Live updates, subscription status, AI allotment checks & grey market premiums for Mainboard & SME IPOs.",
  keywords: "Live GMP, GMP Live, LiveGMP, IPO GMP Live, IPO GMP, Grey Market Premium Live, IPO subscription status, SME IPO GMP, Mainboard IPO GMP",
  authors: [{ name: "LiveGMP Analysis Team" }],
  metadataBase: new URL('https://livegmp.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    title: "Live GMP - The #1 Real-Time IPO & GMP Tracker",
    description: "Don't guess, check Live GMP. The fastest updates for Grey Market Premium, IPO Allotment Status, and Listing Gains.",
    url: 'https://livegmp.com',
    siteName: 'LiveGMP',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LiveGMP - Live IPO Tracker',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: "summary_large_image",
    title: "Live GMP - Real-Time Grey Market Premium Tracker",
    description: "Track Live GMP, Subscription & Allotment status for all Indian IPOs. The fastest IPO updates on the web.",
    images: ["/og-image.png"],
    creator: "@livegmp",
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
    "author": "LiveGMP Team",
    "publish_date": "2025-12-13",
    "article:published_time": "2025-12-13T09:00:00Z",
    "article:author": "LiveGMP Analysis Team",
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
