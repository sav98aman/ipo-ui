import { ColumnDef } from "@tanstack/react-table";
import { IPOData } from "@/types/ipo";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/IPO/CountdownTimer";

export const tableColumns: ColumnDef<IPOData>[] = [
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => {
            const ipo = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border bg-white">
                        <img
                            src={ipo.logo}
                            alt={ipo.companyName}
                            className="h-full w-full object-contain p-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-foreground">{ipo.companyName}</span>
                        <span className="text-xs text-muted-foreground">{ipo.sector === 'Mainline' ? 'Main Board' : ipo.sector}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "openDate",
        header: "Open Date",
        cell: ({ row }) => {
            const dateStr = row.getValue("openDate") as string;
            if (!dateStr || dateStr === "TBD") return <span className="whitespace-nowrap">TBD</span>;
            try {
                return <span className="whitespace-nowrap">{new Date(dateStr).toLocaleDateString()}</span>;
            } catch {
                return <span className="whitespace-nowrap">{dateStr}</span>;
            }
        },
    },
    {
        accessorKey: "closeDate",
        header: "Close Date",
        cell: ({ row }) => {
            const dateStr = row.getValue("closeDate") as string;
            if (!dateStr || dateStr === "TBD") return <span className="whitespace-nowrap">TBD</span>;
            try {
                return <span className="whitespace-nowrap">{new Date(dateStr).toLocaleDateString()}</span>;
            } catch {
                return <span className="whitespace-nowrap">{dateStr}</span>;
            }
        },
    },
    {
        id: "countdown",
        header: "Time Left",
        cell: ({ row }) => {
            return (
                <CountdownTimer
                    openDate={row.original.openDate}
                    closeDate={row.original.closeDate}
                />
            );
        },
    },
    {
        accessorKey: "priceRange",
        header: "Price Range",
    },
    {
        accessorKey: "issueSize",
        header: "Issue Size",
    },
    {
        accessorKey: "gmp",
        header: "GMP (₹)",
        cell: ({ row }) => {
            const gmp = row.original.gmp;
            const gmpPercent = row.original.gmpPercent;
            const isPositive = gmp > 0;
            const isNegative = gmp < 0;

            return (
                <div className="flex flex-col">
                    <span
                        className={`font-bold ${isPositive
                            ? "text-green-600"
                            : isNegative
                                ? "text-red-600"
                                : "text-gray-500"
                            }`}
                    >
                        ₹{gmp}
                    </span>
                    <span
                        className={`text-xs ${isPositive
                            ? "text-green-600"
                            : isNegative
                                ? "text-red-600"
                                : "text-gray-500"
                            }`}
                    >
                        ({gmpPercent}%)
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            let color = "default";
            if (status === "Upcoming") color = "blue"; // We'll handle classes manually or map to badge variants
            if (status === "Current") color = "orange";
            if (status === "Closed") color = "green";

            const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
                Upcoming: "secondary",
                Current: "default", // default is usually black/primary, maybe we want custom styles
                Closed: "outline",
            };

            // Custom styling for specific statuses to match prompt colors
            let className = "";
            if (status === "Upcoming") className = "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
            if (status === "Current") className = "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200";
            if (status === "Closed") className = "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";

            return (
                <Badge variant="outline" className={`border ${className}`}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "aiSummary",
        header: "AI Verdict",
        cell: ({ row }) => {
            const summary = row.getValue("aiSummary") as string;
            const displayText = (!summary || summary === "Analysis pending...") ? "Coming Soon" : summary;

            return (
                <div className="max-w-[200px] truncate text-xs text-muted-foreground" title={displayText}>
                    {displayText}
                </div>
            );
        },
    },
];
