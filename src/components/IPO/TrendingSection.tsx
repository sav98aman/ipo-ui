import { IPOData } from "@/types/ipo";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface TrendingSectionProps {
    ipos: IPOData[];
}

export function TrendingSection({ ipos }: TrendingSectionProps) {
    const topHot = [...ipos]
        .sort((a, b) => b.gmpPercent - a.gmpPercent)
        .slice(0, 4);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Today's GMP Trends 🔥</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {topHot.map((ipo, index) => (
                    <TrendingCard key={ipo.id} ipo={ipo} index={index} />
                ))}
            </div>
        </div>
    );
}

function TrendingCard({ ipo, index }: { ipo: IPOData; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full border bg-white p-1 shrink-0">
                                <img src={ipo.logo} alt={ipo.companyName} className="h-full w-full object-contain" />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-bold leading-none truncate">{ipo.companyName}</h3>
                                <span className="text-xs text-muted-foreground">{ipo.sector === 'Mainline' ? 'Main Board' : ipo.sector}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-sm text-muted-foreground">GMP</div>
                            <div className="text-lg font-bold text-green-600">₹{ipo.gmp}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">Expected</div>
                            <div className="text-lg font-bold text-green-600">+{ipo.gmpPercent}%</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
