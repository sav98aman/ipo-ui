"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, RefreshCcw, ShieldAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from 'react';

export default function StatusPage() {
    const openPopup = (url: string, title: string) => {
        const width = 500;
        const height = 700;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        window.open(url, title, `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* Header with Glassmorphism */}
            <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" className="gap-2 pl-0 hover:bg-muted hover:text-primary transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                            </Button>
                        </Link>
                        <div className="h-6 w-px bg-border/50 hidden sm:block"></div>
                        <h1 className="text-lg font-bold tracking-tight">IPO Allotment Status</h1>
                    </div>
                </div>
            </div>

            {/* Tabs Container */}
            <Tabs defaultValue="kfintech" className="flex-1 flex flex-col w-full h-full">
                <div className="bg-muted/40 border-b border-border">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                        <TabsList className="grid w-full max-w-[800px] grid-cols-4 bg-muted border border-border/50">
                            <TabsTrigger value="kfintech" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">KFintech</TabsTrigger>
                            <TabsTrigger value="mufg" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">MUFG</TabsTrigger>
                            <TabsTrigger value="bse" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">BSE</TabsTrigger>
                            <TabsTrigger value="nse" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">NSE</TabsTrigger>
                        </TabsList>
                        <p className="text-xs text-muted-foreground hidden md:block font-medium">
                            Select the registrar assigned to the IPO
                        </p>
                    </div>
                </div>

                <div className="flex-1 relative bg-background overflow-hidden">
                    {/* KFintech Tab - Direct Embed (Works) */}
                    <TabsContent value="kfintech" className="h-full w-full m-0 p-0 absolute inset-0 flex flex-col">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 text-muted-foreground z-0">
                            <RefreshCcw className="h-6 w-6 animate-spin opacity-50" />
                            <p className="text-sm font-medium">Loading KFintech Portal...</p>
                        </div>
                        <iframe
                            src="https://ipostatus.kfintech.com/"
                            className="flex-1 w-full border-none relative z-10 bg-background"
                            title="KFintech IPO Status"
                            loading="lazy"
                        />
                    </TabsContent>

                    {/* MUFG Tab - Popup Mode (Secure & Functional) */}
                    <TabsContent value="mufg" className="h-full w-full m-0 p-0 absolute inset-0 bg-muted/20">
                        <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-6 text-center">
                            {/* Premium Card Design */}
                            <div className="bg-card w-full max-w-md p-8 rounded-xl border border-border shadow-lg flex flex-col items-center gap-6">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                    <ShieldAlert className="h-10 w-10 text-primary" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold tracking-tight">Secure Portal Access</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The MUFG / LinkIntime portal requires a secure search window to protect your data and ensure functionality.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 w-full">
                                    <Button size="lg" onClick={() => openPopup('https://in.mpms.mufg.com/Initial_Offer/public-issues.html', 'mufg_status')} className="w-full gap-2 font-semibold shadow-md active:scale-[0.98] transition-all">
                                        Launch Secure Popup <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mt-2">
                                        Recommended for Accuracy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* BSE Tab - Universal Backup (Popup Mode) */}
                    <TabsContent value="bse" className="h-full w-full m-0 p-0 absolute inset-0 bg-muted/20">
                        <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-6 text-center">
                            {/* Premium Card Design */}
                            <div className="bg-card w-full max-w-md p-8 rounded-xl border border-border shadow-lg flex flex-col items-center gap-6">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                    <ShieldAlert className="h-10 w-10 text-primary" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold tracking-tight">BSE Universal Checker</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Access the official Bombay Stock Exchange portal to check status for any listed IPO.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 w-full">
                                    <Button size="lg" onClick={() => openPopup('https://www.bseindia.com/investors/appli_check.aspx', 'bse_status')} className="w-full gap-2 font-semibold shadow-md active:scale-[0.98] transition-all">
                                        Launch BSE Portal <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mt-2">
                                        Universal Backup for all IPOs
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* NSE Tab - Verification (Popup Mode - Force Required due to CSP) */}
                    <TabsContent value="nse" className="h-full w-full m-0 p-0 absolute inset-0 bg-muted/20">
                        <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-6 text-center">
                            {/* Premium Card Design */}
                            <div className="bg-card w-full max-w-md p-8 rounded-xl border border-border shadow-lg flex flex-col items-center gap-6">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                    <ShieldAlert className="h-10 w-10 text-destructive" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold tracking-tight">Embedding Restricted</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The National Stock Exchange (NSE) has strict security policies that block this page from being viewed inside another website.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 w-full">
                                    <Button size="lg" onClick={() => openPopup('https://www.nseindia.com/invest/check-trades-bids-verify-ipo-bids', 'nse_status')} className="w-full gap-2 font-semibold shadow-md active:scale-[0.98] transition-all">
                                        Launch Secure Popup <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mt-2">
                                        Action Required: Open New Window
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>

            {/* Footer Info */}
            <div className="bg-muted/80 border-t border-border p-3 text-center z-20 relative backdrop-blur-sm">
                <p className="text-[11px] font-medium text-muted-foreground">
                    Tip: Use the 'BSE' tab as a universal backup if the specific registrar portal is slow.
                </p>
            </div>
        </div>
    );
}
