import { Metadata } from "next";
import DashboardCards from "@/components/admin/dashboard-cards";
import { Suspense } from "react";
import ReservationList from "@/components/admin/reservation-list";

export const metadata: Metadata = {
    title: "Dashboard"
}

const DashboardPage = () => {
    return (
        <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
            <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
            <Suspense fallback={<p className="text-ink-muted">Loading cards...</p>}>
                <DashboardCards />
            </Suspense>
            <Suspense fallback={<p className="text-ink-muted">Loading reservation...</p>}>
                <ReservationList />
            </Suspense>
        </div>
    )
};

export default DashboardPage