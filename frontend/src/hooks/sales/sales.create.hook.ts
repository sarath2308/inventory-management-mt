import { SALE_API } from "@/api/sale.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useCreateSale = () => {
    return useMutation({
        mutationFn: SALE_API.CREATE,
        onSuccess: () => {
            toast.success("Sale Added");
        },
        onError: (err: unknown) => {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message || "Sale not Created, try after sometimes");
            } else {
                toast.error("Something went wrong");
            }
        },
    });
};
