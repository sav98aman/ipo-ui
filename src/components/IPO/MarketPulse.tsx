"use client";

import { useMemo, useState, useEffect } from "react";
import ipoData from "@/data/mockIpos.json";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            }, 2000);
        };

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

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="hidden md:flex fixed bottom-8 right-8 z-50 flex-col gap-3 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 text-green-700 dark:text-green-400 shadow-lg shadow-green-500/10 backdrop-blur-xl border border-green-500/20 pointer-events-auto cursor-default hover:scale-110 transition-transform"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <TrendingUp className="w-4 h-4 mb-0.5" />
                        <span className="text-sm font-bold">{stats.positive}</span>
                        <span className="text-[8px] font-medium uppercase opacity-80">Bullish</span>
                    </motion.div>

                    <motion.div
                        className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400/20 to-purple-500/20 text-indigo-700 dark:text-indigo-400 shadow-lg shadow-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 pointer-events-auto cursor-default hover:scale-110 transition-transform"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <Activity className="w-4 h-4 mb-0.5" />
                        <span className="text-sm font-bold">{stats.avgGmp}%</span>
                        <span className="text-[8px] font-medium uppercase opacity-80">Avg GMP</span>
                    </motion.div>

                    <motion.div
                        className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400/20 to-rose-500/20 text-red-700 dark:text-red-400 shadow-lg shadow-red-500/10 backdrop-blur-xl border border-red-500/20 pointer-events-auto cursor-default hover:scale-110 transition-transform"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                        <TrendingDown className="w-4 h-4 mb-0.5" />
                        <span className="text-sm font-bold">{stats.negative}</span>
                        <span className="text-[8px] font-medium uppercase opacity-80">Bearish</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
