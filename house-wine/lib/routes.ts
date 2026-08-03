import type { Route } from 'next';

export const routes = {
    home: () => '/' as Route,
    marketplace: () => '/marketplace' as Route,
    products: (slug: string) => `/products/${slug}` as Route,
    shops: () => '/shops' as Route,
    about: () => '/about' as Route,
    features: () => '/features' as Route,
    pricing: () => '/pricing' as Route,
    login: () => '/login' as Route,
    register: () => '/register' as Route,
    cookie: () => '/legal-agreements/cookie-policy' as Route,
    terms: () => '/legal-agreements/terms-and-cnodtions' as Route,
    privacy: () => '/legal-agreements/privacy-policy' as Route,
    contact: () => '/contact-us' as Route
} as const;