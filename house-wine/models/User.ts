import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    userID: string
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'user' | 'admin'
    addresses: {
        street1: string
        street2: string
        city: string
        province: string
        postalCode: string
        country: string
        isDefault: boolean
    }[]
    acceptTerms: boolean
    marketing: boolean
    createdAt: Date
}

const UserSchema = new Schema<IUser>({
    userID: {
        type: String
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    addresses: {
        street: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
        isDefault: { type: Boolean, default: false }
    },
    acceptTerms: {
        type: Boolean,
        required: true
    },
    marketing: {
        type: Boolean,
        required: false
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);