import { ContentUI } from "@/types/ui"

export type PriceListUI = Pick<ContentUI, 'desc' | 'style'> & {
    included: boolean
}

type FaqUI = Pick<ContentUI, 'title' | 'desc'> & {
    value: string
}

export const free: PriceListUI[] = [
    { desc: "Wines in your collection: up to 25", included: true },
    { desc: "AI photo recognition & analysis", included: true },
    { desc: "Your own shop with catalog", included: true  },
    { desc: "Subdomain on housewine.nl", included: true },
    { desc: "Custom domain: not included", included: false  },
    { desc: "Marketplace for rare vintages", included: true },
    { desc: "Support: community", included: true }
]

export const premium: PriceListUI[] = [
    { desc: "Wines in your collection: unlimited", included: true },
    { desc: "AI photo recognition & analysis", included: true },
    { desc: "Your own shop with catalog", included: true },
    { desc: "Subdomain on housewine.nl", included: true },
    { desc: "Custom domain: included", included: true, style: "font-bold" },
    { desc: "Marketplace for rare vintages", included: true },
    { desc: "Support: priority email", included: true }
]

export const premiumShopping: PriceListUI[] = [
    { desc: "Stripe & Mollie checkout (iDEAL, card, Bancontact)", included: true },
    { desc: "Funds go directly to your own account", included: true  },
    { desc: "Automatic PDF invoicing (sequential numbering)", included: true  },
    { desc: "Per-bottle VAT scheme (incl. margin / marge-regeling)", included: true  },
    { desc: "No platform fees on transactions", included: true  }
]

export const pro: PriceListUI[] = [
    { desc: "Everything in Premium", included: true, style: "font-bold" },
    { desc: "Online payments — your own account", included: true },
    { desc: "Complete whitelabeling — no House Wine branding", included: true, style: "font-bold" },
    { desc: "Newsletter to your own customers & subscribers", included: true, style: "font-bold" },
]

export const FAQ: FaqUI[] = [
    {   
        value: "25th wine",
        title: "What happens when I reach my 25th wine?", 
        desc: "Your existing wines stay accessible. To add more, upgrade to Premium or remove existing wines." 
    },
    {   
        value: "subscription",
        title: "Can I cancel my subscription?", 
        desc: "Yes, anytime from your account settings. You keep Premium access until the end of the paid period." 
    },
    {   
        value: "domain",
        title: "What if I already connected a custom domain and then downgrade?", 
        desc: "Already-connected domains keep working. You won't be able to add a new domain or change the existing one until you upgrade again." 
    },
    {   
        value: "premium shopping",
        title: "What is Premium Shopping and do I need it?", 
        desc: "Premium Shopping is a per-shop add-on (€20/month or €200/year) that lets you accept online payments through your own Stripe or Mollie account. Without it, your shop still works fine — customers send inquiries you handle manually. Only activate it when you actually want online checkout." 
    },
]