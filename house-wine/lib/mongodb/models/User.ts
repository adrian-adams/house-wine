import { Schema, model, models, type Document } from "mongoose";
// Address Schema from Order Request
import { OrderRequestAddress, OrderRequestAddressSchema } from './OrderRequest';
import { randomUUID } from "crypto";

export interface UserContactDetails {
    firstName: string
    lastName: string
    email: string
    password?: string
    number?: string
    authProvider: 'credentials' | 'google'
}

export interface UserPermissions {
    acceptTerms: boolean
    marketing: boolean
} 

export interface UserDocument extends Document {
    userId: string
    user: UserContactDetails
    deliveryAddress: OrderRequestAddress // Address Schema from Order Request
    permissions: UserPermissions
    createdAt: Date
    updatedAt: Date
}

const UserContactDetailsSchema = new Schema<UserContactDetails>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password:  { 
            type: String,
            required: function (this: UserContactDetails) {
                return this.authProvider === 'credentials';
            }
        },
        number: { type: String, required: false, min: 1 },
        authProvider: {
            type: String,
            enum: ['credentials', 'google'],
            required: true
        }
    },
    {
        _id: false
    }
)

const UserPermissionsSchema = new Schema<UserPermissions> (
    {
        acceptTerms: { type: Boolean, required: true },
        marketing: { type: Boolean, required: false }
    },
    {
        _id: false
    }
)

const UserSchema = new Schema<UserDocument>({
    userId: { 
        type: String,
        default: () => randomUUID(),
        unique: true,
        immutable: true
    },
    user: {
        type: UserContactDetailsSchema,
        required: true
    },
    deliveryAddress: {
        // Address Schema from Order Request
        type: OrderRequestAddressSchema, 
        required: false
    },
    permissions: {
        type: UserPermissionsSchema,
        required: true
    }
   
}, {timestamps: true});

export const User = models.User || model<UserDocument>("User", UserSchema);

