import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }

        await connectDB()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        })

        return NextResponse.json(
            { message: '✅ User created successfully' },
            { status: 201 }
        )

    } catch (error: any) {
        console.error('❌ Register error:', error) // ← full error in terminal
        return NextResponse.json(
            { message: '❌ Something went wrong', error: error.message }, // ← send message not object
            { status: 500 }
        )
    }
}