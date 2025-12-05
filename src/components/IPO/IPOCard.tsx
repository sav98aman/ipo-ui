import { IPOData } from "@/types/ipo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIPOStore } from "@/lib/store";
import { motion } from "framer-motion";

interface IPOCardProps {
    ipo: IPOData;
    index: number;
}

export function IPOCard({ ipo, index }: IPOCardProps) {
    const setSelectedIPO = useIPOStore((state) => state.setSelectedIPO);

    const isPositive = ipo.gmp > 0;
    const isNegative = ipo.gmp < 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Card
                className="overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                onClick={() => setSelectedIPO(ipo)}
            >
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full border bg-white p-1 shrink-0">
                                <img src={ipo.logo} alt={ipo.companyName} className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">{ipo.companyName}</h3>
                                <p className="text-xs text-muted-foreground">{ipo.sector === 'Mainline' ? 'Main Board' : ipo.sector}</p>
                            </div>
                        </div>
                        <Badge variant={ipo.status === 'Upcoming' ? 'secondary' : ipo.status === 'Current' ? 'default' : 'outline'}>
                            {ipo.status}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground text-xs">Price Range</p>
                            <p className="font-medium">{ipo.priceRange}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs">Open Date</p>
                            <p className="font-medium">{ipo.openDate}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <div>
                            <p className="text-xs text-muted-foreground">GMP</p>
                            <p className={`font-bold ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : ''}`}>
                                ₹{ipo.gmp}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Expected Gain</p>
                            <p className={`font-bold ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : ''}`}>
                                {ipo.gmpPercent}%
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
