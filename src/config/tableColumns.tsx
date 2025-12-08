import { ColumnDef } from "@tanstack/react-table";
import { IPOData } from "@/types/ipo";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/IPO/CountdownTimer";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import { formatDateIST } from "@/lib/utils";

// Safe date formatter that works same on server and client
const formatDateSafe = (dateStr: string): string => {
    return formatDateIST(dateStr);
};


export const tableColumns: ColumnDef<IPOData>[] = [
    {
        accessorKey: "companyName",
        header: ({ column }) => {
            return (
                <div className="flex justify-start">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        Company
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const ipo = row.original;
            const status = ipo.status;

            let borderClass = "border-4 rounded-full";

            if (status === "Current") {
                // Live: Green Round
                borderClass += " border-emerald-500";
            } else if (status === "Upcoming") {
                // Upcoming: Yellow U-shape (Top transparent)
                borderClass += " border-yellow-500 border-t-transparent";
            } else {
                // Closed: Red C-shape (Right transparent)
                borderClass += " border-red-500 border-r-transparent";
            }

            return (
                <div className="flex items-center gap-3 min-w-[200px]">
                    <div className={`relative h-12 w-12 overflow-hidden bg-white flex-shrink-0 ${borderClass} group cursor-help`}>
                        <img
                            src={ipo.logo}
                            alt={ipo.companyName}
                            className="h-full w-full object-contain p-1 transition-all duration-300 group-hover:opacity-10 filter group-hover:blur-[1px]"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className={`font-bold text-[10px] leading-none ${ipo.gmp > 0 ? 'text-green-600' : ipo.gmp < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                ₹{ipo.gmp}
                            </div>
                            <div className={`text-[8px] font-medium leading-none mt-0.5 ${ipo.gmp > 0 ? 'text-green-600' : ipo.gmp < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                {ipo.gmpPercent}%
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-tight">{ipo.companyName}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{ipo.sector === 'Mainline' ? 'Main Board' : ipo.sector}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "gmp",
        header: ({ column }) => {
            return (
                <div className="flex justify-start">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        GMP / Gain
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const gmp = row.original.gmp;
            const priceRange = row.original.priceRange;
            const isPositive = gmp > 0;
            const isNegative = gmp < 0;

            // Calculate Implied Gain %
            // Extract max price from "₹100 - ₹120" or "₹100"
            let maxPrice = 0;
            if (priceRange) {
                const numbers = priceRange.match(/\d+/g);
                if (numbers) {
                    maxPrice = Math.max(...numbers.map(Number));
                }
            }

            let gainPercent = 0;
            if (maxPrice > 0) {
                gainPercent = (gmp / maxPrice) * 100;
            }

            return (
                <div className="flex flex-col items-start pl-2">
                    <div
                        className={`font-extrabold text-sm ${isPositive
                            ? "text-green-600 dark:text-green-400"
                            : isNegative
                                ? "text-red-600 dark:text-red-400"
                                : "text-muted-foreground"
                            }`}
                    >
                        ₹{gmp} {isPositive && "↑"}
                    </div>
                    {maxPrice > 0 && Math.abs(gmp) > 0 && (
                        <div
                            className={`text-[10px] font-medium ${isPositive
                                ? "text-green-600/80 dark:text-green-400/80"
                                : isNegative
                                    ? "text-red-600/80 dark:text-red-400/80"
                                    : "text-muted-foreground"
                                }`}
                        >
                            ({gainPercent.toFixed(1)}%)
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "openDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                    Open
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const dateStr = row.getValue("openDate") as string;
            if (!dateStr || dateStr === "TBD") return <span className="text-muted-foreground">-</span>;

            return <div className="text-xs whitespace-nowrap font-medium text-muted-foreground" suppressHydrationWarning>
                {formatDateSafe(dateStr)}
            </div>;
        },
    },
    {
        accessorKey: "closeDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-3 h-8 data-[state=open]:bg-accent"
                >
                    Close
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const dateStr = row.getValue("closeDate") as string;
            if (!dateStr || dateStr === "TBD") return <span className="text-muted-foreground">-</span>;

            return <span className="text-xs whitespace-nowrap font-medium text-muted-foreground" suppressHydrationWarning>
                {formatDateSafe(dateStr)}
            </span>;
        },
    },
    {
        id: "countdown",
        header: "Time Left",
        cell: ({ row }) => {
            return (
                <div className="min-w-[100px]">
                    <CountdownTimer
                        openDate={row.original.openDate}
                        closeDate={row.original.closeDate}
                    />
                </div>
            );
        },
    },
    {
        id: "subscription",
        header: "Subscription",
        cell: ({ row }) => {
            const ipo = row.original;
            return (
                <div className="group relative cursor-help w-max">
                    <span className="font-semibold text-sm">{ipo.subscribed || "-"}</span>
                    {/* Tooltip Content */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max hidden group-hover:block bg-popover text-popover-foreground text-xs rounded-md border p-2 z-50 shadow-md">
                        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                            <span className="text-muted-foreground">Retail:</span> <span className="font-medium text-right">{ipo.retail || "-"}</span>
                            <span className="text-muted-foreground">QIB:</span> <span className="font-medium text-right">{ipo.qib || "-"}</span>
                            <span className="text-muted-foreground">NII:</span> <span className="font-medium text-right">{ipo.nii || "-"}</span>
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "priceRange",
        header: () => <div className="text-right">Price Range</div>,
        cell: ({ row }) => <div className="text-right font-medium text-xs whitespace-nowrap">{row.original.priceRange}</div>,
    },
    {
        accessorKey: "lotSize",
        header: () => <div className="text-right">Lot Size</div>,
        cell: ({ row }) => <div className="text-right text-xs text-muted-foreground">{row.original.lotSize} Shares</div>
    },
    {
        accessorKey: "issueSize",
        header: () => <div className="text-right">Issue Size</div>,
        cell: ({ row }) => <div className="text-right text-xs text-muted-foreground">{row.original.issueSize}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            let className = "";
            let label: string = status;

            // Simplified status logic for cleaner badges
            if (status === "Upcoming") {
                className = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800";
            } else if (status === "Current") {
                className = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 animate-pulse";
                label = "Live";
            } else if (status === "Closed") {
                className = "bg-muted text-muted-foreground border-border";
            }

            return (
                <Badge variant="outline" className={`border whitespace-nowrap text-[10px] uppercase px-2 py-0.5 ${className}`}>
                    {label}
                </Badge>
            );
        },
    },
    {
        id: "aiVerdict",
        header: "AI Verdict",
        cell: ({ row }) => {
            const ipo = row.original;
            const gmpPercent = ipo.gmpPercent;

            // Rule-based Verdict Logic based on GMP
            let verdict = "NEUTRAL";
            let colorClass = "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300";

            if (gmpPercent !== undefined && gmpPercent !== null) {
                if (gmpPercent >= 50) {
                    verdict = "STRONG BUY";
                    colorClass = "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800";
                } else if (gmpPercent >= 20) {
                    verdict = "BUY";
                    colorClass = "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800";
                } else if (gmpPercent >= 5) {
                    verdict = "HOLD";
                    colorClass = "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800";
                } else if (gmpPercent < 5 && gmpPercent > -5) {
                    verdict = "NEUTRAL";
                } else {
                    verdict = "AVOID";
                    colorClass = "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800";
                }
            } else {
                if (ipo.status === "Closed") return <span className="text-muted-foreground text-xs">-</span>;
                verdict = "WAIT"; // No GMP yet
            }

            return (
                <div className="min-w-[80px]">
                    <Badge variant="secondary" className={`border whitespace-nowrap text-[9px] font-bold px-2 py-0.5 ${colorClass}`}>
                        {verdict}
                    </Badge>
                </div>
            );
        },
    },
];
