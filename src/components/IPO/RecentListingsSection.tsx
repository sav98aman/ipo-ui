"use client";

import { IPOData } from "@/types/ipo";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatDateIST } from "@/lib/utils";

interface RecentListingsSectionProps {
    ipos: IPOData[];
}

export function RecentListingsSection({ ipos }: RecentListingsSectionProps) {
    const recentClosed = ipos
        .filter(i => i.status === 'Closed')
        .sort((a, b) => {
            const dateA = a.closeDate && a.closeDate !== "TBD" ? new Date(a.closeDate).getTime() : 0;
            const dateB = b.closeDate && b.closeDate !== "TBD" ? new Date(b.closeDate).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25">
                    <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-tight">Recent Closures</h2>
                    <p className="text-sm text-muted-foreground">Latest IPO performances</p>
                </div>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                        {recentClosed.length > 0 ? (
                            recentClosed.map((ipo, index) => (
                                <RecentListingItem key={ipo.id} ipo={ipo} index={index} />
                            ))
                        ) : (
                            <div className="p-6 text-center text-muted-foreground text-sm">
                                No recent closures available
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function RecentListingItem({ ipo, index }: { ipo: IPOData; index: number }) {
    const isPositive = ipo.gmpPercent >= 0;

    return (
        <motion.div
            className="flex items-center gap-3 p-4 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
        >
            <div className="relative h-10 w-10 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shrink-0 shadow-sm">
                <img
                    src={ipo.logo}
                    alt={ipo.companyName}
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{ipo.companyName}</h4>
                <p className="text-xs text-muted-foreground" suppressHydrationWarning>
                    Closed: {formatDateIST(ipo.closeDate)}
                </p>
            </div>

            <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'}`}>
                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {isPositive ? '+' : ''}{ipo.gmpPercent}%
            </div>
        </motion.div>
    );
}
