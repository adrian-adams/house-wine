import React from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// NextJS
import { Link } from '@/i18n/routing';
// Routes
import { navigation, user } from './NavLinks'

export function SiteMenu() {
    const t = useTranslations('nav');
    return (
        <>
            {navigation.filter((item) => item.key !== 'home').map((item, index) => (
                <li key={item.key}>
                    <Link href={item.href}>
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
                <li key={nav.key} className={nav.style}>
                    <Link href={nav.href}>
                        {t(`userMenu.${index}.slug`)}
                    </Link>
                </li>
            ))}
        </>
    )
}
