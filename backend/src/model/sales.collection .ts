import { SaleItemArrayType } from "@/types/item.array.type";
import { PAYMENT_TYPE } from "@/types/payment.type";
import { Document, model, Schema, Types } from "mongoose";

export interface ISales extends Document {
    _id: Types.ObjectId;

    items: SaleItemArrayType[];

    customerId: Types.ObjectId;

    totalAmount: number;

    date: Date;

    paymentType: PAYMENT_TYPE;

    isDeleted: boolean;
}

const salesSchema = new Schema<ISales>(
    {
        items: [
            {
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: "Items",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                total: {
                    type: Number,
                    required: true,
                },
            },
        ],

        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customers",
            required: true,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        paymentType: {
            type: String,
            enum: Object.values(PAYMENT_TYPE),
            default: PAYMENT_TYPE.CASH,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const SalesModel = model("Sales", salesSchema);
