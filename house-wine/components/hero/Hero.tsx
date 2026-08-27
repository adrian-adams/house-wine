import React from 'react'
// Queries
import { getProductsByTag } from "@/lib/queries/products";
// Misc
import { getTranslations } from 'next-intl/server';
import { richField, TFunction } from '@/lib/i18n/richField';
import { routes } from '@/lib/routes';
// NextJS
import { Link } from '@/i18n/routing';
// Components
import { Button } from '@/components/ui/button';
import HeroSwiperEffectFlow from '../swiper/HeroSwiperEffectFlow';

function HeroButton({ text, href }: { text: string, href: string }) {
    return (
        <Link
            href={href}
            className='flex-1'
        >
            <Button variant="hw_primary" className="overflow-hidden break-keep">
                {text}
            </Button>
        </Link>
    )
}

export default async function Hero() {
    const products = await getProductsByTag("homeFeatured", "promoTag");
    const t = await getTranslations('home');

    const EN = {
        root: {
            title: richField({
                t: { rich: t.rich } as unknown as TFunction,
                textField: 'hero.title'
            }),
            desc_1: t('hero.desc_1'),
            registerBtn: t('hero.registerBtn'),
            marketplaceBtn: t('hero.marketplaceBtn'),
            desc_2: richField({
                t: { rich: t.rich } as unknown as TFunction,
                textField: 'hero.desc_2',
                extraTags: {
                    link: (chunks: React.ReactNode) =>
                        <Link href={routes.pricing()} className="underline underline-offset-2">
                            {chunks}
                        </Link>
                }
            })
        }
    }

    return (
        <div className="h-screen bg-hw-heritage-park/80 text-white p-10 text-center lg:text-start flex flex-col lg:flex-row gap-2 items-center justify-between overflow-hidden bg-[url('/general/blur-bg.png')] bg-cover bg-center bg-fixed">
            <div className="w-full pt-20 md:pt-30 space-y-4">
                <h1 className="font-instrument-sarif text-3xl md:text-5xl leading-tight">
                    {EN.root.title}
                </h1>
                <p>{EN.root.desc_1}.</p>
                <div className="flex flex-col items-center lg:items-start gap-4">
                    <div className="w-full md:max-w-8/12 grid grid-cols-2 gap-2">
                        <HeroButton
                            href={routes.register()}
                            text={EN.root.registerBtn}
                        />
                        <HeroButton
                            href={routes.marketplace()}
                            text={EN.root.marketplaceBtn}
                        />
                    </div>
                    <p className="text-sm">
                        {EN.root.desc_2}
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-7/12 lg:pt-30">
                <HeroSwiperEffectFlow slides={products} />
            </div>
        </div>
    )
}
