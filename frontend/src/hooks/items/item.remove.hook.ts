import { ITEM_API } from "@/api/items.api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const useRemoveItem = () =>
{
    return useMutation({
        mutationFn: ITEM_API.REMOVE,
        onSuccess:()=>
        {
            toast.success("Item Removed")
        },
        onError:(err: unknown)=>
        {
            if(err instanceof AxiosError)
            {
                toast.error(err.response?.data.message ?? "item not removed,try after sometimes")
            }
            else
            {
                toast.error("Something went wrong")
            }
        }
    })
}