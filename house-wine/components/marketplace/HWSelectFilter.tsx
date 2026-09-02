import React from 'react'
// Types
import { SideBarFilterProps } from '@/types/ui'
// Components
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'

interface SelectProps extends SideBarFilterProps {
    label?: string
    value: string
}

export default function HWSelectFilter({ data, value, label, onValueChange, className }: SelectProps) {
    return (
        <div className={`${className}`}>
            <Select value={value} onValueChange={onValueChange}>
                {label && (
                    <Label>
                        <h3>
                            {label}
                        </h3>
                    </Label>
                )}
                <SelectTrigger className="w-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {data.map((item) => (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                            >
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
