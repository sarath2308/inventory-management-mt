import z from "zod";

export const SalesResponseSchema = z.object({
    id: z.string(),
    totalItems: z.number(),
    customerName: z.string(),
    totalAmount: z.number(),
    date: z.string(),
    paymentType: z.string(),
});

export type SalesResponseDataType = z.infer<typeof SalesResponseSchema>;
