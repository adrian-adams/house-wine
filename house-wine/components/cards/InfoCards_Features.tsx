import React from 'react'
import type { LucideIcon } from 'lucide-react'
// Typescript
import { ContentUI } from '@/types/ui'
// NextJs
import Image from 'next/image'
// Components
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type InfoCardsUI = Pick<ContentUI, 'src' | 'element' | 'desc' | 'title' | 'iconStyles' | 'iconSize'> & {
    icon?: LucideIcon
}

export default function InfoCardsFeatures({ src, title, element: El = 'h3', desc, icon, iconStyles, iconSize }: InfoCardsUI) {
    const Icon = icon;

    return (
        <Card className="h-full p-6 gap-3">
            {src && (
                <div className="relative h-14 w-14 bg-hw-shea rounded-xl">
                    <Image
                        src={src}
                        alt={title ?? "House Wine"}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className="object-contain p-2 opacity-60"
                    />
                </div>
            )}
            {Icon && (
                <div className={`relative flex items-center justify-center h-14 w-14 rounded-xl ${iconStyles ? iconStyles : 'bg-hw-shea'}`}>
                    <Icon size={iconSize} />
                </div>
            )
            }
            <CardHeader className="border-hw-foggy-dew px-0 space-y-3">
                <CardTitle>
                    <El className="text-2xl">{title}</El>
                </CardTitle>
                <CardDescription>
                    <p className="text-md text-hw-heritage-park">{desc}</p>
                </CardDescription>
            </CardHeader>
        </Card >
    )
}
