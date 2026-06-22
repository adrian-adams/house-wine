"use client"

import React, { useState } from 'react'
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
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    return (
        <div className="pricing">
            <section className="w-full md:w-8/12 mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
                <h1>
                    Simple pricing, no surprises
                </h1>
                <p>
                    Start free with your first 25 wines. Upgrade to Premium when your collection grows.
                </p>
                <Billing value={billingCycle} onChange={setBillingCycle} />
            </section>
            <section>
                <h2>for collectors</h2>
                <div className="hw-pricing-grid">
                    <PriceCard
                        tier="free"
                        title="Free"
                        monthlyPrice={0}
                        billingCycle={billingCycle}
                        tierDesc="Perfect for discovering and sharing your collection."
                        tierItems={free}
                        href="/register"
                        button="Start free"
                    />
                    <PriceCard
                        tier="premium"
                        badge="Premium"
                        title="Premium"
                        monthlyPrice={5}
                        discount={17}
                        discountDesc="% off"
                        billingCycle={billingCycle}
                        tierDesc="For enthusiasts who want to catalogue and share their full cellar."
                        tierItems={premium}
                        href="/register"
                        button="Sign up and upgrade"
                    />
                </div>
            </section>
            <section>
                <h2>For independent sellers</h2>
                <div className="hw-pricing-grid">
                    <PriceCard
                        tier="premiumShopping"
                        badge="Add-on · per shop"
                        title="Premium Shopping"
                        monthlyPrice={20}
                        discount={17}
                        discountDesc="% off"
                        billingCycle={billingCycle}
                        tierDesc="Activate online checkout on your shop. Customers pay straight into your own Stripe or Mollie account — never via House Wine."
                        tierItems={premiumShopping}
                        href="/register"
                        button="Create account"
                    />
                    <PriceCard
                        tier="pro"
                        badge="Pro · Everything"
                        title="Pro"
                        monthlyPrice={40}
                        discount={17}
                        discountDesc="% off"
                        billingCycle={billingCycle}
                        tierDesc="Everything in Premium, plus online payments, complete whitelabeling, and your own newsletter."
                        tierItems={pro}
                        href="/register"
                        button="Sign up and upgrade"
                    />
                </div>
            </section>
            <section>
                <h2>Frequently asked questions</h2>
                <Accordion type="single" collapsible className="space-y-4">
                    {FAQ?.map((item, index) => (
                        <AccordionItem key={index} value={item.value} className="bg-white px-4 py-2 rounded-md">
                            <AccordionTrigger className="font-ibm-plex-sans cursor-pointer">{item.title}</AccordionTrigger>
                            <AccordionContent className="h-full pt-2">{item.desc}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    )
}
