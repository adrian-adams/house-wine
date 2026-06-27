import React from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// Types, Lists & Queries
import { ContentUI } from '@/types/ui';
import { wineType, country } from '@/app/[locale]/marketplace/FilterList';
// Components
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

interface CheckboxListUI {
    value: string
    name: string
}

interface CheckboxListProps {
    title?: string
    data: CheckboxListUI[]
}

export default function HWCheckboxList({ title, data }: CheckboxListProps) {
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
                    />
                    <Label htmlFor={item.value} className="font-normal">
                        {item.name}
                    </Label>
                </Field>
            ))}
        </FieldGroup>
    )
}

