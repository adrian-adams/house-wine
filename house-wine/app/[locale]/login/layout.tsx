import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center p-4 h-[calc(100vh-100px)]">
            <div className="w-full sm:w-8/12 lg:w-4/12">
                {children}
            </div>
        </div>
    )
}
