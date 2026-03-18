import { CUSTOMER_API } from "@/api/customer.api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const useCreateCustomer = () =>
{
    return useMutation({
        mutationFn: CUSTOMER_API.CREATE,
        onSuccess:()=>
        {
            toast.success("Customer Added")
        },
        onError:(err: unknown) =>
        {
            if(err instanceof AxiosError)
            {
                toast.error(err.response?.data.message || "customer not created,try after sometimes")
            }
            else
            {
                toast.error("Something went wrong")
            }
        }
    })
}