"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    const scrollToTable = () => {
        const tableElement = document.getElementById("ipo-table-section");
        if (tableElement) {
            tableElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative py-6 md:py-8 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/30 dark:via-background dark:to-purple-950/30" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="absolute top-6 left-6 hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="p-1.5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border border-white/20">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
            </div>

            <div className="absolute top-10 right-10 hidden lg:block animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                <div className="p-1.5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border border-white/20">
                    <BarChart3 className="h-4 w-4 text-indigo-500" />
                </div>
            </div>

            <div className="relative text-center space-y-3 max-w-4xl mx-auto px-4">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] sm:text-xs font-medium mb-1">
                        <Sparkles className="h-3 w-3" />
                        AI-Powered Analysis
                    </span>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
                    <span className="gradient-text">IPO Bazar</span>
                    <span className="text-foreground ml-2">Live 2025</span>
                </h1>

                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Real-time GMP, Subscription Status & Listing Estimates for Mainboard & SME IPOs.
                </p>

                <div className="flex flex-row items-center justify-center gap-3 pt-1">
                    <Button
                        size="sm"
                        className="h-9 px-5 font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm transition-all"
                        onClick={scrollToTable}
                    >
                        View Live IPOs
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                    <Link href="/ipo-allotment-status">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-5 font-semibold rounded-lg border hover:bg-secondary/80 transition-all"
                        >
                            Allotment Status
                            <Search className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
