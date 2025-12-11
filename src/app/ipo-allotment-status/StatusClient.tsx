"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Search, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import mockIpos from "@/data/mockIpos.json";
import ipoRegistrarsMap from "@/data/ipo-registrars-map.json";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type SectorFilter = 'All' | 'SME' | 'Mainline';

export default function StatusClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sectorFilter, setSectorFilter] = useState<SectorFilter>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const openStatusPopup = (url: string) => {
        const width = 1000;
        const height = 800;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            url,
            'IPOStatus',
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
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

    // Pagination Logic
    const totalPages = Math.ceil(filteredIpos.length / itemsPerPage) || 1;
    const paginatedIpos = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredIpos.slice(start, start + itemsPerPage);
    }, [filteredIpos, currentPage]);

    // Reset pagination when filters change
    useMemo(() => {
        setCurrentPage(1);
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

            {/* Info Section */}
            <div className="bg-muted/20 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Alert className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertTitle className="text-blue-800 dark:text-blue-300">How to Check Allotment Status?</AlertTitle>
                        <AlertDescription className="text-blue-700/80 dark:text-blue-400/80 text-xs mt-1">
                            1. Select the IPO from the list below. <br />
                            2. Click on "Check Status" to visit the official registrar's portal.<br />
                            3. Select the IPO Name from the dropdown on the registrar's site.<br />
                            4. Enter your PAN Number, Application Number, or DP Client ID.
                        </AlertDescription>
                    </Alert>
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
                    <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50 border-b">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-sm">Company Details</th>
                                        <th className="text-left p-4 font-semibold text-sm">Price & Subscription</th>
                                        <th className="text-left p-4 font-semibold text-sm">Listing Date</th>
                                        <th className="text-left p-4 font-semibold text-sm">GMP</th>
                                        <th className="text-center p-4 font-semibold text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedIpos.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center p-8 text-muted-foreground">
                                                No IPOs found matching your search
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedIpos.map((ipo) => (
                                            <tr key={ipo.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold text-base">{ipo.companyName}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                                                                {ipo.sector}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                                                                {ipo.id}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="text-sm font-medium">
                                                            {ipo.priceRange}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            Subscribed: <span className="font-medium text-foreground">{ipo.subscribed}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-sm bg-muted/50 px-2 py-1 rounded-md" suppressHydrationWarning>
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
                                                            {ipo.gmpPercent !== null && ipo.gmpPercent > 0 && (
                                                                <span className="text-xs text-muted-foreground">
                                                                    +{ipo.gmpPercent}%
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        className="gap-2 w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-sm"
                                                        onClick={() => openStatusPopup(ipo.registrar.link)}
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

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 border-t pt-6">
                            <div className="text-sm text-muted-foreground">
                                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-muted/80 border-t border-border p-6 text-center backdrop-blur-sm space-y-6">
                <p className="text-sm font-medium text-muted-foreground">
                    Click "Check Status" to verify your allotment with the official registrar
                </p>

                <div className="pt-4 border-t border-border/30 max-w-2xl mx-auto space-y-2">
                    <p className="text-xs text-muted-foreground">
                        <span className="font-semibold">Author:</span> IPO Analysis Team | GMP AI IPO
                    </p>
                    <p className="text-xs text-muted-foreground/80 italic">
                        About the Author: Professional financial analysts specializing in Indian IPO market analysis and real-time GMP tracking.
                    </p>
                </div>
            </div>
        </div>
    );
}
