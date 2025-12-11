"use client";

import Script from "next/script";

export default function SchemaMarkup() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "IPO Watch - Live Indian IPO Tracker",
        "description": "Real-time IPO tracking platform with live GMP, subscription status, and AI-driven analysis for Mainline and SME IPOs.",
        "url": "https://ipo-ai-ui.netlify.app",
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
        "image": "https://ipo-ai-ui.netlify.app/icon.png",
        "publisher": {
            "@type": "Organization",
            "name": "GMP AI IPO Team",
            "logo": "https://ipo-ai-ui.netlify.app/icon.png"
        },
        "creator": "GMP AI IPO Team"
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "GMP AI IPO",
        "url": "https://ipo-ai-ui.netlify.app",
        "description": "India's leading real-time IPO tracking and analysis platform",
        "logo": "https://ipo-ai-ui.netlify.app/icon.png",
        "sameAs": [
            "https://twitter.com/ipo_watch",
            "https://linkedin.com/company/ipo-watch"
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
                    "text": "GMP (Grey Market Premium) is the price at which IPO shares are traded in the grey market before the official listing on the stock exchange. It indicates market sentiment about the IPO."
                }
            },
            {
                "@type": "Question",
                "name": "How to check IPO subscription status?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use our IPO Watch tracker to check real-time subscription status showing subscription multiples for Retail, QIB, and NII categories during the IPO period."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between Mainboard and SME IPO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mainboard IPOs are from larger, established companies, while SME IPOs are from smaller and medium enterprises. SME IPOs have different listing criteria and regulations."
                }
            },
            {
                "@type": "Question",
                "name": "How often is the IPO data updated?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our IPO Watch tracker updates data in real-time throughout the trading day to provide you with the latest GMP trends and subscription status."
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
            "item": "https://ipo-ai-ui.netlify.app"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "IPO Allotment Status",
            "item": "https://ipo-ai-ui.netlify.app/ipo-allotment-status"
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
