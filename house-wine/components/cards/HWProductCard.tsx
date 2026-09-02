"use client"

import React from 'react'
// Types, Hooks, Routes
import { ContentUI, ProductUI } from '@/types/ui'
import { useCleanPathname } from '@/hooks/useCleanPathName'
import { routes } from '@/lib/routes'
import { useTranslations } from 'next-intl';
// NextJS
import Image from 'next/image'
// import Link from 'next/link'
import { Link } from '@/i18n/routing'
// CSS Utils
import { cn } from '@/lib/utils'
// Components
import {
    Card,
    CardFooter,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '../ui/button'
// Lucide
import { Euro, Wine, Dot } from 'lucide-react';

export interface ProductFooter extends ContentUI {
    price?: number
    year?: number
    quantity: number
    producer?: string
}

export function HWHeroFooter({ name, producer, vintage, quantity }: ProductUI) {
    return (
        <>
            <div className="font-bold text-start w-full">
                <p className="truncate">{name}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center pe-2 overflow-auto">
                    <span className={`truncate text-wrap`}>{producer}</span>
                    {vintage && (
                        <span className="flex flex-row items-center">
                            <Dot />
                            {vintage}
                        </span>
                    )}
                </div>
                {quantity !== undefined && quantity > 0 && (
                    <Badge className="bg-hw-dead-sea-mud">
                        <span>
                            {quantity}
                        </span>
                    </Badge>
                )}
            </div>
        </>
    )
}

export function HWNewArrivalsFooter({ name, producer, vintage, price }: ProductUI) {
    return (
        <>
            <div className="flex flex-col flex-1 gap-1 text-start w-full">
                <p className="font-instrument-sarif">
                    {name}
                </p>
                <p className="text-hw-cigar-smoke">
                    {producer}
                </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <p className="text-hw-cigar-smoke">
                    {vintage}
                </p>
                <span className={`flex flex-row items-center font-bold ${!vintage && 'justify-end'}`}>
                    <Euro size={14} />
                    {price}
                </span>
            </div>
        </>
    )
}

type Variant = 'Hero' | 'New Arrivals' | 'Marketplace';

export interface ProductCardProps extends ProductUI {
    src: string
    alt: string
    footer?: React.ReactNode
    variant: Variant
    logoUrl?: string
}

export default function HWProductCard({ promoTag, src, alt, footer, variant, availability, quantity, slug }: ProductCardProps) {
    const { pathname } = useCleanPathname();
    const market = pathname === '/marketplace';
    const t = useTranslations('marketplace');

    return (
        <Card className={cn(
            "group z-10 relative",
            variant === "Hero" && "h-80 m-2",
            variant === "New Arrivals" && "h-80 m-2",
            variant === "Marketplace" && "h-70"
        )}>
            <div className="relative flex-4">
                {/* Promo Tag */}
                {promoTag?.includes('newArrivals') && (
                    <Badge className="absolute -top-2 left-2 z-10 bg-hw-thyme uppercase">
                        {t('cart.cartStore.productCard.newBadge')}
                    </Badge>
                )}

                {/* Quantity & Availability */}
                {market && (
                    <span className="absolute -top-2 right-2 z-10">
                        <Badge className="bg-neutral-500">
                            {availability ? (
                                <span>{quantity}</span>
                            ) : (
                                <span>{t('cart.cartStore.productCard.soldOut')}</span>
                            )}
                        </Badge>
                    </span>
                )}

                {/* View More */}
                {slug && (
                    <Link href={routes.products(slug)}>
                        <Button className={cn(
                            'lg:opacity-0 group-hover:lg:opacity-100 cursor-pointer absolute -bottom-1/12 right-6/12 translate-x-6/12 z-20 py-2 bg-neutral-600',
                        )}>
                            {t('cart.cartStore.productCard.viewMore')}
                        </Button>
                    </Link>
                )}


                {/* Image */}
                {src ? (
                    <Image
                        src={src}
                        alt={alt ?? "House Wine"}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-4 z-10"
                        loading="lazy"
                    />
                ) : (
                    <span className="h-full flex flex-col items-center justify-center gap-4">
                        <Wine size={80} />
                        <p className="text-center">{`${t('cartStore.productCard.imgNotFound')}...`}</p>
                    </span>
                )}
            </div>
            <CardFooter className={cn(
                "flex flex-col h-full relative",
                variant === "Hero" && "flex-1 justify-between gap-2 text-xs",
                variant === "New Arrivals" && "flex-2 bg-transparent border-t-0 gap-2 text-[13px]",
                variant === "Marketplace" && "flex-1 gap-2"
            )}>
                {footer}
            </CardFooter>
        </Card >
    )
}


