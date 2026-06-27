import React from 'react'
// Types
import { ContentUI } from '@/types/ui';
// Components
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
// Lucide
import { Search } from "lucide-react"

interface SearchBarUI extends ContentUI {
    placeholder: string,
    value: string
    onChange: React.ReactEventHandler<HTMLInputElement>
}

export default function SearchBar({ placeholder, value, onChange, id }: SearchBarUI) {
    return (
        <InputGroup className="flex-5">
            <InputGroupInput
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                id={id}
            />
            <InputGroupAddon align="inline-end">
                <Search />
            </InputGroupAddon>
        </InputGroup>
    )
}
