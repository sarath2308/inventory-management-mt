import z from "zod";

const querySchema = z.object({
    search: z.string().optional().default(""),
    page: z.coerce.number().min(1).default(1),
});

export const GetItemsSchema = z.object({
    query: querySchema,
});
