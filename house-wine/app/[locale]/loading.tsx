import React from 'react'
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {

    return (
        <div className="h-screen flex flex-row items-center justify-center bg-neutral-600">
            <div className="flex flex-row items-center justify-center gap-2">
                <p className="text-3xl text-white">Loading...</p>
                <Spinner className="text-white size-10" />
            </div>
        </div>
    )
}
