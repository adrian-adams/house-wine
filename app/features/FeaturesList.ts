import { ContentUI } from "@/types/ui"
import {  BellRing, BottleWine, BrainCircuit, ChartLine, ChartPie, ClipboardList, CreditCard, Eye, Funnel, Globe, Handshake, LayoutGrid, MessageCircle, Palette, Share2, ShoppingCart, Store, Truck, Zap } from 'lucide-react';

type FeaturesUI = Pick<ContentUI, "icon" | "title" | "desc" | "style">

const iconCSS = 'text-white';

export const featuresMain: FeaturesUI[] = [
    {
        icon: BrainCircuit,
        title: "AI-powered wine analysis",
        desc: "Take a photo of any bottle—or a whole case—and our AI reads the label to extract producer, vintage, region, grape varieties, and more. No typing required. Works for single bottles and wine deals and bundles too.",
        style: `bg-violet-500 ${iconCSS}`
    },
    {
        icon: Store,
        title: "Public wine shops & the secondary wine market",
        desc: "Turn your collection into a proper shop with its own subdomain. Perfect for the secondary wine market: private collectors, merchants, and wine clubs can list bottles, set prices, and receive inquiries. Shops can be public, password-protected, or invite-only.",
        style: `bg-emerald-500 ${iconCSS}`
    },
    {
        icon: Share2,
        title: "Wine sharing and discovery",
        desc: "Wine sharing is at the heart of House Wine. Share a link to your shop, let subscribers get daily updates when you add new wines, or invite specific people to a private list. Great for sharing with friends, clients, or your mailing list.",
        style: `bg-sky-500 ${iconCSS}`
    },
    {
        icon: Funnel,
        title: "Organisation that scales",
        desc: "Filter by country, region, grape variety, vintage, and type. Use custom categories per shop. Track quantities, prices, and condition. Whether you have a dozen bottles or a cellar, everything stays searchable and manageable.",
        style: `bg-amber-500 ${iconCSS}`
    }
];

export const shopYourWay: FeaturesUI[] = [
    {
        icon: Zap,
        title: "Instant shop setup",
        desc: "The moment you sign up, a shop is created for you. Set it public, pick a subdomain, upload your logo, and you’re live. Add wines by snapping photos — our AI fills in the details.",
        style: `bg-amber-500 ${iconCSS}`
    },
    {
        icon: Globe,
        title: "Custom domains",
        desc: "Connect your own domain name and run your shop on a URL that matches your brand. DNS setup is guided step by step, and SSL is automatic.",
        style: `bg-blue-500 ${iconCSS}`
    },
    {
        icon: ShoppingCart,
        title: "Cart & inquiry system",
        desc: "Customers browse your wines, add bottles to a cart, suggest their own price if you allow counter offers, and send a single inquiry. You accept, reject, or convert it straight into a sale — or let customers pay online instantly.",
        style: `bg-emerald-500 ${iconCSS}`
    },
    {
        icon: CreditCard,
        title: "Online payments with Stripe or Mollie",
        desc: "Activate Premium Shopping (€20/month or €200/year) and connect your own Stripe or Mollie account. Customers check out directly on your shop — by iDEAL, card, or Bancontact — and funds land in your account, not ours.",
        style: `bg-violet-500 ${iconCSS}`
    },
    {
        icon: ClipboardList,
        title: "Automatic invoicing",
        desc: "Every paid order generates a sequentially-numbered PDF invoice and emails it to the customer as an attachment. Per-bottle VAT scheme is supported — standard VAT, margin, and exempt items can coexist in one cart, with the correct legal wording on the invoice.",
        style: `bg-fuchsia-500 ${iconCSS}`
    },
    {
        icon: ChartLine,
        title: "Sales & revenue tracking",
        desc: "Record sales manually or convert inquiries. Track revenue, cost, profit, and conversion rate. See monthly trends and identify your best-selling bottles.",
        style: `bg-rose-500 ${iconCSS}`
    },
    {
        icon: ChartPie,
        title: "Shop analytics",
        desc: "See how many visitors your shop gets, which wines are viewed most, how many are added to carts and favourited. Weekly stats emails keep you informed without logging in.",
        style: `bg-cyan-500 ${iconCSS}`
    },
    {
        icon: BellRing,
        title: "Subscriber management",
        desc: "Let visitors subscribe for daily or weekly digests of new wines. Control who can subscribe — open, invite-only, or via referral links. You see every subscriber and can manage access.",
        style: `bg-orange-500 ${iconCSS}`
    },
    {
        icon: LayoutGrid,
        title: "Categories & featured wines",
        desc: "Organise your wines into categories and subcategories. Highlight specific bottles as featured. Customers can filter and search by producer, country, vintage, grape variety, and type.",
        style: `bg-teal-500 ${iconCSS}`
    },
    {
        icon: Truck,
        title: "Delivery options",
        desc: "Configure pickup, shipping, or custom delivery methods with prices. Customers select their preference when submitting an inquiry.",
        style: `bg-indigo-500 ${iconCSS}`
    },
    {
        icon: BottleWine,
        title: "Producer pages",
        desc: "Create dedicated pages for the producers you carry. Each producer gets their own profile with logo, description, and a view of all their wines in your shop.",
        style: `bg-purple-500 ${iconCSS}`
    },
    {
        icon: MessageCircle,
        title: "Built-in messaging",
        desc: "Communicate with customers directly through the platform. Every inquiry has a message thread — no need for external email chains.",
        style: `bg-sky-500 ${iconCSS}`
    },
    {
        icon: Eye,
        title: "Flexible visibility",
        desc: "Make your shop fully public, protect it with a password, or restrict it to subscribers only. List it on the marketplace or keep it private. You control who sees what.",
        style: `bg-slate-500 ${iconCSS}`
    },
    {
        icon: Palette,
        title: "Branding & about page",
        desc: "Upload your logo, set a background colour, write an about page with photos and opening hours. Your shop looks and feels like your own site.",
        style: `bg-pink-500 ${iconCSS}`
    },
    {
        icon: Handshake,
        title: "Wholesale (B2B)",
        desc: "Add a separate price tier for invited trade buyers — importers, restaurants, retailers. Set wholesale prices per wine, enforce minimum order rules, and manage buyer access from one place.",
        style: `bg-amber-500 ${iconCSS}`
    },
]