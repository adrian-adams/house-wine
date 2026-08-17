import * as z from "zod";

export const userSignUpPayloadSchema = z.object({
    user: z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.email("Enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
        authProvider: z.enum(['credentials', 'google'])
    }),
    deliveryAddress: z.object({
        streetNumber: z.string().optional(),
        street1: z.string().optional(),
        street2: z.string().optional(),
        postalCode: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
    }).optional(),
    permissions: z.object({
        acceptTerms: z.boolean("Please read and agree to our T&Cs and Privacy Policy."),
        marketing: z.boolean().optional() 
    })
})

export type SignUpPayload = z.infer<typeof userSignUpPayloadSchema>