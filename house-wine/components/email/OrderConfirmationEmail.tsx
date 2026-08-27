import { Text, Heading, Hr, Row, Column } from '@react-email/components'
import EmailLayout from './EmailLayout'

interface OrderConfirmationEmailProps {
    firstName: string
    orderId: string
    deliveryChoice: 'pickup' | 'shipment'
    items: {
        name: string
        orderQuantity: number
        unitPrice: number
    }[]
}

export default function OrderConfirmationEmail({ firstName, orderId, deliveryChoice, items }: OrderConfirmationEmailProps) {
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.orderQuantity, 0);

    return (
        <EmailLayout previewText={`Your House Wien order request #${orderId} has been received`}>
            <Heading
                style={{ fontSize: '20px' }}
            >
                Thanks for your order, {firstName}!
            </Heading>
            <Text>
                We&apos;ve received your request and will be in touch shortly to confirm details. You chose <strong>{deliveryChoice}</strong> for this order.
            </Text>
            <Hr />
            {items.map((item, index) => (
                <Row key={index} style={{ marginBottom: '8px ' }}>
                    <Column>
                        <Text style={{ marginBottom: '0px' }}>
                            {item.name} x {item.orderQuantity}
                        </Text>
                    </Column>
                    <Column align='right'>
                        <Text style={{ marginBottom: '0px' }}>
                            R{(item.unitPrice * item.orderQuantity).toFixed(2)}
                        </Text>
                    </Column>
                </Row>
            ))}
            <Hr />
            <Text style={{ fontWeight: 'bold' }}>Subtotal: R{subtotal.toFixed(2)}</Text>
            <Text style={{ fontSize: '12px', color: '#666' }}>Order reference: {orderId}</Text>
        </EmailLayout>
    )
}
