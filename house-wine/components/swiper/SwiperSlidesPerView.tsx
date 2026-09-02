'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ProductApiResponse } from '@/types/ui';
import HWProductCard, { HWNewArrivalsFooter } from '../cards/HWProductCard';
import { Button } from '../ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function SwiperSlidesPerView({ slides }: { slides: ProductApiResponse[] }) {

    return (
        <div className="relative w-8/12 md:w-12/12 lg:w-11/12 mx-auto">
            <Button
                variant="hw_swiper"
                className="custom-swiper-prev absolute -left-3 top-1/2 -translate-y-1/2 z-20"
            >
                <ChevronLeft />
            </Button>
            <Button
                variant="hw_swiper"
                className="custom-swiper-next absolute -right-3 top-1/2 -translate-y-1/2 z-20"
            >
                <ChevronRight />
            </Button>
            <Swiper
                spaceBetween={10}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                }}
                modules={[Navigation]}
                navigation={{
                    prevEl: '.custom-swiper-prev',
                    nextEl: '.custom-swiper-next',
                }}
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
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}