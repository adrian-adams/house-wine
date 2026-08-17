import { resend } from './resend'
import OrderConfirmationEmail from '@/components/email/OrderConfirmationEmail'
import AdminOrderNotificationEmail from '@/components/email/AdminOrderNotificationEmail'
import type { OrderRequestDocument } from '../mongodb/models/OrderRequest'

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL as string;
const FROM_ADDRESS = 'House Wine <onboarding@resend.dev>'; 

export async function sendOrderEmails(order: OrderRequestDocument) {
    const plainOrder = order.toObject() as OrderRequestDocument;
    const orderId = plainOrder._id.toString();
    const createdAt = plainOrder.createdAt.toLocaleDateString('en-ZA', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const results = await Promise.allSettled([
        resend.emails.send({
            from: FROM_ADDRESS,
            to: plainOrder.contact.email,
            subject: 'Your House Wine order request has been recieved',
            react: OrderConfirmationEmail({
                firstName: plainOrder.contact.firstName,
                orderId,
                deliveryChoice: plainOrder.deliveryChoice,
                items: plainOrder.items,
            }),
        }),
        resend.emails.send({
            from: FROM_ADDRESS,
            to: ADMIN_EMAIL,
            subject: `New Order Request - ${plainOrder.contact.firstName} ${plainOrder.contact.lastName}`,
            react: AdminOrderNotificationEmail({
                orderId,
                createdAt,
                contact: plainOrder.contact,
                deliveryChoice: plainOrder.deliveryChoice,
                deliveryAddress: plainOrder.deliveryAddress,
                items: plainOrder.items,
                message: plainOrder.message,
                marketing: plainOrder.marketing,
            }),
        }),
    ]);

    results.forEach((result, index) => {
        const label = index === 0 ? 'customer confirmation' : 'admin notification';
        if (result.status === 'rejected') {
            console.error(`Faild to send ${label} email:`, result.reason);
        }
    });
}