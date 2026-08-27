import { Text, Heading, Hr } from '@react-email/components'
import EmailLayout from './EmailLayout'

interface AdminOrderNotificationEmailProps {
    orderId: string
    createdAt: string
    contact: {
        firstName: string
        lastName: string
        email: string
        number: string
    }
    deliveryChoice: 'pickup' | 'shipment'
    deliveryAddress?: {
        streetNumber: string
        street1: string;
        street2?: string
        postalCode: string
        city: string
        country: string
    }
    items: {
        name: string
        orderQuantity: number
        unitPrice: number
    }[]
    message?: string
    marketing: boolean
}

export default function AdminOrderNotificationEmail({
    orderId,
    createdAt,
    contact,
    deliveryChoice,
    deliveryAddress,
    items,
    message,
    marketing, }: AdminOrderNotificationEmailProps) {
    return (
        <EmailLayout previewText={`New order Request #${orderId}`}>
            <Heading style={{ fontSize: '20px' }}>New Order Request</Heading>
            <Text style={{ fontSize: '12px', color: '#666' }}>{orderId} - {createdAt}</Text>

            <Hr />
            <Text style={{ fontWeight: 'bold' }}>Contact</Text>
            <Text style={{ margin: 0 }}>{contact.firstName} {contact.lastName}</Text>
            <Text style={{ margin: 0 }}>{contact.email}</Text>
            <Text style={{ margin: 0 }}>{contact.number}</Text>

            <Hr />
            <Text>Delivery: {deliveryChoice}</Text>
            {deliveryChoice === 'shipment' && deliveryAddress && (
                <Text style={{ margin: 0 }}>
                    {deliveryAddress.streetNumber} {deliveryAddress.street1}
                    {deliveryAddress.street2 ? `, ${deliveryAddress.street2}` : ''}
                    <br />
                    {deliveryAddress.city}, {deliveryAddress.postalCode}
                    <br />
                    {deliveryAddress.country}
                </Text>
            )}

            <Hr />
            <Text style={{ fontWeight: 'bold' }}>Items</Text>
            {items.map((item, index) => (
                <Text key={index} style={{ margin: 0 }}>
                    {item.name} x {item.orderQuantity} - R{(item.unitPrice * item.orderQuantity).toFixed(2)}
                </Text>
            ))}

            {message && (
                <>
                    <Hr />
                    <Text style={{ fontWeight: 'bold' }}>Message from customer</Text>
                    <Text>{message}</Text>
                </>
            )}

            <Hr />
            <Text style={{ fontSize: '12px', color: '#666' }}>
                Marketing opt-in: {marketing ? 'Yes' : 'No'}
            </Text>
        </EmailLayout>
    )
}
