// il8n
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
// Queries & Types
import { getAllProducts } from "@/lib/queries/products";
import { getProductsByTag } from "@/lib/queries/products";
import { getAllStores, getStoresWithProducts } from "@/lib/queries/stores";
import { getFeaturesByTag } from "@/lib/queries/features";
// Content Lists
import { perks, powerfulFeatures } from "./home/HomeLists";
// Components
import Hero from '@/components/hero/Hero'
import { Button } from "@/components/ui/button"
import SwiperSlidesPerView from "@/components/swiper/SwiperSlidesPerView";
// Lucide
import InfoCardsFeatures from "@/components/cards/InfoCards_Features";
import FeaturedShopCards from "@/components/cards/stores/FeaturedShopCards";
import { ShopUI } from "@/components/cards/stores/FeaturedShopCards";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function Home() {
  const t = await getTranslations('home');
  const [newArrivals, features, stores] = await Promise.all([
    getProductsByTag("newArrivals", "promoTag"),
    getFeaturesByTag("powerfulFeatures", "section"),
    getAllStores()
  ]);

  return (
    <>
      <div>
        {/* HERO */}
        <Hero />
        {/* PERKS */}
        <section className="w-full border-b border-hw-pinch-pepper">
          <ul className="md:w-fit mx-auto grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4">
            {perks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <li key={index} className="relative flex items-center md:justify-center gap-2">
                  {Icon && <Icon size={24} className="text-hw-heritage-park" />}
                  {t(`perks.${index}.desc`)}
                  <span className="hidden md:block ps-10 text-hw-heritage-park">
                    {perk.content}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* NEW ARRIVALS */}
      <section>
        <div className="w-full! container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:space-y-2">
              <h2>{t('newArrivals.title')}</h2>
              <p className="text-hw-dead-sea-mud">{t('newArrivals.desc')}</p>
            </div>
            <div>
              <Button variant="hw_secondary">
                {t('newArrivals.marketplaceBtn')}
              </Button>
            </div>
          </div>
          <div className="container mx-auto">
            <SwiperSlidesPerView slides={newArrivals} />
          </div>
        </div>
      </section>

      {/* AI-Powered Analysis */}

      {/* Powerful Features */}
      <section>
        <div>
          <div className="hw-text-box-6">
            <h2>{t('powerfulFeatures.title')}</h2>
            <p>{t('powerfulFeatures.desc')}</p>
          </div>
          <ul className="hw-grid">
            {powerfulFeatures.map((feature, index) => (
              <li key={index}>
                <InfoCardsFeatures
                  src={feature.src}
                  element="h3"
                  title={t(`powerfulFeatures.cards.${index}.title`)}
                  desc={t(`powerfulFeatures.cards.${index}.desc`)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Shops */}
      <section>
        <div>
          <div className="hw-text-box-6 space-y-4">
            <h2>Featured Shops</h2>
            <p>Discover curated wine collections from our community of wine enthusiasts</p>
          </div>
          <ul className="hw-grid">
            {stores.slice(0, 3).map((store: ShopUI) => (
              <FeaturedShopCards
                key={store._id}
                title={store.title}
                about={store.about}
                imageUrl={store.imageUrl}
                products={store.products}
                slug={store.slug}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
