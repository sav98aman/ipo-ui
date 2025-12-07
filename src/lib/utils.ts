import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateIST(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput || dateInput === "TBD") return "TBD";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);

    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  } catch {
    return String(dateInput);
  }
}

export function formatDateTimeIST(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput || dateInput === "TBD") return "TBD";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);

    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }) + " IST";
  } catch {
    return String(dateInput);
  }
}
