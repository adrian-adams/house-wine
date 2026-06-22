import React from 'react'
// Queries
import { getProductsByTag } from "@/lib/queries/products";
// NextJS
import Link from 'next/link'
// Components
import { Button } from '@/components/ui/button'
import HeroSwiperEffectFlow from '../swiper/HeroSwiperEffectFlow';

interface ButtonUI {
    text: string
    internalUrl: string
    variant?: string
}

function HeroButton({ text, internalUrl, variant }: ButtonUI) {
    return (
        <Link
            href={internalUrl}
            className='flex-1'
        >
            <Button variant="hw_primary">
                {text}
            </Button>
        </Link>
    )
}

export default async function Hero() {
    const products = await getProductsByTag("homeFeatured", "promoTag");

    return (
        <div className="h-screen bg-hw-heritage-park/80 text-white p-10 text-center md:text-start flex flex-col md:flex-row gap-6 items-center justify-between overflow-hidden">
            <div className="w-full lg:w-6/12 pt-20 md:pt-50">
                <h1 className="font-instrument-sarif text-3xl md:text-5xl">
                    The platform for independent <i>sellers, enthusiasts</i> and <i>wine estates</i>
                </h1>
                <p>Shop from independent sellers, track your cellar with AI, and sell or share through your own online shop.</p>
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="md:max-w-8/12 grid grid-cols-2 gap-2">
                        <HeroButton internalUrl="#" text="Register" />
                        <HeroButton internalUrl="#" text="View Marketplace" />
                    </div>
                    <p className="text-sm">
                        Start free with your first 25 wines. Upgrade for unlimited.
                        <Link href="#" className="underline">
                            See pricing
                        </Link>
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 md:pt-50">
                <HeroSwiperEffectFlow slides={products} />
            </div>
        </div>
    )
}
