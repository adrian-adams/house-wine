// Components
import { Spinner } from "@/components/ui/spinner"

export default function loading() {
    return (
        <div className="h-screen flex items-center justify-center p-8">
            <div className="flex flex-row items-center gap-4">
                <p className="text-3xl">Loading... </p>
                <Spinner className="size-6" />
            </div>
        </div>
    )
}
