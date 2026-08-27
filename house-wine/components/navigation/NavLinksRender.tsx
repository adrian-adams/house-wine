"use client"

import React from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// NextJS
import { Link } from '@/i18n/routing';
import { useCleanPathname } from '@/hooks/useCleanPathName';
// Routes
import { navigation, login } from './NavLinks'
// CSS
import { cn } from '@/lib/utils';

const navStyles = 'text-center rounded-b-2xl border-b-3 border-neutral-700 bg-neutral-400 w-full block md:underline md:underline-offset-6 md:rounded-none md:bg-transparent md:border-0'

function mergeNavData(
    textData: { slug: string; label: string; className?: string }[],
    configData: { slug: string; label: string; className?: string }[],
) {
    const configMap = new Map(configData.map((item) => [item.slug, item]));

    return textData.map((t) => ({
        ...configMap.get(t.slug),
        slug: t.slug,
        label: t.label,
        className: t.className
    }));
}

export function SiteMenu() {
    const t = useTranslations('nav');
    const navSiteIntl = t.raw('siteMenu') as { slug: string, label: string, className?: string }[];
    const navMerge = mergeNavData(navSiteIntl.filter(i => i.slug !== 'Shops'), navigation)
    const { pathname } = useCleanPathname();

    return (
        <>
            {navMerge.filter((i) => i.slug !== 'shops').map((item) => (
                <li key={item.label} className={`${pathname == "/" + item.slug && navStyles}`}>
                    <Link href={item.slug} prefetch>
                        {item.label}
                    </Link>
                </li>
            ))}
        </>

    )
}

export function UserMenu() {
    const t = useTranslations('nav');
    const userNavIntl = t.raw('userMenu') as { slug: string, label: string }[];
    const userNavMerge = mergeNavData(userNavIntl, login);
    const { pathname } = useCleanPathname();

    return (
        <>
            {userNavMerge.filter(i => i.slug === "register").map((item) => (
                <li key={item.label} >
                    <Link
                        href={item.slug}
                        className={cn(
                            item.slug === 'register' && "px-3 py-2 bg-white shadow rounded-xl text-neutral-700",
                            pathname == "/" + item.slug && "outline-2 outline-neutral-400"
                        )}
                        prefetch
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </>
    )
}
