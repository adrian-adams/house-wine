// "use client"

import React from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// Types, Queries & Lists
import { featuresMain, shopYourWay } from './FeaturesList'
// Nextjs
import Link from 'next/link';
// Components
import InfoCardsFeatures from '@/components/cards/InfoCards_Features'
import { Button } from '@/components/ui/button';

export default function Features() {
    const t = useTranslations('features')
    return (
        <>
            <section className="space-y-4">
                <h1>
                    {t('title')}
                </h1>
                <p>
                    {t('desc')}
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
                                    title={t(`featuresMain.${index}.title`)}
                                    desc={t(`featuresMain.${index}.desc`)}
                                />
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className="space-y-4">
                <h2>
                    {t('shopYourWay.title')}
                </h2>
                <p>
                    {t('shopYourWay.desc')}
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
                                    title={t(`shopYourWay.list.${index}.title`)}
                                    desc={t(`shopYourWay.list.${index}.desc`)}
                                />
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className="hw-section-block bg-hw-white">
                <h2>
                    {t('getStarted.title')}
                </h2>
                <p>
                    {t('getStarted.desc')}
                </p>
                <Link href="#">
                    <Button className="bg-hw-dead-sea-mud p-6">
                        {t('getStarted.getStartedBtn')}
                    </Button>
                </Link>
            </section>
        </>
    )
}
