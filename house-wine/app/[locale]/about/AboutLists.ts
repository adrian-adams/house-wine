import { ContentUI } from "@/types/ui";

type AboutContent = Pick<ContentUI, 'src' | 'alt' | 'desc' | 'title'>

export const aboutImages: AboutContent[] = [
    { src: '/about/about-1.webp', alt: 'About House Wine' },
    { src: '/about/about-2.webp', alt: 'House Wine tasting room' },
    { src: '/about/about-3.webp', alt: 'Wine collection display' },
]

export const keyFeatures: AboutContent[] = [
    {
        title: 'AI-Powered Image Analysis: ',
        desc: 'Photograph your wine bottle and let our AI extract producer, vintage, region, and more automatically.'
    },
    {
        title: 'Public Wine Shops: ',
        desc: 'Create customisable shops to showcase your collection—public, password-protected, or invite-only.'
    },
    {
        title: 'Smart Organisation: ',
        desc: 'Filter by country, region, vintage, type, and custom categories.'
    },
    {
        title: 'Image Enhancement: ',
        desc: 'Automatically optimise and enhance bottle images for a professional look.'
    },
    {
        title: 'Customer Inquiries: ',
        desc: 'Manage cart requests and messages from your shop in one place.'
    },
]

export const whoWeServe: AboutContent[] = [
    { desc: 'Wine collectors managing personal collections' },
    { desc: 'Wine retailers and merchants' },
    { desc: 'Restaurants and sommeliers' },
    { desc: 'Wine enthusiasts organising their inventory' },
    { desc: 'Anyone who wants to showcase or share their wine collection' },
]