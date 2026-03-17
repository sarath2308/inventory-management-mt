import { Iitems } from "@/model/item.model";
import { ItemResponseSchema } from "@/schema/items/item.response.schema";

export function ItemMapper(item: Iitems) {
    const it = {
        id: String(item._id),
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
    };

    return ItemResponseSchema.parse(it);
}
