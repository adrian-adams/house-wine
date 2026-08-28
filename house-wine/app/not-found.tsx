import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { routes } from '@/lib/routes'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export const metadata: Metadata = {
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
    const t = useTranslations('status');

    return (
        <html>
            <body className='flex flex-col items-center justify-center min-h-screen'>
                <div>
                    <h1>{t('404.title')}</h1>
                    <p style={{
                        fontSize: '18px'
                    }}
                    >
                        404 | {t('404.desc')}
                    </p>
                    <Link href={routes.home()}>
                        <Button>
                            {t('404.backToHome')}
                        </Button>
                    </Link>
                </div>
            </body>
        </html>

    )
}
