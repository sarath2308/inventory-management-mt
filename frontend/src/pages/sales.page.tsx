import { ConfirmModal } from "@/components/confirmation.modal.component";
import type { Column } from "@/components/table.component";
import DataTable from "@/components/table.component";
import { useGetSales } from "@/hooks/sales/sales.get.hook";
import { useRemoveSale } from "@/hooks/sales/sales.remove.hook";
import type { SalesResponseDataType } from "@/types/sales/sales.response.type";
import { exportToExcel } from "@/utils/export.to.excel";
import { exportToPDF } from "@/utils/export.to.pdf";
import {
    Trash2,
    Plus,
    Calendar as CalendarIcon,
    Loader2,
    FileSpreadsheet,
    FileText,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SalesPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SalesResponseDataType | null>(null);

    const today = new Date().toISOString().split("T")[0];

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const removeSaleMutation = useRemoveSale();

    const { data, isLoading, refetch } = useGetSales(startDate, endDate, page);
    const sales: SalesResponseDataType[] = data?.saleData ?? [];

    // Logic check for disabling export buttons
    const isExportDisabled = sales.length === 0 || isLoading;

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

    const handleDateChange = (type: "start" | "end", value: string) => {
        if (type === "start") {
            if (value === endDate) {
                const nextDay = new Date(value);
                nextDay.setDate(nextDay.getDate() + 1);
                const nextDayStr = nextDay.toISOString().split("T")[0];
                if (nextDayStr <= today) setEndDate(nextDayStr);
            }
            setStartDate(value);
        } else {
            if (value === startDate) {
                const prevDay = new Date(value);
                prevDay.setDate(prevDay.getDate() - 1);
                setStartDate(prevDay.toISOString().split("T")[0]);
            }
            setEndDate(value);
        }
        setPage(1);
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

    const handleExcelExport = () => {
        const formattedData = sales.map((sale) => ({
            Date: new Date(sale.date).toLocaleDateString(),
            Customer: sale.customerName,
            TotalItems: sale.totalItems,
            Total: sale.totalAmount,
            PaymentType: sale.paymentType,
        }));
        exportToExcel(formattedData, "salesReport");
    };

    const handlePdfExport = () => {
        const column = ["Date", "Customer", "Total Items", "Total Amount", "Payment Type"];
        const rows = sales.map((sale) => [
            new Date(sale.date).toLocaleDateString(),
            sale.customerName,
            sale.totalItems,
            sale.totalAmount,
            sale.paymentType,
        ]);
        exportToPDF("Sales Report", column, rows, "salesReport");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-end justify-between bg-[#0c0c0e] p-6 rounded-2xl border border-zinc-800/50">
                <div className="flex flex-wrap items-center gap-4 w-full">
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
                                max={today}
                                value={startDate}
                                onChange={(e) => handleDateChange("start", e.target.value)}
                                className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-1 ring-zinc-700 outline-none transition-all appearance-none"
                            />
                        </div>
                    </div>

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
                                max={today}
                                value={endDate}
                                onChange={(e) => handleDateChange("end", e.target.value)}
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

                <div className="flex items-center gap-2 w-full lg:w-auto">
                    <button
                        onClick={handleExcelExport}
                        disabled={isExportDisabled}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-xs rounded-xl hover:text-white hover:border-zinc-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Export to Excel"
                    >
                        <FileSpreadsheet size={16} />
                        <span className="lg:hidden xl:inline">Excel</span>
                    </button>
                    <button
                        onClick={handlePdfExport}
                        disabled={isExportDisabled}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-xs rounded-xl hover:text-white hover:border-zinc-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Export to PDF"
                    >
                        <FileText size={16} />
                        <span className="lg:hidden xl:inline">PDF</span>
                    </button>
                    <button
                        onClick={() => navigate("/sales/new")}
                        className="flex-[2] lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-all shrink-0"
                    >
                        <Plus size={18} /> <span className="whitespace-nowrap">New Sale</span>
                    </button>
                </div>
            </div>

            <DataTable
                page={page}
                pageSize={10}
                onPageChange={setPage}
                isLoading={isLoading}
                columns={columns}
                data={sales}
                total={data?.totalCount ?? sales.length}
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
