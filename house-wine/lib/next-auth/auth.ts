import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb/connectDB'
import { User } from '@/lib/mongodb/models/User'
import { sendUserEmails } from '../email/sendUserEmails'
import { routes } from '../routes'


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

                await connectDB();

                const foundUser = await User.findOne({ 'user.email': credentials.email })

                if (!foundUser || !foundUser.user.password) {
                    throw new Error('No user found')
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    foundUser.user.password
                )

                if (!isPasswordValid) {
                    throw new Error('Invalid password')
                }

                return {
                    id: foundUser.userId,
                    email: foundUser.user.email,
                    name: `${foundUser.user.firstName} ${foundUser.user.lastName}`
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            // Handle Google sign in
            if (account?.provider === 'google') {
                await connectDB()

                const existingUser = await User.findOne({ 'user.email': user.email })

                if(!existingUser) {
                    const [firstName, ...rest] = (user.name ?? '').split(' ');
                    const lastName = rest.join(' ') || firstName;

                    const newUser = await User.create({
                        user: {
                            firstName,
                            lastName,
                            email: user.email,
                            authProvider: 'google'
                        },
                        permissions: {
                            acceptTerms: true,
                            marketing: false
                        }
                    });

                    sendUserEmails(newUser).catch((err) => {
                        console.error('sendUserEmails failed unexpectedly:  ', err)
                    })
                }
            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session
        }
    },
    pages: {
        signIn: routes.register(),       // your custom login page
        error: routes.register(),        // redirect errors to login page
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}