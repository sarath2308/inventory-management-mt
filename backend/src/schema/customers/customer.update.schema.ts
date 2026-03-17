import z from "zod";
import { CustomerParamSchema } from "./customer.params.schema";

const bodySchema = z.object({
    name: z.string().min(1, "invalid name"),
    address: z.string().min(4, "address not valid"),
    mobile: z.string().min(10, "mobile number invalid"),
});

export const UpdateCustomerSchema = z.object({
    body: bodySchema,
    params: CustomerParamSchema,
});

export type UpdateCustomerType = z.infer<typeof bodySchema>;
