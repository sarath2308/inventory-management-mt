import { z } from "zod";

export const CustomerParamSchema = z.object({
    customerId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid customer Id"),
});
