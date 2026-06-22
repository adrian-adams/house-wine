import React from 'react'
// NextJS
import Link from 'next/link'
// Components & Links
import { navigation, user } from './NavLinks'

export function SiteMenu() {
    return (
        <>
            {navigation.slice(1).map((nav) => (
                <li key={nav.id}>
                    <Link href={nav.href}>
                        {nav.name}
                    </Link>
                </li>
            ))}
        </>

    )
}

export function UserMenu() {
    return (
        <>
            {user.map((nav) => (
                <li key={nav.id} className={nav.style}>
                    <Link href={nav.href}>
                        {nav.name}
                    </Link>
                </li>
            ))}
        </>
    )
}
