"use client"

import React, { useState } from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
// Types, Lists & Queries
import { wineType, country, bottleSize } from '@/app/[locale]/marketplace/FilterList';
// Components
import HWSearchBar from '@/components/marketplace/HWSearchBar';
import HWSelect from '@/components/marketplace/HWSelect';
import HWCheckboxList from '@/components/marketplace/HWCheckboxList';
import HWProductGrid from '@/components/marketplace/HWProductGrid';

export default function Marketplace(props: any) {
    const t = useTranslations('marketplace');
    const orderFilters = t.raw('orderFilter') as { name: string, value: string }[];
    const availability = t.raw('sidebarFilter.availability') as { name: string, value: string }[];
    const [seacrhQuery, setSearchQuery] = useState<string>("");

    return (
        <div className="marketplace bg-white/80 h-full p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-cente justify-center gap-4 pb-4 border-b border-hw-cigar-smoke">
                <HWSearchBar
                    placeholder={t('searchPlaceholder.placeholder')}
                    value={seacrhQuery}
                    onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                />
                <HWSelect
                    title={orderFilters[0].value}
                    data={orderFilters}
                />
            </div>
            {/* Side Bar Filter */}
            <div className="grid grid-cols-6 gap-4">
                <div className="space-y-6 ">
                    <h2>{t('sidebarFilter.title')}</h2>
                    <HWCheckboxList data={availability} />
                    <HWCheckboxList data={wineType} title={t('sidebarFilter.wineType.title')} />
                    <HWSelect
                        label={t('sidebarFilter.bottleSize.title')}
                        title={bottleSize[0].value}
                        data={bottleSize}
                    />
                    <HWCheckboxList data={country} title={t('sidebarFilter.country.title')} />
                </div>
                <div className="col-span-5 bg-hw-shea">
                    <HWProductGrid data={props} />
                </div>
            </div>
        </div>
    )
}
