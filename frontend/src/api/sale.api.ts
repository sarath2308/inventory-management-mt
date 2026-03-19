import type { CreateSalePayloadType } from "@/types/sales/create.sales.type";
import api from "./api";

export const SALE_API = {
    CREATE: (payload: CreateSalePayloadType) => api.post("/sales", payload).then((res) => res.data),
    REMOVE: (saleId: string) => api.delete(`/sales/${saleId}`).then((res) => res.data),
    GET_ALL_SALES: (start: string, end: string, page: number) =>
        api.get(`/sales?start=${start}&end=${end}&page=${page}`).then((res) => res.data),
    GET_CUSTOMER_SALES: (customerId: string, start: string, end: string, page: number) =>
        api
            .get(`/sales/${customerId}/ledger?start=${start}&end=${end}&page=${page}`)
            .then((res) => res.data),
};
