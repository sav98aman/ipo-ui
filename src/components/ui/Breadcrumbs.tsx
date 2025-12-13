import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link
                href="/"
                className="hover:text-foreground transition-colors hover:underline"
            >
                Home
            </Link>
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    {index === items.length - 1 ? (
                        <span className="text-foreground font-medium">{item.label}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-foreground transition-colors hover:underline"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
