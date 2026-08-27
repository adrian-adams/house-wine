// "use client"

import React from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// Types, Queries & Lists
import { featuresMain, shopYourWay } from './FeaturesList'
import { routes } from '@/lib/routes';
// Nextjs
import Link from 'next/link';
import type { Metadata } from "next";
// Components
import InfoCardsFeatures from '@/components/cards/InfoCards_Features'
import { Button } from '@/components/ui/button'
import { HWMotionContainer, HWMotionItem } from '@/components/layout/HWMotionBox';

export const metadata: Metadata = {
    title: "House Wine - Features",
    description: "House Wines brings together AI-powered cataloguing, beautiful public shops, and smart organisation—so you can manage, share, and sell from your collection with ease."
}

export default function Features() {
    const t = useTranslations('features');

    return (
        <div className="hw-content-block">
            <HWMotionContainer className="space-y-4">
                <h1>
                    {t('title')}
                </h1>
                <p>
                    {t('desc')}
                </p>
            </HWMotionContainer>
            <HWMotionContainer>
                <HWMotionContainer as='ul' className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuresMain?.map((item, index) => {
                        return (
                            <HWMotionItem as='li' key={item.title}>
                                <InfoCardsFeatures
                                    icon={item.icon}
                                    iconStyles={item.style}
                                    iconSize='30'
                                    title={t(`featuresMain.${index}.title`)}
                                    desc={t(`featuresMain.${index}.desc`)}
                                    className={item.className}
                                />
                            </HWMotionItem>
                        )
                    })}
                </HWMotionContainer>
            </HWMotionContainer>
            <HWMotionContainer className="space-y-4">
                <h2>
                    {t('shopYourWay.title')}
                </h2>
                <p>
                    {t('shopYourWay.desc')}
                </p>
            </HWMotionContainer>
            <HWMotionContainer>
                <HWMotionContainer as='ul' className="hw-grid">
                    {shopYourWay?.map((item, index) => {
                        return (
                            <HWMotionItem as='li' key={item.title}>
                                <InfoCardsFeatures
                                    icon={item.icon}
                                    iconStyles={item.style}
                                    iconSize='30'
                                    title={t(`shopYourWay.list.${index}.title`)}
                                    desc={t(`shopYourWay.list.${index}.desc`)}
                                    className={item.className}
                                />
                            </HWMotionItem>
                        )
                    })}
                </HWMotionContainer>
            </HWMotionContainer>
            <HWMotionContainer className="hw-section-block bg-hw-white">
                <h2>
                    {t('getStarted.title')}
                </h2>
                <p>
                    {t('getStarted.desc')}
                </p>
                <Link href={routes.register()}>
                    <Button className="bg-hw-dead-sea-mud p-6">
                        {t('getStarted.getStartedBtn')}
                    </Button>
                </Link>
            </HWMotionContainer>
        </div>
    )
}
