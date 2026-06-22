// Lists used for NavLinksRender.tsx -> ./NavLinksRender.tsx

interface NavLinkUI {
    id: number
    name: string
    href: string
    style?: string
}

type NavLinkArr = NavLinkUI[]

// SiteMenu()
export const navigation: NavLinkArr = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Marketplace", href: "/marketplace" },
    { id: 3, name: "Shops", href: "/shops" },
    { id: 4, name: "Resources", href: "/resources" },
    { id: 5, name: "About", href: "/about" },
    { id: 6, name: "Features", href: "/features" },
    { id: 7, name: "Pricing", href: "/pricing" },
]

// UserMenu()
export const user: NavLinkArr = [
    { id: 1, name: "Sign in", href: "/login" },
    { id: 2, name: "Sign up", href: "/register", style: "p-3 bg-white shadow rounded-xl text-hw-underworld" },
]