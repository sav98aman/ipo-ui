"use client";

import * as React from "react";
import { Search, Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import mockIpos from "@/data/mockIpos.json";
import ipoRegistrarsMap from "@/data/ipo-registrars-map.json";

export function AllotmentSearch() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    // Filter IPOs: Only those where bidding is closed (closeDate < today)
    // or explicit logic if status implies it.
    const filteredIpos = React.useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        return mockIpos.filter(ipo => {
            // If closeDate is TBD, we can't really determine, but usually that means future.
            // If closeDate is present and < today, it's closed.
            if (ipo.closeDate === "TBD") return false;
            return ipo.closeDate < today;
        }).map(ipo => {
            // Join with registrar map
            // @ts-ignore
            const registrarInfo = ipoRegistrarsMap[ipo.id];
            return {
                ...ipo,
                registrar: registrarInfo ? registrarInfo.registrar : null
            };
        }).filter(ipo => ipo.registrar !== null); // Only show if we know the registrar? Or show anyway? 
        // User said: "only come those ipo who has allotemnt has status ... or already alloted means biding is closed"
        // If we don't know the registrar, we can't link them anywhere. So filtering for known registrar makes sense.
    }, []);

    const handleSelect = (link: string, title: string) => {
        if (link && link !== "#") {
            const width = 500;
            const height = 700;
            const left = (window.screen.width / 2) - (width / 2);
            const top = (window.screen.height / 2) - (height / 2);
            // Force popup window (not tab) with toolbar/menubar disabled
            window.open(
                link,
                title,
                `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,resizable=yes`
            );
        }
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="outline"
                className="w-full sm:w-auto h-12 sm:h-10 px-6 text-base text-muted-foreground justify-between"
                onClick={() => setOpen(true)}
            >
                <span>Check Allotment Status</span>
                <Search className="ml-2 h-4 w-4" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search IPO by name..." />
                <CommandList>
                    <CommandEmpty>No allotment status found.</CommandEmpty>
                    <CommandGroup heading="Available Allotment Status">
                        {filteredIpos.map((ipo) => (
                            <CommandItem
                                key={ipo.id}
                                value={`${ipo.companyName} ${ipo.id}`} // Helper for search matching
                                onSelect={() => handleSelect(ipo.registrar?.link || "#", `status_${ipo.id}`)}
                                className="cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium">{ipo.companyName}</span>
                                    <span className="text-xs text-muted-foreground">Registrar: {ipo.registrar?.name}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
