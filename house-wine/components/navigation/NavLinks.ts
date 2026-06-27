// Lists used for NavLinksRender.tsx -> ./NavLinksRender.tsx

interface NavLinkUI {
    name: string
    href: string
    style?: string
}

type NavLinkArr = NavLinkUI[]

// SiteMenu()
export const navigation: NavLinkArr = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Shops", href: "/shops" },
    // { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
]

// UserMenu()
export const user: NavLinkArr = [
    { name: "Sign in", href: "/login" },
    { name: "Sign up", href: "/register", style: "p-3 bg-white shadow rounded-xl text-hw-underworld" },
]