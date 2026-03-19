import type { Column } from "@/components/table.component";
import DataTable from "@/components/table.component";
import { useGetCustomerLedger } from "@/hooks/sales/sales.get.ledger.hook";
import type { SalesResponseDataType } from "@/types/sales/sales.response.type";
import { exportToExcel } from "@/utils/export.to.excel";
import { exportToPDF } from "@/utils/export.to.pdf";
import { Calendar as CalendarIcon, ArrowLeft, User, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CustomerLedger = () => {
    const { customerId } = useParams<{ customerId: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const today = new Date().toISOString().split("T")[0];

    const { data, isLoading } = useGetCustomerLedger(customerId!, startDate, endDate, page);
    const sales: SalesResponseDataType[] = data?.saleData ?? [];

    const isExportDisabled = sales.length === 0 || isLoading;
    const customerName = sales.length > 0 ? sales[0].customerName : "Customer Ledger";

    /**
     * Strict Date Logic: No future dates and Start != End
     */
    const handleDateChange = (type: "start" | "end", value: string) => {
        if (type === "start") {
            setStartDate("");
        } else {
            setEndDate("");
        }
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

    const handleExcelExport = () => {
        const formattedData = sales.map((sale) => ({
            Date: new Date(sale.date).toLocaleDateString(),
            Items: `${sale.totalItems} Units`,
            "Paid Amount": sale.totalAmount,
            "Payment Method": sale.paymentType,
        }));
        exportToExcel(formattedData, `${customerName}_Ledger`);
    };

    const handlePdfExport = () => {
        const columns = ["Date", "Items", "Paid Amount", "Payment Method"];
        const rows = sales.map((sale) => [
            new Date(sale.date).toLocaleDateString(),
            `${sale.totalItems} Units`,
            `₹ ${sale.totalAmount}`,
            sale.paymentType,
        ]);
        exportToPDF(`${customerName} Ledger`, columns, rows, `${customerName}_Ledger`);
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
        {
            header: "Items",
            accessor: "totalItems",
            cell: (row) => (
                <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-xs">
                    {row.totalItems} Units
                </span>
            ),
        },
        {
            header: "Paid Amount",
            accessor: "totalAmount",
            cell: (row) => (
                <span className="font-bold text-white">₹{row.totalAmount.toLocaleString()}</span>
            ),
        },
        {
            header: "Payment Method",
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-xl text-zinc-500 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-black">
                            <User size={20} strokeWidth={3} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white uppercase italic tracking-tighter">
                                {isLoading ? "Loading..." : customerName}
                            </h1>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                Transaction History & Ledger
                            </p>
                        </div>
                    </div>
                </div>

                {/* Export Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleExcelExport}
                        disabled={isExportDisabled}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:text-white hover:border-zinc-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <FileSpreadsheet size={14} /> Excel
                    </button>
                    <button
                        onClick={handlePdfExport}
                        disabled={isExportDisabled}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:text-white hover:border-zinc-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <FileText size={14} /> PDF
                    </button>
                </div>
            </div>

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
                                className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-1 ring-zinc-700 outline-none transition-all"
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
                                className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-1 ring-zinc-700 outline-none transition-all"
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
                            Reset Dates
                        </button>
                    )}
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
            />
        </div>
    );
};

export default CustomerLedger;
