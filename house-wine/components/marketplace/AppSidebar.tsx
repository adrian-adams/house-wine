"use client"

// Next-Intl & NextJS
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl';
// Types, Lists, Queries & Parameters
import { useFilters } from '@/hooks/useFilters';
import { wineTypeArr, countryListArr, bottleSizeArr } from '@/app/[locale]/marketplace/FilterList';
// Components
import HWCheckboxList from './HWCheckboxList'
import HWSelectFilter from './HWSelectFilter'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from '../ui/button';

export default function AppSidebar() {
    const t = useTranslations('marketplace');
    const availabilityArr = t.raw('sidebarFilter.availability') as { name: string, value: string }[];
    const { updateParam, clearFilters } = useFilters();
    const searchParams = useSearchParams();

    return (
        <Sidebar className="marketplace">
            <SidebarHeader className="flex flex-row items-center justify-between">
                <h2>{t('sidebarFilter.title')}</h2>
                <div className="flex flex-row items-center justify-between gap-2">
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="w-fit py-0"
                    >
                        {t('sidebarFilter.clearFilters')}
                    </Button>
                    <SidebarTrigger className="block md:hidden" />
                </div>
            </SidebarHeader>
            <SidebarContent className="px-6">
                <SidebarGroup>
                    <HWCheckboxList
                        data={availabilityArr}
                        isChecked={(val) => searchParams.get('soldOut') === val}
                        onCheckedChange={(val, checked) => updateParam('soldOut', checked ? 'true' : '', undefined)}
                    />
                </SidebarGroup>
                <SidebarGroup>
                    <HWCheckboxList
                        data={wineTypeArr}
                        title={t('sidebarFilter.wineType.title')}
                        isChecked={(val) => searchParams.getAll('type').includes(val)}
                        onCheckedChange={(val, checked) => updateParam('type', val, checked)}
                    />
                </SidebarGroup>
                <SidebarGroup>
                    <HWSelectFilter
                        data={bottleSizeArr}
                        value={searchParams.get('size') ?? bottleSizeArr[0].value}
                        label={t('sidebarFilter.bottleSize.title')}
                        onValueChange={val => updateParam('size', val)}
                    />
                </SidebarGroup>
                <SidebarGroup>
                    <HWCheckboxList
                        data={countryListArr}
                        title={t('sidebarFilter.country.title')}
                        isChecked={(val) => searchParams.getAll('country').includes(val)}
                        onCheckedChange={(val, checked) => updateParam('country', val, checked)}
                    />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
