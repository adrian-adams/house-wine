'use client'

import React, { useRef } from 'react'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// Components
import HWProductCard, { HWNewArrivalsFooter, HWHeroFooter } from '../cards/HWProductCard';
import { Button } from '../ui/button';
// Lucide
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function SwiperSlidesPerView({ slides }: { slides: any[] }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const iconSize: number = 20;

    return (
        <div className="relative">
            <div className="absolute top-35 w-full z-10">
                <div className="w-full px-[clamp(0rem,5vw,2.5rem)] flex flex-row justify-between items-center">
                    <Button variant="hw_swiper" ref={prevRef}><ChevronLeft size={iconSize} /></Button>
                    <Button variant="hw_swiper" ref={nextRef}><ChevronRight size={iconSize} /></Button>
                </div>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    640: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 5
                    },
                }}
                // pagination={{ clickable: true }}
                navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                // navigation={true}
                onSwiper={(swiper) => {
                    if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                        swiper.params.navigation.prevEl = prevRef.current
                        swiper.params.navigation.nextEl = nextRef.current
                        swiper.navigation.init()
                        swiper.navigation.update()
                    }
                }}
                modules={[Navigation]}
                className="mySwiper w-8/12 md:w-11/12 mx-auto"
                id="newArrivalsSwiper"
            >
                {slides.map((slide: any) => (
                    <SwiperSlide key={slide._id}>
                        <HWProductCard
                            src={slide.images?.[0]}
                            alt={slide.name}
                            variant='New Arrivals'
                            footer={
                                <HWNewArrivalsFooter
                                    quantity={5}
                                    title={slide.name}
                                    producer={slide.producer}
                                    year={slide.vintage}
                                    price={slide.price}
                                />
                            }
                        >
                        </HWProductCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
