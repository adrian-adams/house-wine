// house-wine/models/Cart.ts

import mongoose, { Schema, Document } from 'mongoose'

export interface ICartItem {
    sanityId: string        // links to Sanity product
    name: string
    price: number
    quantity: number
    imageUrl: string
}

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId
    items: ICartItem[]
    updatedAt: Date
}

const CartSchema = new Schema<ICart>({
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
            quantity: { type: Number, required: true, min: 1 },
            imageUrl: { type: String }
        }
    ],
}, { timestamps: true })

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)