import { LucideIcon } from "lucide-react"
import { CartState } from '@/lib/zustand/cart';

export interface BaseComponentsUI {
    className?: string | null
    _id?: string
    id?: string
    children?: React.ReactNode
}

export interface ShadcnInputsListeners {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>
    onValueChange?: (value: string) => void
    onCheckedChange?: (checked: boolean) => void
}

export interface FormSection_TextProps extends ShadcnInputsListeners {
    data: {
        value: string
        label: string
        inputType?: React.HTMLInputTypeAttribute
        className?: string
        placeholder?: string
        required?: boolean
    }[]
    values: Record<string, string>
    errors?: Record<string, string>
    className?: string
    legend?: string
    children?: React.ReactNode
}

export interface FormSection_TextAreaProps {
    value: string
    label: string
    onAreaChange: React.ChangeEventHandler<HTMLTextAreaElement>
    inputName?: string
    inputRequired?: boolean
    placeholder?: string
    className?: string
    legend?: string
}

export interface FormSection_SelectProps {
    data: { value: string; label: string }[]
    onValueChange: (value: string) => void
    errors?: Record<string, string>
    label?: string
    inputName?: string
    className?: string
    value?: string
    inputRequired?: boolean
    placeholder?: string
}

export interface FormSection_CheckboxProps {
    data: { value: string; label: string }[]
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    legend?: string
}

export interface FormSection_RadioProps {
    data: { value: string; label: string }[]
    onValueChange: (value: string) => void
    defaultValue?: string
    radioOption: string
    label?: string
    legend?: string
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
    description?: string
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
    alcohol?: string
    servingTemp?: string
    drinkingWindow?: string
    tastingNotes?: string
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

export const mapProduct = (data: ProductApiResponse): ProductUI => ({
    id: data._id ?? "",
    name: data.name ?? "",
    slug: data.slug ?? "",
    description: data.description ?? "",
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
    alcohol: data.alcohol ?? "",
    servingTemp: data.servingTemp ?? "",
    drinkingWindow: data.drinkingWindow ?? "",
    packaging: data.packaging ?? "",
    tastingNotes: data.tastingNotes ?? "",
    fillLevel: data.fillLevel ?? "",
    stores: data.stores ?? [],
    labelCondition: data.labelCondition ?? "",
    promoTag: data.promoTag ?? [],
    images: data.images ?? [],
    imageUrl: data.images?.[0] ?? "",
    availability: data.availability ?? false,
    quantity: data.quantity ?? 0
})

/**************************************/ 
/******** MARKETPLACE FILTERS *********/ 
/**************************************/ 

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

/****************************/ 
/****** PRODUCT PAGES *******/ 
/****************************/ 

export type ProductPageProps = {
    params: Promise<{ slug: string }>
    style?: string
};

/*******************************/ 
/****** MARKETPLACE FORM *******/ 
/*******************************/ 

export type DeliveryMethod = "pickup" | "shipment"

export interface OrderRequestFormState {
    contact: {
        firstName: string;
        lastName: string;
        email: string;
        number: string;
    };
    deliveryChoice: DeliveryMethod
    deliveryAddress: {
        streetNumber: string
        street1: string
        street2?: string
        postalCode: string
        city: string
        country: string
    }
    message: string;
    marketing: boolean;
}

export interface OrderRequestPayload extends OrderRequestFormState {
    items: CartState["items"];
}

/********************************/ 
/****** REGISTRATION FORM *******/ 
/********************************/ 

export interface RegistrationFormState {
    newUser: {
        email: string
        password: string  
    }
    checkbox: boolean
}