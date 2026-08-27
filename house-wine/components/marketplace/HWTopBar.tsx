"use client"

import React, { useState, useEffect } from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// Types, Lists, Queries & Parameters
import { useFilters } from '@/hooks/useFilters';
// Components
import HWSearchBar from './HWSearchBar'
import HWSelectFilter from './HWSelectFilter'
import {
    SidebarTrigger
} from "@/components/ui/sidebar"

export default function HWTopBar() {
    const t = useTranslations('marketplace');
    const orderFiltersArr = t.raw('orderFilter') as { name: string, value: string }[];
    const { updateParam } = useFilters()

    const [localSearch, setLocalSearch] = useState('');

    useEffect(() => {
        if (!localSearch) {
            updateParam('search', localSearch);
            return;
        }

        const timeout = setTimeout(() => {
            updateParam('search', localSearch);
        }, 500);

        return () => clearTimeout(timeout);

    }, [localSearch]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <HWSearchBar
                placeholder={t('searchPlaceholder.placeholder')}
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                className="w-full md:w-9/12"
            />
            <div className="flex flex-row items-center justify-center gap-2 w-full md:w-3/12">
                <SidebarTrigger className="block md:hidden" />
                <HWSelectFilter
                    data={orderFiltersArr}
                    defaultValue={orderFiltersArr[0].value}
                    onValueChange={val => updateParam('sort', val)}
                    className="w-full"
                />
            </div>
        </div>
    )
}
