import { useState } from 'react'
// il8n
import { useTranslations } from 'next-intl'
// Components
import { Button } from '@/components/ui/button'

export type BillingCycle = 'monthly' | 'yearly';

interface BillingProps {
    value: BillingCycle
    onChange: (cycle: BillingCycle) => void
}

export default function Billing({ value, onChange }: BillingProps) {
    const t = useTranslations('pricing');

    return (
        <div className="flex flex-row items-center gap-4">
            <p className="font-semibold">{t('billing.title')}</p>
            <div
                role="radiogroup"
                aria-label="Billing cycle"
                className="w-fit bg-white p-1.5 rounded-full border border-hw-dead-sea-mud border-3xl"
            >
                <Button
                    role="radio"
                    aria-checked={value === 'monthly'}
                    onClick={() => onChange('monthly')}
                    className={`${value === 'monthly' ? 'hw-billing-active' : 'hw-billing-default'} hw-billing-btns`}
                >
                    {t('billing.monthly')}
                </Button>
                <Button
                    role="radio"
                    aria-checked={value === 'yearly'}
                    onClick={() => onChange('yearly')}
                    className={`${value === 'yearly' ? 'hw-billing-active' : 'hw-billing-default'} hw-billing-btns`}
                >
                    {t('billing.yearly')}
                </Button>
            </div>
        </div>
    )
}