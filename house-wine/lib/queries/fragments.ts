export const PRODUCT_FIELDS = `
    _id,
    name,
    "slug": slug.current,
    producer,
    wineType,
    vintage,
    price,
    country,
    region,
    vineyard,
    classification,
    grapes,
    bottleSize,
    packaging,
    fillLevel,
    stores[]->{
        _id,
        title,
        slug
    },
    labelCondition,
    "images": images[].asset->url,
    availability,
    quantity
`;

export const FEATURES_FIELDS = `
    _id,
    title,
    description,
    "imageUrl": images.asset->url
`;

export const STORES_FIELDS = `
    _id,
    title,
    storeKey,
    "slug": slug.current,
    about,
    email,
    location,
    "imageUrl": imageUrl.asset->url,
    "products": *[_type == "product" && references(^._id)] {
        _id,
        name,
        vintage,
        "imageUrl": images[0].asset->url
    }
`