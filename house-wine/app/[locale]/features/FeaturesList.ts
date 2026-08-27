import { ContentUI } from "@/types/ui"
import {  BellRing, BottleWine, BrainCircuit, ChartLine, ChartPie, ClipboardList, CreditCard, Eye, Funnel, Globe, Handshake, LayoutGrid, MessageCircle, Palette, Share2, ShoppingCart, Store, Truck, Zap } from 'lucide-react';

type FeaturesUI = Pick<ContentUI, "icon" | "title" | "style" | "className">

const iconCSS = 'text-white';
const cardHover = 'hover:-translate-y-1 transition duration-150 ease-in-out';

export const featuresMain: FeaturesUI[] = [
    {
        icon: BrainCircuit,
        title: "AI-powered wine analysis",
        style: `bg-violet-500 ${iconCSS}`,
        className: `hover:outline hover:outline-violet-500 ${cardHover}`
    },
    {
        icon: Store,
        title: "Public wine shops & the secondary wine market",
        style: `bg-emerald-500 ${iconCSS}`,
        className: `hover:outline hover:outline-emerald-500 ${cardHover}`
    },
    {
        icon: Share2,
        title: "Wine sharing and discovery",
        style: `bg-sky-500 ${iconCSS}`,
        className: `hover:outline hover:outline-sky-500 ${cardHover}`
    },
    {
        icon: Funnel,
        title: "Organisation that scales",
        style: `bg-amber-500 ${iconCSS}`,
        className: `hover:outline hover:outline-amber-500 ${cardHover}`
    }
];

export const shopYourWay: FeaturesUI[] = [
    {
        icon: Zap,
        title: "Instant shop setup",
        style: `bg-amber-500 ${iconCSS}`,
        className: `hover:outline hover:outline-amber-500 ${cardHover}`
    },
    {
        icon: Globe,
        title: "Custom domains",
        style: `bg-blue-500 ${iconCSS}`,
        className: `hover:outline hover:outline-blue-500 ${cardHover}`
    },
    {
        icon: ShoppingCart,
        title: "Cart & inquiry system",
        style: `bg-emerald-500 ${iconCSS}`,
        className: `hover:outline hover:outline-emerald-500 ${cardHover}`
    },
    {
        icon: CreditCard,
        title: "Online payments with Stripe or Mollie",
        style: `bg-violet-500 ${iconCSS}`,
        className: `hover:outline hover:outline-violet-500 ${cardHover}`
    },
    {
        icon: ClipboardList,
        title: "Automatic invoicing",
        style: `bg-fuchsia-500 ${iconCSS}`,
        className: `hover:outline hover:outline-fuchsia-500 ${cardHover}`
    },
    {
        icon: ChartLine,
        title: "Sales & revenue tracking",
        style: `bg-rose-500 ${iconCSS}`,
        className: `hover:outline hover:outline-rose-500 ${cardHover}`
    },
    {
        icon: ChartPie,
        title: "Shop analytics",
        style: `bg-cyan-500 ${iconCSS}`,
        className: `hover:outline hover:outline-cyan-500 ${cardHover}`
    },
    {
        icon: BellRing,
        title: "Subscriber management",
        style: `bg-orange-500 ${iconCSS}`,
        className: `hover:outline hover:outline-orange-500 ${cardHover}`
    },
    {
        icon: LayoutGrid,
        title: "Categories & featured wines",
        style: `bg-teal-500 ${iconCSS}`,
        className: `hover:outline hover:outline-teal-500 ${cardHover}`
    },
    {
        icon: Truck,
        title: "Delivery options",
        style: `bg-indigo-500 ${iconCSS}`,
        className: `hover:outline hover:outline-indigo-500 ${cardHover}`
    },
    {
        icon: BottleWine,
        title: "Producer pages",
        style: `bg-purple-500 ${iconCSS}`,
        className: `hover:outline hover:outline-purple-500 ${cardHover}`
    },
    {
        icon: MessageCircle,
        title: "Built-in messaging",
        style: `bg-sky-500 ${iconCSS}`,
        className: `hover:outline hover:outline-sky-500 ${cardHover}`
    },
    {
        icon: Eye,
        title: "Flexible visibility",
        style: `bg-slate-500 ${iconCSS}`,
        className: `hover:outline hover:outline-slate-500 ${cardHover}`
    },
    {
        icon: Palette,
        title: "Branding & about page",
        style: `bg-pink-500 ${iconCSS}`,
        className: `hover:outline hover:outline-pink-500 ${cardHover}`
    },
    {
        icon: Handshake,
        title: "Wholesale (B2B)",
        style: `bg-amber-500 ${iconCSS}`,
        className: `hover:outline hover:outline-amber-500 ${cardHover}`
    },
]