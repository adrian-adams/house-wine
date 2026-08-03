"use client"

import React from 'react'

// Zustand
import { useCartStore } from '@/lib/zustand/cart'
// Components
import { SidebarProvider } from '@/components/ui/sidebar'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Drawer } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import AppSidebar from '@/components/marketplace/AppSidebar'
import HWTopBar from '@/components/marketplace/HWTopBar'

export default function MarketplaceLyout({ children }: { children: React.ReactNode }) {
    const showDrawer = useCartStore((state) => state.isDrawer);
    const showThankYou = useCartStore((state) => state.thankYouMessage);
    const hideThankYou = useCartStore((state) => state.hideThankYou);

    return (
        <>
            <Drawer direction="right" open={showDrawer}>
                <div className="flex flex-col h-full border-t border-neutral-700">
                    <SidebarProvider className="flex-1 min-h-0 z-20">
                        <div className="relative w-full min-h-0 flex flex-col">
                            <div className="sticky top-0 flex flex-row items-center gap-4 bg-white p-6 z-40 border-b border-neutral-900">
                                <HWTopBar />
                            </div>
                            <div className="flex flex-row">
                                <div className="sticky top-0 h-fit">
                                    <AppSidebar />
                                </div>
                                <div className="w-full pb-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </SidebarProvider>
                </div>
            </Drawer>
            <Dialog open={showThankYou} onOpenChange={hideThankYou}>
                <ThankYouDialog />
            </Dialog>
        </>
    )
}

function ThankYouDialog() {
    return (
        <DialogContent className="z-999 p-8">
            <DialogHeader className="flex flex-row items-center">
                <DialogTitle>
                    Thank you for your request!
                </DialogTitle>
            </DialogHeader>
            <Separator className="my-2" />
            <DialogDescription className="leading-normal">
                Your order will be looked at. You should recieve an email regarding your order within the next 24 hours.
                <br /><br />
                For more information, you are welcome to contact us at: <a href="mailto:housewine@gmail.com" className="break-word underline underline-offset-8">housewine@gmail.com</a> or <a href="tel:0215216987" className="break-word underline underline-offset-8">021 521 6987</a>
            </DialogDescription>
            <DialogClose>
                Close
            </DialogClose>
        </DialogContent>
    )
}
