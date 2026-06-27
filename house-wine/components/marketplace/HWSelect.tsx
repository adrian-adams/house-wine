import React from 'react'
// Types
import { ContentUI } from '@/types/ui'
// Components
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'

interface SelectUI {
    value: string
    name: string
}

interface SelectProps extends ContentUI {
    data: SelectUI[]
    label?: string
}

export default function SelectFilter({ data, title, label }: SelectProps) {
    // const orderFilters = t.raw('orderFilter') as { name: string, value: string }[];

    return (
        <div className="block sm:flex-1">
            <Select defaultValue={title}>
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
