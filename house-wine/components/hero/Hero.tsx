import React from 'react'
// Queries
import { getProductsByTag } from "@/lib/queries/products";
// Next-Intl
import { getTranslations } from 'next-intl/server';
// NextJS
import Link from 'next/link';
// Components
import { Button } from '@/components/ui/button';
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
    const t = await getTranslations('home.hero');

    const ENtitle = t.rich('title', {
        i: (chunks) =>
            <i>{chunks}</i>
    });

    const ENdesc_2 = t.rich('desc_2', {
        link: (chunks) =>
            <Link href="/pricing" className="underline">
                {chunks}
            </Link>
    });

    return (
        <div className="h-screen bg-hw-heritage-park/80 text-white p-10 text-center md:text-start flex flex-col md:flex-row gap-6 items-center justify-between overflow-hidden">
            <div className="w-full lg:w-6/12 pt-20 md:pt-50 space-y-4">
                <h1 className="font-instrument-sarif text-3xl md:text-5xl leading-tight">
                    {ENtitle}
                </h1>
                <p>{t('desc_1')}.</p>
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="md:max-w-8/12 grid grid-cols-2 gap-2">
                        <HeroButton internalUrl="#" text={t('registerBtn')} />
                        <HeroButton internalUrl="#" text={t('marketplaceBtn')} />
                    </div>
                    <p className="text-sm">
                        {ENdesc_2}
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-6/12 md:pt-50">
                <HeroSwiperEffectFlow slides={products} />
            </div>
        </div>
    )
}
