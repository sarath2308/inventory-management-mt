import z from "zod";
import { CustomerParamSchema } from "./customer.params.schema";

export const RemoveCustomerSchema = z.object({
    params: CustomerParamSchema,
});
