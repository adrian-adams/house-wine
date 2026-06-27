import React from 'react'
// Types
import HWProductCard, { HWMarketplaceFooter, ProductCardProps } from '../cards/HWProductCard'
import { ProductCardUI } from '@/types/ui'

interface ProductGridProps {
    data: ProductCardUI[]
}

export default function HWProductGrid({ data }: ProductGridProps) {

    return (
        <ul className="hw-grid">
            {data.map((product, index) => (
                <li key={index}>
                    <HWProductCard
                        variant="Marketplace"
                        src={product.images[0]}
                        alt={product.title}
                        footer={
                            <HWMarketplaceFooter
                                title={product.title}
                                producer={product.producer}
                                year={product.vintageYear}
                                quantity={5}
                            />
                        }
                    />
                </li>
            ))}
        </ul>
    )
}
