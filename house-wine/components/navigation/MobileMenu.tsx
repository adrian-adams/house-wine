"use client"

import React, { useState, useEffect } from 'react'
// Nextjs
import { useCleanPathname } from '@/hooks/useCleanPathName';
// Motion
import { AnimatePresence, motion, Variants } from "motion/react"
// Components
import BurgerMenu from '../svgs/BurgerMenu';
import { Button } from '../ui/button';
import { SiteMenu, UserMenu } from './NavLinksRender'
import Language from './Language';

const container: Variants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            ease: 'easeInOut',
            duration: 0.5
        }
    }
}

function MobileMenuTrigger({ onClick }: { onClick: () => void }) {
    return (
        <Button size="lg" onClick={onClick} className="md:hidden border-2 border-black bg-white/80">
            <BurgerMenu color="black" />
        </Button>
    )
}

export default function MobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const screenWidth = window.innerWidth;
    const { rawPathname } = useCleanPathname();

    useEffect(() => {
        setIsMenuOpen(false)
    }, [rawPathname]);

    useEffect(() => {
        if (!isMenuOpen) {
            return
        }

        function handleResize() {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    return (
        <>
            <MobileMenuTrigger onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="w-full h-screen absolute top-2/2 left-1/2 -translate-x-1/2 px-4 pt-20 backdrop-blur-3xl bg-white rounded-b-2xl border-b-6 border-neutral-700 z-999 flex flex-col items-center justify-start gap-4"
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                    >
                        <ul className="w-full flex flex-col items-center justify-center gap-4">
                            <SiteMenu />
                        </ul>
                        <Language />
                        <ul className="flex flex-col items-center justify-center gap-4">
                            <UserMenu />
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}