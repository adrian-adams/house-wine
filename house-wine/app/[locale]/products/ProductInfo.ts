import { ProductUI } from "@/types/ui";

export interface ProductInfoRow {
    title: string
    desc: string | number
    style?: string
}

export function getProductInfo( product: ProductUI, wineDetails: (key: string) => string  ): ProductInfoRow[] {
    return [
        { title: wineDetails('country'), desc: product.country ?? '' },
        { title: wineDetails('region'), desc: product.region ?? '' },
        { title: wineDetails('vineyard'), desc: product.vineyard ?? '' },
        { title: wineDetails('classification'), desc: product.classification ?? '' },
        { title: wineDetails('vintage'), desc: product.vintage ?? '' },
        { title: wineDetails('wineType'), desc: product.wineType ?? '', style: 'capitalize' },
        { title: wineDetails('grapes'), desc: product.grapes ?? '' },
        { title: wineDetails('bottleSize'), desc: product.bottleSize ?? '' },
        { title: wineDetails('alcohol'), desc: product.alcohol ?? '', style: "after:content-['°']"  },
        { title: wineDetails('servingTemp'), desc: product.servingTemp ?? '' },
        { title: wineDetails('drinkingWindow'), desc: product.drinkingWindow ?? '' },
        { title: wineDetails('packaging'), desc: product.packaging ?? '' },
        { title: wineDetails('fillLevel'), desc: product.fillLevel ?? '' },
    ].filter((row) => row.desc !== '');
}