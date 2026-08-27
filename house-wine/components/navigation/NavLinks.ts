// lib/navigation.ts
import { routes } from '@/lib/routes';

export const navigation: { slug: string, label: string }[] = [
    { slug: routes.marketplace(), label: 'Marketplace' },
    { slug: routes.about(), label: 'About' },
    { slug: routes.features(), label: 'Features' },
    { slug: routes.shops(), label: 'Shops' },
    { slug: routes.pricing(), label: 'Pricing' },
];

export const login: { slug: string, label: string }[] = [
    { slug: routes.login(), label: 'Sign in' },
    { slug: routes.register(), label: 'Sign up' },
];