import { z } from "zod";

const Schema = z.object({
    email: z.email("Invalid email format").transform((val) => val.trim().toLowerCase()),

    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password too long"),
});

export const LoginSchema = z.object({
    body: Schema,
});

export type LoginDataType = z.infer<typeof Schema>;
