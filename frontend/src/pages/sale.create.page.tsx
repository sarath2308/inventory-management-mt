import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useCreateSale } from "@/hooks/sales/sales.create.hook"; // Assuming this exists
import type { ItemResponseType } from "@/types/item/item.response.type";
import type { CustomerResponseType } from "@/types/customers/customer.response.type";
import { useGetCustomersOptons } from "@/hooks/customers/customer.get.options.hook";
import { useGetItemsOptions } from "@/hooks/items/item.get.options.hook";

interface SelectedItem {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}

const NewSalePage = () => {
    const navigate = useNavigate();
    const createSaleMutation = useCreateSale();

    // Data Fetching
    const { data: customersData } = useGetCustomersOptons();
    const { data: itemsData } = useGetItemsOptions();

    const customers: CustomerResponseType[] = customersData?.customerData ?? [];
    const allItems: ItemResponseType[] = itemsData?.itemData ?? [];

    // Form State
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
    const [paymentType, setPaymentType] = useState<"cash" | "online">("cash");
    const [cart, setCart] = useState<SelectedItem[]>([]);

    // Cart Logic
    const addToCart = (item: ItemResponseType) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.itemId === item.id);
            if (existing) {
                if (existing.quantity >= item.quantity) return prev; // Out of stock logic
                return prev.map((i) =>
                    i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i,
                );
            }
            return [
                ...prev,
                {
                    itemId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    stock: item.quantity,
                },
            ];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.itemId === id) {
                    const newQty = Math.max(1, Math.min(item.stock, item.quantity + delta));
                    return { ...item, quantity: newQty };
                }
                return item;
            }),
        );
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.itemId !== id));
    };

    const totalAmount = useMemo(
        () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cart],
    );

    const handleSubmit = async () => {
        if (!selectedCustomerId || cart.length === 0) return;

        const payload = {
            customerId: selectedCustomerId,
            paymentType,
            items: cart.map((i) => ({ itemId: i.itemId, quantity: i.quantity })),
            totalAmount,
        };

        try {
            await createSaleMutation.mutateAsync(payload);
            navigate("/sales");
        } catch (err) {
            console.error("Sale creation failed", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-black tracking-tight text-white uppercase">
                    Create New Sale
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side: Customer & Item Selection */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Selection */}
                    <section className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 block">
                            1. Select Customer
                        </label>
                        <select
                            value={selectedCustomerId}
                            onChange={(e) => setSelectedCustomerId(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-xl outline-none focus:ring-1 ring-zinc-700"
                        >
                            <option value="">Select a customer...</option>
                            {customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name} — {c.mobile}
                                </option>
                            ))}
                        </select>
                    </section>

                    {/* Item Selection Grid */}
                    <section className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 block">
                            2. Add Items
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {allItems.map((item) => (
                                <button
                                    key={item.id}
                                    disabled={item.quantity <= 0}
                                    onClick={() => addToCart(item)}
                                    className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-500 transition-all text-left disabled:opacity-30"
                                >
                                    <div>
                                        <p className="font-bold text-white text-sm">{item.name}</p>
                                        <p className="text-xs text-zinc-500 font-mono">
                                            ₹{item.price} • Stock: {item.quantity}
                                        </p>
                                    </div>
                                    <Plus size={16} className="text-zinc-500" />
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Side: Cart Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 bg-[#0c0c0e] border border-zinc-800 rounded-2xl flex flex-col h-fit overflow-hidden">
                        <div className="p-6 border-b border-zinc-800 bg-zinc-900/20">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                Sale Summary
                            </h3>
                        </div>

                        <div className="p-6 flex-grow space-y-4 max-h-[400px] overflow-y-auto">
                            {cart.length === 0 ? (
                                <p className="text-center text-zinc-600 py-10 text-sm italic">
                                    No items added yet
                                </p>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.itemId}
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex-grow">
                                            <p className="text-sm font-bold text-white leading-tight">
                                                {item.name}
                                            </p>
                                            <p className="text-[10px] font-mono text-zinc-500">
                                                ₹{item.price * item.quantity}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800">
                                            <button
                                                onClick={() => updateQuantity(item.itemId, -1)}
                                                className="text-zinc-500 hover:text-white"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="text-xs font-bold text-white w-4 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.itemId, 1)}
                                                className="text-zinc-500 hover:text-white"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.itemId)}
                                            className="ml-3 text-zinc-700 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 bg-zinc-900/50 border-t border-zinc-800 space-y-4">
                            <div className="flex gap-2">
                                {(["cash", "online"] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setPaymentType(type)}
                                        className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            paymentType === type
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent text-zinc-500 border-zinc-800"
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-zinc-500 text-xs font-bold uppercase">
                                    Grand Total
                                </span>
                                <span className="text-xl font-black text-white">
                                    ₹{totalAmount.toLocaleString()}
                                </span>
                            </div>

                            <button
                                disabled={
                                    !selectedCustomerId ||
                                    cart.length === 0 ||
                                    createSaleMutation.isPending
                                }
                                onClick={handleSubmit}
                                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-20 flex items-center justify-center gap-2"
                            >
                                {createSaleMutation.isPending ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <CheckCircle2 size={18} />
                                )}
                                Complete Sale
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewSalePage;
