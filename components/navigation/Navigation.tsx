"use client"

import React, { useState, useEffect } from 'react'
// NextJS
import { usePathname } from "next/navigation";
import { cn } from '@/lib/utils'
// Components
import HouseWineLogo from '../brand-logo/HouseWineLogo'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={cn("w-full fixed px-4 md:px-8 py-4 flex flex-row items-center justify-between z-20 text-[0.90rem] transition-colors duration-300 font-semibold backdrop-blur-xl",
                scrolled ?
                    " bg-white/80 text-hw-underworld border-b border-hw-cigar-smoke" :
                    `${pathname === "/" ? "bg-transparent text-hw-shea" : "bg-white/80"} `
            )}
        >
            <HouseWineLogo width={125} height={125} />
            <div className="relative w-full flex flex-row items-start justify-end">
                <DesktopMenu />
                <MobileMenu />
            </div>
        </nav >
    )
}
