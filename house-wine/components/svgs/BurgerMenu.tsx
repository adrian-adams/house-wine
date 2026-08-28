import React from 'react'

export default function BurgerMenu({ width = "3rem", height = "3rem", color = "#fff" }: { width?: string, height?: string, color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
            <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"></path>
        </svg>
    )
}
