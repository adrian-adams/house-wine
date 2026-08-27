"use client"

import React from 'react'
// next-Intl && Routes
import { useTranslations } from 'next-intl';
import { routes } from '@/lib/routes';
// NextJS
import Link from 'next/link';
import { useCleanPathname } from '@/hooks/useCleanPathName';
// Links
import { quickLinks, forProfessionals, moreInformation, legal } from './Footer-Links'
// Components
import Instagram from '../svgs/Instagram'
import LinkedIn from '../svgs/LinkedIn'
import SocialLinks from './SocialLinks'
import HouseWineLogo from '../brand-logo/HouseWineLogo'
import { Button } from '@/components/ui/button'
import { Separator } from '../ui/separator';

export default function Footer() {
    // const currentYear = Temporal.Now.plainDateISO().year;
    const date = new Date();
    const year = date.getFullYear();
    const t = useTranslations('footer');
    const { pathname } = useCleanPathname();

    return (
        <footer className="flex flex-col items-center justify-between gap-8 h-full md:h-[calc(100vh-30%)] p-4 md:py-10 md:px-20 bg-hw-dead-sea-mud text-hw-coastal-fog bg-[url('/general/blur-bg.png')] bg-cover bg-center">
            {pathname === '/' && (
                <>
                    <section className="text-center space-y-8">
                        <h2>{t('signUp.title')}</h2>
                        <p className="max-w-10/12 mx-auto">{t('signUp.desc')}</p>
                        <Link href={routes.register()}>
                            <Button className="w-fit border-2 border-neutral-50 bg-neutral-800 hover:bg-neutral-50 hover:text-neutral-900 p-6 text-[clamp(1rem,5v,1.25rem)]">
                                {t('signUp.btn')}
                            </Button>
                        </Link>
                    </section>
                    <Separator />
                </>

            )}

            <section className="flex flex-col lg:flex-row gap-8 items-start px-4">
                <div className="flex flex-col gap-4">
                    <HouseWineLogo />
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
                        <h2 className="font-semibold tracking-widest">{t('quickLinks.title')}</h2>
                        {quickLinks?.map((item, index) => (
                            <li key={item.name}>
                                <Link href={item.href}>
                                    {t(`quickLinks.list.${index}.link`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <h2 className="font-semibold tracking-widest">{t('forProfessionals.title')}</h2>
                        {forProfessionals?.map((item, index) => (
                            <li key={item.name}>
                                <Link href={item.href}>
                                    {t(`forProfessionals.list.${index}.link`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <h2 className="font-semibold tracking-widest">{t('moreInformation.title')}</h2>
                        {moreInformation?.map((item, index) => (
                            <li key={item.name}>
                                <Link href={item.href}>
                                    {t(`moreInformation.list.${index}.link`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <h2 className="font-semibold tracking-widest">{t('legal.title')}</h2>
                        {legal?.map((item, index) => (
                            <li key={item.name}>
                                <Link href={item.href}>
                                    {t(`legal.list.${index}.link`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-10 text-xs border-t border-hw-foggy-dew">
                <p>
                    © {year} {t('disclaimer')}
                </p>
                <p>
                    This site is an initiative of Webroots.nl · Delistraat 8, 1094CV, Amsterdam · Webroots B.V.
                </p>
            </section>
        </footer>
    )
}
