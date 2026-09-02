"use client"

// Types, Motion, Zustand
import { useCartStore } from '@/lib/zustand/cart'
import { useTranslations } from 'next-intl'
// Components
import { Button } from '@/components/ui/button'
import {
    DrawerClose,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Badge } from '../ui/badge'
// Lucide
import { XCircleIcon, ChevronLeft } from 'lucide-react';

export default function HWDrawerHeader() {
    const drawerToggle = useCartStore((state) => state.drawerToggle);
    const isCart = useCartStore((state) => state.isCart);

    return (
        <DrawerHeader className="flex flex-row items-center justify-between w-full border-b border-neutral-400 sticky pt-6 top-0 z-30 bg-white">
            {isCart ? <HWCartHeader /> : <HWFormHeader />}
            <DrawerClose
                className="group cursor-pointer p-1 rounded-full hover:bg-neutral-300 hover:outline-2 hover:outline-neutral-900 active:scale-70 transition ease-in"
                onClick={drawerToggle}
            >
                <XCircleIcon className="size-7 group-hover:scale-80 group-hover:rotate-360 duration-600 transition ease-in-out" />
            </DrawerClose>
        </DrawerHeader>
    )
}

export function HWCartHeader() {
    const item = useCartStore((state) => state.itemCount());
    const t = useTranslations('marketplace');

    return (
        <div className="h-10 flex flex-row gap-2 items-center justify-center">
            <DrawerTitle className="font-instrument-sarif text-3xl">
                {t('cart.cartStore.cartHeader.title')}
            </DrawerTitle>
            {item > 0 && (
                <Badge>
                    {item}
                </Badge>
            )
            }
        </div>
    )
}

export function HWFormHeader() {
    const cartToggle = useCartStore((state) => state.cartToggle);
    const t = useTranslations('marketplace');

    return (
        <div className="h-10 flex flex-row items-center justify-center gap-2">
            <Button variant="ghost" onClick={cartToggle}>
                <ChevronLeft className="size-8" />
            </Button>
            <DrawerTitle className="font-instrument-sarif text-2xl">
                {t('cart.orderForm.formHeader.title')}
            </DrawerTitle>
        </div>
    )
}


