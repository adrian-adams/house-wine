import React from 'react'
// Types
import { ContentUI, ProductUI } from '@/types/ui'
// NextJS
import Image from 'next/image'
import Link from 'next/link'
// CSS Utils
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from "class-variance-authority"
// Components
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '../ui/button'
// Lucide
import { Euro, Wine, Dot, CirclePlus } from 'lucide-react';


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
                <div className="flex flex-row items-center">
                    <span className={`truncate text-wrap ${vintage && "max-w-16"}`}>{producer}</span>
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

export function HWMarketplaceFooter({ name, producer, vintage, price, quantity }: ProductUI) {
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
                    <span className="max-w-29 truncate text-neutral-700 flex-2">{producer}</span>
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
    return (
        <Card className={cn(
            "group",
            variant === "Hero" && "h-80 m-2",
            variant === "New Arrivals" && "h-80 m-2",
            variant === "Marketplace" && "h-70"
        )}>
            <div className="relative flex-4">
                {/* Promo Tag */}
                {promoTag?.includes('newArrivals') && (
                    <Badge className="absolute -top-2 left-2 z-10 bg-hw-thyme">
                        NEW
                    </Badge>
                )}
                {/* Quantity */}

                <span className="absolute -top-2 right-2 z-10">
                    <Badge className="bg-neutral-500">
                        {availability ? (
                            <span>{quantity}</span>
                        ) : (
                            <span>Sold Out</span>
                        )}
                    </Badge>
                </span>
                {/* View More */}
                <Link href={slug ?? ''}>
                    <Button className="lg:opacity-0 group-hover:lg:opacity-100 cursor-pointer absolute bottom-0 right-6/12 translate-x-6/12 z-20 py-2 bg-neutral-600">
                        View More
                    </Button>
                </Link>

                {/* Image */}
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-4 z-10"
                        loading="lazy"
                    />
                ) : (
                    <span className="h-full flex flex-col items-center justify-center gap-4">
                        <Wine size={80} />
                        <p>Image coming soon...</p>
                    </span>
                )}
            </div>
            <CardFooter className={cn(
                "flex flex-col h-full",
                variant === "Hero" && "flex-1 justify-between gap-2 text-xs",
                variant === "New Arrivals" && "flex-2 bg-transparent border-t-0 gap-2 text-[13px]",
                variant === "Marketplace" && "flex-1 gap-2"
            )}>
                {footer}
            </CardFooter>
        </Card>
    )
}


