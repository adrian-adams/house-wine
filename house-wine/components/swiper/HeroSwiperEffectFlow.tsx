'use client'

import React from 'react';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
// Components
import HWProductCard, { HWHeroFooter } from '../cards/HWProductCard';

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
          <HWProductCard
            variant="Hero"
            src={slide.images[0]}
            alt={slide.title}
            availability
            footer={
              <HWHeroFooter
                name={slide.name}
                producer={slide.producer}
                vintage={slide.vintage}
                quantity={5}
              />
            }
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}