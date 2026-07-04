import React from 'react'

// Components
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/marketplace/AppSidebar'
import HWTopBar from '@/components/marketplace/HWTopBar'

export default function MarketplaceLyout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full relative z-20">
            <SidebarProvider className="flex-1 min-h-0">
                <AppSidebar />
                <div className="w-full min-h-0 flex flex-col">
                    <div className="sticky top-0 flex flex-row items-center gap-4 bg-white p-6 z-40">
                        <span className="block md:hidden">
                            <SidebarTrigger />
                        </span>
                        <HWTopBar />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}
