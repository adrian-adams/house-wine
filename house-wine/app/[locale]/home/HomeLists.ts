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
        src: `${imgPath}hw-camera.svg`, 
        title: 'AI-Powered Image Analysis',
    },
    { 
        src: `${imgPath}hw-building.svg`, 
        title: 'Public Wine Shops',
    },
    { 
        src: `${imgPath}hw-organization.svg`, 
        title: 'Smart Organization',
    },
    { 
        src: `${imgPath}hw-image.svg`, 
        title: 'Image Optimization',
    },
    { 
        src: `${imgPath}hw-message.svg`, 
        title: 'Inquiries & Sales',
    },
    { 
        src: `${imgPath}hw-lock.svg`, 
        title: 'Secure & Private',
    },
    { 
        src: `${imgPath}hw-payments.svg`, 
        title: 'Online payments (Stripe & Mollie)',
    },
    { 
        src: `${imgPath}hw-clock.svg`, 
        title: 'Planned drops & releases', 
    },
    { 
        src: `${imgPath}hw-b2b.svg`, 
        title: 'Wholesale (B2B)',
    }
]