import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="hw-content-block legal-agreements">
            {children}
        </div>
    )
}
