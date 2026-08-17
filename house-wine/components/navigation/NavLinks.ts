// lib/navigation.ts
import { routes } from '@/lib/routes';

interface NavLinkUI {
    key: string       // stable key for translation lookup — not array index
    href: string
    style?: string
}

type NavLinkArr = NavLinkUI[];

export const navigation: NavLinkArr = [
    { key: 'home', href: routes.home() },
    { key: 'marketplace', href: routes.marketplace() },
    // { key: 'shops', href: routes.shops() },
    // { key: 'resources', href: routes.resources() },
    { key: 'about', href: routes.about() },
    { key: 'features', href: routes.features() },
    { key: 'pricing', href: routes.pricing() },
];

export const user: NavLinkArr = [
    { key: 'signIn', href: routes.login() },
    { key: 'signUp', href: routes.register(), style: 'p-3 bg-white shadow rounded-xl text-hw-underworld' },
];