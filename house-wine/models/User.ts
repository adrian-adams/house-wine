import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
    addresses: {
        street: string
        city: string
        province: string
        postalCode: string
        country: string
        isDefault: boolean
    }[]
    createdAt: Date
}

const UserSchema = new Schema<IUser>({
    name: {
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
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);