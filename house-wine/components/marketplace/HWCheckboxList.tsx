import React from 'react'
// Types, Lists & Queries
import { SideBarFilterProps } from '@/types/ui';
// Components
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldGroup,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

export default function HWCheckboxList({ title, data, onCheckedChange }: SideBarFilterProps) {
    return (
        <FieldGroup className="gap-2">
            {title && (
                <Label>
                    <h3>
                        {title}
                    </h3>
                </Label>
            )}
            {data?.slice().sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
                <Field key={item.value} orientation="horizontal" >
                    <Checkbox
                        id={item.value}
                        name={item.name}
                        onCheckedChange={(checked) => onCheckedChange?.(item.value, checked === true)}
                    />
                    <Label htmlFor={item.value} className="font-normal">
                        {item.name}
                    </Label>
                </Field>
            ))}
        </FieldGroup>
    )
}

