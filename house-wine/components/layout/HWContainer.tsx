"use client"

import { cn } from '@/lib/utils'
import { usePathname } from '@/i18n/routing'
import { routes } from '@/lib/routes'
import { BaseComponentsUI } from '@/types/ui'

export default function HWContainer({ children }: BaseComponentsUI) {
    const pathname = usePathname();

    return (
        <main className={cn(
            'bg-hw-shea min-h-screen flex flex-col flex-1',
            pathname !== routes.home() && "pt-hw-nav-height"
        )}>
            {children}
        </main>
    )
}
