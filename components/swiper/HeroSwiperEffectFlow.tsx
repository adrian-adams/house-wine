'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import ProductCard from '../cards/products/ProductCard';
import ProductFooterHero from '../cards/products/ProductFooter_Hero';
import { ProductCardUI } from '@/types/product-card';

interface ProductCardMap {
  slides: ProductCardUI[]
}

export default function HeroSwiperEffectFlow({ slides }: { slides: any[] }) {

  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow]}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1}
      breakpoints={{
        599: {
          slidesPerView: 3,
        }
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 1,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      loop={slides.length > 3}
      autoplay={{ delay: 3000 }}
      pagination={false}
      className="mySwiper"
    >
      {slides.map((slide: any) => (
        <SwiperSlide key={slide._id}>
          <ProductCard
            imageUrl={slide.images[0]}
            title={slide.name}
            producer={slide.producer}
            vintageYear={slide.vintage}
            quantity={null}
            className="h-75 md:h-95 overflow-hidden"
          >
            <ProductFooterHero
              title={slide.name}
              producer={slide.producer}
              vintageYear={slide.vintage}
              quantity={null}
            />
          </ProductCard>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}