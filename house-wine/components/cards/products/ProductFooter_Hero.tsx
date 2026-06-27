import React from 'react'
// Types
import { ProductCardUI } from '@/types/product-card'
// Components
import { Badge } from "@/components/ui/badge"
import { CardFooter } from "@/components/ui/card"

export default function ProductFooterHero({ title, producer, vintageYear, quantity, className }: ProductCardUI) {
    return (
        <CardFooter className="flex flex-col gap-4 flex-1 h-full md:h-10">
            <p className="font-semibold">{title}</p>
            <div className="flex flex-row items-start w-full">
                <p className="flex-1 text-start">{producer}</p>
                <p className="flex-0">{vintageYear}</p>
                {quantity && (
                    <Badge>{quantity}</Badge>
                )}
            </div>
        </CardFooter>
    )
}
