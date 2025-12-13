import { Metadata } from 'next';
import StatusClient from './StatusClient';

export const metadata: Metadata = {
    title: "IPO Allotment Status Check Live | KFintech, LinkIntime | LiveGMP",
    description: "Check your IPO allotment status instantly. Support for KFintech, LinkIntime, Bigshare registrars. Enter PAN or Application Number for real-time IPO allotment results.",
    keywords: "IPO allotment status, check IPO allotment, KFintech status, LinkIntime IPO status, Bigshare IPO check, NSE IPO allotment, IPO result, allotment status live",
    alternates: {
        canonical: 'https://livegmp.com/ipo-allotment-status',
    },
    openGraph: {
        title: "Check IPO Allotment Status Live - LiveGMP",
        description: "Instant IPO allotment status check for all registrars. Enter your PAN/Application Number to verify shares allocated.",
        url: 'https://livegmp.com/ipo-allotment-status',
        type: 'website',
    },
    other: {
        "author": "LiveGMP Team",
        "publish_date": "2025-12-13",
    }
};

export default function StatusPage() {
    return <StatusClient />;
}
