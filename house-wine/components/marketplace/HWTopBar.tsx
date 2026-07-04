"use client"

import React, { useState, useEffect } from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// Types, Lists, Queries & Parameters
import { HWTopBarProps } from '@/types/ui';
import { useFilters } from '@/hooks/useFilters';
// Components
import HWSearchBar from './HWSearchBar'
import HWSelectFilter from './HWSelectFilter'

export default function HWTopBar({
}: HWTopBarProps) {
    const t = useTranslations('marketplace');
    const orderFiltersArr = t.raw('orderFilter') as { name: string, value: string }[];
    const { updateParam } = useFilters()

    const [localSearch, setLocalSearch] = useState('');
    const [searchLoad, setSearchLoad] = useState<boolean>(false);

    useEffect(() => {
        if (!localSearch) {
            updateParam('search', localSearch);
            setSearchLoad(false);
            return;
        }

        setSearchLoad(true);

        const timeout = setTimeout(() => {
            updateParam('search', localSearch);
            setSearchLoad(false);
        }, 400);

        return () => clearTimeout(timeout);

    }, [localSearch]);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <HWSearchBar
                    placeholder={t('searchPlaceholder.placeholder')}
                    value={localSearch}
                    onChange={e => setLocalSearch(e.target.value)}
                    loading={searchLoad}
                />
                <HWSelectFilter
                    data={orderFiltersArr}
                    defaultValue={orderFiltersArr[0].value}
                    onValueChange={val => updateParam('sort', val)}
                />
            </div>
        </>
    )
}
