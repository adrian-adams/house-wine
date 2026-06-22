import { sanityClient } from '../sanity';
import { STORES_FIELDS, PRODUCT_FIELDS } from './fragments';

type Tags = "homeFeatured" | "newArrivals"
type Field = "promoTag"

export async function getAllStores() {
    return await sanityClient.fetch(`
        *[_type == "stores"] {
            ${STORES_FIELDS}
        }
    `)
}

export async function getStoresWithProducts() {
    return sanityClient.fetch(`
        *[_type == "stores"] {
            _id,
            title,
            "slug": slug.current,
            about,
            "imageUrl": imageUrl.asset->url,
            "products": *[
                _type == "products" &&
                references(^._id)
            ]{
                ${PRODUCT_FIELDS}
            }
        }
    `);
}