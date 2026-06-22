import { LucideIcon } from "lucide-react"

export interface BaseComponentsUI {
    className?: string | null
    _id?: string
    id?: string
    children?: React.ReactNode
}

// Generic Content Props
export interface ContentUI extends BaseComponentsUI {
    title?: string
    element?: React.ElementType
    alt?: string
    desc?: string
    src?: string
    name?: string
    href?: string
    style?: string
    icon?: LucideIcon
    iconStyles?: string
    iconSize?: string
    content?: string
}

// Product related Props
export interface ProductCardUI extends BaseComponentsUI {
    title: string
    producer?: string
    vintageYear?: number
    price?: number
    quantity?: number | null
    imageUrl?: string
}
