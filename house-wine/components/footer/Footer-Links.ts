import { routes } from "@/lib/routes";
import type { Route } from "next";

interface LinkProps {
    name: string
    href: Route | "#"
}

export const quickLinks: LinkProps[] = [
    { name: "Marketplace", href: routes.marketplace() },
    { name: "Features", href: routes.features() },
    { name: "Wine Deals", href: "#" },
    { name: "About", href: routes.features() },
    { name: "Sign In", href: routes.login() },
]

export const forProfessionals: LinkProps[] = [
    { name: "Online sales", href: "#" },
    { name: "Wholesale (B2B)", href: "#" },
    { name: "Bookeeping intergations", href: "#" },
    { name: "Planned drops", href: "#" },
    { name: "Build a community", href: "#" },
]

export const moreInformation: LinkProps[] = [
    { name: "A better marketplace for wine", href: "#" },
    { name: "By and for enthusiasts", href: "#" },
    { name: "Easily share your wine collection", href: "#" },
    { name: "A better price for buyer and seller", href: "#" },
    { name: "The secondary wine market", href: "#" },
    { name: "Burgundy Wines", href: "#" },
    { name: "Grape Varieties", href: "#" }
]

export const legal: LinkProps[] = [
    { name: "Terms & Conditions", href: routes.terms() },
    { name: "Privacy Policy", href: routes.privacy() },
    { name: "Contact", href: "#" },
]