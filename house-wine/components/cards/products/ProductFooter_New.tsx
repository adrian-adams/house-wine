import React from 'react'
// Types
import { ProductCardUI } from '@/types/product-card'
// Components
import { Badge } from "@/components/ui/badge"
import { CardFooter } from "@/components/ui/card"

export default function ProductFooterNew({ title, producer, vintageYear, quantity, className, price }: ProductCardUI) {
    return (
        <CardFooter className="flex flex-col items-start justify-between flex-0.5 gap-2 text-start bg-transparent border-0">
            <div className="flex flex-col flex-1">
                <p className="font-instrument-sarif text-md">{title}</p>
                <p className="text-hw-cigar-smoke text-sm">{producer}</p>
            </div>
            <div className="flex flex-row items-start justify-between flex-0 w-full">
                {
                    vintageYear && (
                        <p className="flex-0">{vintageYear}</p>
                    )
                }
                <p className="before:content-['\20AC']">{price}</p>
            </div>
        </CardFooter>
    )
}
