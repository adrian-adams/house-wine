import { getAllProducts } from '@/lib/queries/products';
import { mapProduct, SearchParams } from '@/types/ui';
// Components
import HWProductGrid from '@/components/marketplace/HWProductGrid';
import HWNoResults from '@/components/marketplace/HWNoResults';

export default async function page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    // const t = await getTranslations('marketplace');
    // const orderFiltersArr = t.raw('orderFilter') as { name: string, value: string }[];
    // const availabilityArr = t.raw('sidebarFilter.availability') as { name: string, value: string }[];

    const { search, sort, country, type, size, soldOut } = await searchParams;
    const raw = await getAllProducts({ search, sort, country, type, size, soldOut });
    const products = raw.map(mapProduct);
    const allProducts = await getAllProducts({});

    return (
        <div className="marketplace">
            <div className="bg-neutral-200 p-8 space-y-2">
                <p>
                    {allProducts.length !== products.length && (
                        <span className="text-neutral-700">
                            {products.length} of
                        </span>
                    )} {allProducts.length} wines
                </p>
                {products.length === 0 ? (
                    <HWNoResults search={search} />
                ) : (
                    <HWProductGrid data={products} />
                )}
            </div>
        </div>
    )
}
