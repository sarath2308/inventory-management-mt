import { ITEM_API } from "@/api/items.api";
import type { CreateItemType } from "@/types/item/create.item.typ";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useUpdateItems = () => {
    return useMutation({
        mutationFn: ({ itemId, payload }: { itemId: string; payload: Partial<CreateItemType> }) =>
            ITEM_API.UPATE(itemId, payload),
        onSuccess: () => {
            toast.success("Item Updated");
        },
        onError: (err: unknown) => {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message ?? "item not updated,try after sometimes");
            } else {
                toast.error("Something went wrong");
            }
        },
    });
};
