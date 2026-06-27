"use client"

import React from 'react'
// next-Intl
import { useTranslations } from 'next-intl';
// NextJS
import Link from 'next/link';
// Links
import { quickLinks, forProfessionals, moreInformation, legal } from './Footer-Links'
// Components
import Instagram from '../svgs/Instagram'
import LinkedIn from '../svgs/LinkedIn'
import SocialLinks from './SocialLinks'
import HouseWineLogo from '../brand-logo/HouseWineLogo'

export default function Footer() {
    const currentYear = Temporal.Now.plainDateISO().year;
    const t = useTranslations('footer');

    return (
        <footer className="flex flex-col items-center justify-between gap-8 h-full md:h-[calc(100vh-30%)] p-4 md:py-10 md:px-20 bg-hw-dead-sea-mud text-hw-coastal-fog">
            <section className="flex flex-col lg:flex-row gap-8 items-start px-4">
                <div className="flex flex-col gap-4">
                    <HouseWineLogo width={100} height={100} />
                    <p>{t('desc')}</p>
                    <ul className="flex flex-row gap-4 items-center">
                        <SocialLinks link="#" target="_blank">
                            <Instagram width="1.5em" height="1.5em" />
                        </SocialLinks>
                        <SocialLinks link="#" target="_blank">
                            <LinkedIn width="1.5em" height="1.5em" />
                        </SocialLinks>
                    </ul>
                </div>
                <div className="hw-links">
                    <ul>
                        <h2>{t('quickLinks.title')}</h2>
                        {quickLinks?.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href}>
                                    {t(`quickLinks.list.${index}.link`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <h2>{t('forProfessionals.title')}</h2>
                        {forProfessionals?.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href}>
                                    {t(`forProfessionals.list.${index}.link`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <h2>{t('moreInformation.title')}</h2>
                        {moreInformation?.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href}>
                                    {t(`moreInformation.list.${index}.link`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <h2>{t('legal.title')}</h2>
                        {legal?.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href}>
                                    {t(`legal.list.${index}.link`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="w-full flex flex-col md:flex-row justify-between items-center pt-10 text-xs border-t border-hw-foggy-dew">
                <p>
                    © {currentYear} {t('disclaimer')}
                </p>
                <p>
                    This site is an initiative of Webroots.nl · Delistraat 8, 1094CV, Amsterdam · Webroots B.V.
                </p>
            </section>
        </footer>
    )
}
