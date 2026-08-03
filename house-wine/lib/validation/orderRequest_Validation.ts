import * as z from "zod";

export const orderRequestPayloadSchema = z.object({
    contact: z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.email("Enter a valid email address"),
        number: z.string().min(1, "Number is required"),
    }),
    deliveryChoice: z.enum(["pickup", "shipment"]).default("shipment"),
    deliveryAddress: z.object({
        streetNumber: z.string().optional(),
        street1: z.string().optional(),
        street2: z.string().optional(),
        postalCode: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
    }).optional(),
    message: z.string().optional(),
    marketing: z.boolean(),
    items: z.array(
        z.object({
            productId: z.string(),
            slug: z.string(),
            name: z.string(),
            orderQuantity: z.number().min(1, "Quantity must be at least 1"),
            unitPrice: z.number()
        })
    ).min(1, "Your order must contain at least one item")
}).superRefine((data, ctx) => {
    if (data.deliveryChoice === "shipment") {
        type DeliveryAddrKeys = keyof NonNullable<typeof data.deliveryAddress>;
        const requiredFields: { value: DeliveryAddrKeys; label: string }[] = [
            { value: "streetNumber", label: "No." },
            { value: "street1", label: "Street Name" },
            { value: "postalCode", label: "Postal Code" },
            { value: "city", label: "City" },
            { value: "country", label: "Country" },
        ];

        for (const field of requiredFields) {
            if (!data.deliveryAddress?.[field.value]?.trim()) {
                ctx.addIssue({
                    code: 'custom', 
                    message: `${field.label} is required`,
                    path: ["deliveryAddress", field.value]
                });
            }
        }
    }
}).transform((data) => {
    if (data.deliveryChoice === "pickup") {
        return { ...data, deliveryAddress: undefined };
    }
    return data;
})

export type OrderRequestPayload = z.infer<typeof orderRequestPayloadSchema>
