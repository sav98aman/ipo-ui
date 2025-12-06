import { Metadata } from 'next';
import StatusClient from './StatusClient';

export const metadata: Metadata = {
    title: "Check IPO Allotment Status - KFintech, LinkIntime, BSE, NSE | IPO Watch",
    description: "Check your IPO allotment status across all major registrars including KFintech, LinkIntime (MUFG), BSE, and NSE. Real-time status checking with secure popup access.",
    keywords: "IPO status, check IPO allotment, KFintech status, LinkIntime IPO status, BSE IPO check, NSE IPO allotment, IPO result",
    alternates: {
        canonical: '/status',
    },
    openGraph: {
        title: "Check IPO Allotment Status | IPO Watch",
        description: "Universal IPO Status Checker for KFintech, LinkIntime, BSE, and NSE.",
        url: 'https://ipo-ai-ui.netlify.app/status',
        type: 'website',
    },
};

export default function StatusPage() {
    return <StatusClient />;
}
