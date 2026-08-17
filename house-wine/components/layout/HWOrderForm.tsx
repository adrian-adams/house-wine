"use client"

import React, { useState } from 'react'
// Lists, Zustand, Types, NextIntl
import {
    ShadcnInputsListeners,
    FormSection_TextProps,
    FormSection_TextAreaProps,
    FormSection_SelectProps,
    FormSection_RadioProps,
    FormSection_CheckboxProps
} from '@/types/ui';
import { cn } from '@/lib/utils';
// Components
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
// Lucide
import { Store } from 'lucide-react';

export function mergeFormData(
    textData: { value: string; label: string }[],
    configData: { value: string; label: string }[],
) {
    const configMap = new Map(configData.map((item) => [item.value, item]));

    return textData.map((t) => ({
        ...configMap.get(t.value),
        value: t.value,
        label: t.label
    }));
}

export function FormSection_Container({ children, legend }: { children: React.ReactNode, legend?: string }) {
    return (
        <FieldSet className={cn(
            '',
            legend && "bg-neutral-300/70 px-4 pb-4 pt-2 border border-neutral-600 rounded-xl"
        )}>
            {legend && (
                <FieldLegend className="bg-black px-4 py-0.5 rounded-xl text-white">
                    {legend}
                </FieldLegend>
            )}
            {children}
        </FieldSet>
    )
}

export function FormSection_Text({ onChange, data, legend, children, errors, className, values }: FormSection_TextProps) {
    return (
        <FormSection_Container legend={legend}>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {data.map((field) => (
                    <Field key={field.value} className={`col-span-4 ${field.className} ${errors && "h-18"}`}>
                        <Label htmlFor={field.value} className={`${className}`}>
                            {field.label}
                        </Label>
                        <Input
                            id={field.value}
                            name={field.value}
                            value={values?.[field.value] ?? field.value ?? ""}
                            type={field.inputType}
                            placeholder={field.placeholder}
                            onChange={onChange}
                            required={field.required}
                            aria-invalid={!!errors?.[field.value]}
                        />
                        {errors?.[field.value] && (
                            <p className="text-red-600 text-xs mt-1">{errors[field.value]}</p>
                        )}
                    </Field>
                ))}
                {children}
            </FieldGroup>
        </FormSection_Container>
    )
}

export function FormSection_Select({ data, placeholder, onValueChange, label, inputName, className, value, inputRequired, errors }: FormSection_SelectProps) {
    return (
        <FieldSet className={`${className}`}>
            <FieldLabel>
                {label}
            </FieldLabel>
            <Select
                value={value}
                name={inputName}
                onValueChange={onValueChange}
                required={inputRequired}
                aria-invalid={!!errors?.value}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="z-999">
                    <SelectGroup>
                        {data.sort((a, b) => a.label.localeCompare(b.label)).map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errors?.[inputName ?? ""] && (
                <p className="text-red-600 text-xs">{errors[inputName ?? ""]}</p>
            )}
        </FieldSet>
    )
}

export function FormSection_Radio({ data, onValueChange, defaultValue, radioOption, legend, label }: FormSection_RadioProps) {
    return (
        <FormSection_Container legend={legend}>
            <FieldLabel>
                {label}
            </FieldLabel>
            <FieldGroup>
                <RadioGroup
                    className="space-y-2"
                    onValueChange={onValueChange}
                    value={radioOption}
                    defaultValue={defaultValue}
                >
                    {data.map((radio) => (
                        <div key={radio.value} className="flex flex-row items-center gap-2">
                            <RadioGroupItem
                                value={radio.value}
                                id={radio.value}
                            />
                            <Label htmlFor={radio.value}>
                                {radio.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </FieldGroup>
        </FormSection_Container>
    )
}

export function FormSection_TextArea({ onAreaChange, legend, label, inputName, value, placeholder, inputRequired }: FormSection_TextAreaProps) {
    return (
        <FormSection_Container legend={legend}>
            <FieldLabel>
                {label}
            </FieldLabel>
            <FieldGroup>
                <InputGroupTextarea
                    name={inputName}
                    className='border border-neutral-600 rounded-xl'
                    placeholder={placeholder}
                    onChange={onAreaChange}
                    value={value}
                    required={inputRequired}
                />
            </FieldGroup>
        </FormSection_Container>
    )
}

export function FormSection_Checkbox({ onCheckedChange, checked, legend, data, errors }: FormSection_CheckboxProps) {
    return (
        <FormSection_Container legend={legend}>
            {data.map((field) => (
                <FieldGroup key={field.value} className="flex flex-row items-center gap-2">
                    <Checkbox
                        id={field.value}
                        name={field.value}
                        value={field.value}
                        checked={checked}
                        onCheckedChange={onCheckedChange}
                    />
                    <Label htmlFor={field.value} className="leading-normal">{field.label}</Label>
                    {errors?.[field.value] && (
                        <p className="text-red-600 text-xs">{errors[field.value ?? ""]}</p>
                    )}
                </FieldGroup>
            ))}
        </FormSection_Container >
    )
}

export function StoreDisclaimer({ label, desc }: { label: string, desc: string }) {
    return (
        <div className="flex flex-row items-start justify-start bg-neutral-400/40 p-3 rounded-xl outline outline-neutral-600">
            <div className="flex items-start">
                <Store className="size-4.5 text-neutral-900" />
            </div>
            <div className="space-y-1.5 px-2">
                <h4 className="text-[clamp(0.75rem,5vw,0.85rem)] font-ibm-plex-sans font-semibold">{label}</h4>
                <p className="text-[clamp(0.65rem,5vw,0.75rem)] text-neutral-900">
                    {desc}
                </p>
            </div>
        </div>
    )
}
