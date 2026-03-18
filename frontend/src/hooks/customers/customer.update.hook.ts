import { CUSTOMER_API } from "@/api/customer.api"
import type { CreateCustomerType } from "@/types/customers/customer.create.type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export const useUpdateCustomer = () =>
{
    return useMutation({
        mutationFn:({customerId,payload}:{customerId: string,payload: Partial<CreateCustomerType>})=> CUSTOMER_API.UPDATE(customerId,payload),
        onSuccess:()=>
        {
            toast.success("customer updated")
        },
         onError:(err: unknown) =>
        {
            if(err instanceof AxiosError)
            {
                toast.error(err.response?.data.message || "customer not updated,try after sometimes")
            }
            else
            {
                toast.error("Something went wrong")
            }
        }
    })
}