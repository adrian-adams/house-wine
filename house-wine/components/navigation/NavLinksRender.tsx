import React from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// NextJS
import Link from 'next/link'
// Components & Links
import { navigation, user } from './NavLinks'

export function SiteMenu() {
    const t = useTranslations('nav');
    return (
        <>
            {navigation.slice(1).map((nav, index) => (
                <li key={index}>
                    <Link href={nav.href}>
                        {t(`siteMenu.${index}.slug`)}
                    </Link>
                </li>
            ))}
        </>

    )
}

export function UserMenu() {
    const t = useTranslations('nav');
    return (
        <>
            {user.map((nav, index) => (
                <li key={index} className={nav.style}>
                    <Link href={nav.href}>
                        {t(`userMenu.${index}.slug`)}
                    </Link>
                </li>
            ))}
        </>
    )
}
