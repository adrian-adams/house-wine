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

export default function NotFound() {
    const t = useTranslations('status');

    return (
        <div className='flex flex-col items-center justify-center gap-6 min-h-[calc(100vh-100px)]'>
            <h1 className="leading-10">{t('404.title')}</h1>
            <p><b>404</b> | {t('404.desc')}</p>
            <Link href={routes.home()}>
                <Button>
                    {t('404.backToHome')}
                </Button>
            </Link>
        </div>
    )
}
