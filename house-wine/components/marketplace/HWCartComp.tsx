"use client"

import React, { useState, useEffect } from 'react'
// Types, Hooks, Routes, Zustand, Motion
import { useCartStore } from '@/lib/zustand/cart'
import { AnimatePresence, motion, Variants } from "motion/react";
import { useTranslations } from 'next-intl';
// CSS Utils
import { cn } from '@/lib/utils'
// NextJs
import Image from 'next/image'
// Components
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DrawerClose,
    DrawerFooter
} from "@/components/ui/drawer";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { StoreDisclaimer } from '@/components/layout/HWOrderForm'
// Lucide
import { Euro, Dot, TrashIcon, MinusIcon, PlusIcon, Equal, AsteriskIcon, Wine, X } from 'lucide-react';

interface StoreCardProps {
    productId: string;
    message?: boolean
}

export default function StoreCart() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col h-full"
            >
                <StoreCardList />
                <StoreFooter />
            </motion.div>
        </AnimatePresence>
    )
}

export function StoreCardList() {
    const items = useCartStore((state) => state.items);
    const drawerToggle = useCartStore((state) => state.drawerToggle)
    const t = useTranslations('marketplace.cart');

    const listVariants: Variants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1,
            }
        }
    }

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 40
        },
        show: {
            opacity: 1,
            y: 0,
            zIndex: "-999",
            transition: {
                duration: 0.5,
                ease: "easeIn"
            }
        }
    }

    return (
        <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="space-y-3 pb-4 px-4"
        >
            {items.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-xl">
                    <p className="text-neutral-800">
                        {t('cartStore.cartBody.emptyCart.title')}
                    </p>
                    <DrawerClose
                        className="px-4 py-2 bg-neutral-950 rounded-xl text-white cursor-pointer hover:opacity-80"
                        onClick={drawerToggle}
                    >
                        {t('cartStore.cartBody.emptyCart.desc')}
                    </DrawerClose>
                </div>
            )}
            {items.map((item) => (
                <motion.li
                    key={item.productId}
                    variants={cardVariants}
                >
                    <StoreCard productId={item.productId} />
                </motion.li>
            ))}
        </motion.ul>
    )
}

