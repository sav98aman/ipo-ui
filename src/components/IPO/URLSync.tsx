"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useIPOStore } from "@/lib/store";
import { IPOData } from "@/types/ipo";
import mockIpos from "@/data/mockIpos.json";

export function URLSync() {
    const searchParams = useSearchParams();
    const { selectedIPO, setSelectedIPO } = useIPOStore();
    const [isClient, setIsClient] = useState(false);
    const hasInitialized = useRef(false);

    // 1. Client-side only flag (prevents hydration errors)
    useEffect(() => {
        setIsClient(true);
    }, []);

    // 2. Initial URL -> Store sync (only once on mount)
    useEffect(() => {
        if (!isClient || hasInitialized.current) return;
        hasInitialized.current = true;

        const urlId = searchParams.get('ipo');
        if (urlId) {
            const found = (mockIpos as IPOData[]).find(i => i.id === urlId);
            if (found) {
                setSelectedIPO(found);
            }
        }
    }, [isClient, searchParams, setSelectedIPO]);

    // 3. Store -> URL sync (whenever selectedIPO changes, after client mount)
    useEffect(() => {
        if (!isClient) return;

        if (selectedIPO?.id) {
            document.title = `${selectedIPO.companyName} IPO GMP & Status | IPO Watch`;

            const currentUrl = new URL(window.location.href);
            if (currentUrl.searchParams.get('ipo') !== selectedIPO.id) {
                currentUrl.searchParams.set('ipo', selectedIPO.id);
                window.history.pushState({}, '', currentUrl.toString());
            }
        } else {
            if (document.title.includes("| IPO Watch")) {
                document.title = "IPO Watch - Live Indian IPO Tracker | Real-time GMP Analysis";
            }

            const currentUrl = new URL(window.location.href);
            if (currentUrl.searchParams.has('ipo')) {
                currentUrl.searchParams.delete('ipo');
                window.history.pushState({}, '', currentUrl.toString());
            }
        }
    }, [isClient, selectedIPO]);

    // 4. Handle browser back/forward navigation
    useEffect(() => {
        if (!isClient) return;

        const handlePopState = () => {
            const currentUrl = new URL(window.location.href);
            const id = currentUrl.searchParams.get('ipo');

            if (id) {
                const found = (mockIpos as IPOData[]).find(i => i.id === id);
                if (found) setSelectedIPO(found);
            } else {
                setSelectedIPO(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isClient, setSelectedIPO]);

    return null;
}
