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
import { motion } from "framer-motion";

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
            <motion.div
                className="hidden md:flex rounded-2xl border-0 bg-white dark:bg-gray-900 shadow-lg overflow-hidden flex-col max-h-[650px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="overflow-auto flex-1 relative">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent border-b-2 border-gray-100 dark:border-gray-700">
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
                                table.getRowModel().rows.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="cursor-pointer group"
                                        onClick={() => setSelectedIPO(row.original)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-950/20 transition-colors">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={visibleColumns.length} className="h-32 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3 py-8 text-center text-muted-foreground">
                                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                                <ChevronDown className="h-6 w-6" />
                                            </div>
                                            <p className="text-sm font-medium">No IPOs found</p>
                                            <p className="text-xs">Try adjusting your filters or search query.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>

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

                        {visibleCount < data.length && (
                            <Button
                                variant="outline"
                                className="w-full h-12 text-sm font-medium border-2 border-dashed rounded-xl hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-indigo-950/50 dark:hover:border-indigo-700 transition-all"
                                onClick={handleLoadMore}
                            >
                                Load More IPOs ({visibleCount} of {data.length})
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-3 py-16 text-center text-muted-foreground bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/50 rounded-2xl border-2 border-dashed">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <ChevronDown className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-medium">No IPOs found</p>
                        <p className="text-xs">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </>
    );
}
