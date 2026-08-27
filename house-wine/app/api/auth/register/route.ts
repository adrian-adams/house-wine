import { NextRequest, NextResponse } from "next/server"
import { connectDB } from '@/lib/mongodb/connectDB'
import { User } from '@/lib/mongodb/models/User'
import bcrypt from 'bcryptjs'
import { userSignUpPayloadSchema } from "@/lib/zod/userSignUp"
import { sendUserEmails } from "@/lib/email/sendUserEmails"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = userSignUpPayloadSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, errors: result.error.issues },
                { status: 400 }
            );
        } 

        await connectDB();

        const exisitingUser = await User.findOne({ 'user.email': result.data.user.email });
        if (exisitingUser) {
            return NextResponse.json(
                { success: false, error: 'An account with this email already exists.' },
                { status: 409 }
            )
        }
        
        const hashedPassword = await bcrypt.hash(result.data.user.password, 12);

        const user = await User.create({
            ...result.data,
            user: {
                ...result.data.user,
                password: hashedPassword,
                authProvider: 'credentials'
            }
        });

        sendUserEmails(user).catch((err) => {
            console.error("sendUserEmails failed unexpectedly: ", err);
        });

        return NextResponse.json(
            { success: true, userId: user.userId },
            { status: 201 }
        );

    } catch (error) {
        if (error instanceof Error) {
            console.error("Create user failed: ", error.message);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { success: false, error: "Unknown error occured" },
            { status: 500 }
        );
    }
}