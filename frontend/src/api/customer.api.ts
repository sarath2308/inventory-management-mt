import type { CreateCustomerType } from "@/types/customers/customer.create.type";
import api from "./api";

export const CUSTOMER_API = {
    CREATE:(payload: CreateCustomerType) => api.post("/customers",payload).then((res)=>res.data),
    UPDATE:(customerId: string, payload:Partial<CreateCustomerType>) => api.patch(`/customers/${customerId}`,payload).then((res)=>res.data),
    REMOVE:(customerId: string) => api.delete(`/customers/${customerId}`).then((res)=>res.data),
    GET_ALL:(search: string, page: number)=>api.get(`/customers?search=${search}&page=${page}`).then((res)=>res.data),
}