import { SALE_API } from "@/api/sale.api";
import { useQuery } from "@tanstack/react-query";

export const useGetSales = (start: string, end: string, page: number) => {
    return useQuery({
        queryKey: ["get-sales", start, end, page],
        queryFn: () => SALE_API.GET_ALL_SALES(start, end, page),
    });
};
