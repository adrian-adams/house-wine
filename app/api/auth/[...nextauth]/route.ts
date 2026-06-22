import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'
import { signIn } from 'next-auth/react'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// export const authOptions = {
//     pages: {
//         signIn: '/'
//     }
// }