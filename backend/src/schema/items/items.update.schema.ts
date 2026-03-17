import { z } from "zod";
import { ItemParamSchema } from "./items.param.schema";

const bodySchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").optional(),

    description: z.string().trim().min(5, "Description too short").optional(),

    price: z.coerce.number().positive("Price must be greater than 0").optional(),

    quantity: z.coerce.number().int().min(0, "Quantity cannot be negative").optional(),
});

export const UpdateItemSchema = z.object({
    body: bodySchema,
    params: ItemParamSchema,
});

export type UpdateItemDataType = z.infer<typeof bodySchema>;
