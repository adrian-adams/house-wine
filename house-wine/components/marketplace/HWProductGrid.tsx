"use client"

// Types
import HWProductCard, { HWMarketplaceFooter } from '../cards/HWProductCard'
import { ProductUI } from '@/types/ui'
// Motion
import { motion, Variants } from 'motion/react'

interface ProductGridProps {
    data: ProductUI[]
}

const gridVariants: Variants = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1,
        }
    }
}

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
}

export default function HWProductGrid({ data }: ProductGridProps) {

    return (
        <motion.ul
            className="hw-product-grid"
            variants={gridVariants}
            initial="hidden"
            animate="show"
        >
            {data.map((product) => (
                <motion.li
                    key={product.id}
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                >
                    <HWProductCard
                        variant="Marketplace"
                        src={product.imageUrl ?? ""}
                        alt={product.name ?? "House Wine"}
                        promoTag={product.promoTag}
                        availability={product.availability}
                        quantity={product.quantity}
                        footer={
                            <HWMarketplaceFooter
                                name={product.name}
                                producer={product.producer}
                                vintage={product.vintage}
                                price={product.price}
                            />
                        }
                    />
                </motion.li>
            ))}
        </motion.ul>
    )
}
