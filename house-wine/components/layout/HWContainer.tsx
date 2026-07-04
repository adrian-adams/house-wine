"use client"

import React from 'react'
// CSS Utils
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from "class-variance-authority"
// i18n
import { usePathname } from '@/i18n/routing'
// Types
import { BaseComponentsUI } from '@/types/ui'

export default function HWContainer({ children }: BaseComponentsUI) {
    const pathname = usePathname();
    const fullWidthPages = pathname === "/" || pathname === "/marketplace";
    const isMarketplace = pathname === "/marketplace";

    return (
        <main className={cn(
            'bg-hw-shea min-h-screen flex flex-col flex-1',
            pathname === "/" ? "" : "pt-hw-nav-height"
        )}>
            <div className={cn(
                '',
                // isMarketplace ? "flex-1 flex flex-col min-h-0 overflow-hidden" : "",
                // fullWidthPages && !isMarketplace ? "home" : "",
                fullWidthPages ? "home" : "w-full sm:w-10/12 2xl:w-7/12 mx-auto px-4 py-10 s,pace-y-6"
            )}>
                {children}
            </div>
        </main>
    )
}
