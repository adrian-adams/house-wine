"use client"

import React from 'react'
// NextJS
// import { usePathname } from "next/navigation";
// i18n
import { usePathname } from '@/i18n/routing'
// Types
import { BaseComponentsUI } from '@/types/ui'

export default function HWContainer({ children, className }: BaseComponentsUI) {
    const pathname = usePathname();

    return (
        <main className={`${pathname === "/" ? "" : "pt-hw-nav-height "} bg-hw-shea min-h-screen flex flex-col flex-1 `}>
            <div className={`${pathname === "/" ? "home" : "w-full sm:w-10/12 2xl:w-7/12 mx-auto px-4 py-10 space-y-6"}`}>
                {children}
            </div>
        </main>
    )
}
