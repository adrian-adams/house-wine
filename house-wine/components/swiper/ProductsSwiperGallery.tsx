"use client"

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Components
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import { ProductUI } from '@/types/ui';

type SwiperProps = Pick<ProductUI, 'images' | 'name'>

export default function GallerySwiper({ images, name }: SwiperProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    return (
        <div className="relative">
            <Swiper
                // CSS custom properties typed via React.CSSProperties cast to avoid TS error
                style={{
                    ['--swiper-navigation-color']: '#000',
                    ['--swiper-pagination-color']: '#000',
                } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 h-64 relative w-full"
            >
                {images?.map((src, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={src}
                            alt={name ?? "House Wine"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            // width="100"
                            // height="100"
                            className="object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={2}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-10"
            >
                {images?.map((src, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={src}
                            alt={name ?? "House Wine"}
                            width="75"
                            height="175"
                            className="object-cover aspect-square m-0 hover:scale-95 transition-all ease-in duration-120"
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

