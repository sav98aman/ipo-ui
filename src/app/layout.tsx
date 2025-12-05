import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

import SchemaMarkup from "@/components/SEO/SchemaMarkup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPO Watch - Live Indian IPO Tracker | Real-time GMP Analysis",
  description: "Track latest Indian IPOs with real-time GMP, subscription status, and AI-driven analysis. Monitor Mainline and SME IPOs live with our advanced dashboard.",
  keywords: "IPO tracker India, live GMP tracker, IPO subscription, Indian IPO analysis, SME IPO, Mainboard IPO, GMP live, IPO allotment status",
  authors: [{ name: "GMP AI IPO" }],
  viewport: "width=device-width, initial-scale=1.0",
  metadataBase: new URL('https://ipo-ai-ui.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    title: "IPO Watch - Live Indian IPO Tracker | Real-time GMP",
    description: "Track latest Mainline and SME IPOs with real-time GMP, subscription status, and AI-driven analysis.",
    url: 'https://ipo-ai-ui.netlify.app',
    siteName: 'GMP AI IPO',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GMP AI IPO Preview',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: "summary_large_image",
    title: "IPO Watch - Live Indian IPO Tracker",
    description: "Track latest Mainline and SME IPOs with real-time GMP, subscription status, and AI-driven analysis.",
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
