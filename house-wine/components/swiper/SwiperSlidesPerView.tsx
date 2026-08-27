'use client'

import React, { useRef } from 'react'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ProductApiResponse } from '@/types/ui';
// Components
import HWProductCard, { HWNewArrivalsFooter } from '../cards/HWProductCard';
import { Button } from '../ui/button';
// Lucide
import { ChevronRight, ChevronLeft } from 'lucide-react';


export default function SwiperSlidesPerView({ slides }: { slides: ProductApiResponse[] }) {
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
                navigation={true}
                // navigation={true}
                onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                        swiper.params.navigation.prevEl = prevRef.current
                        swiper.params.navigation.nextEl = nextRef.current
                    }
                }}
                modules={[Navigation]}
                className="mySwiper w-8/12 md:w-11/12 mx-auto"
                id="newArrivalsSwiper"
            >
                {slides.filter(i => (i.price ?? 0) > 0).map((slide) => (
                    <SwiperSlide key={slide._id}>
                        <HWProductCard
                            src={slide.images?.[0] ?? ''}
                            alt={slide.name ?? "New Arrivals"}
                            variant='New Arrivals'
                            footer={
                                <HWNewArrivalsFooter
                                    quantity={5}
                                    name={slide.name}
                                    producer={slide.producer}
                                    vintage={slide.vintage ?? "N/A"}
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
