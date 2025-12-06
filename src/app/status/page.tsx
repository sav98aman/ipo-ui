import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StatusPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <div className="border-b bg-card shadow-sm sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Back to Dashboard</span>
                            </Button>
                        </Link>
                        <div className="h-6 w-px bg-border hidden sm:block"></div>
                        <h1 className="text-lg font-bold">IPO Allotment Status</h1>
                    </div>
                </div>
            </div>

            {/* Tabs Container */}
            <Tabs defaultValue="kfintech" className="flex-1 flex flex-col w-full h-full">
                <div className="bg-muted/50 border-b">
                    <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
                        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                            <TabsTrigger value="kfintech">KFintech</TabsTrigger>
                            <TabsTrigger value="mufg">MUFG / LinkIntime</TabsTrigger>
                        </TabsList>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                            Select the registrar assigned to the IPO
                        </p>
                    </div>
                </div>

                <div className="flex-1 relative bg-white overflow-hidden">
                    <TabsContent value="kfintech" className="h-full w-full m-0 p-0 absolute inset-0 flex flex-col">

                        {/* Toolbar for External Link (Prevents Overlap) */}
                        <div className="w-full bg-muted/20 border-b p-2 flex justify-end shrink-0 z-20">
                            <Button variant="ghost" size="sm" asChild className="text-xs h-7 text-muted-foreground hover:text-primary">
                                <a href="https://ipostatus.kfintech.com/" target="_blank" rel="noopener noreferrer">
                                    Open in New Window <ExternalLink className="ml-2 h-3 w-3" />
                                </a>
                            </Button>
                        </div>

                        {/* Fallback/Loading Text */}
                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground text-sm z-0">
                            Loading KFintech Portal...
                        </p>

                        <iframe
                            src="https://ipostatus.kfintech.com/"
                            className="flex-1 w-full border-none relative z-10"
                            title="KFintech IPO Status"
                            loading="lazy"
                        />
                    </TabsContent>

                    <TabsContent value="mufg" className="h-full w-full m-0 p-0 absolute inset-0 bg-muted/10">
                        <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-8 text-center">
                            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                                <ExternalLink className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <div className="space-y-2 max-w-md">
                                <h3 className="text-xl font-bold text-foreground">Open MUFG / LinkIntime Portal</h3>
                                <p className="text-sm text-muted-foreground">
                                    This registrar's security settings prevent it from being displayed inside this dashboard. You need to open it in a new window to check your status.
                                </p>
                            </div>

                            <Button size="lg" asChild className="mt-2 h-12 px-8 text-base shadow-lg animate-in fade-in zoom-in duration-300">
                                <a href="https://in.mpms.mufg.com/Initial_Offer/public-issues.html" target="_blank" rel="noopener noreferrer">
                                    Open Portal Now <ExternalLink className="ml-3 h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>

            {/* Footer Info */}
            <div className="bg-muted/30 border-t p-2 text-center text-[10px] text-muted-foreground z-20 relative">
                <p>If a portal appears blank, it may be blocked by your browser. Use the "Open New Tab" button inside the view.</p>
            </div>
        </div>
    );
}
