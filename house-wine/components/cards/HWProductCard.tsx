import React from 'react'
// Types
import { ContentUI } from '@/types/ui'
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
// Lucide
import { Euro, Wine, Dot } from 'lucide-react';


export interface ProductFooter extends ContentUI {
    price?: number
    year?: number
    quantity: number
    producer?: string
}

export function HWHeroFooter({ title, producer, year, quantity }: ProductFooter) {
    return (
        <>
            <div className="font-bold text-start w-full">
                <p className="truncate">{title}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <span className={`truncate text-wrap ${year && "max-w-16"}`}>{producer}</span>
                    {year && (
                        <span className="flex flex-row items-center">
                            <Dot />
                            {year}
                        </span>
                    )}
                </div>
                {quantity > 0 && (
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

export function HWNewArrivalsFooter({ title, producer, year, price }: ProductFooter) {
    return (
        <>
            <div className="flex flex-col flex-1 gap-1 text-start w-full">
                <p className="font-instrument-sarif">
                    {title}
                </p>
                <p className="text-hw-cigar-smoke">
                    {producer}
                </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <p className="text-hw-cigar-smoke">
                    {year}
                </p>
                <span className={`flex flex-row items-center font-bold ${!year && 'justify-end'}`}>
                    <Euro size={14} />
                    {price}
                </span>
            </div>
        </>
    )
}

export function HWMarketplaceFooter({ title, producer, year, price, quantity }: ProductFooter) {
    return (
        <>
            <div>
                {title}
                <span className="flex flex-row items-center">
                    <Euro />
                    {price}
                </span>
            </div>
            <div>
                <span>
                    {producer}
                    {year}
                </span>
                <Badge className="bg-hw-lily-pad-pond">
                    {quantity}
                </Badge>
            </div>
        </>
    )
}

type Variant = 'Hero' | 'New Arrivals' | 'Marketplace';

export interface ProductCardProps extends ContentUI {
    src: string
    alt: string
    footer?: React.ReactNode
    variant: Variant
    isNew?: boolean
    logoUrl?: string
}

export default function HWProductCard({ logoUrl, isNew, src, alt, footer, variant }: ProductCardProps) {
    return (
        <Card className={cn(
            "m-2 h-80",
            variant === "Hero" && "h-80",
            variant === "New Arrivals" && "h-80",
            variant === "Marketplace" && "h-80"
        )}>
            <div className="relative flex-4">
                {isNew && (
                    <Badge className="absolute -bottom-2 left-2 z-20 bg-hw-thyme">
                        NEW
                    </Badge>
                )}
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-4"
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
                variant === "Marketplace" && "flex-1"
            )}>
                {footer}
            </CardFooter>
        </Card>
    )
}


