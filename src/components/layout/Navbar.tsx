"use client";

import { Button } from "@/components/ui/button";
import { LogoOption21 } from "@/components/ui/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { RefreshCw } from "lucide-react";
import lastUpdateMeta from "@/data/lastUpdate.json";
import { formatDateTimeIST } from "@/lib/utils";

const formatLastUpdate = () => {
    return formatDateTimeIST(lastUpdateMeta.lastUpdated);
};

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <LogoOption21 className="h-10 w-10" />
                    <span className="hidden sm:inline font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        Live GMP
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5" suppressHydrationWarning>
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="hidden sm:inline">Updated: </span>
                        <span className="font-semibold text-green-600 dark:text-green-400" suppressHydrationWarning>{formatLastUpdate()}</span>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl"
                        onClick={() => window.location.reload()}
                        title="Refresh Data"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
