import type { CreateItemType } from "@/types/item/create.item.typ";
import api from "./api";

export const ITEM_API = {
    CREATE: (payload: CreateItemType) => api.post("/items", payload).then((res) => res.data),
    UPATE: (itemId: string, payload: Partial<CreateItemType>) =>
        api.patch(`/items/${itemId}`, payload).then((res) => res.data),
    REMOVE: (itemId: string) => api.delete(`/items/${itemId}`).then((res) => res.data),
    GET_ITEMS: (search: string, page: number) =>
        api.get(`/items?search=${search}&page=${page}`).then((res) => res.data),
    GET_OPTIONS: () => api.get("/items/options").then((res) => res.data),
};
