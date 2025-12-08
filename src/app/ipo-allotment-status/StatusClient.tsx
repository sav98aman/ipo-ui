"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Search } from "lucide-react";
import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import mockIpos from "@/data/mockIpos.json";
import ipoRegistrarsMap from "@/data/ipo-registrars-map.json";

export default function StatusClient() {
    const [searchQuery, setSearchQuery] = useState("");

    const openPopup = (url: string, title: string) => {
        const width = 500;
        const height = 700;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        window.open(
            url,
            title,
            `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,resizable=yes`
        );
    };

    // Filter and prepare data
    const filteredIpos = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];

        return mockIpos
            .filter(ipo => {
                // Filter: closed IPOs only
                if (ipo.closeDate === "TBD") return false;
                if (ipo.closeDate >= today) return false;

                // Filter: must have registrar mapping
                // @ts-ignore
                const registrarInfo = ipoRegistrarsMap[ipo.id];
                if (!registrarInfo) return false;

                // Search filter
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    const matches = ipo.companyName.toLowerCase().includes(query) ||
                        ipo.id.toLowerCase().includes(query);
                    if (!matches) return false;
                }

                return true;
            })
            .map(ipo => {
                // @ts-ignore
                const registrarInfo = ipoRegistrarsMap[ipo.id];
                return {
                    ...ipo,
                    registrar: registrarInfo.registrar
                };
            })
            .sort((a, b) => {
                // Sort by listing date descending
                if (a.listingDate === "TBD" && b.listingDate === "TBD") return 0;
                if (a.listingDate === "TBD") return 1;
                if (b.listingDate === "TBD") return -1;
                return new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime();
            });
    }, [searchQuery]);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* Header */}
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

            {/* Search Bar */}
            <div className="bg-muted/40 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by company name or symbol..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Showing {filteredIpos.length} IPOs with closed bidding
                    </p>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="border rounded-lg overflow-hidden bg-card">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50 border-b">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-sm">Symbol</th>
                                        <th className="text-left p-4 font-semibold text-sm">Listing Date</th>
                                        <th className="text-left p-4 font-semibold text-sm">GMP</th>
                                        <th className="text-left p-4 font-semibold text-sm">Registrar</th>
                                        <th className="text-center p-4 font-semibold text-sm">Check Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredIpos.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center p-8 text-muted-foreground">
                                                No IPOs found matching your search
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredIpos.map((ipo) => (
                                            <tr key={ipo.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{ipo.companyName}</span>
                                                        <span className="text-xs text-muted-foreground">{ipo.sector}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-sm" suppressHydrationWarning>
                                                        {ipo.listingDate === "TBD" ? "TBD" : new Date(ipo.listingDate).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {ipo.gmp > 0 ? (
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-green-600 dark:text-green-400">
                                                                ₹{ipo.gmp}
                                                            </span>
                                                            {ipo.gmpPercent > 0 && (
                                                                <span className="text-xs text-muted-foreground">
                                                                    +{ipo.gmpPercent}%
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-sm text-muted-foreground">{ipo.registrar.name}</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="gap-2"
                                                        onClick={() => openPopup(ipo.registrar.link, `status_${ipo.id}`)}
                                                    >
                                                        Check Status <ExternalLink className="h-3 w-3" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-muted/80 border-t border-border p-3 text-center backdrop-blur-sm">
                <p className="text-[11px] font-medium text-muted-foreground">
                    Click "Check Status" to verify your allotment with the official registrar
                </p>
            </div>
        </div>
    );
}
