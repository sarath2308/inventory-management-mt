import { CUSTOMER_API } from "@/api/customer.api";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomersOptons = () => {
    return useQuery({
        queryKey: ["get-customers-options"],
        queryFn: CUSTOMER_API.GET_OPTIONS,
    });
};
