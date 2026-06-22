"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export type BillingCycle = 'monthly' | 'yearly';

interface BillingProps {
    value: BillingCycle
    onChange: (cycle: BillingCycle) => void
}

export default function Billing({ value, onChange }: BillingProps) {
    return (
        <div className="flex flex-row items-center gap-4">
            <p className="font-semibold">Billing</p>
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
                    Monthly
                </Button>
                <Button
                    role="radio"
                    aria-checked={value === 'yearly'}
                    onClick={() => onChange('yearly')}
                    className={`${value === 'yearly' ? 'hw-billing-active' : 'hw-billing-default'} hw-billing-btns`}
                >
                    Yearly
                </Button>
            </div>
        </div>
    )
}