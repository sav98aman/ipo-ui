import { IPOData } from "@/types/ipo";
import { ReactNode } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
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

            // Format data for the chart
            const chartData = ipo.gmpHistory.map(item => ({
                ...item,
                formattedDate: new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
            }));

            // Dynamic Gradient Logic
            const gradientId = `gmpGradient-${ipo.id}`;
            const stops = [];
            let prevColor = "#22c55e"; // Default start (Green)

            const len = chartData.length;
            if (len > 1) {
                for (let i = 0; i < len - 1; i++) {
                    const current = chartData[i].gmp;
                    const next = chartData[i + 1].gmp;

                    let color = prevColor;
                    if (next > current) color = "#22c55e"; // Green
                    else if (next < current) color = "#ef4444"; // Red
                    // If flat (next == current), keep prevColor

                    prevColor = color;

                    const startOffset = (i / (len - 1)) * 100;
                    const endOffset = ((i + 1) / (len - 1)) * 100;

                    stops.push(<stop key={`${i}-start`} offset={`${startOffset}%`} stopColor={color} stopOpacity={1} />);
                    stops.push(<stop key={`${i}-end`} offset={`${endOffset}%`} stopColor={color} stopOpacity={1} />);
                }
            } else {
                stops.push(<stop key="0" offset="0%" stopColor="#22c55e" stopOpacity={1} />);
                stops.push(<stop key="1" offset="100%" stopColor="#22c55e" stopOpacity={1} />);
            }

            // Determine current active color for text (Last segment logic)
            const textVal = chartData[len - 1]?.gmp || 0;
            const prevTextVal = chartData[len - 2]?.gmp || 0;
            // If crashed to 0, force Red. If flat at 0, Red.
            const isBearish = textVal < prevTextVal || (textVal === 0 && len > 1);
            const textColor = isBearish ? "#ef4444" : "#22c55e";

            return (
                <div id="gmp-chart-container" className="mt-2 bg-background p-4 rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <div>
                            <h4 className="text-lg font-bold text-foreground">{ipo.companyName}</h4>
                            <p className="text-xs text-muted-foreground">GMP Trend</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold" style={{ color: textColor }}>{ipo.gmpPercent}%</p>
                            <p className="text-xs text-muted-foreground">Current</p>
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    {/* Horizontal Color Gradient (Green/Red) */}
                                    <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                                        {stops}
                                    </linearGradient>

                                    {/* Vertical Opacity Gradient (for Mask) - Increased Intensity */}
                                    <linearGradient id="opacityGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="white" stopOpacity={0.95} />
                                        <stop offset="95%" stopColor="white" stopOpacity={0.2} />
                                    </linearGradient>

                                    {/* Mask combining the vertical opacity */}
                                    <mask id="fadeMask">
                                        <rect x="0" y="0" width="100%" height="100%" fill="url(#opacityGradient)" />
                                    </mask>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                                <XAxis
                                    dataKey="formattedDate"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#94a3b8' }}
                                    dy={10}
                                />
                                <YAxis
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#94a3b8' }}
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        borderColor: '#334155',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                        color: '#f8fafc'
                                    }}
                                    itemStyle={{ color: textColor }}
                                    cursor={{ stroke: '#64748b', strokeWidth: 1 }}
                                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                                    formatter={(value: number) => [`₹${value}`, 'GMP']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="gmp"
                                    stroke={`url(#${gradientId})`}
                                    strokeWidth={3}
                                    fill={`url(#${gradientId})`}
                                    mask="url(#fadeMask)"
                                    activeDot={{ r: 6, fill: textColor, stroke: "#fff", strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
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
