import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'features',
    title: 'Features',
    type: 'document',
    preview: {
        select: {
            title: 'title',
            subtitle: 'section',
            media: 'images'
        }
    },
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }), 
        defineField({
            name: 'image',
            title: 'Image Icon',
            type: 'image',
        }),  
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }), 
        defineField({
            name: 'section',
            title: 'Section',
            type: 'string',
            options: {
                list: [
                    { title: 'Powerful Features', value: 'powerfulFeatures' },
                ]
            }
        }),
    ]
})