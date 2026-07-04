"use client"

import React from 'react'
// Types
import { SearchParams } from '@/types/ui'
// Motion
import { motion } from 'motion/react'

export default function HWNoResults({ search }: SearchParams) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center w-full"
        >
            <div className="bg-white p-16 rounded-xl space-y-4">
                <p className="text-lg font-medium">No wines found</p>
                {search && (
                    <p className="text-neutral-800">
                        No results for "<u>{search}</u>" — try a different search or clear your filters.
                    </p>
                )}
            </div>
        </motion.div>
    )
}
