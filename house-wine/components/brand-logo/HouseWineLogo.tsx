import React from 'react'
// NEXTJS
import Image from 'next/image'
import Link from 'next/link'
// Misc
import { BaseComponentsUI } from '@/types/ui'
import { routes } from '@/lib/routes'

interface HouseBrandLogoUI extends BaseComponentsUI {
    width: number
    height: number
}

export default function HouseWineLogo({ width, height, className }: HouseBrandLogoUI) {
    return (
        <Link href={routes.home()}>
            <Image
                src="/brand-logo/house-wine.svg"
                alt="House Wine"
                width={width ?? 100}
                height={height ?? 100}
                className={`object-cover ${className}`}
                loading="eager"
            />
        </Link>
    )
}
