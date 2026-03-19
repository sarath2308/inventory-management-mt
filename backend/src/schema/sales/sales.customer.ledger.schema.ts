import z from "zod";
import { CustomerParamSchema } from "../customers/customer.params.schema";

const querySchema = z.object({
    start: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Invalid start date",
        }),

    end: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Invalid end date",
        }),

    page: z.coerce.number().min(1).default(1),
});

export const SaleCustomerLedgerSchema = z.object({
    params: CustomerParamSchema,
    query: querySchema,
});
