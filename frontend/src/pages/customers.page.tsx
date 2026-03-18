import { ConfirmModal } from "@/components/confirmation.modal.component";
import { Modal } from "@/components/modal.component";
import type { Column } from "@/components/table.component";
import DataTable from "@/components/table.component";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/helper/debounce";
import { useCreateCustomer } from "@/hooks/customers/customer.create.hook";
import { useGetCustomers } from "@/hooks/customers/customer.get.hook";
import { useRemoveCustomer } from "@/hooks/customers/customer.remove.hook";
import { useUpdateCustomer } from "@/hooks/customers/customer.update.hook";
import type { CustomerResponseType } from "@/types/customers/customer.response.type";
import { Edit2, Trash2, Plus, Search, Loader2 } from "lucide-react";
import { useState } from "react";

const CustomersPage = () => {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseType | null>(null);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        mobile: "",
    });
    const debounceSearch = useDebounce(search, 500);
    const { data, isLoading, refetch } = useGetCustomers(debounceSearch, page);
    const createCustomer = useCreateCustomer();
    const updateCustomer = useUpdateCustomer();
    const removeCustomerMutation = useRemoveCustomer();

    const customers: CustomerResponseType[] = data?.customerData ?? [];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Basic Validation Logic
    const isFormValid =
        formData.name.trim() !== "" &&
        formData.address.trim() !== "" &&
        /^\d{10}$/.test(formData.mobile); // Ensures 10 digit mobile

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            if (selectedCustomer) {
                await updateCustomer.mutateAsync({
                    customerId: selectedCustomer.id,
                    payload: { ...formData },
                });
            } else {
                await createCustomer.mutateAsync(formData);
            }
            refetch();
            closeModal();
        } catch (error) {
            console.error("Action failed:", error);
        }
    };

    const handleDelete = async () => {
        if (!selectedCustomer) return;
        try {
            await removeCustomerMutation.mutateAsync(selectedCustomer.id);
            setIsConfirmOpen(false);
            refetch();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const openEditModal = (customer: CustomerResponseType) => {
        setSelectedCustomer(customer);
        setFormData({
            name: customer.name,
            address: customer.address,
            mobile: customer.mobile,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
        setFormData({ name: "", address: "", mobile: "" });
    };

    const columns: Column<CustomerResponseType>[] = [
        { header: "Customer Name", accessor: "name" },
        { header: "Address", accessor: "address" },
        {
            header: "Mobile",
            accessor: "mobile",
            cell: (row) => <span className="font-mono text-zinc-400">{row.mobile}</span>,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                        size={18}
                    />
                    <Input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Search customers by name or mobile..."
                        className="pl-10 bg-[#0c0c0e] border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 ring-zinc-700 transition-all"
                    />
                </div>
                <button
                    onClick={() => {
                        setSelectedCustomer(null);
                        setIsModalOpen(true);
                    }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
                >
                    <Plus size={18} /> Add Customer
                </button>
            </div>

            {/* Table */}
            <DataTable
                page={page}
                pageSize={10}
                onPageChange={setPage}
                isLoading={isLoading}
                columns={columns}
                data={customers}
                total={customers.length}
                rowKey={(row) => row.id}
                renderActions={(row) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => openEditModal(row)}
                            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => {
                                setSelectedCustomer(row);
                                setIsConfirmOpen(true);
                            }}
                            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-red-900/50 hover:text-red-500 hover:border-red-900 transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
            />

            {/* Form Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedCustomer ? "Edit Customer Details" : "Register New Customer"}
            >
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 block">
                                Full Name
                            </label>
                            <Input
                                name="name"
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-700"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 block">
                                Mobile Number
                            </label>
                            <Input
                                name="mobile"
                                type="tel"
                                placeholder="10-digit mobile number"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                required
                                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-700"
                            />
                            {formData.mobile && !/^\d{10}$/.test(formData.mobile) && (
                                <p className="text-[10px] text-red-500 mt-1 uppercase font-bold">
                                    Invalid mobile format
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 block">
                                Full Address
                            </label>
                            <textarea
                                name="address"
                                placeholder="Enter street, city, and pincode..."
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white h-28 outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={
                            createCustomer.isPending || updateCustomer.isPending || !isFormValid
                        }
                        className="w-full mt-4 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                    >
                        {(createCustomer.isPending || updateCustomer.isPending) && (
                            <Loader2 className="animate-spin" size={18} />
                        )}
                        {selectedCustomer ? "Update Records" : "Confirm Registration"}
                    </button>
                </form>
            </Modal>

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Remove Customer"
                message={`Warning: You are about to delete "${selectedCustomer?.name}". All associated history for this customer will be hidden. Proceed?`}
            />
        </div>
    );
};

export default CustomersPage;
