import { IPOData } from "@/types/ipo";
import { ReactNode } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface ModalSection {
    id: string;
    title: string;
    render: (ipo: IPOData) => ReactNode;
}

export const modalSections: ModalSection[] = [
    {
        id: "details",
        title: "Issue Details",
        render: (ipo) => (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Price Range</p>
                    <p className="font-medium">{ipo.priceRange}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Lot Size</p>
                    <p className="font-medium">{ipo.lotSize} Shares</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Issue Size</p>
                    <p className="font-medium">{ipo.issueSize}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Open Date</p>
                    <p className="font-medium">{ipo.openDate}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Close Date</p>
                    <p className="font-medium">{ipo.closeDate}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Listing Date</p>
                    <p className="font-medium">{ipo.listingDate}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Lead Manager</p>
                    <p className="font-medium">{ipo.leadManager}</p>
                </div>
            </div>
        ),
    },
    {
        id: "subscription",
        title: "Subscription Status",
        render: (ipo) => (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-lg font-bold text-primary">{ipo.subscribed}</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Retail</p>
                    <p className="font-semibold">{ipo.retail}</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                    <p className="text-xs text-muted-foreground">QIB</p>
                    <p className="font-semibold">{ipo.qib}</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                    <p className="text-xs text-muted-foreground">NII</p>
                    <p className="font-semibold">{ipo.nii}</p>
                </div>
            </div>
        ),
    },
    {
        id: "gmp_trend",
        title: "GMP Trend",
        render: (ipo) => {
            if (!ipo.gmpHistory || ipo.gmpHistory.length === 0) {
                return <p className="text-sm text-muted-foreground">No GMP history available.</p>;
            }
            return (
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={ipo.gmpHistory}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="date" fontSize={12} tickMargin={10} />
                            <YAxis fontSize={12} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="gmp"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            );
        },
    },
    {
        id: "ai_analysis",
        title: "AI Analysis",
        render: (ipo) => (
            <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm leading-relaxed">{ipo.aiSummary}</p>
            </div>
        ),
    },
    {
        id: "links",
        title: "Official Links",
        render: (ipo) => (
            <div className="flex flex-wrap gap-3">
                {ipo.nseUrl && (
                    <Button variant="outline" size="sm" asChild>
                        <a href={ipo.nseUrl} target="_blank" rel="noopener noreferrer">
                            NSE <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                    </Button>
                )}
                {ipo.bseUrl && (
                    <Button variant="outline" size="sm" asChild>
                        <a href={ipo.bseUrl} target="_blank" rel="noopener noreferrer">
                            BSE <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                    </Button>
                )}
                {ipo.prospectusUrl && (
                    <Button variant="outline" size="sm" asChild>
                        <a href={ipo.prospectusUrl} target="_blank" rel="noopener noreferrer">
                            Prospectus <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                    </Button>
                )}
            </div>
        ),
    },
];
