import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GMP AI IPO – Live Premium IPO Tracker",
  description: "Track the latest Mainline and SME IPOs in India with real-time GMP, subscription status, and AI-driven analysis. The smartest way to watch IPOs.",
  metadataBase: new URL('https://ipo-ai-ui.netlify.app'),
  openGraph: {
    title: "GMP AI IPO – Live Premium IPO Tracker",
    description: "Track the latest Mainline and SME IPOs in India with real-time GMP, subscription status, and AI-driven analysis.",
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
    type: 'website',
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