export function StoreCard({ productId }: StoreCardProps) {
    const item = useCartStore((state) => state.items.find((i) => i.productId === productId));
    const { orderQuantity, stockLevel } = item ?? {};
    const maxQty = stockLevel === orderQuantity;
    const t = useTranslations('marketplace.cart');

    return (
        <AnimatePresence>
            <motion.div
                className={cn(
                    "relative p-2 border border-neutral-600 rounded-md text-center overflow-hidden [--card-height:130px] sm:[--card-height:100px]"
                )}
                initial={{ height: "var(--card-height)", opacity: 1 }}
                animate={{ height: maxQty ? "auto" : "var(--card-height)" }}
                exit={{ height: "auto" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="grid grid-cols-5 items-center gap-4">
                    <div>
                        <StoreImage productId={productId} />
                    </div>
                    <div className="flex flex-col gap-2 text-start col-span-3">
                        <StoreCardHeader productId={productId} />
                        <StoreCounter productId={productId} />
                    </div>
                    <div className='max-w-xs'>
                        <StoreRemoveProduct productId={productId} />
                    </div>
                </div>
                <p className={cn(
                    "text-xs text-red-500 py-1 bg-neutral-200 my-2 rounded-sm border border-neutral-600 transition-all duration-300 ease-in-out",
                    maxQty ? "block opacity-100" : "opacity-0"
                )}>
                    {t('cartStore.cartBody.maxQtyAlert')}
                </p>
            </motion.div>
        </AnimatePresence>
    )
}

export function StoreImage({ productId }: StoreCardProps) {
    const item = useCartStore((state) => state.items.find((i) => i.productId === productId));
    const { name, image } = item ?? {};

    return (
        <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-neutral-200">
            {image ? (
                <Image
                    src={image}
                    alt={name ?? "Wine bottle"}
                    fill
                    className="object-cover"
                />
            ) : (
                <Wine className="size-8 m-auto mt-4 text-neutral-500" />
            )}
        </div>
    )
}

export function StoreCardHeader({ productId }: StoreCardProps) {
    const item = useCartStore((state) => state.items.find((i) => i.productId === productId));
    const { name, producer, vintage } = item ?? {};

    return (
        <div>
            <h3 className="font-ibm-plex-sans text-[0.85rem]">{name}</h3>
            <span className="flex flex-row items-center">
                <p className="text-xs">{producer ?? "Producer"}</p>
                {vintage !== 0 && (
                    <>
                        <Dot className="size-4" />
                        <p className="text-xs">{vintage}</p>
                    </>
                )
                }
            </span>
        </div>
    )
}

export function StoreCounter({ productId, message }: StoreCardProps) {
    const item = useCartStore((state) => state.items.find((i) => i.productId === productId));
    const { orderQuantity, unitPrice, stockLevel } = item ?? {};
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const maxQty = orderQuantity === stockLevel;

    const [showMessage, setShowMessage] = useState<boolean>(false);

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2">
            {/* Counter */}
            <div className="flex flex-row items-center justify-center gap-1">
                {/* Decrement */}
                <Button
                    onClick={() => item && updateQuantity(item.productId, item.orderQuantity - 1)}
                    className={cn(
                        '',
                        orderQuantity === 1 && 'pointer-events-none opacity-50'
                    )}
                    size="icon-xs">
                    <MinusIcon />
                </Button>
                {/* Qty */}
                <p className={cn(
                    'w-4 text-center',
                    maxQty && 'text-red-500 font-bold'
                )}>
                    {orderQuantity}
                </p>
                {/* Increment */}
                <Button
                    onClick={() => {
                        item && updateQuantity
                            (item.productId, item.orderQuantity + 1);
                        maxQty && setShowMessage(true);
                    }
                    }
                    size="icon-xs"
                    className={cn(
                        '',
                        orderQuantity === stockLevel && 'pointer-events-none opacity-50'
                    )}
                >
                    <PlusIcon />
                </Button>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
                <AsteriskIcon className="size-4 pb-1" />
                {/* Unit Price */}
                <div className="flex flex-row items-center w-fit">
                    <Euro className="size-3" />
                    <p className="max-w-xs">{unitPrice}</p>
                </div>
                {/* Total */}
                <div className="flex flex-row items-center gap-1">
                    <Equal className="size-3" />
                    <span className="flex flex-row items-center">
                        <Euro className="size-3" />
                        <p>{(orderQuantity ?? 0) * (unitPrice ?? 0)}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export function StoreRemoveProduct({ productId }: StoreCardProps) {
    const item = useCartStore((state) => state.items.find((i) => i.productId === productId));
    const removeItem = useCartStore((state) => state.removeItem);
    const { orderQuantity, stockLevel } = item ?? {};
    const t = useTranslations('marketplace.cart');

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Badge className={cn(
                'w-15',
                orderQuantity === stockLevel && 'bg-red-700 font-bold'
            )} >
                {(stockLevel ?? 0) - (orderQuantity ?? 0)} {t('cartStore.cartBody.badge')}
            </Badge>
            <Button
                className='group max-w-xs hover:bg-red-300'
                variant="ghost"
                onClick={() => item && removeItem(item.productId)}
            >
                <TrashIcon className="size-4 fill-neutral-500 stroke-neutral-600 group-hover:stroke-neutral-900" />
            </Button>
        </div>

    )
}

export function StoreFooter() {
    const [openDisclaimer, setOpenDisclaimer] = useState<boolean>(false);
    const clearCart = useCartStore((state) => state.clearCart)
    const subTotal = useCartStore((state) => state.subTotal())
    const itemQty = useCartStore((state) => state.items)
    const cartToggle = useCartStore((state) => state.cartToggle)
    const t = useTranslations('marketplace.cart');

    return (
        <DrawerFooter className="space-y-2 border-t border-neutral-400">
            <div className="flex flex-row items-center justify-between font-semibold">
                <h3 className="text-xl font-ibm-plex-sans">
                    {`${t('cartStore.cartFooter.total')}:`}
                </h3>
                <p className="flex flex-row items-center text-xl"><Euro className="size-4.5" />{subTotal}</p>
            </div>
            <Collapsible>
                <CollapsibleContent>
                    <AnimatePresence>
                        <motion.div
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeIn" }}
                            className="pb-4 -z-999 relative"
                        >
                            <StoreDisclaimer
                                label={t('cartStore.cartFooter.disclaimer.title')}
                                desc={t('cartStore.cartFooter.disclaimer.desc')}
                            />
                        </motion.div>
                    </AnimatePresence>
                </CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                    <Button
                        className={cn(
                            '',
                            subTotal === 0 && 'pointer-events-none opacity-50'
                        )}
                        onClick={cartToggle}
                    >
                        {t('cartStore.cartFooter.sendRequest')}
                    </Button>
                    <CollapsibleTrigger asChild>
                        <Button className='' onClick={() => setOpenDisclaimer(!openDisclaimer)}>
                            {openDisclaimer
                                ?
                                <p>{t('cartStore.cartFooter.closeDisclaimer')}</p>
                                :
                                <p>{t('cartStore.cartFooter.viewDisclaimer')}</p>
                            }
                        </Button>
                    </CollapsibleTrigger>
                </div>
            </Collapsible>
            {itemQty.length > 0 && (
                <Button
                    onClick={() => clearCart()}
                    className="w-full"
                >
                    {t('cartStore.cartFooter.clearCart')}
                </Button>
            )}
        </DrawerFooter>
    )
}