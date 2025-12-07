import { IPOData } from "@/types/ipo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
            <h2 className="text-2xl font-bold tracking-tight">Recent Listings & Closures</h2>
            <div className="grid gap-4">
                {recentClosed.map((ipo) => (
                    <Card key={ipo.id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full border bg-white p-1 shrink-0 hidden sm:block">
                                    <img src={ipo.logo} alt={ipo.companyName} className="h-full w-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{ipo.companyName}</h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{ipo.sector === 'Mainline' ? 'Main Board' : ipo.sector}</span>
                                        <span>•</span>
                                        <span>Closed: {formatDateIST(ipo.closeDate)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-green-600">+{ipo.gmpPercent}%</div>
                                <Badge variant="outline" className="mt-1">Closed</Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
