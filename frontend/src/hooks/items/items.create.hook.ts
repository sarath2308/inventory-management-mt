import { ITEM_API } from "@/api/items.api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const useCreateItems = ()=>
{
    return useMutation({
        mutationFn: ITEM_API.CREATE,
        onSuccess:()=>
        {
            toast.success("item created")
        },
        onError:(err: unknown) =>
        {
            if(err instanceof AxiosError)
            {
                toast.error(err.response?.data.message ?? "Item not create,try after sometimes")
            }
            else
            {
                toast.error("Something went wrong")
            }
        }
    })
}