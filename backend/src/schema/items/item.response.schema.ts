import z from "zod";

export const ItemResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    quantity: z.number(),
    price: z.number(),
});

export type ItemResponseDataType = z.infer<typeof ItemResponseSchema>;
