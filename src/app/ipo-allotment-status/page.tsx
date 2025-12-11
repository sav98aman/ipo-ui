import { Metadata } from 'next';
import StatusClient from './StatusClient';

export const metadata: Metadata = {
    title: "IPO Allotment Status Checker 2025 | NSE SME IPO Results",
    description: "Check IPO allotment status instantly for Mainboard & SME IPOs. Verify your shares, refunds and listing details in real-time.",
    keywords: "IPO allotment status, check IPO result, SME IPO allotment, Mainboard IPO status, KFintech IPO status, LinkIntime status, NSE IPO result, BSE IPO allotment",
    alternates: {
        canonical: '/ipo-allotment-status',
    },
    openGraph: {
        title: "IPO Allotment Status Checker 2025 | NSE SME IPO Results",
        description: "Check IPO allotment status instantly for Mainboard & SME IPOs. Verify your shares, refunds and listing details in real-time.",
        url: 'https://ipo-ai-ui.netlify.app/ipo-allotment-status',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'IPO Allotment Status Checker 2025',
            },
        ],
    },
    other: {
        "author": "GMP AI IPO Team",
        "publish_date": "2025-12-11",
    }
};

export default function StatusPage() {
    return <StatusClient />;
}
