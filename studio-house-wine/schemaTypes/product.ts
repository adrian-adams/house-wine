import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    preview: {
        select: {
            title: 'name',
            subtitle: 'producer',
            media: 'images.0'
        }
    },
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: (doc: any) => {
                    const name = doc.name || ''
                    const producer = doc.producer || ''
                    const vintage = doc.vintage || ''
                    return `${producer}-${name}-${vintage}`
                },
                slugify: (input: string) =>
                    input
                        .toLowerCase()
                        .replace(/\s+/g, '-')     // spaces to hyphens
                        .replace(/[^\w-]/g, '')    // remove special characters
                        .slice(0, 96)             // max length
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'producer',
            title: 'Producer',
            type: 'string'
        }),
        defineField({
            name: 'vintage',
            title: 'Vintage (Year)',
            type: 'number'
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number'
            // Managed on MongoDB
        }),
        defineField({
            name: 'availability',
            title: 'Availability',
            type: 'boolean',
            // options: {
            //     list: [
            //         { title: 'In Stock', value: 'inStock' },
            //         { title: 'Out of Stock', value: 'outOfStock' }
            //     ]
            // }
            // Managed on MongoDB
        }),
        defineField({
            name: 'quantity',
            title: 'Quantity',
            type: 'number'
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string'
        }),
        defineField({
            name: 'region',
            title: 'Region',
            type: 'string'
        }),
        defineField({
            name: 'vineyard',
            title: 'Vineyard',
            type: 'string'
        }),
        defineField({
            name: 'classification',
            title: 'Classification',
            type: 'string',
            // options: {
            //     list: [
            //         { title: 'DOC/DOCG', value: 'doc/docg' },
            //         { title: 'AOC/AOP', value: 'apc/aop' },
            //         { title: 'Premier Cru (1er Cru)', value: 'premierCru' },
            //     ]
            // }
        }),
        defineField({
            name: 'wineType',
            title: 'Wine Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Dessert', value: 'dessert' },
                    { title: 'Fortified', value: 'fortified' },
                    { title: 'Port', value: 'port' },
                    { title: 'Red', value: 'red' },
                    { title: 'Rosé', value: 'rose' },
                    { title: 'Sparkling', value: 'sparkling' },
                    { title: 'White', value: 'white' }
                ]
            }
        }),
        defineField({
            name: 'grapes',
            title: 'Grapes',
            type: 'array',
            of: [{ type: 'string', options: { hotspot: true } }]
        }),
        defineField({
            name: 'bottleSize',
            title: 'Bottle Size',
            type: 'string'
        }),
        defineField({
            name: 'packaging',
            title: 'Packaging',
            type: 'string',
            options: {
                list: [
                    { title: 'No Packaging', value: 'noPackaging' },
                    { title: 'Packaging', value: 'packaging' },
                    { title: 'Original Gift Box', value: 'originalGiftBox' },
                    { title: 'Original Wooden Case', value: 'originalWoodenCase' }
                ]
            }
        }),
        defineField({
            name: 'fillLevel',
            title: 'Fill Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Neck', value: 'fullNeck' },
                ]
            }
            // Managed on MongoDB
        }),
        defineField({
            name: 'store',
            title: 'Store',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'stores'}]
                }
            ]
           
        }),
        // defineField({
        //     name: 'storeTag',
        //     title: 'Store Tag',
        //     type: 'array',
        //     of: [
        //         {
        //             type: 'string'
        //         }
        //     ],
        //     options: {
        //         list: [
        //             { title: 'My Shop', value: 'myShop' },
        //             { title: 'Midas Wijn', value: 'midasWijn' },
        //             { title: 'MyFineWine030', value: 'myFineWine030' },
        //             { title: 'Wijnmetpieter', value: 'wijnmetpieter' },
        //             { title: 'Dawg wines', value: 'dawgWines' },
        //             { title: 'Andreas', value: 'andreas' },
        //             { title: 'Michel Steve', value: 'michelSteve' },
        //             { title: 'Vinoli Exclusive', value: 'vinoliExclusive' },
        //             { title: 'BB vintage wines', value: 'bbVintageWines' },
        //             { title: 'CWH', value: 'cwh' },
        //             { title: 'Klassiek Rood', value: 'klassiekRood' },
        //             { title: 'Special Bottles', value: 'specialBottles' },
        //             { title: 'Gregorian Wines', value: 'gregorianWines' },
        //         ]
        //     }
        //     // Managed on MongoDB
        // }),
        defineField({
            name: 'labelCondition',
            title: 'Label Condition',
            type: 'text'
        }),
        defineField({
            name: 'promoTag',
            title: 'Promotional Tag',
            type: 'array',
            of: [
                    {
                        type: 'string'
                    }
            ],
            options: {
                list: [
                    { title: 'Home Featured', value: 'homeFeatured' },
                    { title: 'New Arrivals', value: 'newArrivals' }
                ]
            }
        }),
        defineField({
            name: 'logo',
            title: 'Brand Logo',
            type: 'image'
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }]
        })
    ]
})