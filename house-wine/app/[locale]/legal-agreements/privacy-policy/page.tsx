import React from 'react'

// Translations
import { useTranslations } from 'next-intl';
import { richField } from '@/lib/i18n/richField';
import { routes } from '@/lib/routes';
// Next.js
import type { Metadata } from "next";
import Link from 'next/link'
// Components
import { ContentBlock } from '@/components/legal/ContentBlock';

export const metadata: Metadata = {
    title: 'Pivacy Policy',
    description: 'Shared Wines ("we," "our," "or" "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.'
}

export default function PrivacyPolicy() {
    const t = useTranslations('legal.privacy');

    const EN = {
        root: {
            title: t('title'),
            updated: t('updated')
        },
        clauses: {
            introduction: {
                title: t('clauses.introduction.title'),
                desc: t('clauses.introduction.desc')
            },
            infoWeCollect: {
                title: t('clauses.informationCollection.title'),
                list: t.raw('clauses.informationCollection.list') as { title: string, desc: string }[]
            },
            infoUse: {
                title: t('clauses.informationUse.title'),
                list: t.raw('clauses.informationUse.list') as { desc: string }[]
            },
            dataStorage: {
                title: t('clauses.dataStorage.title'),
                desc: t('clauses.dataStorage.desc')
            },
            dataSharing: {
                title: t('clauses.dataSharing.title'),
                desc: t('clauses.dataSharing.desc'),
                list: t.raw('clauses.dataSharing.list') as { desc: string }[]
            },
            publicShops: {
                title: t('clauses.publicShops.title'),
                desc: t('clauses.publicShops.desc')
            },
            yourRights: {
                title: t('clauses.yourRights.title'),
                desc: t('clauses.yourRights.desc'),
                list: t.raw('clauses.yourRights.list' as any) as { desc: string }[]
            },
            cookies: {
                title: t('clauses.cookies.title'),
                desc: richField({
                    t: t as any,
                    textField: 'clauses.cookies.desc',
                    extraTags: {
                        Link: (chunks: any) => <Link
                            href={routes.cookie()}
                            className="underline underline-offset-4 cursor-pointer"
                        >
                            {chunks}
                        </Link>
                    }
                })
            },
            policyChange: {
                title: t('clauses.policyChange.title'),
                desc: t('clauses.policyChange.desc')
            },
            contactUs: {
                title: t('clauses.contactUs.title'),
                desc: richField({
                    t: t as any,
                    textField: 'clauses.contactUs.desc',
                    extraTags: {
                        Link: (chunks: any) => <Link
                            href={routes.contact()}
                            className="underline underline-offset-4 cursor-pointer"
                        >
                            {chunks}
                        </Link>
                    }
                })
            }
        }
    }

    const ENLists = {
        infoCollect: EN.clauses.infoWeCollect.list,
        infoUse: EN.clauses.infoUse.list,
        dataSharing: EN.clauses.dataSharing.list,
        yourRights: EN.clauses.yourRights.list
    }


    return (
        <div>
            <h1>{EN.root.title}</h1>
            <div className="hw-section-block">
                <p>{EN.root.updated}: April 6, 2026</p>
                <ContentBlock
                    title={EN.clauses.introduction.title}
                    desc={EN.clauses.introduction.desc}
                />
                <ContentBlock
                    title={EN.clauses.infoWeCollect.title}
                    list
                >
                    <ul className="list-none! space-y-4 px-0!">
                        {ENLists.infoCollect.map((i, index) => (
                            <li key={i.title}>
                                <h3>
                                    {t.raw(`clauses.informationCollection.list.${index}.title`)}
                                </h3>
                                <p>
                                    {t.raw(`clauses.informationCollection.list.${index}.desc`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </ContentBlock>
                <ContentBlock
                    title={EN.clauses.infoUse.title}
                    list
                >
                    <ul>
                        {ENLists.infoUse.map((i, index) => (
                            <li key={index}>
                                {t.raw(`clauses.informationUse.list.${index}.desc`)}
                            </li>
                        ))}
                    </ul>
                </ContentBlock>
                <ContentBlock
                    title={EN.clauses.dataStorage.title}
                    desc={EN.clauses.dataStorage.desc}
                />
                <ContentBlock
                    title={EN.clauses.dataSharing.title}
                    desc={EN.clauses.dataSharing.desc}
                    list
                >
                    <ul>
                        {ENLists.dataSharing.map((i, index) => (
                            <li key={index}>
                                {t.raw(`clauses.dataSharing.list.${index}.desc`)}
                            </li>
                        ))}
                    </ul>
                </ContentBlock>
                <ContentBlock
                    title={EN.clauses.publicShops.title}
                    desc={EN.clauses.publicShops.desc}
                />
                <ContentBlock
                    title={EN.clauses.yourRights.title}
                    desc={EN.clauses.yourRights.desc}
                    list
                >
                    <ul>
                        {ENLists.yourRights.map((i, index) => (
                            <li key={index}>
                                {t.raw(`clauses.yourRights.list.${index}.desc`)}
                            </li>
                        ))}
                    </ul>
                </ContentBlock>
                <ContentBlock
                    title={EN.clauses.cookies.title}
                    desc={EN.clauses.cookies.desc}
                />
                <ContentBlock
                    title={EN.clauses.policyChange.title}
                    desc={EN.clauses.policyChange.desc}
                />
                <ContentBlock
                    title={EN.clauses.contactUs.title}
                    desc={EN.clauses.contactUs.desc}
                />
            </div>
        </div>
    )
}
