import { motion } from "motion/react";
import { Variants } from "motion/react";

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
           ease: "easeInOut",
           duration: 0.1
        }
    }
}