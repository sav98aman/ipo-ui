"use client";

import { IPOData } from "@/types/ipo";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Flame } from "lucide-react";

interface TrendingSectionProps {
    ipos: IPOData[];
}

export function TrendingSection({ ipos }: TrendingSectionProps) {
    const topHot = [...ipos]
        .sort((a, b) => b.gmpPercent - a.gmpPercent)
        .slice(0, 4);

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                    <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Today's GMP Trends</h2>
                    <p className="text-sm text-muted-foreground">Top performing IPOs by grey market premium</p>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                {topHot.map((ipo, index) => (
                    <TrendingCard key={ipo.id} ipo={ipo} index={index} />
                ))}
            </div>
        </div>
    );
}

function TrendingCard({ ipo, index }: { ipo: IPOData; index: number }) {
    const isPositive = ipo.gmpPercent > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
        >
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${isPositive ? 'bg-gradient-to-b from-green-400 to-emerald-500' : 'bg-gradient-to-b from-red-400 to-red-500'}`} />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full" />

                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="relative h-12 w-12 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-1.5 shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                                <img
                                    src={ipo.logo}
                                    alt={ipo.companyName}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-base leading-tight truncate">{ipo.companyName}</h3>
                                <span className="inline-flex items-center gap-1.5 mt-1">
                                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${ipo.sector === 'Mainline' ? 'bg-indigo-500' : 'bg-amber-500'}`} />
                                    <span className="text-xs text-muted-foreground">{ipo.sector === 'Mainline' ? 'Main Board' : 'SME'}</span>
                                </span>
                            </div>
                        </div>

                        <div className="text-right shrink-0">
                            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'}`}>
                                <TrendingUp className={`h-3.5 w-3.5 ${!isPositive && 'rotate-180'}`} />
                                {isPositive ? '+' : ''}{ipo.gmpPercent}%
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">GMP</div>
                            <div className={`text-xl font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {isPositive ? '+' : ''}₹{ipo.gmp}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">Expected Listing</div>
                            <div className="text-lg font-semibold text-foreground">
                                ₹{ipo.expectedListing || 'TBD'}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
