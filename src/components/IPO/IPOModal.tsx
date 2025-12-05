import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Loader2 } from "lucide-react";
import { useIPOStore } from "@/lib/store";
import { modalSections } from "@/config/modalSections";
import { useState } from "react";
import html2canvas from "html2canvas";

export function IPOModal() {
    const { selectedIPO, isModalOpen, setIsModalOpen } = useIPOStore();
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        if (!selectedIPO) return;
        setIsSharing(true);

        const text = `🚀 *${selectedIPO.companyName}* (${selectedIPO.sector})\n\n💰 Issue Size: ${selectedIPO.issueSize}\n📈 Current GMP: ${selectedIPO.gmpPercent}% (₹${selectedIPO.gmp})\n📅 Status: ${selectedIPO.status}\n\nCheck full details here:`;
        const url = window.location.href;

        try {
            // Check if native sharing is available
            if (navigator.share) {
                let shareData: ShareData = {
                    title: `IPO Alert: ${selectedIPO.companyName}`,
                    text: text,
                    url: url,
                };

                // Try to capture the chart image if it exists
                const chartElement = document.getElementById('gmp-chart-container');
                if (chartElement) {
                    try {
                        const canvas = await html2canvas(chartElement, {
                            backgroundColor: '#020617', // Enforce dark bg for consistency in screenshot
                            scale: 2 // Higher resolution
                        });

                        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
                        if (blob) {
                            const file = new File([blob], 'gmp-trend.png', { type: 'image/png' });
                            const filesArray = [file];

                            // Check if the device validates sharing files
                            if (navigator.canShare && navigator.canShare({ files: filesArray })) {
                                shareData = {
                                    files: filesArray,
                                    title: shareData.title,
                                    text: shareData.text + " " + shareData.url, // URL moves to text when sharing files often
                                };
                            }
                        }
                    } catch (captureErr) {
                        console.error("Failed to capture chart image:", captureErr);
                    }
                }

                await navigator.share(shareData);
            } else {
                // Fallback to WhatsApp link
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
                window.open(whatsappUrl, '_blank');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        } finally {
            setIsSharing(false);
        }
    };

    if (!selectedIPO) return null;

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 pb-4 border-b relative">
                    <div className="absolute right-12 top-4 sm:hidden">
                        <Button variant="ghost" size="icon" onClick={handleShare} disabled={isSharing}>
                            {isSharing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full border bg-white p-2 shrink-0">
                            <img
                                src={selectedIPO.logo}
                                alt={selectedIPO.companyName}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap pr-8 sm:pr-0">
                                <DialogTitle className="text-2xl font-bold">{selectedIPO.companyName}</DialogTitle>
                                <Badge variant={selectedIPO.status === 'Upcoming' ? 'secondary' : selectedIPO.status === 'Current' ? 'default' : 'outline'}>
                                    {selectedIPO.status}
                                </Badge>
                            </div>
                            <DialogDescription className="mt-1">
                                {selectedIPO.sector === 'Mainline' ? 'Main Board' : selectedIPO.sector} • {selectedIPO.issueSize}
                            </DialogDescription>
                        </div>
                        <div className="text-right hidden sm:block">
                            <div className={`text-2xl font-bold ${selectedIPO.gmp > 0 ? 'text-green-600' : selectedIPO.gmp < 0 ? 'text-red-600' : ''}`}>
                                {selectedIPO.gmpPercent}%
                            </div>
                            <div className="text-xs text-muted-foreground">Current GMP</div>
                        </div>
                        <Button variant="outline" size="icon" onClick={handleShare} className="hidden sm:flex ml-2" disabled={isSharing}>
                            {isSharing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="space-y-8 pb-6">
                        {modalSections.map((section) => (
                            <div key={section.id} className="space-y-3">
                                <h3 className="text-lg font-semibold tracking-tight border-b pb-2">
                                    {section.title}
                                </h3>
                                <div className="pt-1">
                                    {section.render(selectedIPO)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
