import { sanityClient } from '../sanity';
import { PRODUCT_FIELDS } from './fragments';
import { SearchParams } from '@/types/ui';

type Tags = "homeFeatured" | "newArrivals"
type Field = "promoTag"

export async function getAllProducts({
    search, 
    sort, 
    country, 
    type, 
    size, 
    soldOut
}: SearchParams) {
    // const { search, sort, country, type, size, soldOut } = filters;

   const countryFilter = country
        ? Array.isArray(country)
            ? `country in [${country.map(c => `"${c}"`).join(', ')}]`
            : `country == "${country}"`
        : null

    const typeFilter = type
        ? Array.isArray(type)
            ? `wineType in [${(type as string[]).map(t => `"${t}"`).join(', ')}]`
            : `wineType == "${type}"`
        : null

    const conditions = [
        `_type == "product"`,
        search   ? `name match "*${search}*"` : null,
        countryFilter,
        typeFilter,
        size     ? `bottleSize == "${size}"` : null,
        soldOut === 'true' ? `availability == false` : null,
    ].filter(Boolean).join(' && ');

    const order = sort === 'nameAZ'  ? 'name asc'
                : sort === 'nameZA'  ? 'name desc'
                : sort === 'priceLowToHigh' ? 'price asc'
                : sort === 'priceHighToLow' ? 'price desc'
                : sort === 'vintage'  ? 'vintage asc'
                : '_createdAt asc'  // default

    return await sanityClient.fetch(`
        *[${conditions}] {
            ${PRODUCT_FIELDS}
        } | order(${order})
    `)
}

export async function getProductBySlug(slug: string) {
    return await sanityClient.fetch(`
        *[_type == "product" && slug.current == $slug][0] {
            ${PRODUCT_FIELDS}
        }
    `, { slug })
}

export async function getProductsByTag(tag: Tags, field: Field) {
    return await sanityClient.fetch(`
        *[_type == "product" && "${tag}" in ${field}] {
            ${PRODUCT_FIELDS}
        }
    `)
}