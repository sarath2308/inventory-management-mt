import z from "zod";

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

export const GetSalesSchema = z.object({
    query: querySchema,
});
