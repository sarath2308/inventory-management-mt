import z from "zod";

const itemSchema = z.object({
    itemId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid item Id"),

    quantity: z.number().min(1, "Minimum quantity required"),
});

const bodySchema = z.object({
    customerId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid customer Id"),

    items: z.array(itemSchema).min(1, "At least one item required"),

    paymentType: z.enum(["cash", "online"]),
});

export const CreateSalesSchema = z.object({
    body: bodySchema,
});

export type CreateSalesDataType = z.infer<typeof bodySchema>;
