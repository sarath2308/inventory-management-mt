import { ItemResponseDataType } from "@/schema/items/item.response.schema";
import { CreateItemDataType } from "@/schema/items/items.create.schema";
import { UpdateItemDataType } from "@/schema/items/items.update.schema";

export interface IItemsService {
    createItem: (payload: CreateItemDataType) => Promise<void>;
    updateItem: (itemId: string, payload: UpdateItemDataType) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    getAllItemsForTable: (search: string, page: number) => Promise<ItemResponseDataType[]>;
    findById: (id: string) => Promise<ItemResponseDataType | null>;
    reduceCount: (itemId: string, count: number) => Promise<void>;
    getItems: () => Promise<ItemResponseDataType[]>;
}
