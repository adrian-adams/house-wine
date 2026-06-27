import React from 'react'
// NextJS
import Link from 'next/link'
// Components & Links
import { navigation, user } from './NavLinks'
import Language from './Language'
import { SiteMenu, UserMenu } from './NavLinksRender'

export default function DesktopMenu() {
    return (
        <div className="hidden md:flex flex-row items-center justify-center gap-4">
            <ul className="flex flex-row items-center justify-center gap-4">
                <SiteMenu />
            </ul>
            <Language />
            <ul className="flex flex-row items-center justify-center gap-4">
                <UserMenu />
            </ul>
        </div>
    )
}
