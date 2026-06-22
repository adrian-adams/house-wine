import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

console.log('🔍 MONGODB_URI:', MONGODB_URI ? 'Found' : 'NOT FOUND')

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env.local')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
    if (cached.conn) {
        console.log('✅ Using cached connection')
        return cached.conn
    }

    if (!cached.promise) {
        console.log('🔍 Connecting to MongoDB...')
        const opts = {
            bufferCommands: false,    // ← don't buffer if not connected
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then((m) => {
                console.log('✅ MongoDB connected')
                cached.conn = m.connection
                return cached
            })
            .catch((err) => {
                console.error('❌ Connection error:', err.message)
                cached.promise = null
                throw err
            })
    }

    await cached.promise
    return cached.conn
}