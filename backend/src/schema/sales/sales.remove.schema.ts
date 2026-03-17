import z from "zod";
import { SalesParamSchema } from "./sales.params.schema";

export const RemoveSalesSchema = z.object({
    params: SalesParamSchema,
});
