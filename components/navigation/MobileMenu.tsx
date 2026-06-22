"use client"

import React, { useState } from 'react'
// Motion
import { AnimatePresence, motion } from "motion/react"
// Components
import BurgerMenu from '../svgs/BurgerMenu';
import { Button } from '../ui/button';
import { SiteMenu, UserMenu } from './NavLinksRender'
import Language from './Language';

interface MobileMenuTriggerUI {
    onClick: () => void
}

function MobileMenuTrigger({ onClick }: MobileMenuTriggerUI) {
    return (
        <Button size="lg" onClick={onClick} className="md:hidden bg-transparent border-2 border-black">
            <BurgerMenu />
        </Button>
    )
}

export default function MobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <>
            <MobileMenuTrigger onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={`${isMenuOpen ? 'flex flex-col items-center justify-center gap-4' : 'hidden'} w-full absolute top-18 p-4 backdrop-blur-3xl z-10`}
                        initial={{ opacity: 0, x: '-100px' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: '-100' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <ul className="flex flex-col items-center justify-center gap-4">
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