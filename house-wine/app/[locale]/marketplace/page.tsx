import { getAllProducts } from '@/lib/queries/products';
import { mapProduct, SearchParams } from '@/types/ui';
import { getTranslations } from 'next-intl/server';
// Components
import HWProductGrid from '@/components/marketplace/HWProductGrid';
import HWNoResults from '@/components/marketplace/HWNoResults';

export default async function page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const t = await getTranslations('marketplace');
    const { search, sort, country, type, size, soldOut } = await searchParams;
    const raw = await getAllProducts({ search, sort, country, type, size, soldOut });
    const products = raw.map(mapProduct);
    const allProducts = await getAllProducts({});

    return (
        <div className="bg-neutral-200 p-8 space-y-2">
            <p>
                {allProducts.length !== products.length && (
                    <span className="text-neutral-700">
                        {products.length} {t('preWineQty')}
                    </span>
                )} {allProducts.length} {t('wineQty')}
            </p>
            {products.length === 0 ? (
                <HWNoResults search={search} />
            ) : (
                <HWProductGrid data={products} />
            )}
        </div>
    )
}
