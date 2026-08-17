import React from 'react'
import { Text, Heading, Hr, Row, Column } from '@react-email/components'
import EmailLayout from '@/components/email/EmailLayout'

interface SignUpConfirmationEmailProps {
    firstName: string
    lastName: string
    email: string
}

export default function SignUpConfirmationEmail({ firstName, lastName, email }: SignUpConfirmationEmailProps) {
    return (
        <EmailLayout previewText={`Welcome ${firstName}`}>
            <Heading style={{ fontSize: '20px' }}>
                Thanks for signing up with us!
            </Heading>
            <Hr />
            <Text style={{ fontWeight: 'bold' }}>
                User Account Details
            </Text>
            <Text>Full Name: {firstName} {lastName}</Text>
            <Text>Email: {email}</Text>
        </EmailLayout>
    )
}

