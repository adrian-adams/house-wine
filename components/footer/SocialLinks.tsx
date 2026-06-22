import React from 'react'

type Target = "_self" | "_blank"

interface SocialLinksUI {
    link: string
    target: Target
    children: React.ReactNode
}

export default function SocialLinks({ link, target, children }: SocialLinksUI) {
    return (
        <li className="flex items-center justify-center p-2 rounded-full outline-1 outline-hw-foggy-dew/50 hover:outline-hw-foggy-dew">
            <a
                href={link}
                rel="noopener noreferrer"
                target={target}
                title={link}
            >
                {children}
            </a>
        </li>
    )
}
