'use client'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// Components
import ProductCard from '../cards/products/ProductCard';
import ProductFooterNew from '../cards/products/ProductFooter_New';

export default function SwiperSlidesPerView({ slides }: { slides: any[] }) {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={25}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                // pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                id="newArrivalsSwiper"
            >
                {slides.map((slide: any) => (
                    <SwiperSlide key={slide._id}>
                        <ProductCard
                            imageUrl={slide.images[0]}
                            title={slide.name}
                            className="h-85"
                        >
                            <ProductFooterNew
                                title={slide.name}
                                producer={slide.producer}
                                vintageYear={slide.vintage}
                                price={slide.price}
                            />
                        </ProductCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
