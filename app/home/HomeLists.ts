import { ContentUI } from "@/types/ui"
import { Camera, ShoppingBag, Globe } from 'lucide-react';

// Image path for Powerful Features card images
const imgPath = '/home/powerful-features/'

type HomeListUI = Pick<ContentUI, 'src' | 'title' | 'desc' | 'icon' | 'content'>

export const perks: HomeListUI[] = [
    { icon: Camera, desc: 'Catalog your cellar', content: '|' },
    { icon: ShoppingBag, desc: 'Buy from independent sellers', content: '|' },
    { icon: Globe, desc: 'Make your own shop' },
]

export const powerfulFeatures: HomeListUI[] = [
    { 
        src: `${imgPath}hw-clock.svg`, 
        title: 'Planned drops & releases', 
        desc: 'Schedule a release for a future date, show a countdown to the public, and give subscribers early access. Built for en primeur, allocations, and limited bottlings that need to go live at a specific moment.' 
    },
    { 
        src: `${imgPath}hw-message.svg`, 
        title: 'Inquiries & Sales',
        desc: 'Manage customer inquiries and cart requests from your public shops. Track delivery preferences, view cart contents, and respond to customer messages all in one place.' 
    },
    { 
        src: `${imgPath}hw-organization.svg`, 
        title: 'Smart Organization',
        desc: 'Filter and search your collection by country, region, vintage, and type. Organize wines into shops with custom categories. Track quantities and prices effortlessly.'
    },
    { 
        src: `${imgPath}hw-camera.svg`, 
        title: 'AI-Powered Image Analysis',
        desc: 'Simply take a photo of your wine bottle. Our AI automatically extracts all details including name, producer, vintage, region, and more. No manual data entry required.'
    },
    { 
        src: `${imgPath}hw-image.svg`, 
        title: 'Image Optimization',
        desc: 'AI-powered image enhancement automatically improves lighting and perspective. Remove backgrounds and crop images for professional product photos perfect for your shop.'
    },
    { 
        src: `${imgPath}hw-b2b.svg`, 
        title: 'Wholesale (B2B)',
        desc: 'AI-powered image enhancement automatically improves lighting and perspective. Remove backgrounds and crop images for professional product photos perfect for your shop.'
    },
    { 
        src: `${imgPath}hw-building.svg`, 
        title: 'Public Wine Shops',
        desc: 'Create beautiful, customizable public shops to showcase your collection. Share with customers, friends, or use for your business. Complete with categories and inquiry management.'
    },
    { 
        src: `${imgPath}hw-payments.svg`, 
        title: 'Online payments (Stripe & Mollie)',
        desc: 'Activate Premium Shopping and connect your own Stripe or Mollie account. Customers pay directly with iDEAL, Bancontact, SEPA, credit card, or Apple Pay — and the money lands in your bank account. Every paid order is automatically issued a sequentially-numbered PDF invoice.'
    },
    { 
        src: `${imgPath}hw-lock.svg`, 
        title: 'Secure & Private',
        desc: 'Your collection is securely stored and private by default. Choose which shops to make public and control access to your wine inventory. Full account management and security controls.'
    },
]