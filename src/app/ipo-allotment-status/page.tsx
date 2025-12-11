import { Metadata } from 'next';
import StatusClient from './StatusClient';

export const metadata: Metadata = {
    title: "IPO Allotment Status Checker 2025 | NSE SME IPO Results",
    description: "Check IPO allotment status instantly for Mainboard & SME IPOs. Verify your shares, refunds and listing details in real-time.",
    keywords: "IPO status, check IPO allotment, KFintech status, LinkIntime IPO status, BSE IPO check, NSE IPO allotment, IPO result",
    alternates: {
        canonical: '/ipo-allotment-status',
    },
    openGraph: {
        title: "IPO Allotment Status Checker 2025 | NSE SME IPO Results",
        description: "Check IPO allotment status instantly for Mainboard & SME IPOs. Verify your shares, refunds and listing details in real-time.",
        url: 'https://ipo-ai-ui.netlify.app/ipo-allotment-status',
        type: 'website',
    },
    other: {
        "author": "GMP AI IPO Team",
        "publish_date": "2025-12-11",
    }
};

export default function StatusPage() {
    return <StatusClient />;
}
