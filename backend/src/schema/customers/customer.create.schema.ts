import z from "zod";

const bodySchema = z.object({
    name: z.string().min(2, "name required"),
    address: z.string().min(4, "address required"),
    mobile: z.string().min(10, "invalid phone number"),
});

export const CreateCustomerSchema = z.object({
    body: bodySchema,
});

export type CreateCustomerType = z.infer<typeof bodySchema>;
