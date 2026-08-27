"use client"

// Next-Intl
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

export default function AppSidebar() {
    const t = useTranslations('marketplace');
    const availabilityArr = t.raw('sidebarFilter.availability') as { name: string, value: string }[];
    const { updateParam } = useFilters()

    return (
        <Sidebar className="marketplace">
            <SidebarHeader className="flex flex-row items-center justify-between">
                <h2>{t('sidebarFilter.title')}</h2>
                <SidebarTrigger className="block md:hidden" />
            </SidebarHeader>
            <SidebarContent className="px-6">
                <SidebarGroup>
                    <HWCheckboxList
                        data={availabilityArr}
                        onCheckedChange={(val, checked) => updateParam('soldOut', checked ? 'true' : '', undefined)}
                    />
                </SidebarGroup>
                <SidebarGroup>
                    <HWCheckboxList
                        data={wineTypeArr}
                        title={t('sidebarFilter.wineType.title')}
                        onCheckedChange={(val, checked) => updateParam('type', val, checked)}
                    />
                </SidebarGroup>
                <SidebarGroup>
                    <HWSelectFilter
                        data={bottleSizeArr}
                        defaultValue={bottleSizeArr[0].value}
                        label={t('sidebarFilter.bottleSize.title')}
                        onValueChange={val => updateParam('size', val)}
                    />
                </SidebarGroup>
                <SidebarGroup>
                    <HWCheckboxList
                        data={countryListArr}
                        title={t('sidebarFilter.country.title')}
                        onCheckedChange={(val, checked) => updateParam('country', val, checked)}
                    />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
