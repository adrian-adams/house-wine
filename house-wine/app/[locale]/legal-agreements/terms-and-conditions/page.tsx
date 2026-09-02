import React from 'react'

// Translations
import { useTranslations } from 'next-intl';
import { richField, TFunction } from '@/lib/i18n/richField';
import { routes } from '@/lib/routes';
// Next.js
import type { Metadata } from "next";
import Link from 'next/link'
// Components
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {

}

export default function Terms() {
    const t = useTranslations('legal.terms');

    const {
        rootTermsList,
        acceptableUseList,
        fairUseList,
        onlinePaymentList,
        privacyPolicyLink
    } = {
        rootTermsList: t.raw('clauses') as { title: string, desc: string }[],
        acceptableUseList: t.raw(`clauses.${[3]}.list`) as { desc: string }[],
        fairUseList: t.raw(`clauses.${[4]}.list`) as { desc: string }[],
        onlinePaymentList: t.raw(`clauses.${[7]}.list`) as { desc: string }[],
        privacyPolicyLink: richField({
            t: { rich: t.rich } as unknown as TFunction,
            textField: 'footer.desc',
            extraTags: {
                Link: (chunks: React.ReactNode) =>
                    <Link
                        href={routes.privacy()}
                        className="underline underline-offset-6"
                    >
                        {chunks}
                    </Link>
            }
        })
    }

    return (
        <div>
            <section className="space-y-3">
                <p className="uppercase">{t('preTitle')}</p>
                <h1 className="pb-0!">{t('title')}</h1>
                <p>{t('updated')}: 14 May, 2026</p>
                <p>{t('desc')}</p>
            </section>
            <br /><br />
            <section className="px-6">
                <ol className="space-y-6 list-decimal">
                    {rootTermsList.map((i, index) => (
                        <li key={i.title}>
                            <h2>{i.title}</h2>
                            <p>{i.desc}</p>
                            {index === 3 &&
                                <ul>
                                    {acceptableUseList.map((i, index) => (
                                        <li key={index}>
                                            {i.desc}
                                        </li>
                                    ))}
                                </ul>
                            }
                            {index === 4 &&
                                <ul>
                                    {fairUseList.map((i, index) => (
                                        <li key={index}>
                                            {i.desc}
                                        </li>
                                    ))}
                                </ul>
                            }
                            {index === 7 &&
                                <ul>
                                    {onlinePaymentList.map((i, index) => (
                                        <li key={index}>
                                            {i.desc}
                                        </li>
                                    ))}
                                </ul>
                            }
                        </li>
                    ))}
                </ol>
            </section>
            <Separator className="mt-10 mb-6 bg-neutral-500" />
            <section>
                <p>{privacyPolicyLink}</p>
            </section>
        </div >
    )
}
