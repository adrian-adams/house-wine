"use client"

import React from 'react'
import { ContentUI } from "@/types/ui"
import InfoCardsFeatures from '../cards/InfoCards_Features'
import { motion, Variants } from 'motion/react'

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

type HomeListUI = Pick<ContentUI, 'src' | 'title' | 'desc' | 'icon' | 'content'>

interface HWContentListProps {
    data: HomeListUI[]
    title?: string
    desc?: string
}

export default function HWContentList({ data, title, desc }: HWContentListProps) {
    return (
        <motion.ul
            className="hw-grid"
            variants={gridVariants}
            initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.3 }}
        // transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
            {data.map((item, index) => (
                <motion.li
                    key={item.title}
                    variants={cardVariants}
                >
                    <InfoCardsFeatures
                        src={item.src}
                        element="h3"
                        title={title ?? item.title}
                        desc={desc ?? item.desc}
                    />
                </motion.li>
            ))}
        </motion.ul>
    )
}
