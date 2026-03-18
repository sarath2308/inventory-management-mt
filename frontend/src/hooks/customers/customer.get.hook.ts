import { CUSTOMER_API } from "@/api/customer.api"
import { useQuery } from "@tanstack/react-query"

export const useGetCustomers = (search: string,page: number) =>
{
    return useQuery({
        queryKey:["get-customers",search,page],
        queryFn:()=> CUSTOMER_API.GET_ALL(search,page),
    })
}