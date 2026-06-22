"use client"

import React from 'react'
// Nextjs
import Link from 'next/link'
// Queries, Types & Lists
import { ContentUI } from '@/types/ui'
import { PriceListUI } from '@/app/pricing/PriceList'
import { BillingCycle } from './Billing'
// Components
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
// Lucide
import { Euro, Check, X } from 'lucide-react';

type ButtonText = "Start free" | "Sign up and upgrade" | "Create account"
type DiscountDesc = "% off" | ""
type Tier = keyof typeof cardStyles

interface PriceCardUI extends ContentUI {
    tier: Tier
    monthlyPrice: number
    billingCycle: BillingCycle
    tierDesc: string
    tierItems: PriceListUI[]
    href: string
    button: ButtonText
    discount?: number
    discountDesc?: DiscountDesc
    badge?: string
}

const cardStyles = {
    free: {
        badge: "",
        background: "",
        border: "",
        button: "text-black border border-hw-foggy-dew bg-white hover:bg-hw-foggy-dew/70",
    },
    premium: {
        badge: "bg-hw-pinch-pepper",
        background: "bg-hw-shea",
        border: "border-2 border-hw-pinch-pepper",
        button: "hover:opacity-90",
    },
    premiumShopping: {
        badge: "bg-red-800",
        background: "bg-red-100/10",
        border: "border border-red-800",
        button: "bg-red-800 hover:bg-red-900",
    },
    pro: {
        badge: "bg-hw-pinch-pepper",
        background: "bg-hw-shea",
        border: "border-2 border-hw-pinch-pepper",
        button: "hover:opacity-90",
    },
};

export default function PriceCard({ title, monthlyPrice, billingCycle, tierDesc, tierItems, href, button, badge, discount, discountDesc, tier }: PriceCardUI) {
    const yearlyPrice = discount && discount > 0
        ? Math.ceil(monthlyPrice * 12 * (1 - discount / 100)).toFixed()
        : monthlyPrice * 12;
    const isYearly = billingCycle === 'yearly';
    const displayPrice = isYearly ? yearlyPrice : monthlyPrice;
    const billingLabel = isYearly ? 'year' : 'month';

    const styles = cardStyles[tier];

    return (
        <div className="relative h-full p-1">
            {badge && (
                <Badge className={`absolute -top-2.5 right-6 font-bold p-3 ${styles.badge}`}>{badge}</Badge>
            )}
            <Card className={`px-4 pt-10 gap-8 h-full shadow ${styles.background} ${styles.border}`}>
                <CardHeader className="flex flex-col flex-1 gap-4">

                    <CardTitle className="font-instrument-sarif text-2xl">
                        {title}
                    </CardTitle>
                    {/* Currency, Price, Label & Discount */}
                    <div className="flex flex-row items-end gap-1">
                        <span className="flex flex-row items-end">
                            <Euro size="38" />
                            <p className="text-4xl font-semibold text-black!">{displayPrice}</p>
                        </span>
                        <p className="pb-0.5">/ {displayPrice === 0 ? 'Free Forever' : billingLabel}</p>
                        {discount && billingCycle === "yearly" && (
                            <span className="mx-2 px-2 py-1 text-xs text-green-700 font-bold bg-green-200 rounded-full">{discount}{discountDesc}</span>
                        )}
                    </div>

                    <CardDescription className="h-full flex-1 space-y-6">
                        <p>{tierDesc}</p>
                        <ul className="space-y-2 flex-1">
                            {tierItems.map((item, index) => (
                                <li key={index} className={`flex flex-row items-center gap-4 text-[clamp(0.75rem,5vw,1rem)] ${item.style}`}>
                                    {item.included ? <Check size="26" /> : <X size="26" />}
                                    {item.desc}
                                </li>
                            ))}
                        </ul>
                    </CardDescription>

                </CardHeader>

                <CardFooter className="bg-transparent border-t-0 pb-10">
                    <Link href={href} className="w-full block">
                        <Button className={`w-full ${styles.button}`}>
                            {button}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
