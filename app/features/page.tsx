import React from 'react'
// Types, Queries & Lists
import { featuresMain, shopYourWay } from './FeaturesList'
// Nextjs
import Link from 'next/link';
// Components
import InfoCardsFeatures from '@/components/cards/InfoCards_Features'
import { Button } from '@/components/ui/button';

export default function Features() {
    return (
        <>
            <section className="space-y-4">
                <h1>
                    Wine collection tools for enthusiasts and professionals
                </h1>
                <p>
                    House Wine brings together AI-powered cataloguing, beautiful public shops, and smart organisation—so you can manage, share, and sell from your collection with ease.
                </p>
            </section>
            <section>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuresMain?.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index}>
                                <InfoCardsFeatures
                                    icon={item.icon}
                                    iconStyles={item.style}
                                    iconSize='30'
                                    title={item.title}
                                    desc={item.desc}
                                />
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className="space-y-4">
                <h2>
                    Your wine shop, your way
                </h2>
                <p>
                    House Wine gives you a complete online wine shop with tools built specifically for wine sellers. No tech skills required — just add your wines and start selling.
                </p>
            </section>
            <section>
                <ul className="hw-grid">
                    {shopYourWay?.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index}>
                                <InfoCardsFeatures
                                    icon={item.icon}
                                    iconStyles={item.style}
                                    iconSize='30'
                                    title={item.title}
                                    desc={item.desc}
                                />
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className="hw-section-block bg-hw-white">
                <h2>
                    Start selling in minutes
                </h2>
                <p>
                    Create your free account, add your first wine, and open your shop to the world.
                </p>
                <Link href="#">
                    <Button className="bg-hw-dead-sea-mud p-6">
                        Get started for free
                    </Button>
                </Link>
            </section>
        </>
    )
}
