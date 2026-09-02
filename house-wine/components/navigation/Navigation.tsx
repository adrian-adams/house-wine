"use client"

import React, { useState, useEffect } from 'react'
// i18n
import { usePathname } from '@/i18n/routing'
import { routes } from '@/lib/routes'
// CSS Utils
import { cn } from '@/lib/utils'
// Components
import HouseWineLogo from '../brand-logo/HouseWineLogo'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

export default function Navigation() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "w-full fixed px-4 md:px-8 py-4 flex flex-row items-center justify-between z-30 text-[0.90rem] transition-all ease-in-out duration-300 font-semibold backdrop-blur-xl",
                scrolled ?
                    "bg-white/80 text-neutral-900 border-b border-neutral-400 md:h-20" :
                    `${pathname === routes.home() ? "bg-transparent md:text-neutral-200" : "bg-white/80"}`
            )}
        >
            <span className={`${scrolled && 'md:scale-70'} transition-all duration-150 ease-in-out`}>
                <HouseWineLogo width={125} height={125} />
            </span>

            <DesktopMenu />
            <MobileMenu />
        </nav >
    )
}
