import { Metadata } from "next"
import HeaderSection from "@/components/header-section"
import { Suspense } from "react"
import Main from "@/components/main"
import RoomSkeleton from "@/components/skeletons/room-skeleton"

export const metadata: Metadata = {
    title: "Room & Rates",
    description: "Choose your base room today"
}

const RoomPage = () => {
    return (
        <div>
            <HeaderSection title="Room & Rates" subtitle="Lorem ipsum dolor sit amet." />
            <div className="mt-10 px-4">
                <Suspense fallback={<RoomSkeleton />}>
                    <Main />
                </Suspense>
            </div>
        </div>
    )
}

export default RoomPage
