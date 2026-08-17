import React from 'react'
import { Text, Heading, Hr, Row, Column } from '@react-email/components'
import EmailLayout from '@/components/email/EmailLayout'

interface AdminConfirmationEmailProps {
    createdAt: string
    userId: string
    firstName: string
    lastName: string
    email: string
    marketing: boolean
}

export default function AdminConfirmationEmail({ createdAt, userId, firstName, lastName, email, marketing }: AdminConfirmationEmailProps) {

    const UserDetails: { key: string, label: string, value: string | boolean }[] = [
        { key: "firstName", label: "First Name", value: firstName },
        { key: "lastName", label: "Last Name", value: lastName },
        { key: "email", label: "Email", value: email },
        { key: "createdAt", label: "Created At", value: createdAt },
        { key: "userId", label: "User ID", value: userId },
        { key: "marketing", label: "Marketing Opt-In", value: marketing ? 'Yes' : 'No' }
    ]

    return (
        <EmailLayout previewText={`New User ${firstName} - ${userId}`}>
            <Heading style={{ fontSize: '20px' }}>
                New user has signed up:
            </Heading>
            <Text style={{ fontWeight: 'bold' }}>
                New User Account Details
            </Text>
            <Hr />
            {UserDetails.map((item) => (
                <Row key={item.key}>
                    <Column>
                        <Text>{item.label}</Text>
                    </Column>
                    <Column align="right">
                        <Text>{item.value}</Text>
                    </Column>
                </Row>
            ))}
        </EmailLayout>
    )
}

