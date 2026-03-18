import { ConfirmModal } from "@/components/confirmation.modal.component";
import { Modal } from "@/components/modal.component";
import type { Column } from "@/components/table.component";
import DataTable from "@/components/table.component";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/helper/debounce";
import { useGetItem } from "@/hooks/items/item.get.hook";
import { useRemoveItem } from "@/hooks/items/item.remove.hook";
import { useUpdateItems } from "@/hooks/items/item.update.hook";
import { useCreateItems } from "@/hooks/items/items.create.hook";
import type { ItemResponseType } from "@/types/item/item.response.type";
import { Edit2, Trash2, Plus, Search, Loader2 } from "lucide-react";
import { useState } from "react";

const ItemPage = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemResponseType | null>(null);
  const [search,setSearch] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
  });

  const debouncedSearch = useDebounce(search,500)

  const { data, isLoading, refetch } = useGetItem(debouncedSearch,page);
  const createItemMutation = useCreateItems();
  const updateItemMutation = useUpdateItems();
  const removeItemMutation = useRemoveItem();

  const items: ItemResponseType[] = data?.itemData ?? [];

  // Sync form data when editing


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedItem) {
        await updateItemMutation.mutateAsync({ itemId: selectedItem.id,payload:{...formData} });
        refetch()
      } else {
        await createItemMutation.mutateAsync(formData);
        refetch()
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await removeItemMutation.mutateAsync(selectedItem.id);
      setIsConfirmOpen(false);
      refetch()
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const columns: Column<ItemResponseType>[] = [
    { header: "Name", accessor: "name" },
    { 
      header: "Price", 
      accessor: "price", 
      cell: (row) => <span className="font-mono">₹{row.price.toLocaleString()}</span> 
    },
    {
      header: "Qty",
      accessor: "quantity",
      cell: (row) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
          row.quantity < 5 
            ? "bg-red-500/10 border-red-500/50 text-red-500" 
            : "bg-emerald-500/10 border-emerald-500/50 text-emerald-500"
        }`}>
          {row.quantity < 5 ? 'Low Stock' : 'In Stock'}: {row.quantity}
        </span>
      )
    }
  ];

  const openEditModal = (item: ItemResponseType) => {
  setSelectedItem(item);

  setFormData({
    name: item.name,
    description: item.description || "",
    quantity: item.quantity,
    price: item.price,
  });

  setIsModalOpen(true);
};

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <Input 
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search items..." 
            className="pl-10 bg-[#0c0c0e] border-zinc-800 text-white focus:ring-1 ring-zinc-700 transition-all"
          />
        </div>
        <button 
          onClick={() => { setSelectedItem(null); setIsModalOpen(true); }}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      {/* Table */}
      <DataTable 
        page={page} 
        pageSize={10} 
        onPageChange={setPage} 
        isLoading={isLoading} 
        columns={columns} 
        data={items} 
        total={items.length} 
        rowKey={(row) => row.id} 
        renderActions={(row) => (
          <div className="flex gap-2">
            <button 
              onClick={() => { setSelectedItem(row); openEditModal(row)}} 
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => { setSelectedItem(row); setIsConfirmOpen(true); }} 
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-red-900 hover:text-red-500 hover:border-red-900 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )} 
      />

      {/* Form Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedItem ? "Edit Item" : "Create New Item"}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Item Name</label>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-zinc-900 border-zinc-800 text-white" 
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-white h-24 outline-none focus:border-zinc-600" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Quantity</label>
              <Input 
                name="quantity"
                type="number" 
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="bg-zinc-900 border-zinc-800 text-white" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Price (₹)</label>
              <Input 
                name="price"
                type="number" 
                value={formData.price}
                onChange={handleInputChange}
                required
                className="bg-zinc-900 border-zinc-800 text-white" 
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={createItemMutation.isPending || updateItemMutation.isPending}
            className="w-full mt-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {(createItemMutation.isPending || updateItemMutation.isPending) && <Loader2 className="animate-spin" size={18} />}
            {selectedItem ? "Save Changes" : "Create Item"}
          </button>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ItemPage;