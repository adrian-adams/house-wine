import React from 'react'
import { Spinner } from "@/components/ui/spinner"
import { useTranslations } from 'next-intl'

export default function Loading() {
    const t = useTranslations('status');

    return (
        <div className="h-screen flex flex-row items-center justify-center bg-neutral-600">
            <div className="flex flex-row items-center justify-center gap-2">
                <p className="text-3xl text-white">{t('loading.title')}...</p>
                <Spinner className="text-white size-10" />
            </div>
        </div>
    )
}
