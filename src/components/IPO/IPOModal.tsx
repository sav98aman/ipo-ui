import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useIPOStore } from "@/lib/store";
import { modalSections } from "@/config/modalSections";

export function IPOModal() {
    const { selectedIPO, isModalOpen, setIsModalOpen } = useIPOStore();

    if (!selectedIPO) return null;

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 pb-4 border-b">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full border bg-white p-2 shrink-0">
                            <img
                                src={selectedIPO.logo}
                                alt={selectedIPO.companyName}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
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
                    </div>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6">
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
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
