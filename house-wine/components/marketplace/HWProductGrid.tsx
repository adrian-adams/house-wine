"use client"

// Types, Motion, Zustand
import HWProductCard from '../cards/HWProductCard'
import HWMarketplaceFooter from '../cards/footers/marketplace_Footer'
import { ProductUI } from '@/types/ui'
import { motion, Variants } from 'motion/react'
import { useCartStore } from '@/lib/zustand/cart'
// Components
import StoreCart from './HWCartComp'
import CartForm from './HWCartForm'
import {
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Badge } from '../ui/badge'
import HWDrawerHeader from './HWDrawerHeader'
// Lucide
import { ShoppingCart } from 'lucide-react';

interface ProductGridProps {
    data: ProductUI[]
}

const gridVariants: Variants = {
    hidden: { opacity: 0 },
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
    const drawerToggle = useCartStore((state) => state.drawerToggle);
    const items = useCartStore((state) => state.items);
    const isCart = useCartStore((state) => state.isCart)

    return (
        <div className="relative">
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
                            slug={product.slug}
                            footer={
                                <HWMarketplaceFooter
                                    name={product.name}
                                    producer={product.producer}
                                    vintage={product.vintage}
                                    price={product.price}
                                    availability={product.availability}
                                    imageUrl={product.imageUrl}
                                    slug={product.slug}
                                    quantity={product.quantity}
                                />
                            }
                        />
                    </motion.li>
                ))}
            </motion.ul>
            <>
                <Badge className="fixed bottom-22 right-11 z-30">
                    {items.length}
                </Badge>
                <DrawerTrigger
                    className="group fixed bottom-10 right-10 bg-neutral-800 hover:bg-white active:scale-70 p-4 rounded-full cursor-pointer border-4 border-neutral-500 transition ease-in"
                    onClick={drawerToggle}
                >
                    <ShoppingCart className="stroke-white group-hover:stroke-neutral-800" />
                </DrawerTrigger>
            </>
            <DrawerContent className=" space-y-4 overflow-y-scroll overflow-x-hidden">
                <HWDrawerHeader />
                {isCart ? <StoreCart /> : <CartForm />}
            </DrawerContent>
        </div>
    )
}
