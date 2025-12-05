"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
    openDate: string;
    closeDate: string;
}

export function CountdownTimer({ openDate, closeDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [status, setStatus] = useState<"upcoming" | "open" | "closed">("closed");

    useEffect(() => {
        const calculateTime = () => {
            if (!openDate || openDate === "TBD" || !closeDate || closeDate === "TBD") {
                setTimeLeft("");
                return;
            }

            const now = new Date();

            const parseDate = (dateStr: string, isCloseDate: boolean) => {
                const date = new Date(dateStr);
                // Check if it has time component (not midnight UTC or midnight local)
                // Simple check: if it ends with T00:00:00.000Z or looks like a plain date
                const isMidnight = date.getUTCHours() === 0 && date.getUTCMinutes() === 0 && date.getUTCSeconds() === 0;

                if (isMidnight) {
                    // Apply defaults: 10 AM for Open, 5 PM for Close
                    if (isCloseDate) {
                        date.setHours(17, 0, 0, 0);
                    } else {
                        date.setHours(10, 0, 0, 0);
                    }
                }
                return date;
            };

            const start = parseDate(openDate, false);
            const end = parseDate(closeDate, true);

            if (now < start) {
                setStatus("upcoming");
                const diff = start.getTime() - now.getTime();
                setTimeLeft(formatDiff(diff));
            } else if (now >= start && now < end) {
                setStatus("open");
                const diff = end.getTime() - now.getTime();
                setTimeLeft(formatDiff(diff));
            } else {
                setStatus("closed");
                setTimeLeft("Closed");
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000); // Update every second

        return () => clearInterval(timer);
    }, [openDate, closeDate]);

    if (!timeLeft || timeLeft === "Closed") return <span className="text-muted-foreground">-</span>;

    return (
        <div className={`text-xs font-medium whitespace-nowrap ${status === 'open' ? 'text-orange-600' : 'text-blue-600'}`}>
            <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">
                {status === 'upcoming' ? 'Starts in' : 'Ends in'}
            </span>
            {timeLeft}
        </div>
    );
}

function formatDiff(ms: number) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
}
