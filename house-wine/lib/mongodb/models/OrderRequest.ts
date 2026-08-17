import { Schema, model, models, Types, type Document } from "mongoose";

export type DeliveryMethod = "pickup" | "shipment";
export type OrderStatus = "pending" | "processing" | "fulfilled" | "cancelled";

export interface OrderRequestItem {
    productId: string
    slug: string
    name: string
    orderQuantity: number
    unitPrice: number // price captured at time of request, not live
}

export interface OrderRequestAddress {
    streetNumber: string
    street1: string
    street2?: string
    postalCode: string
    city: string
    country: string
}

export interface OrderRequestContact {
    firstName: string
    lastName: string
    email: string
    number: string
}

export interface OrderRequestDocument extends Document {
    userId?: Types.ObjectId
    items: OrderRequestItem[]
    contact: OrderRequestContact
    deliveryChoice: DeliveryMethod
    deliveryAddress?: OrderRequestAddress
    message?: string
    marketing: boolean
    status: OrderStatus
    createdAt: Date
    updatedAt: Date
}

const OrderRequestItemSchema = new Schema<OrderRequestItem>(
    {
        productId: { type: String, required: true },
        slug: { type: String, required: true },
        name: { type: String, required: true },
        orderQuantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true },
    },
    {
        _id: false
    }
);

export const OrderRequestAddressSchema = new Schema<OrderRequestAddress>(
    {
        streetNumber: { type: String, required: true },
        street1: { type: String, required: true },
        street2: { type: String, required: false },
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    {
        _id: false
    }
);

const OrderRequestContactSchema = new Schema<OrderRequestContact>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        number: { type: String, required: true }
    },
    {
        _id: false
    }
);

const OrderRequestSchema = new Schema<OrderRequestDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        items: {
            type: [OrderRequestItemSchema],
            required: true,
            validate: {
               validator: (items: OrderRequestItem[]) => items.length > 0,
               message: "An order request must contain at least one item.",
            },
        },
        contact: { type: OrderRequestContactSchema, required: true },
        deliveryChoice: {
            type: String,
            enum: ["pickup", "shipment"],
            default: "shipment",
            required: true
        },
        deliveryAddress: {
            type: OrderRequestAddressSchema,
            required: function(this: { deliveryChoice: DeliveryMethod }) {
                return this.deliveryChoice === "shipment";
            },
        },
        message: { type: String },
        marketing: { type: Boolean, required: true, default: false },
        status: {
            type: String,
            enum: ["pending", "processing", "fulfilled", "cancelled"],
            default: "pending"
        },
    },
    {
        timestamps: true
    }
);

export const OrderRequest = models.OrderRequest || model<OrderRequestDocument>("OrderRequest", OrderRequestSchema);