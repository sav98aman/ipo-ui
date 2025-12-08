
"use client";

import { useState, useMemo, Suspense } from "react";
import { HeroSection } from "@/components/IPO/HeroSection";
import { IPOTable } from "@/components/IPO/IPOTable";
import { URLSync } from "@/components/IPO/URLSync";
import { IPOModal } from "@/components/IPO/IPOModal";
import { TrendingSection } from "@/components/IPO/TrendingSection";
import { RecentListingsSection } from "@/components/IPO/RecentListingsSection";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Search, X, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import mockIpos from "@/data/mockIpos.json";
import lastUpdateMeta from "@/data/lastUpdate.json";
import { IPOData } from "@/types/ipo";
import Papa from "papaparse";
import { toast } from "sonner";
import { useIPOStore } from "@/lib/store";
import { MarketPulse } from "@/components/IPO/MarketPulse";
import { formatDateTimeIST } from "@/lib/utils";
import { IPOLogo, LogoOption1, LogoOption2, LogoOption3, LogoOption4, LogoOption5 } from "@/components/ui/logo";

// Format the last update timestamp
const formatLastUpdate = () => {
  return formatDateTimeIST(lastUpdateMeta.lastUpdated);
};

export default function Home() {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, sectorFilter, setSectorFilter } = useIPOStore();

  // Filter logic
  const filteredData = useMemo(() => {
    let data = [...(mockIpos as IPOData[])];

    // Status Filter
    if (statusFilter !== "All") {
      data = data.filter((ipo) => ipo.status === statusFilter);
    } else {
      // Sort by openDate descending (most recent first)
      // IPOs without openDate or "TBD" go to the bottom
      data.sort((a, b) => {
        const dateA = a.openDate && a.openDate !== "TBD" ? new Date(a.openDate).getTime() : null;
        const dateB = b.openDate && b.openDate !== "TBD" ? new Date(b.openDate).getTime() : null;

        if (dateA && dateB) {
          return dateB - dateA; // Descending
        }
        if (dateA && !dateB) {
          return -1; // A comes first
        }
        if (!dateA && dateB) {
          return 1; // B comes first
        }
        return 0; // Both invalid/TBD
      });
    }

    // Sector Filter
    if (sectorFilter !== "All") {
      data = data.filter((ipo) => ipo.sector === sectorFilter);
    }

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter((ipo) =>
        ipo.companyName.toLowerCase().includes(query)
      );
    }

    return data;
  }, [searchQuery, statusFilter, sectorFilter]);

  const handleExport = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "ipo_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Exported Successfully");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar / Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-2 sm:px-4 h-16 flex items-center justify-center relative">
          {/* Logo */}
          <div className="flex items-center gap-2 absolute left-2 sm:left-4">
            <IPOLogo className="h-10 w-10 sm:h-12 sm:w-12" />
            <span className="hidden sm:inline font-bold text-lg sm:text-xl tracking-tight">
              GMP AI IPO
            </span>
          </div>

          {/* Centered Timestamp - Smaller on mobile */}
          <div className="flex items-center gap-2 mx-16 sm:mx-0">
            <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground whitespace-nowrap hidden sm:inline-block" suppressHydrationWarning>
              Last updated: {formatLastUpdate()}
            </span>
            <span className="text-[9px] text-muted-foreground whitespace-nowrap sm:hidden" suppressHydrationWarning>
              {formatLastUpdate()}
            </span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-1 sm:gap-2 absolute right-2 sm:right-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground"
              onClick={() => window.location.reload()}
              title="Refresh Data"
            >
              <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-12 space-y-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Table Section */}
        <section id="ipo-table-section" className="space-y-6 scroll-mt-20">
          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-end">

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto">
              {/* Status Group */}
              <div className="space-y-2 w-full md:w-auto">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>

                {/* Desktop Tabs */}
                <div className="hidden md:block">
                  <Tabs
                    value={statusFilter}
                    className="w-full"
                    onValueChange={(val) => setStatusFilter(val as any)}
                  >
                    <TabsList className="grid w-[400px] grid-cols-4 bg-muted/50">
                      <TabsTrigger value="Current">Current</TabsTrigger>
                      <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="Closed">Closed</TabsTrigger>
                      <TabsTrigger value="All">All</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Mobile Dropdown */}
                <select
                  className="md:hidden h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                >
                  <option value="Current">Current</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Closed">Closed</option>
                  <option value="All">All Status</option>
                </select>
              </div>

              {/* Type Group */}
              <div className="space-y-2 w-full md:w-auto">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Board Type</label>

                {/* Desktop Tabs */}
                <div className="hidden md:block">
                  <Tabs
                    value={sectorFilter}
                    className="w-full"
                    onValueChange={(val) => setSectorFilter(val as any)}
                  >
                    <TabsList className="grid w-[280px] grid-cols-3 bg-muted/50">
                      <TabsTrigger value="All">All</TabsTrigger>
                      <TabsTrigger value="Mainline">Mainboard</TabsTrigger>
                      <TabsTrigger value="SME">SME</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Mobile Dropdown */}
                <select
                  className="md:hidden h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value as any)}
                >
                  <option value="All">All Boards</option>
                  <option value="Mainline">Mainboard</option>
                  <option value="SME">SME</option>
                </select>
              </div>
            </div>

            {/* Search & Export */}
            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto items-end">
              <div className="relative w-full xl:w-[400px] group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="search"
                  placeholder="Search IPO..."
                  className="pl-10 h-10 w-full bg-background border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-10 px-4 whitespace-nowrap w-full sm:w-auto" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
          </div>

          {/* Active Filters & Counts */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground gap-4">
            <div className="flex items-center gap-2">
              <span>Showing <span className="font-bold text-foreground">{filteredData.length}</span> of {mockIpos.length} IPOs</span>
              {(statusFilter !== 'Current' || sectorFilter !== 'All' || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => {
                    setStatusFilter('Current');
                    setSectorFilter('All');
                    setSearchQuery('');
                  }}
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear Filters
                </Button>
              )}
            </div>
            {/* Dynamic Filter Badge */}
            {(statusFilter !== 'Current' || sectorFilter !== 'All' || searchQuery) && (
              <Badge variant="secondary" className="text-xs font-normal">
                {[
                  statusFilter !== 'Current' ? statusFilter : null,
                  sectorFilter !== 'All' ? `${sectorFilter} Board` : null,
                  searchQuery ? `Search: "${searchQuery}"` : null
                ].filter(Boolean).length} Active Filters
              </Badge>
            )}
          </div>

          <IPOTable data={filteredData} />
        </section>

        {/* Secondary Sections */}
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TrendingSection ipos={mockIpos as IPOData[]} />
          </div>
          <div>
            <RecentListingsSection ipos={mockIpos as IPOData[]} />
          </div>
        </div>
      </div>

      <IPOModal />
      <MarketPulse />

      {/* URL Synchronization */}
      <Suspense fallback={null}>
        <URLSync />
      </Suspense>

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 py-12 prose prose-sm dark:prose-invert max-w-none text-muted-foreground border-t">
        <h2 className="text-foreground font-bold text-2xl mb-4">India's Premier Live IPO Tracker & GMP Analysis</h2>
        <p>
          Welcome to <strong className="text-foreground">GMP AI IPO</strong>, the most advanced <strong>IPO tracker for India</strong>.
          We provide real-time updates on <strong className="text-foreground">live GMP (Grey Market Premium)</strong>,
          subscription status, and listing estimates for both <strong>Mainboard IPOs</strong> and <strong>SME IPOs</strong>.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-2">Why Track GMP Live?</h3>
            <p>
              The <em>Grey Market Premium</em> is a key indicator of market sentiment. Our <strong>live GMP tracker</strong> helps investors
              gauge potential listing gains before the official listing date. Whether you are tracking a massive Mainboard launch or a
              fast-moving SME IPO, getting accurate GMP data is crucial for making informed application decisions.
            </p>
          </div>
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-2">Comprehensive IPO Analysis</h3>
            <p>
              Beyond just prices, we offer detailed <strong>IPO subscription status</strong> updates for Retail, HNI, and QIB categories.
              Our AI-driven verdict helps simplify complex financial data into actionable insights, making us the reliable
              destination for <strong>Indian IPO analysis</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} GMP AI IPO. Data is for informational purposes only.</p>
          <p className="mt-2">Investments in securities market are subject to market risks, read all the related documents carefully before investing.</p>
        </div>
      </footer>
    </main>
  );
}

