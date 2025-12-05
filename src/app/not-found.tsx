import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
            <div className="space-y-4">
                <h1 className="text-9xl font-extrabold tracking-tighter text-muted-foreground/20">404</h1>
                <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
                <p className="text-muted-foreground mx-auto max-w-[500px]">
                    Sorry, we couldn&apos;t find the IPO you&apos;re looking for. It might have been delisted or never existed!
                </p>
                <div className="pt-4">
                    <Button asChild size="lg" className="rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="/">
                            Return to IPO Watch 🚀
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
