import { resend, FROM_ADDRESS, ADMIN_EMAIL } from './resend'
import AdminConfirmationEmail from '@/components/email/user/AdminConfirmationEmail'
import SignUpConfirmationEmail from '@/components/email/user/SignUpConfirmationEmail'
import type { UserDocument } from '../mongodb/models/User'

export async function sendUserEmails(user: UserDocument) {
    const plainUser = user.toObject() as UserDocument;
    const createdAt = plainUser.createdAt.toLocaleDateString('en-ZA', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const results = await Promise.allSettled([
        resend.emails.send({
            from: FROM_ADDRESS,
            to: plainUser.user.email,
            subject: 'Congradulations, your House Wine account has been created!',
            react: SignUpConfirmationEmail({
                firstName: plainUser.user.firstName,
                lastName: plainUser.user.lastName,
                email: plainUser.user.email
            })
        }),
        resend.emails.send({
            from: FROM_ADDRESS,
            to: ADMIN_EMAIL,
            subject: `New Customer: ${plainUser.user.firstName} - ${plainUser.userId}`,
            react: AdminConfirmationEmail({
                createdAt: createdAt,
                userId: plainUser.userId,
                firstName: plainUser.user.firstName,
                lastName: plainUser.user.lastName,
                email: plainUser.user.email,
                marketing: plainUser.permissions.marketing
            })
        })
    ]);

    results.forEach((result, index) => {
        const label = index === 0 ? 'customer notification' : 'admin notification'

        if (result.status === 'rejected') {
            console.error(`Failed to send ${label} email: `, result.reason)
        }
    })
}