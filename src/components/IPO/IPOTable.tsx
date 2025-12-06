"use client";

import { useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IPOData } from "@/types/ipo";
import { tableColumns } from "@/config/tableColumns";
import { useIPOStore } from "@/lib/store";
import { MobileIPOCard } from "./MobileIPOCard";
import { ChevronDown } from "lucide-react";

interface IPOTableProps {
    data: IPOData[];
}

export function IPOTable({ data }: IPOTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const setSelectedIPO = useIPOStore((state) => state.setSelectedIPO);
    const statusFilter = useIPOStore((state) => state.statusFilter);

    const visibleColumns = tableColumns.filter(col => {
        const key = (col as any).accessorKey;
        if (statusFilter === 'Upcoming' && key === 'closeDate') {
            return false;
        }
        if (statusFilter !== 'All' && key === 'status') {
            return false;
        }
        return true;
    });

    const table = useReactTable({
        data,
        columns: visibleColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 5, data.length));
    };

    return (
        <>
            {/* Desktop View (Table) */}
            <div className="hidden md:flex rounded-md border bg-card overflow-hidden flex-col max-h-[600px]">
                <div className="overflow-auto flex-1 relative">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-card shadow-sm">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="whitespace-nowrap">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => setSelectedIPO(row.original)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={visibleColumns.length} className="h-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-2 py-8 text-center text-muted-foreground">
                                            <p className="text-sm font-medium">No IPOs found</p>
                                            <p className="text-xs">Try adjusting your filters or search query.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden space-y-4">
                {data.length > 0 ? (
                    <>
                        <div className="space-y-4">
                            {data.slice(0, visibleCount).map((ipo) => (
                                <MobileIPOCard
                                    key={ipo.id}
                                    ipo={ipo}
                                    onSelect={setSelectedIPO}
                                />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {visibleCount < data.length && (
                            <Button
                                variant="outline"
                                className="w-full h-12 text-sm font-medium border-dashed"
                                onClick={handleLoadMore}
                            >
                                Load More IPOs ({visibleCount} of {data.length})
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                        <p className="text-sm font-medium">No IPOs found</p>
                        <p className="text-xs">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </>
    );
}
