// house-wine/models/Order.ts

import mongoose, { Schema, Document } from 'mongoose'

export interface IOrderItem {
    sanityId: string
    name: string
    price: number
    quantity: number
    imageUrl: string
}

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId
    items: IOrderItem[]
    totalAmount: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    shippingAddress: {
        street: string
        city: string
        province: string
        postalCode: string
        country: string
    }
    paymentStatus: 'unpaid' | 'paid' | 'refunded'
    createdAt: Date
}

const OrderSchema = new Schema<IOrder>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            sanityId: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            imageUrl: { type: String }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shippingAddress: {
        street: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid', 'refunded'],
        default: 'unpaid'
    }
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)