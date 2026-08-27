import React from 'react'
// NextJS
import Image from 'next/image'
// Components
import { Card } from "@/components/ui/card"

export default function ProductCard({ children, imageUrl, title, className }: {
    children: React.ReactNode
    imageUrl: string
    title: string
    className: string
}) {
    return (
        <Card className={`gap-0 ${className}`}>
            <div className="relative h-75 flex-2">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={title}
                        // width={300}
                        // height={200}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className="object-contain mx-auto p-2"
                    />
                )}
            </div>
            {children}
        </Card>
    )
}
