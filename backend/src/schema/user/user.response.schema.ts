import z from "zod";

export const UserResponseSchema = z.object({
    name: z.string(),
    email: z.string(),
});

export type UserResponseType = z.infer<typeof UserResponseSchema>;
