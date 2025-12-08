import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    const scrollToTable = () => {
        const tableElement = document.getElementById("ipo-table-section");
        if (tableElement) {
            tableElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="py-8 text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                IPO Watch – Live Indian IPO Tracker
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Track the latest Mainline and SME IPOs in India with real-time GMP, subscription status, and AI-driven analysis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full px-4 sm:px-0">
                <Button size="default" className="h-12 sm:h-10 px-6 w-full sm:w-auto text-base" onClick={scrollToTable}>
                    View Live IPOs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/ipo-allotment-status" className="w-full sm:w-auto">
                    <Button variant="outline" size="default" className="h-12 sm:h-10 px-6 w-full sm:w-auto text-base">
                        Check Allotment Status <Search className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
