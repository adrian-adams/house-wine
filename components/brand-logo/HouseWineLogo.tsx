import React from 'react'
// NEXTJS
import Image from 'next/image'
import Link from 'next/link'
import { BaseComponentsUI } from '@/types/ui'

interface HouseBrandLogoUI extends BaseComponentsUI {
    width?: number
    height?: number
}

export default function HouseWineLogo({ width, height, className }: HouseBrandLogoUI) {
    return (
        <Link href="/">
            <Image
                src="/house-wine.svg"
                alt="House Wine"
                width={width ? width : 100}
                height={height ? height : 100}
                className={`object-cover ${className}`}
                loading="eager"
            />
        </Link>
    )
}
