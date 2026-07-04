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
    images: string
}

export interface ProductCardProps {
    data: ProductCardUI[]
}

/***********************/ 
/****** PRODUCTS *******/ 
/***********************/ 

export interface StoreRef {
    _id: string
    title: string
    slug: string
}

export type PromoTag = 'homeFeatured' | 'newArrivals'

export interface ProductApiResponse {
    _id?: string
    name?: string
    slug?: string
    producer?: string
    wineType?: string
    vintage?: number
    price?: number
    country?: string
    region?: string
    vineyard?: string
    classification?: string
    grapes?: string
    bottleSize?: string
    packaging?: string
    fillLevel?: string
    stores?: StoreRef[],
    labelCondition?: string
    promoTag?: PromoTag[]
    images?: string[]
    availability?: boolean
    quantity?: number
}

export type ProductUI = Omit<ProductApiResponse, "_id"> & {
    id?: string
    imageUrl?: string
}

// export interface ProductUI {
//     id: string
//     name: string
//     slug: string
//     producer: string
//     wineType: string
//     vintage: number
//     price: number
//     country: string
//     region: string
//     vineyard: string
//     classification: string
//     grapes: string
//     bottleSize: string
//     packaging: string
//     fillLevel: string
//     stores: StoreRef[],
//     labelCondition: string
//     images: string[]
//     imageUrl: string
//     availability: boolean
//     quantity: number
// }

export const mapProduct = (data: ProductApiResponse): ProductUI => ({
    id: data._id ?? "",
    name: data.name ?? "House Wine",
    slug: data.slug ?? "",
    producer: data.producer ?? "",
    wineType: data.wineType ?? "",
    vintage: data.vintage ?? 0,
    price: data.price ?? 0,
    country: data.country ?? "",
    region: data.region ?? "",
    vineyard: data.vineyard ?? "",
    classification: data.classification ?? "",
    grapes: data.grapes ?? "",
    bottleSize: data.bottleSize ?? "",
    packaging: data.packaging ?? "",
    fillLevel: data.fillLevel ?? "",
    stores: data.stores ?? [],
    labelCondition: data.labelCondition ?? "",
    promoTag: data.promoTag,
    images: data.images ?? [],
    imageUrl: data.images?.[0] ?? "",
    availability: data.availability ?? false,
    quantity: data.quantity ?? 0
})

/**************************************/ 
/******** MARKETPLACE FILTERS *********/ 
/**************************************/ 

export interface HWTopBarProps extends BaseComponentsUI {
    // orderFiltersData: SideBarFilterUI[]
    // currentQ: string
    // currentSort: string
    // searchPlaceholder: string
}

export interface AppSidebarProps extends BaseComponentsUI {
    availabilityData: SideBarFilterUI[]
    wineTypeData: SideBarFilterUI[]
    bottleSizeData: SideBarFilterUI[]
    countryData: SideBarFilterUI[]
}

/**************************************/ 
/****** SEARCH PARAMS COMPONENT *******/ 
/**************************************/ 

export interface SearchParams extends BaseComponentsUI {
    search?: string
    sort?: string
    country?: string | string[]
    type?: string | string[]
    size?: string
    soldOut?: string
}

/*********************************/ 
/****** CHECKBOX COMPONENT *******/ 
/*********************************/ 

export interface SideBarFilterUI {
    value: string
    name: string
}

export interface SideBarFilterProps extends ContentUI {
    data: SideBarFilterUI[]
    onValueChange?: (value: string) => void
    onCheckedChange?: (value: string, checked: boolean) => void
}

