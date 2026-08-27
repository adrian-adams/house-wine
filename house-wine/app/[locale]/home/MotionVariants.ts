// Motion
import { Variants } from 'motion/react'

export const newArrivalsTitleVar: Variants = {
    hidden: {
        opacity: 0,
        x: -50,
        y: 50
    },
    show: {
        opacity: 1,
        x: 0,
        y: 0
    }
}

export const newArrivalsBtnVar: Variants = {
    hidden: {
        opacity: 0,
        x: 50,
        y: 50
    },
    show: {
        opacity: 1,
        x: 0,
        y: 0
    }
}