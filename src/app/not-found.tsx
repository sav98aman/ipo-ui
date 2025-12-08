import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
            </div>

            <div className="space-y-6 max-w-md mx-auto">
                <div className="relative">
                    <h1 className="text-9xl font-black tracking-tighter text-muted-foreground/10 select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
                            Page Not Found
                        </span>
                    </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                    Oops! The IPO or page you are looking for seems to have drifted into the void. It might be delisted or never existed.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button asChild size="lg" className="rounded-full font-semibold shadow-lg hover:shadow-xl transition-all gap-2">
                        <Link href="/">
                            <Home className="h-4 w-4" /> Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full font-semibold gap-2">
                        <Link href="/ipo-allotment-status">
                            <ArrowLeft className="h-4 w-4" /> Check Status
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-8 text-xs text-muted-foreground/50">
                ErrorCode: 404_IPO_MISSING
            </div>
        </div>
    )
}
