import React from "react";
import { ChevronLeft, ChevronRight, Inbox, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";

export interface Column<T> {
    header: string;
    accessor: keyof T;
    cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    page: number;
    pageSize: number;
    total: number;
    rowKey: (row: T) => string;
    isLoading?: boolean;
    emptyState?: React.ReactNode;
    loadingState?: React.ReactNode;
    renderActions?: (row: T) => React.ReactNode;
    onPageChange: (page: number) => void;
}

export default function DataTable<T>({
    columns,
    data,
    page,
    pageSize,
    total,
    rowKey,
    isLoading = false,
    emptyState,
    loadingState,
    renderActions,
    onPageChange,
}: DataTableProps<T>) {
    const startIndex = (page - 1) * pageSize;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const colSpan = columns.length + 1 + (renderActions ? 1 : 0);

    return (
        <div className="w-full bg-[#0c0c0e] rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <Table className="min-w-full border-collapse">
                    {/* HEADER */}
                    <TableHeader className="bg-[#141417] border-b border-zinc-800">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="w-16 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                #
                            </TableHead>

                            {columns.map((col) => (
                                <TableHead
                                    key={col.header}
                                    className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 py-5"
                                >
                                    {col.header}
                                </TableHead>
                            ))}

                            {renderActions && (
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right pr-6">
                                    Actions
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>

                    {/* BODY */}
                    <TableBody className="divide-y divide-zinc-800/50">
                        {isLoading ? (
                            <TableRow className="hover:bg-transparent border-none">
                                <TableCell colSpan={colSpan} className="h-72 text-center">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                                        <p className="text-sm font-medium text-zinc-400">
                                            {loadingState ?? "Fetching records..."}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow className="hover:bg-transparent border-none">
                                <TableCell colSpan={colSpan} className="h-72 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 text-zinc-500">
                                        <Inbox
                                            size={48}
                                            strokeWidth={1}
                                            className="mb-2 opacity-10"
                                        />
                                        <p className="text-sm font-semibold text-zinc-300">
                                            {emptyState ?? "No records found"}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            Adjust filters or check back later.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, rowIndex) => (
                                <TableRow
                                    key={rowKey(row)}
                                    className="group hover:bg-zinc-800/30 transition-all border-none"
                                >
                                    {/* SL NO */}
                                    <TableCell className="text-center py-4">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-bold text-zinc-500 group-hover:border-zinc-600 group-hover:text-white transition-colors">
                                            {startIndex + rowIndex + 1}
                                        </span>
                                    </TableCell>

                                    {/* DATA CELLS */}
                                    {columns.map((col) => (
                                        <TableCell key={String(col.accessor)} className="py-4">
                                            <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                                                {col.cell
                                                    ? col.cell(row)
                                                    : ((row[col.accessor] as React.ReactNode) ?? (
                                                          <span className="text-zinc-700">—</span>
                                                      ))}
                                            </div>
                                        </TableCell>
                                    ))}

                                    {/* ACTIONS */}
                                    {renderActions && (
                                        <TableCell className="text-right pr-6 py-4">
                                            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {renderActions(row)}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between px-6 py-5 bg-[#09090b] border-t border-zinc-800">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        Page {page} <span className="text-zinc-700">/</span> {totalPages}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-medium">
                        Displaying {data.length} of {total} results
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={page === 1 || isLoading}
                        onClick={() => onPageChange(page - 1)}
                        className="h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20"
                    >
                        <ChevronLeft size={18} />
                    </Button>

                    <div className="flex gap-1.5">
                        {[...Array(totalPages)].map((_, i) => {
                            if (
                                totalPages > 5 &&
                                Math.abs(i + 1 - page) > 1 &&
                                i !== 0 &&
                                i !== totalPages - 1
                            ) {
                                if (Math.abs(i + 1 - page) === 2)
                                    return (
                                        <span key={i} className="text-zinc-700 self-end px-1">
                                            ...
                                        </span>
                                    );
                                return null;
                            }
                            return (
                                <button
                                    key={i}
                                    onClick={() => onPageChange(i + 1)}
                                    className={`h-9 w-9 rounded-lg text-xs font-bold transition-all border ${
                                        page === i + 1
                                            ? "bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                            : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-200"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={page === totalPages || isLoading}
                        onClick={() => onPageChange(page + 1)}
                        className="h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20"
                    >
                        <ChevronRight size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
