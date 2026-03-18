import mongoose from "mongoose";
import { z } from "zod";

export const ItemParamSchema = z.object({
    itemId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid itemId"),
});
