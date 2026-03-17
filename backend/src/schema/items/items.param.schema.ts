import { z } from "zod";

export const ItemParamSchema = z.object({
    itemId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid item Id"),
});
