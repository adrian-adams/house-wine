import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full sm:w-10/12 2xl:w-9/12 mx-auto px-4 py-10 space-y-6">
            {children}
        </div>
    )
}
