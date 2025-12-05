"use client";

import { useMemo, useState, useEffect } from "react";
import ipoData from "@/data/mockIpos.json";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export function MarketPulse() {
    const [isVisible, setIsVisible] = useState(false);

    const stats = useMemo(() => {
        const validIpos = ipoData.filter(i => typeof i.gmp === 'number');
        const positive = validIpos.filter(i => i.gmp > 0).length;
        const negative = validIpos.filter(i => i.gmp <= 0).length;
        const totalGmpPercent = validIpos.reduce((acc, curr) => acc + (curr.gmpPercent || 0), 0);
        const avgGmp = validIpos.length ? (totalGmpPercent / validIpos.length).toFixed(1) : "0";
        return { positive, negative, avgGmp };
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleActivity = () => {
            setIsVisible(false);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsVisible(true);
            }, 2000); // Show after 2 seconds of idleness
        };

        // Initial trigger
        timeoutId = setTimeout(() => setIsVisible(true), 2000);

        window.addEventListener("scroll", handleActivity);
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("touchstart", handleActivity);
        window.addEventListener("click", handleActivity);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", handleActivity);
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("touchstart", handleActivity);
            window.removeEventListener("click", handleActivity);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 animate-in fade-in zoom-in duration-500 pointer-events-none">
            {/* Positive Sentiment Bubble */}
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400 shadow-lg shadow-green-500/10 animate-bounce-slow backdrop-blur-md border border-green-500/20 pointer-events-auto cursor-default hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4 mb-0.5" />
                <span className="text-sm font-bold">{stats.positive}</span>
                <span className="text-[8px] font-medium uppercase opacity-80">Pos</span>
            </div>

            {/* Avg GMP Bubble */}
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 shadow-lg shadow-blue-500/10 animate-bounce-delayed backdrop-blur-md border border-blue-500/20 pointer-events-auto cursor-default hover:scale-110 transition-transform">
                <Activity className="w-4 h-4 mb-0.5" />
                <span className="text-sm font-bold">{stats.avgGmp}%</span>
                <span className="text-[8px] font-medium uppercase opacity-80">Avg</span>
            </div>

            {/* Negative Sentiment Bubble */}
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-400 shadow-lg shadow-red-500/10 animate-bounce-slower backdrop-blur-md border border-red-500/20 pointer-events-auto cursor-default hover:scale-110 transition-transform">
                <TrendingDown className="w-4 h-4 mb-0.5" />
                <span className="text-sm font-bold">{stats.negative}</span>
                <span className="text-[8px] font-medium uppercase opacity-80">Neg</span>
            </div>
        </div>
    );
}
