import React from 'react'
// NEXTJS
import Image from 'next/image'
import type { Metadata } from "next";
// Lucide
import { Check } from 'lucide-react';
// Types & Lists
import { aboutImages, keyFeatures, whoWeServe } from './AboutLists';
// Components
import HWImage from '@/components/layout/HWImage';

export const metadata: Metadata = {
    title: "About House Wine",
    description: "House Wine allows independent wine collectors, enthusiasts and estates to manage, showcase, and sell their collections with ease.",
};

export default function about() {
    return (
        <>
            <section className="space-y-4">
                <h1>About House Wine</h1>
                <p>
                    House Wine allows independent wine collectors, enthusiasts and estates to manage, showcase, and sell their collections with ease. Offering an alternative to large, anonymous wine marketplaces and auction houses, House Wine focuses on individuals who want to share or sell in a more personal way. Powered by AI and built by a fellow wine lover.
                </p>
            </section>

            <section className="hw-section-block">
                <h2>An initiative by Arno Gregorian</h2>
                <div className="space-y-3">
                    <p>House Wine is an initiative by Arno Gregorian. I'm a great wine lover—I love drinking, sharing, and collecting wine. I also enjoy making my own wine at home and have had the amazing experience of helping out on a vineyard in the Rhône Valley.</p>
                    <p>My personal taste runs to beautiful old Grenache, Nebbiolo, and Pinot Noir. Armenian wines hold a special place in my heart.</p>
                    <p>I built House Wine so that people like us—collectors, enthusiasts, and anyone who loves sharing good wine—can catalogue, present, and share their bottles without the hassle. I hope you enjoy using it as much as I enjoy building it.</p>
                </div>
                <div className="flex flex-col md:flex-row flex-nowrap items-center justify-between gap-4">
                    {aboutImages?.map((img, index) => (
                        <Image
                            key={index}
                            src={img.src ?? ""}
                            alt={img.alt ?? ""}
                            width={250}
                            height={333}
                            className="flex-1 min-w-0 max-w-70 rounded-lg border border-primary-200 object-cover"
                        />
                    ))}
                </div>
            </section>

            <section className="hw-section-block">
                <h2>Our Mission</h2>
                <p>We combine the power of artificial intelligence with intuitive design to make wine collection management accessible to everyone. Whether you're cataloguing a personal cellar or running a shop on the secondary wine market, House Wine gives you one place to organise, share, and sell.</p>
            </section>

            <section className="hw-section-block">
                <h2>Key Features</h2>
                <ul className="space-y-4">
                    {keyFeatures?.map((item, index) => (
                        <li key={index} className="flex flex-row items-start justify-start gap-4">
                            <Check className="text-hw-thyme" />
                            <p>
                                <b className="text-hw-thyme">{item.title}</b>{item.desc}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="hw-section-block">
                <h2>Who We Serve</h2>
                <p>House Wine is for:</p>
                <ul className="list-disc space-y-4 px-4">
                    {whoWeServe?.map((item, index) => (
                        <li key={index} className="marker:text-hw-thyme">
                            {item.desc}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
