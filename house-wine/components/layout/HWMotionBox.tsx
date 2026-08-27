"use client"

import React from 'react'
// Motion
import { motion, Variants } from 'motion/react'

interface HWMotionBoxProps {
    children: React.ReactNode
    variants?: Variants
    className?: string
    as?: 'section' | 'ul' | 'div' | 'li' | 'p'
    vpOnce?: boolean
    vpAmount?: number
}

/*******************************************************/
/********************** CONTAINER **********************/
/*******************************************************/

const defaultContainerVar: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

export function HWMotionContainer({
    children,
    variants = defaultContainerVar,
    className,
    as = 'section',
    vpOnce = true,
    vpAmount
}: HWMotionBoxProps) {
    const MotionTag = motion[as];

    return (
        <MotionTag
            variants={variants}
            initial='hidden'
            whileInView='show'
            viewport={{ once: vpOnce, amount: vpAmount }}
            className={className}
        >
            {children}
        </MotionTag>
    )
}

/**************************************************/
/********************** ITEM **********************/
/**************************************************/

const defaultItemVar: Variants = {
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

export function HWMotionItem({
    children,
    variants = defaultItemVar,
    className,
    as = 'li',
    vpOnce = true,
    vpAmount
}: HWMotionBoxProps) {
    const MotionTag = motion[as];

    return (
        <MotionTag
            variants={variants}
            initial='hidden'
            whileInView='show'
            viewport={{ once: vpOnce, amount: vpAmount }}
            className={className}
        >
            {children}
        </MotionTag>
    )
}


