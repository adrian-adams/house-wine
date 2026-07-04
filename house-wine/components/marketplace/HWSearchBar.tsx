"use client"

import React from 'react'
// il8n
import { useRouter, usePathname } from '@/i18n/routing'
// Nextjs
import { useSearchParams } from 'next/navigation'
// Types
import { ContentUI } from '@/types/ui';
// Motion
import { motion } from 'motion/react';
// Components
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from '../ui/spinner';
// Lucide
import { Search } from "lucide-react"

interface SearchBarUI extends ContentUI {
    placeholder: string,
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    loading: boolean
}

export default function HWSearchBar({ placeholder, value, onChange, loading }: SearchBarUI) {
    return (
        <InputGroup className="flex-5">
            {loading && (
                <InputGroupAddon align="inline-start">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <Spinner />
                    </motion.span>
                </InputGroupAddon>
            )}
            <InputGroupInput
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <InputGroupAddon align="inline-end">
                <Search />
            </InputGroupAddon>
        </InputGroup>
    )
}
