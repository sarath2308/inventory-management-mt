import { Document, model, Schema, Types } from "mongoose";

export interface ICustomers extends Document {
    _id: Types.ObjectId;
    name: string;
    address: string;
    mobile: string;
    isDeleted: boolean;
    createdAt: Date;
}

const customerSchema = new Schema<ICustomers>(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        mobile: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export const CustomersModel = model("Customers", customerSchema);
