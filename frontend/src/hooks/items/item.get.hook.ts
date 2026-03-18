import { ITEM_API } from "@/api/items.api"
import { useQuery } from "@tanstack/react-query"

export const useGetItem = (search: string, page: number)=>
{
    return useQuery({
        queryKey:["get-item",search,page],
        queryFn:()=> ITEM_API.GET_ITEMS(search,page)
    })
}