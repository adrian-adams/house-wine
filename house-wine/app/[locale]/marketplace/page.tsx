import React from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// Types, Lists & Queries
import { wineType, country, bottleSize } from '@/app/[locale]/marketplace/FilterList';
import { getAllProducts } from '@/lib/queries/products';
// Components
import Marketplace from '@/components/marketplace/Marketplace';

export default async function page() {
    const products = await getAllProducts()

    return (
        <>
            <Marketplace props={products} />
        </>
    )
}
