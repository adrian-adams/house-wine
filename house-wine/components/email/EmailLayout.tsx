import React from 'react'
import { Html, Head, Preview, Body, Container } from '@react-email/components';

interface EmailLayoutProps {
    previewText: string
    children: React.ReactNode
}

export default function EmailLayout({ previewText, children }: EmailLayoutProps) {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body
                style={{
                    backgroundColor: '#f6f6f6',
                    fontFamily: 'Arial, sans-sarif'
                }}
            >
                <Container
                    style={{
                        backgroundColor: '#ffffff',
                        padding: '24px',
                        borderRadius: '8px',
                        maxWidth: '600px'
                    }}
                >
                    {children}
                </Container>
            </Body>
        </Html>
    )
}
