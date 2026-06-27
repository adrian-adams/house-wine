import {defineField, defineType} from 'sanity';

const STORE_OPTIONS = [
    { title: 'Midas Wijn', value: 'midasWijn' },
    { title: 'MyFineWine030', value: 'myFineWine030' },
    { title: 'Wijnmetpieter', value: 'wijnmetpieter' },
    { title: 'Dawg wines', value: 'dawgWines' },
    { title: 'Andreas', value: 'andreas' },
    { title: 'Michel Steve', value: 'michelSteve' },
    { title: 'Vinoli Exclusive', value: 'vinoliExclusive' },
    { title: 'BB vintage wines', value: 'bbVintageWines' },
    { title: 'CWH', value: 'cwh' },
    { title: 'Klassiek Rood', value: 'klassiekRood' },
    { title: 'Special Bottles', value: 'specialBottles' },
    { title: 'Gregorian Wines', value: 'gregorianWines' },
];

export default defineType({
    name: 'stores',
    title: 'Stores',
    type: 'document',
    preview: {
        select: {
            title: 'title',
            media: 'imageUrl'
        },
    },
    fields: [
        defineField({
            name: 'title',
            title: 'Store Name',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'storeKey',
            title: 'Store Key',
            type: 'string',
            // options: { source: 'title' },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'about',
            title: 'About Store',
            type: 'text',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'geopoint',
        }),
        defineField({
            name: 'imageUrl',
            title: 'Store Image',
            type: 'image',
        }),
    ]
})