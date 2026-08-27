"use client"

import React, { useState, useEffect } from 'react'
// Types, Hooks, Routes, Zustand, Motion
import { ProductUI } from '@/types/ui';
import { useCartStore } from '@/lib/zustand/cart';
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from 'next-intl';
// CSS Utils
import { cn } from '@/lib/utils';
// Components
import { Button } from '@/components/ui/button';
// Lucide
import { Euro, Dot, CirclePlus, ShoppingBasket } from 'lucide-react';

export default function HWMarketplaceFooter({ slug, name, producer, vintage, price, quantity, availability, imageUrl }: ProductUI) {
    const t = useTranslations('marketplace');
    const addItem = useCartStore((state) => state.addItem);
    const items = useCartStore((state) => state.items.find((i) => i.productId === slug));

    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    useEffect(() => {
        if (!showConfirmation) {
            return;
        }

        const timer = setTimeout(() => {
            setShowConfirmation(false)
        }, 1000);

        return () => clearTimeout(timer);

    }, [showConfirmation]);

    return (
        <>
            <div className="flex flex-row items-center justify-between gap-4 w-full">
                <p className="truncate">
                    {name}
                </p>
                <span className="flex flex-row items-center font-bold">
                    <Euro className="size-4" />
                    {price}
                </span>
            </div>
            <div className="flex flex-row items-center justify-between gap-4 w-full">
                <p className="flex flex-row items-center text-xs">
                    <span className="max-w-25 truncate text-neutral-700 flex-2">{producer}</span>
                    <span className="flex flex-row items-center flex-1.5">
                        <Dot />
                        {vintage !== 0 ? (
                            <span>{vintage}</span>
                        ) : (
                            <>N/A</>
                        )
                        }
                    </span>
                </p>
            </div>
            <Button
                onClick={() => {
                    const success = addItem({
                        productId: slug ?? "",
                        slug: slug ?? "",
                        name: name ?? "",
                        stockLevel: quantity ?? 0,
                        vintage: vintage ?? 'N/A',
                        unitPrice: price ?? 0,
                        producer: producer ?? 'N/A',
                        image: imageUrl ?? ''
                    }, 1);
                    if (success) {
                        setShowConfirmation(true);
                    }
                }}
                className={cn(
                    'cursor-pointer py-2 bg-neutral-300 text-neutral-950 hover:text-neutral-200 flex flex-row justify-center gap-2 items-center w-full rounded-xl',
                    !availability && 'pointer-events-none opacity-50',
                    items && 'bg-neutral-700/50 text-white pointer-events-none'
                )}
            >
                {items ?
                    <>
                        <p className="truncate">{`${t('cart.cartStore.productCard.addedToCart')}!`}</p>
                        <ShoppingBasket />
                    </>
                    :
                    <>
                        <p>{t('cart.cartStore.productCard.addToCart')}</p>
                        <CirclePlus />
                    </>
                }
            </Button>

            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-white"
                    >
                        <p className="text-center">{`${t('cart.cartStore.productCard.addedToCart')}!`}</p>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    )
}

