import { ColumnDef } from "@tanstack/react-table";
import { IPOData } from "@/types/ipo";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/IPO/CountdownTimer";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
            const date = new Date(dateStr);
            // Check for invalid date
            if (isNaN(date.getTime())) return <span className="text-xs">{dateStr}</span>;

            return <div className="text-xs whitespace-nowrap font-medium text-muted-foreground">
                {date.toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
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
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return <span className="text-xs">{dateStr}</span>;

            return <span className="text-xs whitespace-nowrap font-medium text-muted-foreground">
                {date.toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
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
        accessorKey: "aiSummary",
        header: "Verdict",
        cell: ({ row }) => {
            const summary = row.getValue("aiSummary") as string;
            const hasVerdict = summary && summary !== "Analysis pending...";
            return (
                <div className="max-w-[150px] text-xs">
                    {hasVerdict ? (
                        <span className="font-medium text-foreground">{summary}</span>
                    ) : (
                        <span className="text-muted-foreground italic text-[10px]">Pending</span>
                    )}
                </div>
            );
        },
    },
];
