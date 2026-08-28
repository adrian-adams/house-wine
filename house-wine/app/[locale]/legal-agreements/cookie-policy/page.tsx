import React from 'react'

// Translations
import { useTranslations } from 'next-intl';
import { richField, TFunction } from '@/lib/i18n/richField';
// Next.js
import type { Metadata } from "next";
// Components
import { ContentBlock } from '@/components/legal/ContentBlock';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'This Cookie Policy explains how Shared Wines ("we", "us", or "our") uses cookies and similar technologies when you visit our website. This policy explains what these technologies are and why we use them, as well as your rights to control our use of them.',
    keywords: ['Cookie', 'Policy', 'Wines']
}

export default function CookiePolicy() {
    const t = useTranslations('legal.cookie');

    const EN = {
        root: {
            title: t('title'),
            desc: t('desc')
        },
        whatAreCookies: {
            title: t('cookiesDesc.title'),
            desc: t('cookiesDesc.desc')
        },
        howWeUseCookies: {
            title: t('cookiesUse.title'),
            desc: t('cookiesUse.desc'),
            list: t.raw('cookiesUse.list') as { desc: string }[]
        },
        typesOfCookiesWeUse: {
            title: t('cookieTypes.title'),
            essentialCookies: {
                title: t('cookieTypes.essentialCookies.title'),
                desc: t('cookieTypes.essentialCookies.desc'),
                list: {
                    preTitle: t('cookieTypes.essentialCookies.list.preTitle'),
                    list: t.raw('cookieTypes.essentialCookies.list.list') as { desc: string }[]
                }
            },
            analyticCookies: {
                title: t('cookieTypes.analyticsCookies.title'),
                desc: t('cookieTypes.analyticsCookies.desc'),
                list: {
                    preTitle: t('cookieTypes.analyticsCookies.list.preTitle'),
                    list: t.raw('cookieTypes.analyticsCookies.list.list') as { desc: string }[]
                }
            }
        },
        managingCookies: {
            title: t('managingCookies.title'),
            desc: t('managingCookies.desc'),
            list: t.raw('managingCookies.list') as { desc: string }[]
        },
        thirdPartyCookies: {
            title: t('thirdPartyCookies.title'),
            desc: t('thirdPartyCookies.desc')
        },
        updatesToThisPolicy: {
            title: t('policyUpdates.title'),
            desc: t('policyUpdates.desc')
        },
        contactUs: {
            title: t('contactUs.title'),
            desc: t('contactUs.desc')
        }
    }

    const ENlists = {
        cookieUse: EN.howWeUseCookies.list,
        essentialCookies: EN.typesOfCookiesWeUse.essentialCookies.list.list,
        analyticCookies: EN.typesOfCookiesWeUse.analyticCookies.list.list,
        managingCookies: EN.managingCookies.list
    }

    return (
        <div>
            <h1>{EN.root.title}</h1>
            <div className="hw-section-block">
                <p>{EN.root.desc}</p>
                <ContentBlock
                    title={EN.whatAreCookies.title}
                    desc={EN.whatAreCookies.desc}
                />
                <ContentBlock
                    title={EN.howWeUseCookies.title}
                    desc={EN.howWeUseCookies.desc}
                    list
                >
                    <ul>
                        {ENlists.cookieUse.map((i, index) => (
                            <li key={index}>
                                {richField({
                                    t: { rich: t.rich } as unknown as TFunction,
                                    textField: `cookiesUse.list.${index}.desc`
                                })}
                            </li>
                        ))}
                    </ul>
                </ContentBlock>
                <div>
                    <h2>{EN.typesOfCookiesWeUse.title}</h2>
                    <ContentBlock
                        heading="h3"
                        title={EN.typesOfCookiesWeUse.essentialCookies.title}
                        desc={EN.typesOfCookiesWeUse.essentialCookies.desc}
                        listTitle={EN.typesOfCookiesWeUse.essentialCookies.list.preTitle}
                        list
                        listBlockStyle
                    >
                        <ul>
                            {ENlists.essentialCookies.map((item, index) => (
                                <li key={item.desc}>
                                    {richField({
                                        t: { rich: t.rich } as unknown as TFunction,
                                        textField: `cookieTypes.essentialCookies.list.list.${index}.desc`
                                    })}
                                </li>
                            ))}
                        </ul>
                    </ContentBlock>
                    <br />
                    <ContentBlock
                        heading="h3"
                        title={EN.typesOfCookiesWeUse.analyticCookies.title}
                        desc={EN.typesOfCookiesWeUse.analyticCookies.desc}
                        listTitle={EN.typesOfCookiesWeUse.analyticCookies.list.preTitle}
                        list
                        listBlockStyle
                    >
                        <ul>
                            {ENlists.analyticCookies.map((i, index) => (
                                <li key={i.desc}>
                                    {richField({
                                        t: { rich: t.rich } as unknown as TFunction,
                                        textField: `cookieTypes.analyticsCookies.list.list.${index}.desc`
                                    })}
                                </li>
                            ))}
                        </ul>
                    </ContentBlock>
                </div>
                <ContentBlock
                    title={EN.managingCookies.title}
                    desc={EN.managingCookies.desc}
                    list
                >
                    <ul>
                        {ENlists.managingCookies.map((i, index) => (
                            <li key={i.desc}>
                                {richField({
                                    t: { rich: t.rich } as unknown as TFunction,
                                    textField: `managingCookies.list.${index}.desc`
                                })}
                            </li>
                        ))}
                    </ul>
                </ContentBlock>
                <ContentBlock
                    title={EN.thirdPartyCookies.title}
                    desc={EN.thirdPartyCookies.desc}
                />
                <ContentBlock
                    title={EN.updatesToThisPolicy.title}
                    desc={EN.updatesToThisPolicy.desc}
                />
                <ContentBlock
                    title={EN.contactUs.title}
                    desc={EN.contactUs.desc}
                />
            </div>
        </div>
    )
}