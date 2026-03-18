import { ConfirmModal } from "@/components/confirmation.modal.component";
import type { Column } from "@/components/table.component";
import DataTable from "@/components/table.component";
import { useGetSales } from "@/hooks/sales/sales.get.hook";
import { useRemoveSale } from "@/hooks/sales/sales.remove.hook";
import type { SalesResponseDataType } from "@/types/sales/sales.response.type";
import { Trash2, Plus, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SalesPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SalesResponseDataType | null>(null);

    // Date Range State (passing only strings as requested)
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const removeSaleMutation = useRemoveSale();

    // Passing page, startDate, and endDate strings to the hook
    const { data, isLoading, refetch } = useGetSales(startDate, endDate, page);

    const sales: SalesResponseDataType[] = data?.saleData ?? [];

    const handleDelete = async () => {
        if (!selectedItem) return;
        try {
            await removeSaleMutation.mutateAsync(selectedItem.id);
            setIsConfirmOpen(false);
            refetch();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const columns: Column<SalesResponseDataType>[] = [
        {
            header: "Date",
            accessor: "date",
            cell: (row) => (
                <span className="text-zinc-400 font-mono text-xs">
                    {new Date(row.date).toLocaleDateString()}
                </span>
            ),
        },
        { header: "Customer", accessor: "customerName" },
        {
            header: "Items",
            accessor: "totalItems",
            cell: (row) => (
                <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-xs">
                    {row.totalItems}
                </span>
            ),
        },
        {
            header: "Total",
            accessor: "totalAmount",
            cell: (row) => (
                <span className="font-bold text-white">₹{row.totalAmount.toLocaleString()}</span>
            ),
        },
        {
            header: "Method",
            accessor: "paymentType",
            cell: (row) => (
                <span className="uppercase text-[10px] font-black tracking-widest text-zinc-500">
                    {row.paymentType}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-end justify-between bg-[#0c0c0e] p-6 rounded-2xl border border-zinc-800/50">
                <div className="flex flex-wrap items-center gap-4 w-full">
                    {/* Start Date */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                            Start Date
                        </label>
                        <div className="relative">
                            <CalendarIcon
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                                size={14}
                            />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    setPage(1);
                                }}
                                className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-1 ring-zinc-700 outline-none transition-all appearance-none"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                            End Date
                        </label>
                        <div className="relative">
                            <CalendarIcon
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                                size={14}
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                    setPage(1);
                                }}
                                className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-1 ring-zinc-700 outline-none transition-all appearance-none"
                            />
                        </div>
                    </div>

                    {(startDate || endDate) && (
                        <button
                            onClick={() => {
                                setStartDate("");
                                setEndDate("");
                                setPage(1);
                            }}
                            className="mt-5 text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-tight underline underline-offset-4"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                <button
                    onClick={() => navigate("/sales/new")}
                    className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all shrink-0"
                >
                    <Plus size={18} /> New Sale
                </button>
            </div>

            {/* Table */}
            <DataTable
                page={page}
                pageSize={10}
                onPageChange={setPage}
                isLoading={isLoading}
                columns={columns}
                data={sales}
                total={sales.length}
                rowKey={(row) => row.id}
                renderActions={(row) => (
                    <div className="flex gap-2">
                        <button
                            disabled={removeSaleMutation.isPending}
                            onClick={() => {
                                setSelectedItem(row);
                                setIsConfirmOpen(true);
                            }}
                            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-red-900 hover:text-red-500 hover:border-red-900 transition-all disabled:opacity-50"
                        >
                            {removeSaleMutation.isPending && selectedItem?.id === row.id ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Trash2 size={16} />
                            )}
                        </button>
                    </div>
                )}
            />

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Delete Sale Record"
                message="Warning: This will permanently remove this sale record and restore item stock. Do you wish to proceed?"
            />
        </div>
    );
};

export default SalesPage;
