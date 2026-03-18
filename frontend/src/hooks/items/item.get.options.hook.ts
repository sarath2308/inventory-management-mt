import { ITEM_API } from "@/api/items.api";
import { useQuery } from "@tanstack/react-query";

export const useGetItemsOptions = () => {
    return useQuery({
        queryKey: ["get-items-options"],
        queryFn: ITEM_API.GET_OPTIONS,
    });
};
