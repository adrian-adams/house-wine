import React from 'react'
// Next-Intl
import { useTranslations } from 'next-intl';
import { richField, TFunction } from '@/lib/i18n/richField';
// NEXTJS
import Image from 'next/image'
import type { Metadata } from "next";
// Lucide
import { Check } from 'lucide-react';
// Components
import { HWMotionContainer, HWMotionItem } from '@/components/layout/HWMotionBox';

export const metadata: Metadata = {
    title: "About House Wine",
    description: "House Wine allows independent wine collectors, enthusiasts and estates to manage, showcase, and sell their collections with ease.",
};

export default function About() {
    const t = useTranslations('about');

    const EN = {
        root: {
            title: t('title'),
            desc: t('desc')
        },
        initiative: {
            title: t('initiative.title'),
            desc: t('initiative.desc'),
            images: [
                { src: '/about/about-1.webp', alt: 'About House Wine' },
                { src: '/about/about-2.webp', alt: 'House Wine tasting room' },
                { src: '/about/about-3.webp', alt: 'Wine collection display' }
            ] as Record<string, string>[]
        },
        ourMission: {
            title: t('ourMission.title'),
            desc: t('ourMission.desc')
        },
        keyFeatures: {
            title: t('keyFeatures.title'),
            list: t.raw('keyFeatures.list') as {
                desc: string
            }[]
        },
        whoWeServe: {
            title: t('whoWeServe.title'),
            listTitle: t('whoWeServe.listTitle'),
            list: t.raw('whoWeServe.list') as {
                desc: string
            }[]
        },
    }

    const ENlists = {
        keyFeatures: EN.keyFeatures.list,
        whoWeServe: EN.whoWeServe.list,
        initiativeImages: EN.initiative.images
    }

    return (
        <div className="hw-content-block">
            <HWMotionContainer className="space-y-4">
                <h1>{EN.root.title}</h1>
                <p>{EN.root.desc}</p>
            </HWMotionContainer>

            <HWMotionContainer className="hw-section-block">
                <h2>{EN.initiative.title}</h2>
                <div className="space-y-3">
                    {EN.initiative.desc}
                </div>
                <div className="w-full flex flex-col md:flex-row flex-nowrap items-center justify-between gap-4">
                    {ENlists.initiativeImages?.map((img, index) => (
                        <Image
                            key={index}
                            src={img.src ?? ""}
                            alt={img.alt ?? "About House Wines"}
                            // fill={true}
                            sizes="100vw"
                            width={0}
                            height={0}
                            className="rounded-lg border border-primary-200 w-full h-auto"
                        />
                    ))}
                </div>
            </HWMotionContainer>

            <HWMotionContainer className="hw-section-block">
                <h2>{EN.ourMission.title}</h2>
                <p>{EN.ourMission.desc}</p>
            </HWMotionContainer>

            <HWMotionContainer className="hw-section-block">
                <h2>{EN.keyFeatures.title}</h2>
                <ul>
                    {ENlists.keyFeatures.map((item, index) => (
                        <HWMotionItem as='li'
                            key={item.desc}
                            className="flex flex-row py-1"
                        >
                            <Check className="text-hw-thyme me-4" />
                            <p>
                                {richField({
                                    t: { rich: t.rich } as unknown as TFunction,
                                    textField: `keyFeatures.list.${index}.desc`,
                                    className: "text-hw-thyme pe-2 w-3/12"
                                })}
                            </p>
                        </HWMotionItem>
                    ))}
                </ul>
            </HWMotionContainer>

            <HWMotionContainer className="hw-section-block">
                <h2>{EN.whoWeServe.title}</h2>
                <h3 className="text-xl font-ibm-plex-sans!">{EN.whoWeServe.listTitle}</h3>
                <ul className="list-disc space-y-4 px-4">
                    {ENlists.whoWeServe?.map((item, index) => (
                        <HWMotionItem as='li' key={index} className="marker:text-hw-thyme">
                            {item.desc}
                        </HWMotionItem>
                    ))}
                </ul>
            </HWMotionContainer>
        </div>
    )
}
