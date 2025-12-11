"use client";

import { IPOData } from "@/types/ipo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock, BarChart3, ChevronRight } from "lucide-react";
import { cn, formatDateIST } from "@/lib/utils";
import { motion } from "framer-motion";

interface MobileIPOCardProps {
    ipo: IPOData;
    onSelect: (ipo: IPOData) => void;
}

export function MobileIPOCard({ ipo, onSelect }: MobileIPOCardProps) {
    const getVerdictInfo = (gmpPercent: number) => {
        if (gmpPercent >= 50) return { label: "STRONG BUY", color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" };
        if (gmpPercent >= 20) return { label: "BUY", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" };
        if (gmpPercent >= 0) return { label: "NEUTRAL", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" };
        return { label: "AVOID", color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" };
    };

    const verdict = getVerdictInfo(ipo.gmpPercent);
    const isPositive = ipo.gmpPercent >= 0;

    const formatDate = (dateStr: string) => {
        return formatDateIST(dateStr);
    };

    return (
        <motion.div
            className="bg-card rounded-2xl border-0 shadow-lg p-5 space-y-4 hover:shadow-xl transition-all duration-300 active:scale-[0.99] bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
            onClick={() => onSelect(ipo)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-14 w-14 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shrink-0 flex items-center justify-center shadow-sm">
                        <img
                            src={ipo.logo}
                            alt={ipo.companyName}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base leading-tight truncate pr-2">{ipo.companyName}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className={cn(
                                "inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full",
                                ipo.sector === 'SME' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400'
                            )}>
                                <span className={cn("h-1.5 w-1.5 rounded-full", ipo.sector === 'SME' ? 'bg-amber-500' : 'bg-indigo-500')} />
                                {ipo.sector === 'SME' ? 'SME' : 'Mainboard'}
                            </span>
                            <span className={cn(
                                "text-[10px] font-medium px-2 py-0.5 rounded-full",
                                ipo.status === 'Current'
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                                    : ipo.status === 'Upcoming'
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
                                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            )}>
                                {ipo.status === 'Current' && <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1" />}
                                {ipo.status === 'Current' ? 'Live' : ipo.status}
                            </span>
                        </div>
                    </div>
                </div>

                <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap", verdict.color)}>
                    {verdict.label}
                </span>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/30 rounded-xl p-4 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">GMP</p>
                    <div className="flex items-center gap-2">
                        <span className={cn("text-xl font-bold", isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                            {isPositive ? '+' : ''}₹{ipo.gmp}
                        </span>
                        {isPositive ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                    </div>
                </div>
                <div className="space-y-1 text-right border-l border-gray-200 dark:border-gray-600 pl-4">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Expected</p>
                    <p className={cn("text-xl font-bold", isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                        {isPositive ? "+" : ""}{ipo.gmpPercent}%
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                        <Clock className="h-3.5 w-3.5" /> Open / Close
                    </p>
                    <p className="font-semibold text-sm" suppressHydrationWarning>{formatDate(ipo.openDate)} - {formatDate(ipo.closeDate)}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                        <BarChart3 className="h-3.5 w-3.5" /> Subscription
                    </p>
                    <p className="font-semibold text-sm">
                        {ipo.subscribed || "N/A"}
                    </p>
                </div>
            </div>

            <Button
                className="w-full gap-2 h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                size="sm"
            >
                View Full Analysis <ChevronRight className="h-4 w-4" />
            </Button>
        </motion.div>
    );
}
