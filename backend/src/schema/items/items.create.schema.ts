import { z } from "zod";

const bodySchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),

    description: z.string().trim().min(5, "Description too short"),

    price: z.coerce.number().positive("Price must be greater than 0"),

    quantity: z.coerce.number().int().min(0, "Quantity cannot be negative"),
});

export const CreateItemSchema = z.object({
    body: bodySchema,
});

export type CreateItemDataType = z.infer<typeof bodySchema>;
