import React from 'react'

// Nextjs
import { notFound } from 'next/navigation'
// il8n
import { getTranslations } from 'next-intl/server'
// Types, Queries
import { getProductBySlug } from '@/lib/queries/products'
import { mapProduct, ProductPageProps } from '@/types/ui'
import { getProductInfo } from '../ProductInfo'
// Compoments
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Separator } from '@/components/ui/separator'
import GallerySwiper from '@/components/swiper/ProductsSwiperGallery'
import { HWMotionContainer, HWMotionItem } from '@/components/layout/HWMotionBox'

export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) {
        return {}
    }

    return {
        title: product.name ? `${product.name} ${product.vintage}` : product.name,
        description: product.description
    }
}

export default async function page({ params }: ProductPageProps) {
    const { slug } = await params;
    const staticData = await getProductBySlug(slug);
    const t = await getTranslations('products');
    const wineDetails = await getTranslations('products.wineDetails');

    if (!staticData) {
        notFound();
    }

    const product = mapProduct(staticData);
    const productInfo = getProductInfo(product, (key: string) => wineDetails(key as any))

    return (
        <div className="px-4 py-6 w-full md:w-10/12 mx-auto">
            <div className="bg-white/80 rounded-2xl p-6 md:p-14 space-y-6">
                <section className=" flex flex-col-reverse md:flex-row items-center justify-normal gap-10">
                    <div className="relative w-full md:w-6/12 mx-auto lg:px-6">
                        <GallerySwiper
                            images={product.images ?? []}
                            name={product.name}
                        />
                    </div>
                    <div className="flex flex-col justify-between items-start gap-6 w-full">
                        <div className="space-y-2">
                            <Badge className="bg-neutral-300/40 border border-neutral-600 font-semibold capitalize text-neutral-900/80">
                                {product.wineType}
                            </Badge>
                            <h1 className="text-4xl mb-0">
                                {product.name}
                            </h1>
                            <p className="italic text-neutral-700 text-xl">
                                {product.producer}
                            </p>
                            <p className="text-neutral-700">
                                {product.vintage ? (
                                    <>{product.vintage}</>
                                ) : (
                                    <>N/A</>
                                )}
                            </p>
                        </div>
                        {product.grapes && (
                            <div>
                                <h2 className="text-2xl">{t('header.grapes')}</h2>
                                <Badge>
                                    {product.grapes}
                                </Badge>
                            </div>
                        )}
                    </div>
                </section>
                <Separator className="bg-neutral-500" />
                <section>
                    <h2 className="text-3xl pb-2">{wineDetails('title')}</h2>
                    <Table>
                        <TableBody>
                            <HWMotionContainer as='div'>
                                {productInfo.map((item) => (
                                    <TableRow key={item.title} className="w-full">
                                        <TableCell className="w-2/12 text-neutral-700 font-medium px-0">
                                            {item.title}
                                        </TableCell>
                                        <TableCell className={`${item.style} px-2`}>
                                            {item.desc}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </HWMotionContainer>
                        </TableBody>
                    </Table>
                </section>
                <Separator className="bg-neutral-500" />
                <section>
                    <h2 className="text-3xl pb-2">{t('tasting.title')}</h2>
                    <p>{product.tastingNotes}</p>
                </section>
            </div>
        </div >
    )
}
