"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Search, X } from "lucide-react";
import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import mockIpos from "@/data/mockIpos.json";
import ipoRegistrarsMap from "@/data/ipo-registrars-map.json";

type SectorFilter = 'All' | 'SME' | 'Mainline';

export default function StatusClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sectorFilter, setSectorFilter] = useState<SectorFilter>('All');

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const openStatusModal = (url: string, companyName: string) => {
        setModalUrl(url);
        setModalTitle(`Check Status - ${companyName}`);
        setModalOpen(true);
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

                // Sector filter
                if (sectorFilter !== 'All' && ipo.sector !== sectorFilter) return false;

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
    }, [searchQuery, sectorFilter]);

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

            {/* Search Bar & Filters */}
            <div className="bg-muted/40 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by company name or symbol..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {/* Sector Filter */}
                        <div className="flex gap-2">
                            {(['All', 'SME', 'Mainline'] as SectorFilter[]).map((filter) => (
                                <Button
                                    key={filter}
                                    size="sm"
                                    variant={sectorFilter === filter ? 'default' : 'outline'}
                                    onClick={() => setSectorFilter(filter)}
                                    className="min-w-[70px]"
                                >
                                    {filter === 'Mainline' ? 'Mainboard' : filter}
                                </Button>
                            ))}
                        </div>
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
                                                        onClick={() => openStatusModal(ipo.registrar.link, ipo.companyName)}
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

            {/* Status Check Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-4xl w-[95vw] h-[85vh] flex flex-col p-0">
                    <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-lg font-semibold">{modalTitle}</DialogTitle>
                            <a
                                href={modalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                            >
                                Open in new tab <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                        <iframe
                            src={modalUrl}
                            className="w-full h-full border-0"
                            title="IPO Allotment Status"
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
