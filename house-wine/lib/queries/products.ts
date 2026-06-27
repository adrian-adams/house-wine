import { sanityClient } from '../sanity';
import { PRODUCT_FIELDS } from './fragments';

type Tags = "homeFeatured" | "newArrivals"
type Field = "promoTag"

export async function getAllProducts() {
    return await sanityClient.fetch(`
        *[_type == "product"] {
            ${PRODUCT_FIELDS}
        }
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