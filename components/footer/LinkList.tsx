import React from 'react'
// NEXTJS
import Image from 'next/image'
import Link from 'next/link'

interface LinkItem {
    id: number
    name: string
    href: string
}

interface LinkListUI {
    title: string
    data: LinkItem[]
}

export default function LinkList({ title, data }: LinkListUI) {
    return (
        <div>
            <h2 className="text-[clamp(0.75rem,5vw,1rem)] leading-snug">{title}</h2>
            <ul className="space-y-3 py-4">
                {data.map((item: LinkItem) => (
                    <li key={item.id} className="text-sm hover:underline">
                        <Link href={item.href}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}