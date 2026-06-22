import React from 'react'
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
    id: number
    value: string
}

const languages: LanguageArr[] = [
    { id: 1, value: 'Nerderlands' },
    { id: 2, value: 'English' },
    { id: 3, value: 'Français' },
    { id: 4, value: 'Deutsch' },
    { id: 5, value: 'Dansk' },
]

export default function Language() {
    return (
        <span>
            <Select>
                <HW_SelectTrigger className="w-full border-0 p-0">
                    <SelectValue>
                        <LanguageSVG />
                    </SelectValue>
                </HW_SelectTrigger>
                <SelectContent className="z-999 top-10 right-10">
                    <SelectGroup>
                        {languages?.map((lng) => (
                            <SelectItem
                                key={lng.id}
                                value={lng.value.toLocaleLowerCase()}
                            >
                                {lng.value}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </span>
    )
}
