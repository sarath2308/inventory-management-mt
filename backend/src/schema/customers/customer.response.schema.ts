import z from "zod";

export const CustomerResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    mobile: z.string(),
});

export type CustomerResponseType = z.infer<typeof CustomerResponseSchema>;
