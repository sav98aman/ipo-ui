import { IPOData } from "@/types/ipo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, BarChart3, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileIPOCardProps {
    ipo: IPOData;
    onSelect: (ipo: IPOData) => void;
}

export function MobileIPOCard({ ipo, onSelect }: MobileIPOCardProps) {
    // Helper for Verdict Color
    const getVerdictInfo = (gmpPercent: number) => {
        if (gmpPercent >= 50) return { label: "STRONG BUY", color: "bg-green-100 text-green-700 border-green-200" };
        if (gmpPercent >= 20) return { label: "BUY", color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
        if (gmpPercent >= 0) return { label: "NEUTRAL", color: "bg-gray-100 text-gray-700 border-gray-200" };
        return { label: "AVOID", color: "bg-red-100 text-red-700 border-red-200" };
    };

    const verdict = getVerdictInfo(ipo.gmpPercent);

    // Helper for formatting dates
    const formatDate = (dateStr: string) => {
        if (!dateStr || dateStr === "TBD") return "TBD";
        try {
            return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div
            className="bg-card rounded-xl border shadow-sm p-4 space-y-4 hover:shadow-md transition-shadow active:scale-[0.99]"
            onClick={() => onSelect(ipo)}
        >
            {/* Header */}
            <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3">
                    {/* Placeholder Logo or First Letter */}
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                        {ipo.companyName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-base leading-tight line-clamp-2">{ipo.companyName}</h3>
                        <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal">
                                {ipo.sector === 'SME' ? 'SME' : 'Mainboard'}
                            </Badge>
                            <Badge
                                variant={ipo.status === 'Current' ? 'default' : 'secondary'}
                                className="text-[10px] h-5 px-1.5 font-normal"
                            >
                                {ipo.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Verdict Badge - Top Right */}
                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full border border-current whitespace-nowrap", verdict.color)}>
                    {verdict.label}
                </span>
            </div>

            {/* GMP Section - Highlighted */}
            <div className="bg-muted/30 rounded-lg p-3 grid grid-cols-2 gap-4 border border-border/50">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Current GMP</p>
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg font-bold text-foreground">₹{ipo.gmp}</span>
                        <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                    </div>
                </div>
                <div className="space-y-1 text-right border-l pl-4">
                    <p className="text-xs text-muted-foreground font-medium">Expected Gain</p>
                    <p className={cn("text-lg font-bold", ipo.gmpPercent >= 0 ? "text-green-600" : "text-red-500")}>
                        {ipo.gmpPercent > 0 ? "+" : ""}{ipo.gmpPercent}%
                    </p>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2">
                <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Opens/Closes
                    </p>
                    <p className="font-medium">{formatDate(ipo.openDate)} - {formatDate(ipo.closeDate)}</p>
                </div>
                <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" /> Subscription
                    </p>
                    <p className="font-medium">
                        {ipo.subscribed || "N/A"}
                    </p>
                </div>
                <div className="space-y-0.5 col-span-2">
                    <p className="text-xs text-muted-foreground">Price Range</p>
                    <p className="font-medium">{ipo.priceRange}</p>
                </div>
            </div>

            {/* Action Button */}
            <Button className="w-full gap-2 mt-2" size="sm" variant="secondary">
                View Full Analysis <ChevronRight className="h-4 w-4 opacity-50" />
            </Button>
        </div>
    );
}
