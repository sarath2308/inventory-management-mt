import { Types } from "mongoose";

export type SaleItemArrayType = {
    itemId: Types.ObjectId;
    quantity: number;
    price: number;
    total: number;
};
