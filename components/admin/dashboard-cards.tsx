import { getRevenueAndReserve, getTotalCustomers } from "@/lib/data";
import { LuChartArea, LuShoppingCart, LuUsers } from "react-icons/lu";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";

const DashboardCards = async () => {
    const [data, customer] = await Promise.all([
        getRevenueAndReserve(),
        getTotalCustomers(),
    ])

    if (!data || !customer) return notFound();

    return (
        <div className='grid md:grid-cols-3 gap-5 pb-10 mt-2'>
            <div className="flex items-center bg-canvas border border-border rounded-md overflow-hidden shadow-card">
                <div className="p-4 bg-success">
                    <LuChartArea className="size-12 text-white" />
                </div>
                <div className="px-4 text-ink">
                    <h3 className="text-sm tracking-wider text-ink-muted">Total Revenue</h3>
                    <p className="text-3xl font-bold">{formatCurrency(data.revenue)}</p>
                </div>
            </div>
            <div className="flex items-center bg-canvas border border-border rounded-md overflow-hidden shadow-card">
                <div className="p-4 bg-action">
                    <LuShoppingCart className="size-12 text-white" />
                </div>
                <div className="px-4 text-ink">
                    <h3 className="text-sm tracking-wider text-ink-muted">Total Reservation</h3>
                    <p className="text-3xl font-bold">{data.reserve}</p>
                </div>
            </div>
            <div className="flex items-center bg-canvas border border-border rounded-md overflow-hidden shadow-card">
                <div className="p-4 bg-primary">
                    <LuUsers className="size-12 text-white" />
                </div>
                <div className="px-4 text-ink">
                    <h3 className="text-sm tracking-wider text-ink-muted">Total Customer</h3>
                    <p className="text-3xl font-bold">{customer.length}</p>
                </div>
            </div>
        </div>
    )
}
export default DashboardCards