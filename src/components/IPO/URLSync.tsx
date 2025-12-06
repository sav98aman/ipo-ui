"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useIPOStore } from "@/lib/store";
import { IPOData } from "@/types/ipo";
import mockIpos from "@/data/mockIpos.json";

export function URLSync() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { selectedIPO, setSelectedIPO } = useIPOStore();

    // 1. Sync Store -> URL & Document Title
    useEffect(() => {
        const currentId = searchParams.get('ipo');

        if (selectedIPO?.id) {
            // Update Title
            document.title = `${selectedIPO.companyName} IPO GMP & Status | IPO Watch`;

            // Update URL if needed
            if (currentId !== selectedIPO.id) {
                // Use replace to avoid cluttering history stack too much, or push for back button support. 
                // User asked to "monitor", implying linkability. Push is better for "I want to go back to list".
                router.push(`/?ipo=${selectedIPO.id}`, { scroll: false });
            }
        } else {
            // Reset Title
            if (document.title.includes("| IPO Watch")) {
                document.title = "IPO Watch - Live Indian IPO Tracker | Real-time GMP Analysis";
            }

            // Reset URL
            if (currentId) {
                router.push('/', { scroll: false });
            }
        }
    }, [selectedIPO, router, searchParams]);

    // 2. Sync URL -> Store (Initial Load + Back/Forward Navigation)
    useEffect(() => {
        const id = searchParams.get('ipo');

        if (id && (!selectedIPO || selectedIPO.id !== id)) {
            const found = (mockIpos as IPOData[]).find(i => i.id === id);
            if (found) {
                setSelectedIPO(found);
            }
        } else if (!id && selectedIPO) {
            setSelectedIPO(null);
        }
    }, [searchParams, selectedIPO, setSelectedIPO]);

    return null;
}
