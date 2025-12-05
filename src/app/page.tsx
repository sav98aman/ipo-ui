
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
import { Download, Search } from "lucide-react";
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
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-12 space-y-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Table Section */}
        <section id="ipo-table-section" className="space-y-6 scroll-mt-20">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Tabs
                defaultValue="Current"
                className="w-full md:w-auto"
                onValueChange={(val) => setStatusFilter(val as any)}
              >
                <TabsList className="grid w-full grid-cols-3 md:w-[300px]">
                  <TabsTrigger value="Current">Current</TabsTrigger>
                  <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="All">All</TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs
                defaultValue="All"
                className="w-full md:w-auto"
                onValueChange={(val) => setSectorFilter(val as any)}
              >
                <TabsList className="grid w-full grid-cols-3 md:w-[300px]">
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Mainline">Main Board</TabsTrigger>
                  <TabsTrigger value="SME">SME</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search companies..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
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

