import { z } from "zod";

export const SalesParamSchema = z.object({
    salesId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Sales Id"),
});
