import React from 'react'
// Typescript
import { BaseComponentsUI } from '@/types/ui'
// NextJS
import Image from 'next/image'
import Link from 'next/link'
// Components
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Wine } from 'lucide-react';
import { MoveRight } from 'lucide-react';

export interface StoreProduct {
    _id: string
    name: string
    vintage: number
    imageUrl: string
}

export interface ShopsHeaderUI extends BaseComponentsUI {
    title: string
    about: string
    imageUrl: string
    products: StoreProduct[]    // ← replaces images[]
}

export interface ShopsFooterUI extends BaseComponentsUI {
    slug?: string
}

export interface ShopUI extends ShopsHeaderUI, ShopsFooterUI { }

function ShopsHeader({ imageUrl, title, about, products }: ShopsHeaderUI) {
    return (
        <CardHeader className="relative flex-1 space-y-4 px-0">
            <CardTitle className="flex flex-row justify-between items-center min-h-10">
                <h3 className="font-instrument-sarif text-xl">{title}</h3>
                {imageUrl && (
                    <div className="relative h-10 w-5/12">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain p-2 rounded-md shadow-2xl"
                        />
                    </div>
                )}
            </CardTitle>
            <CardDescription>
                <p>{about}</p>
            </CardDescription>
            {/* Product images from matching products */}
            <h4 className="uppercase font-ibm-plex-sans font-semibold text-hw-cigar-smoke">lastest additions</h4>
            {products.length > 0 ? (
                <ul className="flex flex-row gap-2 mt-2">
                    {products?.slice(0, 3).map((product) => (
                        <li key={product._id} className="relative h-16 w-16">
                            {product.imageUrl && (
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    sizes="64px"
                                    className="object-contain p-1 border-4 border-hw-solstice rounded-md"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="h-16 flex items-center justify-center">
                    <h5 className="flex flex-row font-ibm-plex-sans text-xl font-bold">
                        Coming Soon...
                        <Wine className="size-5.5" />
                    </h5>
                </div>
            )}
        </CardHeader>
    )
}

function ShopsFooter({ slug }: ShopsFooterUI) {
    return (
        <CardFooter className="bg-transparent px-0">
            <Link href={slug ? `/shops/${slug}` : '/'}>
                <Button>
                    Visit Shop
                    <MoveRight />
                </Button>
            </Link>
        </CardFooter>
    )
}

export default function FeaturedShops({ imageUrl, title, about, products, slug }: ShopUI) {
    return (
        <Card className="h-full px-4">
            <ShopsHeader
                title={title}
                about={about}
                imageUrl={imageUrl}
                products={products}
            />
            <ShopsFooter slug={slug} />
        </Card>
    )
}
