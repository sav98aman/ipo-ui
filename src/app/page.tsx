
"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "@/components/IPO/HeroSection";
import { IPOTable } from "@/components/IPO/IPOTable";
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
import { IPOData } from "@/types/ipo";
import Papa from "papaparse";
import { toast } from "sonner";
import { useIPOStore } from "@/lib/store";
import { MarketPulse } from "@/components/IPO/MarketPulse";

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
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            GMP AI IPO 🚀
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-xs text-muted-foreground mr-2">
              Last updated: {new Date().toLocaleDateString("en-IN", { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })} IST
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 mr-2 text-muted-foreground hover:text-foreground"
              onClick={() => window.location.reload()}
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
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
            <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
              {/* Status Group */}
              <div className="space-y-2 w-full sm:w-auto">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
                <Tabs
                  defaultValue="Current"
                  className="w-full sm:w-auto"
                  onValueChange={(val) => setStatusFilter(val as any)}
                >
                  <TabsList className="grid w-full grid-cols-3 sm:w-[320px] bg-muted/50">
                    <TabsTrigger value="Current" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Current</TabsTrigger>
                    <TabsTrigger value="Upcoming" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Upcoming</TabsTrigger>
                    <TabsTrigger value="All" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">All</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Type Group */}
              <div className="space-y-2 w-full sm:w-auto">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Board Type</label>
                <Tabs
                  defaultValue="All"
                  className="w-full sm:w-auto"
                  onValueChange={(val) => setSectorFilter(val as any)}
                >
                  <TabsList className="grid w-full grid-cols-3 sm:w-[280px] bg-muted/50">
                    <TabsTrigger value="All" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">All</TabsTrigger>
                    <TabsTrigger value="Mainline" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Mainboard</TabsTrigger>
                    <TabsTrigger value="SME" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">SME</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Search & Export */}
            <div className="flex gap-3 w-full xl:w-auto items-end">
              <div className="relative w-full xl:w-[400px] group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="search"
                  placeholder="Search by company, sector..."
                  className="pl-10 h-10 w-full bg-background border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-10 px-4 whitespace-nowrap" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          {/* Active Filters & Counts */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
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

