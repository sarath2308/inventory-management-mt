import z from "zod";
import { ItemParamSchema } from "./items.param.schema";

export const RemoveItemSchema = z.object({
    params: ItemParamSchema,
});
