"use client";

import Script from "next/script";

export default function SchemaMarkup() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "LiveGMP - Live Grey Market Premium Tracker",
        "description": "Real-time IPO tracking platform with live GMP, subscription status, and AI-driven analysis for Mainboard and SME IPOs in India.",
        "url": "https://livegmp.com",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        },
        "image": "https://livegmp.com/icon.png",
        "publisher": {
            "@type": "Organization",
            "name": "LiveGMP",
            "logo": "https://livegmp.com/icon.png"
        },
        "creator": "LiveGMP Analysis Team"
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "LiveGMP",
        "url": "https://livegmp.com",
        "description": "India's leading real-time IPO GMP tracking and analysis platform",
        "logo": "https://livegmp.com/icon.png",
        "sameAs": [
            "https://twitter.com/livegmp",
            "https://linkedin.com/company/livegmp"
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is GMP in IPO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GMP (Grey Market Premium) is the price at which IPO shares are traded in the grey market before the official listing on the stock exchange. It indicates market sentiment about the IPO and potential listing gains."
                }
            },
            {
                "@type": "Question",
                "name": "How to check live GMP today?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use LiveGMP.com to check real-time GMP updates for all Indian IPOs. We update GMP data every 5 minutes from credible grey market sources."
                }
            },
            {
                "@type": "Question",
                "name": "How to check IPO subscription status live?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "LiveGMP tracker provides real-time subscription status showing subscription multiples for Retail, QIB, and NII categories during the IPO period."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between Mainboard and SME IPO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mainboard IPOs are from larger, established companies with minimum investment of ₹14-15k, while SME IPOs are from smaller enterprises with minimum investment of ₹1L+ and higher risk/reward ratios."
                }
            },
            {
                "@type": "Question",
                "name": "How accurate is Live GMP for predicting listing gains?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Historical data shows Live GMP predictions are 75-80% accurate for listing gains on Mainboard IPOs. However, GMP is volatile and should be used as one of many indicators, not a guarantee."
                }
            }
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://livegmp.com"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "IPO Allotment Status",
            "item": "https://livegmp.com/ipo-allotment-status"
        }]
    };

    return (
        <>
            <Script id="schema-webapp" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <Script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </>
    );
}
