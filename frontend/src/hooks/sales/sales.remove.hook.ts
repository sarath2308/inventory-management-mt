import { SALE_API } from "@/api/sale.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useRemoveSale = () => {
    return useMutation({
        mutationFn: SALE_API.REMOVE,
        onSuccess: () => {
            toast.success("Sale Removed");
        },
        onError: (err: unknown) => {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message ?? "Sale not removed,try after sometimes");
            } else {
                toast.error("Something went wrong");
            }
        },
    });
};
