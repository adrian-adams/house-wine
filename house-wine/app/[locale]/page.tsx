// NextJS
import Link from 'next/link';
// Motion
import { newArrivalsTitleVar, newArrivalsBtnVar } from './home/MotionVariants';
// il8n
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
// Queries & Types
import { getProductsByTag } from "@/lib/queries/products";
// Content Lists
import { perks, powerfulFeatures } from "./home/HomeLists";
// Components
import Hero from '@/components/hero/Hero'
import { Button } from "@/components/ui/button"
import SwiperSlidesPerView from "@/components/swiper/SwiperSlidesPerView";
import { HWMotionContainer, HWMotionItem } from '@/components/layout/HWMotionBox';
// Lucide
import InfoCardsFeatures from "@/components/cards/InfoCards_Features";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function Home() {
  const t = await getTranslations('home');
  const [newArrivals] = await Promise.all([
    getProductsByTag("newArrivals", "promoTag")
  ]);

  return (
    <div className="home">
      <div>
        {/* HERO */}
        <Hero />
        {/* PERKS */}
        <section className="w-full border-b border-hw-pinch-pepper bg-white">
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
            <HWMotionContainer
              as='div'
              variants={newArrivalsTitleVar}
              className="w-full md:space-y-2"
            >
              <h2>{t('newArrivals.title')}</h2>
              <p className="text-hw-dead-sea-mud">{t('newArrivals.desc')}</p>
            </HWMotionContainer>
            <HWMotionContainer as='div' variants={newArrivalsBtnVar}>
              <Link href="/marketplace">
                <Button variant="hw_secondary">
                  {t('newArrivals.marketplaceBtn')}
                </Button>
              </Link>
            </HWMotionContainer>
          </div>
          <HWMotionContainer as='div' className="container mx-auto">
            <SwiperSlidesPerView slides={newArrivals} />
          </HWMotionContainer>
        </div>
      </section>

      {/* AI-Powered Analysis */}

      {/* Powerful Features */}
      <section className="bg-white">
        <div>
          <HWMotionContainer as='div' className="hw-text-box-6">
            <h2>{t('powerfulFeatures.title')}</h2>
            <p>{t('powerfulFeatures.desc')}</p>
          </HWMotionContainer>
          <HWMotionContainer as='ul' className='hw-grid'>
            {powerfulFeatures.map((feature, index) => (
              <HWMotionItem key={feature.title} as='li'>
                <InfoCardsFeatures
                  src={feature.src}
                  element="h3"
                  title={t(`powerfulFeatures.cards.${index}.title`)}
                  desc={t(`powerfulFeatures.cards.${index}.desc`)}
                />
              </HWMotionItem>
            ))}
          </HWMotionContainer>
        </div>
      </section>
    </div>
  );
}
