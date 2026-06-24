"use client"

import React, { useState } from 'react'
// il8n
import { useTranslations } from 'next-intl'
// Types, Queries & Lists
import { free, premium, premiumShopping, pro, FAQ } from './PriceList'
import { BillingCycle } from '@/components/cards/price/Billing'
// Components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import PriceCard from '@/components/cards/price/PriceCard'
import Billing from '@/components/cards/price/Billing'

export default function Pricing() {
    const t = useTranslations('pricing');
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    return (
        <div className="pricing">
            <section className="w-full md:w-8/12 mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
                <h1>
                    {t('title')}
                </h1>
                <p>
                    {t('desc')}
                </p>
                <Billing value={billingCycle} onChange={setBillingCycle} />
            </section>
            <section>
                <h2>{t('forCollectors.title')}</h2>
                <div className="hw-pricing-grid">
                    <PriceCard
                        tier="free"
                        monthlyPrice={0}
                        billingCycle={billingCycle}
                        tierItems={free}
                        ENfeatures="free"
                        href="/register"
                    />
                    <PriceCard
                        tier="premium"
                        badge
                        monthlyPrice={5}
                        discount={17}
                        billingCycle={billingCycle}
                        tierItems={premium}
                        ENfeatures="premium"
                        href="/register"
                    />
                </div>
            </section>
            <section>
                <h2>{t('forSellers.title')}</h2>
                <div className="hw-pricing-grid">
                    <PriceCard
                        tier="premiumShopping"
                        badge
                        monthlyPrice={20}
                        discount={17}
                        billingCycle={billingCycle}
                        tierItems={premiumShopping}
                        ENfeatures="premiumShopping"
                        href="/register"
                    />
                    <PriceCard
                        tier="pro"
                        badge
                        monthlyPrice={40}
                        discount={17}
                        billingCycle={billingCycle}
                        tierItems={pro}
                        ENfeatures="pro"
                        href="/register"
                    />
                </div>
            </section>
            <section>
                <h2>{t('faq.title')}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                    {FAQ.map((item, index) => (
                        <AccordionItem key={index} value={item.value} className="bg-white px-4 py-2 rounded-md">
                            <AccordionTrigger className="font-ibm-plex-sans cursor-pointer">
                                {t(`faq.list.${index}.title`)}
                            </AccordionTrigger>
                            <AccordionContent className="h-full pt-2">
                                {t(`faq.list.${index}.desc`)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    )
}
