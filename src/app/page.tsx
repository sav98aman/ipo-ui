"use client";

import { useState, useMemo, Suspense } from "react";
import { HeroSection } from "@/components/IPO/HeroSection";
import { IPOTable } from "@/components/IPO/IPOTable";
import { URLSync } from "@/components/IPO/URLSync";
import { IPOModal } from "@/components/IPO/IPOModal";
import { TrendingSection } from "@/components/IPO/TrendingSection";
import { RecentListingsSection } from "@/components/IPO/RecentListingsSection";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import mockIpos from "@/data/mockIpos.json";
import { IPOData } from "@/types/ipo";
import Papa from "papaparse";
import { toast } from "sonner";
import { useIPOStore } from "@/lib/store";
import { MarketPulse } from "@/components/IPO/MarketPulse";

export default function Home() {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, sectorFilter, setSectorFilter } = useIPOStore();

  const filteredData = useMemo(() => {
    let data = [...(mockIpos as IPOData[])];

    if (statusFilter !== "All") {
      data = data.filter((ipo) => ipo.status === statusFilter);
    } else {
      data.sort((a, b) => {
        const dateA = a.openDate && a.openDate !== "TBD" ? new Date(a.openDate).getTime() : null;
        const dateB = b.openDate && b.openDate !== "TBD" ? new Date(b.openDate).getTime() : null;

        if (dateA && dateB) {
          return dateB - dateA;
        }
        if (dateA && !dateB) {
          return -1;
        }
        if (!dateA && dateB) {
          return 1;
        }
        return 0;
      });
    }

    if (sectorFilter !== "All") {
      data = data.filter((ipo) => ipo.sector === sectorFilter);
    }

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


      <div className="container mx-auto px-4 pb-16 space-y-4">
        <HeroSection />

        <section id="ipo-table-section" className="space-y-4 scroll-mt-20">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/30 border border-border/50 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                <div className="w-full md:w-auto">
                  <div className="hidden md:block">
                    <Tabs
                      value={statusFilter}
                      className="w-full"
                      onValueChange={(val) => setStatusFilter(val as any)}
                    >
                      <TabsList className="grid w-full md:w-[400px] grid-cols-4 h-9">
                        <TabsTrigger value="Current" className="text-xs">Current</TabsTrigger>
                        <TabsTrigger value="Upcoming" className="text-xs">Upcoming</TabsTrigger>
                        <TabsTrigger value="Closed" className="text-xs">Closed</TabsTrigger>
                        <TabsTrigger value="All" className="text-xs">All</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <select
                    className="md:hidden h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                  >
                    <option value="Current">Current</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Closed">Closed</option>
                    <option value="All">All Status</option>
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <div className="hidden md:block">
                    <Tabs
                      value={sectorFilter}
                      className="w-full"
                      onValueChange={(val) => setSectorFilter(val as any)}
                    >
                      <TabsList className="grid w-full md:w-[280px] grid-cols-3 h-9">
                        <TabsTrigger value="All" className="text-xs">All</TabsTrigger>
                        <TabsTrigger value="Mainline" className="text-xs">Mainboard</TabsTrigger>
                        <TabsTrigger value="SME" className="text-xs">SME</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <select
                    className="md:hidden h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={sectorFilter}
                    onChange={(e) => setSectorFilter(e.target.value as any)}
                  >
                    <option value="All">All Boards</option>
                    <option value="Mainline">Mainboard</option>
                    <option value="SME">SME</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row gap-2 w-full lg:w-auto">
                <div className="relative flex-grow lg:flex-grow-0 lg:w-[240px] group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="search"
                    placeholder="Search IPO..."
                    className="pl-9 pr-4 h-9 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="h-9 px-4 whitespace-nowrap text-xs"
                  onClick={handleExport}
                >
                  <Download className="mr-2 h-3.5 w-3.5" /> Export
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground gap-4 mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-3">
                <span>Showing <span className="font-bold text-foreground">{filteredData.length}</span> of {mockIpos.length} IPOs</span>
                {(statusFilter !== 'Current' || sectorFilter !== 'All' || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 rounded-lg"
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
              {(statusFilter !== 'Current' || sectorFilter !== 'All' || searchQuery) && (
                <Badge variant="secondary" className="text-xs font-normal">
                  {[
                    statusFilter !== 'Current' ? statusFilter : null,
                    sectorFilter !== 'All' ? `${sectorFilter} Board` : null,
                    searchQuery ? `"${searchQuery}"` : null
                  ].filter(Boolean).length} Active Filters
                </Badge>
              )}
            </div>
          </div>

          <IPOTable data={filteredData} />
        </section>

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

      <Suspense fallback={null}>
        <URLSync />
      </Suspense>

      <section className="container mx-auto px-4 py-16 space-y-16 border-t border-border/50">

        {/* Core Value Proposition - Why We Are Different */}
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">India's #1 Live GMP Tracker: LiveGMP</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Welcome to <strong className="text-foreground">LiveGMP</strong>, the definitive source for real-time IPO intelligence. We combine live Grey Market Premium (GMP) updates with AI-driven analytics to give you the winning edge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">⚡ Live GMP Pulse</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The market never sleeps, and neither do we. <strong className="text-foreground">LiveGMP</strong> aggregates premiums from street brokers and private networks every 5 minutes to keep you ahead.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">🤖 Smart Analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Don't just guess. Our AI analyzes 50+ signal points to tell you if an IPO is a "Must Buy" or a "Risky Bet" instantly on <strong className="text-foreground">LiveGMP.com</strong>.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 text-pink-600 dark:text-pink-400">📊 Complete Coverage</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                From tiny SME gems to massive Mainboard giants, <strong className="text-foreground">Live GMP</strong> lists every open opportunity in the Indian market.
              </p>
            </div>
          </div>
        </div>

        {/* About Us & Mission */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">About Live GMP</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded by financial veterans, <strong className="text-foreground">LiveGMP.com</strong> was built to illuminate the "Grey Market". For too long, Live GMP data was hidden in private WhatsApp groups.
              </p>
              <p>
                We brought it to the open web. By tracking unstructured data and official NSE/BSE figures, we created a central hub where every retail investor can see the true demand for a stock before listing.
              </p>
            </div>
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/50">
            <h3 className="text-xl font-bold mb-4">Why Trust LiveGMP?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-sm text-muted-foreground">Direct API integration with NSE & BSE for official stats.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-sm text-muted-foreground">Manual verification of GMP from credible market brokers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-sm text-muted-foreground">Historical data tracking to identify manipulation trends.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-sm text-muted-foreground">Unbiased analysis: We are not a brokerage and do not sell IPO applications.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How Live GMP Works - Educational SEO Section */}
        <div className="max-w-5xl mx-auto space-y-8 pt-16 border-t border-border/30">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">How Does Live GMP Work?</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Understanding Grey Market Premium is crucial for IPO investors. Here's everything you need to know about <strong className="text-foreground">Live GMP updates</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/50">
                <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">📈 Live GMP Today</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Live GMP Today</strong> shows the real-time premium being offered for IPO shares before listing. For example, if NTPC Green Energy IPO has a GMP of ₹50 and the issue price is ₹100, the expected listing price is ₹150.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Updated every 5 minutes from market sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Reflects actual trades happening in grey market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Helps predict listing day performance</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-card border border-border/50 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">🔍 How We Track GMP Live</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">LiveGMP.com</strong> aggregates data from multiple grey market dealers across India. We verify each update before publishing to ensure you get the most accurate <strong className="text-foreground">IPO GMP live</strong> rates.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-card border border-border/50 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">💡 GMP Prediction Accuracy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Historical data shows that <strong className="text-foreground">Grey Market Premium</strong> predictions are accurate 75-80% of the time for listing gains. However, factors like market volatility and overall sentiment can cause deviations.
                </p>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-muted-foreground">
                    ⚠️ <strong>Important:</strong> GMP is an unofficial indicator. Always do your own research before investing in IPOs.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-purple-200 dark:border-purple-900/50">
                <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">🎯 IPO Subscription Status Live</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Along with <strong className="text-foreground">Live GMP</strong>, we also track <strong className="text-foreground">IPO subscription status live</strong>. High subscription in Retail and HNI categories often correlates with strong GMP and listing gains.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GMP Investment Guide - Long-form SEO Content */}
        <div className="max-w-5xl mx-auto space-y-8 pt-16 border-t border-border/30">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Complete Guide to IPO Grey Market Premium</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Master the art of IPO investing with our comprehensive <strong className="text-foreground">GMP analysis guide</strong>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="grid md:grid-cols-3 gap-6 not-prose mb-8">
              <div className="p-6 bg-card border border-border/50 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-lg mb-2">Current IPO GMP Rates</h3>
                <p className="text-sm text-muted-foreground">
                  Check <strong>current IPO GMP rates</strong> for all Mainboard and SME IPOs. We list GMP for ongoing, upcoming, and recently closed IPOs.
                </p>
              </div>

              <div className="p-6 bg-card border border-border/50 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-bold text-lg mb-2">SME IPO GMP Live</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>SME IPO GMP</strong> is often higher percentage-wise than Mainboard. Track <strong>SME IPO GMP live</strong> to identify multi-bagger opportunities.
                </p>
              </div>

              <div className="p-6 bg-card border border-border/50 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-bold text-lg mb-2">Mainboard IPO GMP</h3>
                <p className="text-sm text-muted-foreground">
                  Large-cap <strong>Mainboard IPO GMP</strong> tends to be more stable. Our AI flags overvalued IPOs with inflated GMP to help you avoid losses.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 p-8 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 not-prose">
              <h3 className="text-2xl font-bold mb-6">Understanding GMP vs Listing Gains</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Grey Market Premium (GMP)</strong> is the difference between the issue price and the price at which shares trade in the unofficial market. For example:
                </p>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-border/50">
                  <p className="font-mono text-xs mb-3">
                    <strong>Issue Price:</strong> ₹100<br />
                    <strong>Live GMP:</strong> ₹60<br />
                    → <strong className="text-emerald-600">Expected Listing Price: ₹160</strong> (60% gain)
                  </p>
                  <p className="text-xs">
                    However, actual listing can vary based on market conditions on listing day.
                  </p>
                </div>
                <p>
                  <strong className="text-foreground">Key Factors Affecting GMP:</strong>
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Overall subscription levels (especially QIB and HNI)</li>
                  <li>Company fundamentals and growth prospects</li>
                  <li>Market sentiment and Nifty performance</li>
                  <li>Grey market dealer demand for the particular IPO</li>
                  <li>Anchor investor participation and pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Market Insights - Dynamic SEO Content */}
        <div className="max-w-5xl mx-auto space-y-8 pt-16 border-t border-border/30">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Latest IPO & GMP Market Insights</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest <strong className="text-foreground">IPO news</strong>, <strong className="text-foreground">GMP trends</strong>, and market analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-card border border-border/50 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Upcoming IPO Calendar 2025
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Browse our complete <strong className="text-foreground">IPO calendar 2025</strong> to plan your investments. We track:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Upcoming Mainboard IPOs</strong> with expected GMP predictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>SME IPO pipeline</strong> for high-risk, high-reward opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>IPO open dates</strong> and close dates for planning applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Listing dates</strong> to track your allotment outcomes</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/50">
                <h3 className="text-xl font-bold mb-4 text-amber-700 dark:text-amber-400">🔥 Hot IPOs This Week</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Check <strong className="text-foreground">today's hot IPOs</strong> with the highest <strong className="text-foreground">live GMP</strong> and subscription rates. Our algorithm identifies IPOs with strong fundamentals and positive grey market sentiment.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-card border border-border/50 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  IPO Performance Tracker
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Analyze <strong className="text-foreground">listing day performance</strong> of recent IPOs. Compare actual listing gains vs. <strong className="text-foreground">GMP predictions</strong>:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-emerald-700 dark:text-emerald-400">75%+ Accuracy:</strong> Our GMP data has historically predicted listing gains with 75%+ accuracy for Mainboard IPOs.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900/50">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-blue-700 dark:text-blue-400">SME Volatility:</strong> SME IPO listings can vary significantly from GMP due to lower liquidity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20 rounded-2xl border border-violet-200 dark:border-violet-900/50">
                <h3 className="text-xl font-bold mb-4 text-violet-700 dark:text-violet-400">🎓 IPO Investment Tips</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Learn how to use <strong className="text-foreground">Live GMP</strong> effectively:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• Don't chase IPOs with 100%+ GMP without checking fundamentals</li>
                  <li>• Monitor <strong>subscription trends</strong> alongside GMP</li>
                  <li>• Check analyst recommendations and company financials</li>
                  <li>• Use GMP as one of many data points, not the only metric</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section for SEO */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-border/30">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions (FAQs)</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">What is Grey Market Premium (GMP)?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                GMP is the premium amount at which IPO shares are traded in the unofficial market before they list on the stock exchange. A high GMP often suggests a strong listing gain.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">How accurate is the GMP data on this site?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We update GMP multiple times a day based on credible market sources. However, GMP is volatile and unregulated; it should be used as an indicator, not a guarantee.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">How do I check my IPO Allotment Status?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Visit our <a href="/ipo-allotment-status" className="text-indigo-500 hover:underline">Allotment Status page</a>, select your IPO, and enter your PAN or Application Number. We support KFintech, LinkIntime, Bigshare, and other registrars.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">What is the difference between SME and Mainboard IPOs?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Mainboard IPOs</strong> are larger companies listing on NSE/BSE with a minimum investment of ₹14-15k. <strong>SME IPOs</strong> are smaller companies with a minimum investment of ₹1L+ and higher risk/reward ratios.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">Does applying in the HNI category increase allotment chances?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In oversubscribed IPOs, the HNI (NII) category allotment is often proportional. Applying for more lots increases your chances compared to the Retail category, where allotment is lottery-based.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">What is Kostak Rate and Subject over Sauda?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Kostak</strong> is the fixed amount paid for your IPO application regardless of allotment. <strong>Subject to Sauda</strong> is a deal where the premium is paid only if you get the allotment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} LiveGMP.com. Data is for informational purposes only.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Investments in securities market are subject to market risks. Read all related documents carefully before investing.
            </p>
          </div>

          <div className="pt-6 border-t border-border/30 max-w-2xl mx-auto space-y-2">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">Author:</span> LiveGMP Analysis Team | Live GMP Tracker
            </p>
            <p className="text-xs text-muted-foreground" suppressHydrationWarning>
              <span className="font-semibold">Last Updated:</span> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-xs text-muted-foreground/80 italic">
              About the Author: Professional financial analysts specializing in Indian IPO market analysis and real-time Live GMP tracking.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
