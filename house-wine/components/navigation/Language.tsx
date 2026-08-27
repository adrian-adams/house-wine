"use client"

import React from 'react'
// Next Intl
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
// Nextjs
import Image from 'next/image'
// Components
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    HW_SelectTrigger,
} from "@/components/ui/select"
import LanguageSVG from '@/components/svgs/LanguageSVG'

interface LanguageArr {
    name: string
    value: string
    icon: string
}

const languages: LanguageArr[] = [
    { name: 'Nederlands', value: 'nl', icon: '/navigation/language/netherlands-flag.svg' },
    { name: 'English', value: 'en', icon: '/navigation/language/uk-flag.svg' }
]

export default function Language() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleChange = (locale: string) => {
        router.replace(pathname, { locale })
    }

    return (
        <span className="relative flex flex-row items-center justify-center gap-1 hover:bg-gray-600/20 rounded-2xl px-3 py-1 cursor-pointer outline-2 outline-neutral-500">
            <Select onValueChange={handleChange}>
                <HW_SelectTrigger className="space-x-2 " >
                    <LanguageSVG />
                    <span className="text-sm uppercase">{locale}</span>
                    {languages.filter(i => i.value === locale).map((lng) => (
                        <span key={lng.name}>
                            {lng.icon &&
                                <Image
                                    src={lng.icon}
                                    alt={lng.name ?? "House Wine Languages"}
                                    width={18}
                                    height={18}
                                    className="object-contain ms-1"
                                />
                            }
                        </span>
                    ))}
                </HW_SelectTrigger>
                <SelectContent className="z-999" position='popper' sideOffset={5} align="start">
                    <SelectGroup>
                        {languages?.map((lng, index) => (
                            <SelectItem
                                key={index}
                                value={lng.value}
                                className={`${lng.value === locale && 'font-bold'} relative`}
                            >
                                <span>{lng.name}</span>
                                {lng.icon &&
                                    <Image
                                        src={lng.icon}
                                        alt={lng.name ?? "House Wine Languages"}
                                        width={18}
                                        height={18}
                                        className="object-contain absolute right-2"
                                    />
                                }
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </span>
    )
}
