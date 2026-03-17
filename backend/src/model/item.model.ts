import { Document, model, Schema, Types } from "mongoose";

export interface Iitems extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    quantity: number;
    isDeleted: boolean;
}

const itemSchema = new Schema<Iitems>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 0 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export const ItemsModel = model("Items", itemSchema);
