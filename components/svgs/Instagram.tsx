import React from 'react'
// Types
import { SvgUI } from '@/types/svg'

export default function Instagram({ width, height }: SvgUI) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path strokeDasharray={66} d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"></animate>
                </path>
                <path strokeDasharray={28} strokeDashoffset={28} d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" to={0}></animate>
                </path>
            </g>
            <circle cx={17} cy={7} r={1.5} fill="currentColor" opacity={0}>
                <animate fill="freeze" attributeName="opacity" begin="1.3s" dur="0.2s" to={1}></animate>
            </circle>
        </svg>
    )
}