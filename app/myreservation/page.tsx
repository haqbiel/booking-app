import { auth } from "@/auth";
import { Metadata } from "next";
import MyReserveList from "@/components/my-reserve-list";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "My Reservation"
}

const MyReservationPage = async () => {
    const session = await auth();
    if (!session || !session.user) redirect("/signin")

    return (
        <div className="min-h-screen bg-surface-1">
            <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-ink mt-2">Hi, {session.user.name}</h3>
                        <p className="mt-1 font-medium text-ink-muted mb-4">Here&apos;s your book history :
                        </p>
                    </div>
                </div>
                <div className="rounded-md">
                    <MyReserveList />
                </div>
            </div>
        </div>
    )
};

export default MyReservationPage