"use client"

// il8n
import { useRouter, usePathname } from '@/i18n/routing'
// Nextjs
import { useSearchParams } from 'next/navigation'

export function useFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function updateParam(
        key: string, 
        value: string, 
        checked?: boolean) {
        const params = new URLSearchParams(searchParams.toString())

        if (checked === undefined) {
            handleSelect(params, key, value)
        } else {
            handleCheckbox(params, key, value, checked)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    function handleSelect(
        params: URLSearchParams, 
        key: string, 
        value: string) {
        if (value && value !== 'all') {
            params.set(key, value)
        } else {
            params.delete(key)
        }
    }

    function handleCheckbox(
        params: URLSearchParams, 
        key: string, 
        value: string, 
        checked: boolean) {
        const existing = params.getAll(key)
        if (checked) {
            if (!existing.includes(value)) params.append(key, value)
        } else {
            const updated = existing.filter(v => v !== value)
            params.delete(key)
            updated.forEach(v => params.append(key, v))
        }
    }

    return { updateParam }
}
