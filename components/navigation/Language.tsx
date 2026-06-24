"use client"

import React from 'react'
// Next Intl
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
// Components
import LanguageSVG from '../svgs/LanguageSVG'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    HW_SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface LanguageArr {
    name: string
    value: string
}

const languages: LanguageArr[] = [
    { name: 'Nederlands', value: 'nl' },
    { name: 'English', value: 'en' },
]

export default function Language() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleChange = (locale: string) => {
        router.replace(pathname, { locale })
    }

    return (
        <span className="relative flex flex-row items-center justify-center gap-1 hover:bg-gray-600/20 rounded-2xl px-3 py-1.5 cursor-pointer">
            <Select onValueChange={handleChange}>
                <HW_SelectTrigger className="h-8 w-8" >
                    {/* <SelectValue /> */}
                </HW_SelectTrigger>
                <SelectContent className="z-999" position='popper' sideOffset={5} align="start">
                    <SelectGroup>
                        {languages?.map((lng, index) => (
                            <SelectItem
                                key={index}
                                value={lng.value}
                                className={`${lng.value === locale ? 'font-bold' : ''}`}
                            >
                                {lng.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <span className="text-sm uppercase">{locale}</span>
        </span>
    )
}
