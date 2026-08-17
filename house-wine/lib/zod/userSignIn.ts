import * as z from "zod";

export const userSignInPayloadSchema = z.object({
    user: z.object({
        email: z.email("Enter a valid email address"),
        password: z
        .string()
    })
})

export type SignUpPayload = z.infer<typeof userSignInPayloadSchema>