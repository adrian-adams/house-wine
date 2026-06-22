// house-wine/lib/auth.ts

import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from './mongodb'
import User from '@/models/User'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials')
                }

                await connectDB()

                const user = await User.findOne({ email: credentials.email })

                if (!user || !user.password) {
                    throw new Error('No user found')
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordValid) {
                    throw new Error('Invalid password')
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            // Handle Google sign in
            if (account?.provider === 'google') {
                await connectDB()

                const existingUser = await User.findOne({ email: user.email })

                if (!existingUser) {
                    // Create new user from Google account
                    await User.create({
                        name: user.name,
                        email: user.email,
                        password: '',   // no password for Google users
                        role: 'user'
                    })
                }
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role
            }
            return session
        }
    },
    pages: {
        signIn: '/login',       // your custom login page
        error: '/login',        // redirect errors to login page
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}