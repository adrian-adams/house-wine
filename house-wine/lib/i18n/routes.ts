import type { RichTranslationValues } from 'next-intl';

export type TFunction = {
    rich: (key: any, values?: RichTranslationValues) => React.ReactNode;
};

export const enRoutes = {
    nav: {
        root: () => 'nav' as string,
        siteMenu: () => 'siteMenu'
    },
    footer: {
        root: () => 'footer' as string,
        desc: () => 'desc' as string,
        disclaimer: () => 'disclaimer' as string,
        quickLinks: {
            title: () => 'quickLinks.title' as string
        }
    }
}