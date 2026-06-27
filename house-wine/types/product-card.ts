import { BaseComponentsUI } from "./ui";

export interface ProductCardUI extends BaseComponentsUI {
    title: string
    producer?: string
    vintageYear?: number
    price?: number
    quantity?: number | null
    imageUrl?: string
    images?: string
}