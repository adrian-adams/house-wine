import React from 'react'
// Components & Links
import Language from './Language'
import { SiteMenu, UserMenu } from './NavLinksRender'
import { Separator } from '../ui/separator'

export default function DesktopMenu() {
    return (
        <div className="relative w-full flex flex-row items-start justify-end">
            <div className="hidden md:flex flex-row items-center justify-center gap-4">
                <ul className="flex flex-row items-center justify-center gap-4">
                    <SiteMenu />
                </ul>
                <Language />
                <Separator orientation='vertical' className="p-px" />
                <ul className="flex flex-row items-center justify-center gap-4">
                    <UserMenu />
                </ul>
            </div>
        </div>
    )
}
