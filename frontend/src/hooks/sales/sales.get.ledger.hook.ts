import { SALE_API } from "@/api/sale.api";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomerLedger = (
    customerId: string,
    start: string,
    end: string,
    page: number,
) => {
    return useQuery({
        queryKey: ["get-ledger", customerId, start, end, page],
        queryFn: () => SALE_API.GET_CUSTOMER_SALES(customerId, start, end, page),
    });
};
